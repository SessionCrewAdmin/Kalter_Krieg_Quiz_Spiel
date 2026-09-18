(()=>{
const KEY='kathleenClassListsV1';
function uid(){return 'class-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6)}
function cleanStudents(v){
  const a=Array.isArray(v)?v:String(v||'').split(/[\n,;]+/),seen=new Set(),out=[];
  for(const raw of a){const n=String(raw).trim().replace(/\s+/g,' ');if(!n)continue;const k=n.toLocaleLowerCase('de');if(seen.has(k))continue;seen.add(k);out.push(n)}
  return out
}
function load(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v.filter(x=>x&&x.id&&x.name&&Array.isArray(x.students)):[]}catch(e){return[]}}
function save(lists){localStorage.setItem(KEY,JSON.stringify(lists));window.dispatchEvent(new CustomEvent('kathleen:classlists'))}
function upsert(data){
  const lists=load(),id=data.id||uid(),item={id,name:String(data.name||'').trim(),students:cleanStudents(data.students),updatedAt:new Date().toISOString()};
  if(!item.name)throw new Error('Klassenname fehlt');
  const i=lists.findIndex(x=>x.id===id);if(i>=0)lists[i]=item;else lists.push(item);
  lists.sort((a,b)=>a.name.localeCompare(b.name,'de',{numeric:true}));save(lists);return item
}
function remove(id){save(load().filter(x=>x.id!==id))}
function get(id){return load().find(x=>x.id===id)||null}
function shuffle(input){
  const a=[...input];
  for(let i=a.length-1;i>0;i--){let j;if(window.crypto&&crypto.getRandomValues){const u=new Uint32Array(1);crypto.getRandomValues(u);j=u[0]%(i+1)}else j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a
}
function detectDelimiter(line){
  const counts={';':0,',':0,'\t':0};let quoted=false;
  for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(line[i+1]==='"')i++;else quoted=!quoted}else if(!quoted&&Object.prototype.hasOwnProperty.call(counts,ch))counts[ch]++}
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0]
}
function parseDelimited(text){
  text=String(text||'').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').trim();
  if(!text)return[];
  const delimiter=detectDelimiter(text.split('\n')[0]),rows=[];let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(ch==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}
    else if(ch===delimiter&&!quoted){row.push(field);field=''}
    else if(ch==='\n'&&!quoted){row.push(field);rows.push(row);row=[];field=''}
    else field+=ch
  }
  row.push(field);rows.push(row);return rows.filter(r=>r.some(v=>String(v).trim()))
}
function normalizeHeader(s){return String(s||'').trim().toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\s-]+/g,'_')}
function importCsv(text,{replace=false}={}){
  const rows=parseDelimited(text);if(rows.length<2)throw new Error('Die CSV enthält keine Datenzeilen.');
  const header=rows[0].map(normalizeHeader);
  const classAliases=['class_name','klasse','class','klassenname'],studentAliases=['student_name','schueler','schuler','student','name'];
  const ci=header.findIndex(h=>classAliases.includes(h)),si=header.findIndex(h=>studentAliases.includes(h));
  if(ci<0||si<0)throw new Error('Erwartete Spalten: class_name und student_name.');
  const grouped=new Map();
  for(const r of rows.slice(1)){const cn=String(r[ci]||'').trim(),sn=String(r[si]||'').trim();if(!cn||!sn)continue;if(!grouped.has(cn))grouped.set(cn,[]);grouped.get(cn).push(sn)}
  if(!grouped.size)throw new Error('Keine gültigen Schülerdaten gefunden.');
  let lists=replace?[]:load();
  for(const [name,students] of grouped){const existing=lists.find(x=>x.name.toLocaleLowerCase('de')===name.toLocaleLowerCase('de'));if(existing)existing.students=cleanStudents([...existing.students,...students]),existing.updatedAt=new Date().toISOString();else lists.push({id:uid(),name,students:cleanStudents(students),updatedAt:new Date().toISOString()})}
  lists.sort((a,b)=>a.name.localeCompare(b.name,'de',{numeric:true}));save(lists);return {classes:grouped.size,students:[...grouped.values()].reduce((n,a)=>n+a.length,0)}
}
function csvEscape(v,del=';'){const s=String(v??'');return /["\n\r;,\t]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function exportCsv(lists=load(),delimiter=';'){
  const rows=[['class_name','student_name']];
  for(const c of lists)for(const s of c.students)rows.push([c.name,s]);
  return '\uFEFF'+rows.map(r=>r.map(v=>csvEscape(v,delimiter)).join(delimiter)).join('\r\n')
}
function templateCsv(){return '\uFEFFclass_name;student_name\r\n9a;Anna M.\r\n9a;Ben K.\r\n10b;Carla S.\r\n'}
function exportJson(lists=load()){return JSON.stringify({version:1,exportedAt:new Date().toISOString(),classes:lists},null,2)}
function importJson(text,{replace=false}={}){
  const d=JSON.parse(text),incoming=Array.isArray(d)?d:Array.isArray(d.classes)?d.classes:null;if(!incoming)throw new Error('Ungültiges JSON-Format.');
  let lists=replace?[]:load();
  for(const raw of incoming){const name=String(raw.name||'').trim(),students=cleanStudents(raw.students);if(!name||!students.length)continue;const existing=lists.find(x=>x.name.toLocaleLowerCase('de')===name.toLocaleLowerCase('de'));if(existing)existing.students=cleanStudents([...existing.students,...students]),existing.updatedAt=new Date().toISOString();else lists.push({id:uid(),name,students,updatedAt:new Date().toISOString()})}
  lists.sort((a,b)=>a.name.localeCompare(b.name,'de',{numeric:true}));save(lists);return {classes:lists.length,students:lists.reduce((n,c)=>n+c.students.length,0)}
}
window.KathleenClassLists={load,save,upsert,remove,get,cleanStudents,shuffle,parseDelimited,importCsv,exportCsv,templateCsv,exportJson,importJson,key:KEY};
})();