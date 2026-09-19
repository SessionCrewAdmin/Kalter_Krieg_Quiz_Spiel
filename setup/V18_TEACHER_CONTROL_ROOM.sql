-- ============================================================
-- Kathleens Classroom Board · V18 · TEACHER CONTROL ROOM PATCH
-- Run once AFTER V17.4.6 FINAL CLEAN.
-- Preserves all current Classroom sessions and data.
-- ============================================================

begin;

create or replace function public.classroom_teacher_state(
  p_session uuid,
  p_teacher_token uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_session public.classroom_sessions;
  v_participants jsonb;
begin
  select *
    into v_session
    from public.classroom_sessions
   where id = p_session
     and teacher_token = p_teacher_token;

  if v_session.id is null then
    return jsonb_build_object('ok', false);
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', p.id,
        'name', p.display_name,
        'state', p.state,
        'can_write', p.can_write,
        'locked', p.locked,
        'follow_teacher', p.follow_teacher,
        'online', p.last_seen > now() - interval '15 seconds',
        'last_seen', p.last_seen
      )
      order by p.display_name
    ),
    '[]'::jsonb
  )
  into v_participants
  from public.classroom_participants p
  where p.session_id = v_session.id;

  return jsonb_build_object(
    'ok', true,
    'room_code', v_session.room_code,
    'title', v_session.title,
    'class_name', v_session.class_name,
    'roster_count', (
      select count(*)::integer
      from public.classroom_roster r
      where r.session_id = v_session.id
    ),
    'session_state', v_session.status,
    'phase', v_session.phase,
    'traffic', v_session.traffic,
    'frozen', v_session.frozen,
    'participants', v_participants
  );
end
$$;

revoke execute on function public.classroom_teacher_state(uuid,uuid) from public;
grant execute on function public.classroom_teacher_state(uuid,uuid) to anon, authenticated;

commit;

notify pgrst, 'reload schema';

select
  to_regprocedure('public.classroom_teacher_state(uuid,uuid)') is not null
    as teacher_state_ok;
