-- Kathleens Classroom Board · V17.4.6 · HTTP 300 RPC overload hotfix
-- Safe hotfix: preserves the current classroom sessions and rosters.

begin;

-- Drop every legacy overload of classroom_student_state.
do $cleanup$
declare
  r record;
begin
  for r in
    select p.oid::regprocedure::text as signature
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public'
       and p.proname = 'classroom_student_state'
  loop
    execute 'drop function if exists ' || r.signature || ' cascade';
  end loop;
end
$cleanup$;

create or replace function public.classroom_student_state(
  p_student_token uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_participant public.classroom_participants;
  v_session public.classroom_sessions;
  v_messages jsonb;
begin
  select *
    into v_participant
    from public.classroom_participants
   where student_token = p_student_token
   limit 1;

  if v_participant.id is null then
    return jsonb_build_object('ok', false);
  end if;

  update public.classroom_participants
     set last_seen = now()
   where id = v_participant.id;

  select *
    into v_session
    from public.classroom_sessions
   where id = v_participant.session_id;

  if v_session.id is null then
    return jsonb_build_object('ok', false);
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', m.id,
        'body', m.body,
        'created_at', m.created_at
      )
      order by m.id
    ),
    '[]'::jsonb
  )
  into v_messages
  from public.classroom_messages m
  where m.session_id = v_session.id
    and (m.participant_id is null or m.participant_id = v_participant.id)
    and m.created_at > now() - interval '30 minutes';

  return jsonb_build_object(
    'ok', true,
    'session_state', v_session.status,
    'phase', v_session.phase,
    'traffic', v_session.traffic,
    'locked', v_participant.locked,
    'can_write', v_participant.can_write,
    'follow_teacher', v_participant.follow_teacher,
    'board_state', v_session.board_state,
    'viewport', v_session.viewport,
    'messages', v_messages
  );
end
$$;

revoke execute on function public.classroom_student_state(uuid) from public;
grant execute on function public.classroom_student_state(uuid) to anon, authenticated;

commit;

notify pgrst, 'reload schema';

-- Must return exactly one row/signature:
select p.oid::regprocedure::text as classroom_student_state_signature
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'classroom_student_state';
