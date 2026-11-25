/* Shared by index.html and admin.html: helpers, scoring engine, demo data, sample background art,
   and the data layer (Firebase Firestore when firebase-config.js is filled in, otherwise a localStorage demo). */
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),col=c=>/^#[0-9a-f]{6}$/i.test(c)?c:'#00B0FF';
const CFG0={name:'Demo Badminton Premier League 2026',dates:'24-27 Nov 2026',max:8,gamePts:21,winBy:2,cap:30,bestOf:3,winPts:2,tiePts:1,lossPts:0,allowTie:false,ann:['Semi-finals on 26 Nov','Free entry for spectators'],bgPage:'',bgHero:''};
// ---- scoring engine: every rule comes from the admin-editable config ----
const need=c=>Math.floor(c.bestOf/2)+1;
const gw=(a,b,c)=>a!==b&&(Math.max(a,b)>=c.cap||(Math.max(a,b)>=c.gamePts&&Math.abs(a-b)>=c.winBy))?(a>b?1:2):0;
function res(m,c){let ga=0,gb=0,pa=0,pb=0;m.gm.forEach(([a,b,o])=>{const w=gw(a,b,c)||(o&&a!==b?(a>b?1:2):0);ga+=w==1;gb+=w==2;pa+=a;pb+=b});return{ga,gb,pa,pb,w:m.w||(ga>=need(c)?'A':gb>=need(c)?'B':'')}}
function standings(g,teams,m,c){const r=teams.map((t,i)=>({i,p:0,w:0,l:0,t:0,gf:0,ga:0,pf:0,pa:0}));
 m.filter(k=>k.s=='done'&&k.g==g&&k.a!=null&&k.b!=null).forEach(k=>{const x=res(k,c),A=r[k.a],B=r[k.b];A.p++;B.p++;A.gf+=x.ga;A.ga+=x.gb;B.gf+=x.gb;B.ga+=x.ga;A.pf+=x.pa;A.pa+=x.pb;B.pf+=x.pb;B.pa+=x.pa;
  if(x.w=='T'){A.t++;B.t++}else if(x.w=='A'){A.w++;B.l++}else if(x.w=='B'){B.w++;A.l++}});
 return r.filter(x=>teams[x.i][2]==g).map(x=>(x.pts=x.w*c.winPts+x.t*c.tiePts+x.l*c.lossPts,x)).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||(b.pf-b.pa)-(a.pf-a.pa))}
// ---- demo tournament data (replace later from the admin panel) ----
const SEED_T=[['Smashers','#39ff14','A'],['Rackets','#00b0ff','A'],['Shuttle Kings','#1de9b6','A'],['Net Ninjas','#7c4dff','A'],['Drop Shots','#c6ff00','B'],['Court Storm','#2979ff','B'],['Birdie Blitz','#e040fb','B'],['Lob Legends','#18ffff','B']].map(([name,color,group],i)=>({id:'t'+i,name,color,group,order:i,players:[]}));
const SEED_M=[[1,'Group','A',0,1,'11-24','09:00',1,'done',[[21,18],[19,21],[21,17]]],[2,'Group','A',2,3,'11-24','10:00',2,'done',[[21,15],[21,19]]],[3,'Group','B',4,5,'11-24','11:00',1,'done',[[18,21],[21,19],[15,21]]],[4,'Group','B',6,7,'11-24','12:00',2,'done',[[21,12],[21,16]]],
[5,'Group','A',0,2,'11-25','15:00',1,'live',[[21,19],[14,12]]],[6,'Group','B',4,6,'11-25','16:00',2,'up',[]],[7,'Group','A',1,3,'11-25','17:00',1,'up',[]],[8,'Group','B',5,7,'11-25','18:00',2,'up',[]],
[9,'Group','A',0,3,'11-26','09:00',1,'up',[]],[10,'Group','A',1,2,'11-26','10:00',2,'up',[]],[11,'Group','B',4,7,'11-26','11:00',1,'up',[]],[12,'Group','B',5,6,'11-26','12:00',2,'up',[]],
[13,'Semi','',null,null,'11-26','15:00',1,'up',[],'A1|B2'],[14,'Semi','',null,null,'11-26','16:00',2,'up',[],'B1|A2'],[15,'Final','',null,null,'11-27','18:00',1,'up',[],'Winner SF1|Winner SF2']]
.map(([id,st,g,a,b,d,t,c,s,gm,h])=>({id:'m'+id,st,g,a:a==null?null:'t'+a,b:b==null?null:'t'+b,d:'2026-'+d,t,c,s,gm,ha:h?h.split('|')[0]:'',hb:h?h.split('|')[1]:'',w:''}));
// ---- sample background art (generated; override with your own photo URLs in admin Settings) ----
const _svg=s=>'data:image/svg+xml;utf8,'+encodeURIComponent(s);
const IMG={court:_svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1340 610"><defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b4fa8"/><stop offset="1" stop-color="#067a4a"/></linearGradient></defs><rect width="1340" height="610" fill="url(#f)"/><g fill="none" stroke="#fff" stroke-width="7" opacity=".92"><rect x="30" y="30" width="1280" height="550"/><path d="M30 76H1310M30 534H1310M106 30V580M1234 30V580M472 30V580M868 30V580M30 305H472M868 305H1310"/><path d="M670 0V610" stroke-width="12" stroke-dasharray="14 8"/></g></svg>`),
arena:_svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><defs><radialGradient id="g" cx=".5" cy=".2" r=".9"><stop offset="0" stop-color="#1c6dd0"/><stop offset=".6" stop-color="#062a4a"/><stop offset="1" stop-color="#020a12"/></radialGradient></defs><rect width="1600" height="900" fill="url(#g)"/><g fill="#fff" opacity=".16"><polygon points="200,0 360,0 700,700 120,700"/><polygon points="1240,0 1400,0 1480,700 900,700"/></g><g fill="#39ff14" opacity=".5">${Array.from({length:46},(_,i)=>`<circle cx="${(i*97)%1600}" cy="${690+(i*37)%120}" r="${18+(i%4)*7}"/>`).join('')}</g><rect y="780" width="1600" height="120" fill="#020a12" opacity=".7"/></svg>`)};
const bgv=u=>/^(https:\/\/|data:image\/)/.test(u||'')?`url("${u.replace(/["\\\s]/g,'')}")`:'none';
// ---- data layer ----
const _cfg=window.FIREBASE_CONFIG||{},_demo=!_cfg.apiKey||/^YOUR_/.test(_cfg.apiKey);
const _hash=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
const DB=(()=>{
 const K='bth_demo3',L=[],AU=[],cl=o=>JSON.parse(JSON.stringify(o)),
 seed=()=>({cfg:cl(CFG0),teams:cl(SEED_T),m:cl(SEED_M),reg:[]}),
 ld=()=>{try{const s=JSON.parse(localStorage.getItem(K));if(s&&s.m)return{...s,cfg:{...CFG0,...s.cfg}}}catch(e){}return seed()},
 sv=s=>{try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}L.forEach(f=>f(ld()))};
 if(_demo){ // demo mode: this browser only; other open tabs update through the storage event
  window.addEventListener('storage',e=>{if(e.key==K)L.forEach(f=>f(ld()))});
  const key={teams:'teams',matches:'m',registrations:'reg'};
  return{demo:true,
   async watch(cb){L.push(cb);cb(ld())},
   async set(c,id,d){const s=ld();if(c=='config')Object.assign(s.cfg,d);else{const a=s[key[c]],i=a.findIndex(x=>x.id==id);i<0?a.push({id,...d}):Object.assign(a[i],d)}sv(s)},
   async del(c,id){const s=ld();s[key[c]]=s[key[c]].filter(x=>x.id!=id);sv(s)},
   async register(t,p){const s=ld(),id='BPL-'+Math.floor(10000+Math.random()*89999);s.reg.push({id,...t,players:p,status:'pending',createdAt:Date.now()});sv(s);return{id}},
   async seed(){sv(seed())},
   async login(u,p){if(u=='admin'&&p=='admin'){sessionStorage.setItem('bth_adm','1');AU.forEach(f=>f({email:'admin'}))}else throw 0},
   async logout(){sessionStorage.removeItem('bth_adm');AU.forEach(f=>f(null))},
   onAuth(cb){AU.push(cb);cb(sessionStorage.getItem('bth_adm')?{email:'admin'}:null)}}}
 // Firebase mode. Firestore cannot store nested arrays, so each game is saved as a "21-18" string.
 const dec=m=>({...m,gm:(m.gm||[]).map(g=>String(g).split('-').map(Number))}),enc=(c,d)=>cl(c=='matches'&&d.gm?{...d,gm:d.gm.map(g=>g.join('-'))}:d);
 const fb=()=>fb.p||(fb.p=(async()=>{const V='https://www.gstatic.com/firebasejs/10.14.1/',[a,f,u]=await Promise.all(['app','firestore','auth'].map(x=>import(V+'firebase-'+x+'.js'))),app=a.initializeApp(_cfg);return{f,u,db:f.getFirestore(app),au:u.getAuth(app)}})());
 return{demo:false,
  async watch(cb,admin){const{f,db}=await fb(),a={cfg:{},teams:[],m:[],reg:[]},go=()=>cb({cfg:{...CFG0,...a.cfg},teams:a.teams,m:a.m.map(dec),reg:a.reg}),
   list=(c,fn)=>f.onSnapshot(f.collection(db,c),s=>{fn(s.docs.map(d=>({id:d.id,...d.data()})));go()},e=>console.error(c,e.code));
   f.onSnapshot(f.doc(db,'config','main'),s=>{a.cfg=s.data()||{};go()},e=>console.error('config',e.code));
   list('teams',r=>a.teams=r.sort((x,y)=>(x.order||0)-(y.order||0)));list('matches',r=>a.m=r.sort((x,y)=>(x.d+x.t).localeCompare(y.d+y.t)));
   if(admin)list('registrations',r=>a.reg=r.sort((x,y)=>(y.createdAt||0)-(x.createdAt||0)))},
  async set(c,id,d){const{f,db}=await fb();await f.setDoc(f.doc(db,c,c=='config'?'main':id),enc(c,d),{merge:true})},
  async del(c,id){const{f,db}=await fb();await f.deleteDoc(f.doc(db,c,id))},
  async register(t,p,code){const{f,db}=await fb(),r=await f.addDoc(f.collection(db,'registrations'),{...t,players:p,status:'pending',codeHash:await _hash(code),createdAt:Date.now()});return{id:'BPL-'+r.id.slice(0,5).toUpperCase()}},
  async seed(){await this.set('config','main',CFG0);for(const t of SEED_T)await this.set('teams',t.id,t);for(const m of SEED_M)await this.set('matches',m.id,m)},
  async login(e,p){const{u,au}=await fb();await u.signInWithEmailAndPassword(au,e,p)},
  async logout(){const{u,au}=await fb();await u.signOut(au)},
  async onAuth(cb){const{u,au}=await fb();u.onAuthStateChanged(au,cb)}}
})();
