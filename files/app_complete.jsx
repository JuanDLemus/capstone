import { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  primary:"#4F8EF7", primaryDark:"#2D6FD9", primarySoft:"#EEF4FF",
  accent:"#F5A623",  accentSoft:"#FFF4E0",
  success:"#3EC98E", successSoft:"#E8FBF3",
  danger:"#E05C5C",  dangerSoft:"#FDEAEA",
  taker:"#9B6DFF",  takerSoft:"#F3EEFF",
  n900:"#1A1D2E", n700:"#3D4060", n500:"#7A7F9A",
  n300:"#C4C8DA", n100:"#F4F5FA", surf:"#FFFFFF",
  // Clinical
  clin:"#1E7E6E",   clinSoft:"#E8F5F3", clinDark:"#145A4E",
  phq:"#5B4FCF",    phqSoft:"#EEE8FF",
  gad:"#D4700A",    gadSoft:"#FFF0E0",
  mmse:"#1E6BAE",   mmseSoft:"#E3F0FB",
  med:"#27AE60",    medSoft:"#E9F7EF",
  lab:"#8E44AD",    labSoft:"#F5EEF8",
  icd:"#2C3E50",
  // AAC Fitzgerald
  aacY:"#FFD700", aacO:"#FF8C00", aacG:"#3CB371",
  aacB:"#4169E1", aacW:"#F8F8F8", aacP:"#FF69B4",
  aacPu:"#8A2BE2",aacR:"#DC143C",
};

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${T.primary};--pd:${T.primaryDark};--ps:${T.primarySoft};
  --accent:${T.accent};--as:${T.accentSoft};
  --ok:${T.success};--oks:${T.successSoft};
  --err:${T.danger};--errs:${T.dangerSoft};
  --tak:${T.taker};--taks:${T.takerSoft};
  --n9:${T.n900};--n7:${T.n700};--n5:${T.n500};--n3:${T.n300};--n1:${T.n100};--sf:${T.surf};
  --clin:${T.clin};--clins:${T.clinSoft};--clind:${T.clinDark};
  --phq:${T.phq};--phqs:${T.phqSoft};
  --gad:${T.gad};--gads:${T.gadSoft};
  --med:${T.med};--meds:${T.medSoft};
  --lab:${T.lab};--labs:${T.labSoft};
  --icd:${T.icd};
  --r:16px;--rl:24px;--rx:32px;--rf:9999px;
  --sh:0 4px 20px rgba(26,29,46,.12);
  --fb:'Sora',sans-serif;--fn:'Nunito',sans-serif;--fm:'JetBrains Mono',monospace;
}
body{font-family:var(--fn);background:#111;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;padding-top:40px}
.shell{width:390px;height:844px;background:var(--n1);border-radius:48px;overflow:hidden;position:relative;box-shadow:0 40px 120px rgba(0,0,0,.6),0 0 0 12px #2a2d3e,0 0 0 14px #3a3d4e;display:flex;flex-direction:column}
.scr{flex:1;overflow-y:auto;overflow-x:hidden}.scr::-webkit-scrollbar{display:none}
.bnav{height:72px;background:var(--sf);border-top:1px solid var(--n1);display:flex;align-items:center;justify-content:space-around;padding:0 4px;flex-shrink:0;box-shadow:0 -4px 20px rgba(26,29,46,.06)}
.ni{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border-radius:14px;cursor:pointer;transition:all .2s;border:none;background:none;min-width:56px}
.ni.on{background:var(--ps)}.ni .ico{font-size:20px}.ni .lbl{font-size:9px;font-weight:800;color:var(--n5);font-family:var(--fn);letter-spacing:.2px}
.ni.on .lbl{color:var(--primary)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;border-radius:var(--rf);border:none;font-family:var(--fn);font-weight:800;font-size:15px;cursor:pointer;transition:all .2s;white-space:nowrap}
.bp{background:var(--primary);color:#fff;box-shadow:0 4px 16px rgba(79,142,247,.35)}
.bp:hover{background:var(--pd);transform:translateY(-1px)}
.bs{background:var(--sf);color:var(--primary);border:2px solid var(--primary)}
.bg{background:transparent;color:var(--n5);border:none}
.bd{background:var(--err);color:#fff;box-shadow:0 4px 16px rgba(224,92,92,.35)}
.bk{background:var(--ok);color:#fff;box-shadow:0 4px 16px rgba(62,201,142,.35)}
.bt{background:var(--tak);color:#fff;box-shadow:0 4px 16px rgba(155,109,255,.35)}
.bcl{background:var(--clin);color:#fff;box-shadow:0 4px 16px rgba(30,126,110,.35)}
.bw{width:100%}.blg{padding:18px 28px;font-size:17px}.bsm{padding:8px 14px;font-size:12px}
.card{background:var(--sf);border-radius:var(--rl);padding:20px;box-shadow:0 2px 8px rgba(26,29,46,.08)}
.inp{width:100%;padding:14px 16px;border-radius:var(--r);border:2px solid var(--n3);font-family:var(--fn);font-size:15px;color:var(--n9);background:var(--sf);outline:none;transition:border-color .2s}
.inp:focus{border-color:var(--primary)}.inpl{font-size:11px;font-weight:800;color:var(--n5);margin-bottom:6px;display:block;text-transform:uppercase;letter-spacing:.5px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:var(--rf);font-size:11px;font-weight:800}
.cpr{background:var(--ps);color:var(--primary)}.cok{background:var(--oks);color:var(--ok)}
.cer{background:var(--errs);color:var(--err)}.cta{background:var(--taks);color:var(--tak)}
.cac{background:var(--as);color:var(--accent)}.ccl{background:var(--clins);color:var(--clin)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.85}}
@keyframes wave{0%{transform:scaleY(.3)}50%{transform:scaleY(1)}100%{transform:scaleY(.3)}}
@keyframes ripple{0%{transform:scale(.8);opacity:.8}100%{transform:scale(2.4);opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
.afu{animation:fadeUp .5s ease both}.aflt{animation:float 3s ease-in-out infinite}.apls{animation:pulse 2s ease-in-out infinite}
.row{display:flex;align-items:center;gap:12px}.rwb{display:flex;align-items:center;justify-content:space-between}
.col{display:flex;flex-direction:column}.gap8{gap:8px}.gap12{gap:12px}.gap16{gap:16px}
.f1{flex:1}.tc{text-align:center}.mt8{margin-top:8px}.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}.mt24{margin-top:24px}
.mb8{margin-bottom:8px}.mb12{margin-bottom:12px}.mb16{margin-bottom:16px}.mb20{margin-bottom:20px}
.sbar{height:44px;background:transparent;display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0}
.stm{font-weight:700;font-size:15px;font-family:var(--fn)}.sic{display:flex;gap:6px;font-size:13px}
.phdr{padding:12px 20px 16px;display:flex;align-items:center;gap:12px;background:var(--sf);border-bottom:1px solid var(--n1);flex-shrink:0}
.phtl{font-family:var(--fb);font-size:18px;font-weight:700;color:var(--n9);flex:1}
.bkb{width:36px;height:36px;border-radius:50%;background:var(--n1);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.skl{background:linear-gradient(90deg,var(--n1) 25%,var(--n3) 50%,var(--n1) 75%);background-size:400px 100%;animation:shimmer 1.4s infinite;border-radius:var(--r)}
.pbar{height:8px;border-radius:var(--rf);background:var(--n1);overflow:hidden}
.pfil{height:100%;border-radius:var(--rf);transition:width .5s ease}
.tgwrap{position:relative;width:50px;height:28px;cursor:pointer}
.tgwrap input{display:none}
.tgtr{width:100%;height:100%;background:var(--n3);border-radius:var(--rf);transition:background .2s}
.tgwrap input:checked+.tgtr{background:var(--primary)}
.tgth{position:absolute;top:4px;left:4px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.2)}
.tgwrap input:checked~.tgth{transform:translateX(22px)}
.srow{background:var(--sf);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--n1)}
.srow:first-child{border-radius:var(--rl) var(--rl) 0 0}.srow:last-child{border-radius:0 0 var(--rl) var(--rl);border-bottom:none}
.srl{font-weight:700;color:var(--n9);font-size:15px}.srs{font-size:12px;color:var(--n5);margin-top:2px}
.ab{padding:10px 14px;border-radius:var(--r);display:flex;align-items:flex-start;gap:10px}
.ab.wi{background:var(--as);border-left:4px solid var(--accent)}.ab.da{background:var(--errs);border-left:4px solid var(--err)}
.ab.ok{background:var(--oks);border-left:4px solid var(--ok)}.ab.in{background:var(--ps);border-left:4px solid var(--primary)}
.ab.cl{background:var(--clins);border-left:4px solid var(--clin)}
.tabbar{display:flex;background:var(--n1);border-radius:var(--r);padding:4px;gap:2px}
.tabi{flex:1;padding:7px;text-align:center;border-radius:10px;font-size:11px;font-weight:800;cursor:pointer;transition:all .2s;color:var(--n5)}
.tabi.on{background:var(--sf);color:var(--primary);box-shadow:var(--sh)}
.fltbtn{position:absolute;bottom:16px;right:16px;width:52px;height:52px;border-radius:50%;background:var(--tak);color:#fff;border:none;cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(155,109,255,.5);z-index:99}
.ndot{width:8px;height:8px;border-radius:50%;background:var(--err);position:absolute;top:2px;right:2px}
.wvb{width:4px;border-radius:4px;background:var(--primary);display:inline-block}
.mnav{position:fixed;top:0;left:0;right:0;z-index:1000}
.mnavtg{width:100%;padding:7px 16px;background:#1a1d2e;border:none;border-bottom:1px solid rgba(255,255,255,.1);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--fn);font-size:11px;font-weight:800;letter-spacing:.3px}
.mnavpanel{background:rgba(26,29,46,.98);overflow-x:auto;overflow-y:auto;max-height:55vh;border-bottom:2px solid rgba(79,142,247,.4)}
.mnvbar{display:flex;flex-wrap:wrap;gap:12px;padding:10px 14px}
.mnvgrp{display:flex;flex-direction:column;gap:4px;min-width:120px}
.mnvgl{font-size:9px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1px;font-weight:800}
.mnvrow{display:flex;flex-wrap:wrap;gap:4px}
.mnvbtn{padding:4px 9px;border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,.15);color:#fff;background:rgba(255,255,255,.08);font-family:var(--fn);white-space:nowrap;transition:all .15s}
.mnvbtn:hover,.mnvbtn.on{background:var(--primary);border-color:var(--primary)}
.emomd{font-size:30px;cursor:pointer;transition:transform .15s;display:inline-block}
.emomd:hover,.emomd.sel{transform:scale(1.3)}
.icd{display:inline-flex;align-items:center;gap:5px;background:rgba(44,62,80,.08);border:1px solid rgba(44,62,80,.25);border-radius:7px;padding:3px 9px;font-size:11px;font-weight:700;color:var(--icd);font-family:var(--fm)}
.scbadge{background:var(--sf);border-radius:14px;padding:14px 16px}
.phasecircle{width:160px;height:160px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}
.mapcell{width:28px;height:28px;border-radius:6px}
.devrow{font-family:var(--fm);font-size:11px;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.08);color:#00ff88}
.ragbub{padding:12px 16px;border-radius:16px;max-width:85%;font-size:14px;line-height:1.5}
.ragbub.u{background:var(--primary);color:#fff;border-radius:16px 16px 4px 16px;align-self:flex-end}
.ragbub.a{background:var(--sf);color:var(--n9);border-radius:16px 16px 16px 4px;align-self:flex-start;box-shadow:var(--sh)}
.lgltxt{font-size:13px;color:var(--n7);line-height:1.7}
.lgltit{font-family:var(--fb);font-size:15px;font-weight:700;color:var(--n9);margin-bottom:6px}
.onslide{padding:40px 28px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px;min-height:100%;justify-content:center}
.dot{width:8px;height:8px;border-radius:50%;background:var(--n3);transition:all .3s}
.dot.on{width:24px;border-radius:4px;background:var(--primary)}
.aaccard{border-radius:var(--r);padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;transition:transform .15s;min-height:68px;justify-content:center;border:3px solid transparent}
.aaccard:active{transform:scale(.93)}
.aacwd{font-size:10px;font-weight:800;text-align:center;line-height:1.2}
`;

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */
const SBar = ({dark})=>(
  <div className="sbar" style={{color:dark?"#fff":T.n900}}>
    <span className="stm">9:41</span><span className="sic">📶 🔋</span>
  </div>
);
const PHeader = ({title,onBack,right})=>(
  <div className="phdr">
    {onBack&&<button className="bkb" onClick={onBack}>←</button>}
    <span className="phtl">{title}</span>{right}
  </div>
);
const Toggle=({checked,onChange})=>(
  <label className="tgwrap" onClick={()=>onChange(!checked)}>
    <input type="checkbox" checked={checked} readOnly/>
    <div className="tgtr"/><div className="tgth"/>
  </label>
);
const SRow=({icon,label,sub,right,onClick})=>(
  <div className="srow" style={{cursor:onClick?"pointer":"default"}} onClick={onClick}>
    <div className="row" style={{gap:14}}><span style={{fontSize:22}}>{icon}</span>
      <div><div className="srl">{label}</div>{sub&&<div className="srs">{sub}</div>}</div>
    </div>{right}
  </div>
);
const MiniBar=({data,color=T.primary,labels})=>(
  <div>
    <div style={{display:"flex",alignItems:"flex-end",gap:5,height:70}}>
      {data.map((v,i)=><div key={i} style={{height:`${v}%`,background:color,flex:1,borderRadius:"4px 4px 0 0",opacity:.65+v/320}}/>)}
    </div>
    {labels&&<div style={{display:"flex",gap:5,marginTop:3}}>{labels.map((l,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:10,color:T.n500,fontWeight:700}}>{l}</div>)}</div>}
  </div>
);
const Disc=({short})=>(
  <div style={{background:T.dangerSoft,border:`1px solid ${T.danger}33`,borderRadius:10,padding:"8px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
    <span style={{fontSize:13,flexShrink:0}}>⚕️</span>
    <p style={{fontSize:11,color:T.danger,lineHeight:1.5,fontWeight:600}}>
      {short?"Pattern analysis only — not a medical diagnosis. Always consult a qualified clinician."
      :"AI flags and screening scores are observational analyses based on validated frameworks (PHQ-9, GAD-7, ICD-10). They are NOT diagnoses and must never replace professional medical evaluation. Always share with a qualified healthcare provider."}
    </p>
  </div>
);
const ICD=({code,label})=>(
  <span className="icd">{code}{label&&<span style={{fontFamily:"var(--fn)",fontWeight:600,color:T.n700,fontSize:11}}> {label}</span>}</span>
);
const Flag=({icon,title,body,sev,action,onAct})=>{
  const cols={low:T.success,medium:T.accent,high:T.danger};
  const c=cols[sev]||T.accent;
  return(
    <div style={{background:T.surf,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(26,29,46,.08)",border:`1px solid ${c}33`}}>
      <div style={{background:c,padding:"9px 14px",display:"flex",alignItems:"center",gap:9}}>
        <span style={{fontSize:17}}>{icon}</span>
        <span style={{fontWeight:800,color:"#fff",fontSize:13,flex:1}}>{title}</span>
        <span style={{background:"rgba(255,255,255,.2)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:100,textTransform:"uppercase"}}>{sev}</span>
      </div>
      <div style={{padding:"12px 14px"}}>
        <p style={{fontSize:13,color:T.n700,lineHeight:1.6,marginBottom:action?10:0}}>{body}</p>
        {action&&<button className="btn bsm" style={{background:c+"18",color:c,border:`1px solid ${c}44`,borderRadius:50,padding:"6px 14px",fontSize:12}} onClick={onAct}>{action} →</button>}
      </div>
    </div>
  );
};
const ScBadge=({score,max,label,color})=>{
  const pct=(score/max)*100;
  return(
    <div className="scbadge" style={{border:`2px solid ${color}44`,flex:1}}>
      <div style={{fontSize:10,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{label}</div>
      <div style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:900,color}}>{score}<span style={{fontSize:12,color:T.n500}}>/{max}</span></div>
      <div className="pbar mt8"><div className="pfil" style={{width:`${pct}%`,background:color}}/></div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM NAV
───────────────────────────────────────────── */
const BNav=({role,active,onNav})=>{
  const ui=[
    {id:"talk",ico:"🎙️",lbl:"Talk"},{id:"activities",ico:"🧘",lbl:"Activities"},
    {id:"home",ico:"🏠",lbl:"Home"},{id:"medical",ico:"🏥",lbl:"Medical"},{id:"settings",ico:"⚙️",lbl:"Settings"},
  ];
  const ti=[
    {id:"connect",ico:"💬",lbl:"Connect"},{id:"dashboard",ico:"📊",lbl:"Dashboard"},
    {id:"calendar",ico:"🗓️",lbl:"Calendar"},{id:"control",ico:"🛠️",lbl:"Control"},
  ];
  return(
    <div className="bnav">
      {(role==="taker"?ti:ui).map(it=>(
        <button key={it.id} className={`ni${active===it.id?" on":""}`} onClick={()=>onNav(it.id)}>
          <span className="ico">{it.ico}</span><span className="lbl">{it.lbl}</span>
        </button>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   A1 WELCOME
───────────────────────────────────────────── */
const Welcome=({go})=>(
  <div style={{background:"linear-gradient(160deg,#1a1d2e,#2a3550)",minHeight:"100%",display:"flex",flexDirection:"column",padding:"0 28px 40px",position:"relative",overflow:"hidden"}}>
    <SBar dark/>
    <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"rgba(79,142,247,.15)",filter:"blur(40px)"}}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textAlign:"center"}}>
      <div className="aflt" style={{width:100,height:100,borderRadius:28,background:"linear-gradient(135deg,#4F8EF7,#9B6DFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,boxShadow:"0 20px 60px rgba(79,142,247,.4)"}}>🧠</div>
      <div>
        <h1 style={{fontFamily:"var(--fb)",fontSize:36,fontWeight:800,color:"#fff",letterSpacing:-1}}>APP_NAME</h1>
        <p style={{color:"rgba(255,255,255,.55)",fontSize:14,marginTop:8,lineHeight:1.5}}>Your family's clinical companion.{"\n"}Tracking health, every day.</p>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
        {["🎙️ Voice Journal","📊 Clinical BI","🧘 Activities","🏥 Medical Record","🧠 AI Screening"].map(f=>(
          <span key={f} style={{background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",padding:"5px 12px",borderRadius:100,fontSize:11,fontWeight:700,border:"1px solid rgba(255,255,255,.15)"}}>{f}</span>
        ))}
      </div>
    </div>
    <div className="col gap12">
      <button className="btn bp bw blg" onClick={()=>go("login")}>🔐 Log In</button>
      <button className="btn bw blg" style={{background:"rgba(255,255,255,.08)",color:"#fff",border:"1px solid rgba(255,255,255,.25)",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}} onClick={()=>go("reg1")}>✨ Create Account</button>
      <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:6}}>
        <span style={{fontSize:11,color:"rgba(255,255,255,.35)",cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("legal")}>Privacy & Terms</span>
        <span style={{color:"rgba(255,255,255,.2)"}}>·</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>Not a medical device</span>
      </div>
    </div>
  </div>
);

/* A2 LOGIN */
const Login=({go})=>(
  <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column"}}>
    <SBar/>
    <div style={{flex:1,padding:"20px 28px 40px",display:"flex",flexDirection:"column"}}>
      <button className="btn bg bsm" style={{alignSelf:"flex-start",paddingLeft:0,color:T.primary}} onClick={()=>go("welcome")}>← Back</button>
      <div style={{marginTop:28,marginBottom:28}}>
        <h2 style={{fontFamily:"var(--fb)",fontSize:28,fontWeight:800,color:T.n900}}>Welcome back 👋</h2>
        <p style={{color:T.n500,marginTop:6}}>Sign in to continue your care journey</p>
      </div>
      <div className="col gap16">
        <div><label className="inpl">Email Address</label><input className="inp mt8" type="email" placeholder="your@email.com" style={{marginTop:8}}/></div>
        <div>
          <label className="inpl">Password</label><input className="inp mt8" type="password" placeholder="••••••••" style={{marginTop:8}}/>
          <div style={{textAlign:"right",marginTop:6}}><span style={{fontSize:13,color:T.primary,fontWeight:700,cursor:"pointer"}} onClick={()=>go("forgot")}>Forgot password?</span></div>
        </div>
        <button className="btn bp bw blg" onClick={()=>go("home_user")}>Sign In 🚀</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{flex:1,height:1,background:T.n300}}/><span style={{fontSize:12,color:T.n500,fontWeight:700}}>or</span><div style={{flex:1,height:1,background:T.n300}}/></div>
        <button className="btn bs bw" style={{gap:10}}>🔒 Biometrics</button>
        <button className="btn bs bw" style={{gap:10}}>🍎 Sign in with Apple</button>
      </div>
      <div style={{marginTop:"auto",paddingTop:24,textAlign:"center"}}>
        <span style={{fontSize:14,color:T.n500}}>New here? <span style={{color:T.primary,fontWeight:700,cursor:"pointer"}} onClick={()=>go("reg1")}>Create account</span></span>
      </div>
    </div>
  </div>
);

/* A3-A6 REGISTER STEPS */
const Reg1=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><div style={{padding:"12px 28px 40px"}}>
    <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("welcome")}>← Back</button>
    <div style={{marginTop:14}}>
      <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n===1?T.primary:T.n300}}/>)}</div>
      <span className="chip cpr">Step 1 of 4</span>
      <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Let's get to know you</h2>
    </div>
    <div className="card mt16 col gap16">
      <div><label className="inpl">Full Name</label><input className="inp mt8" placeholder="Maria García" style={{marginTop:8}}/></div>
      <div><label className="inpl">Email</label><input className="inp mt8" type="email" placeholder="maria@example.com" style={{marginTop:8}}/></div>
      <div><label className="inpl">Date of Birth</label><input className="inp mt8" type="date" style={{marginTop:8}}/></div>
      <div><label className="inpl">Password</label><input className="inp mt8" type="password" placeholder="At least 8 characters" style={{marginTop:8}}/></div>
    </div>
    <button className="btn bp bw blg mt24" onClick={()=>go("reg2")}>Continue →</button>
    </div>
  </div>
);
const Reg2=({go})=>{
  const [sel,setSel]=useState(null);
  const roles=[
    {id:"user",ico:"🧑",label:"User",desc:"I manage my own daily journal and health data",col:T.primary},
    {id:"snu",ico:"💙",label:"Special Needs User",desc:"A caregiver helps manage my account",col:T.success},
    {id:"taker",ico:"👨‍👩‍👧",label:"Taker / Caregiver",desc:"I look after someone and track their wellbeing",col:T.taker},
  ];
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><div style={{padding:"12px 28px 40px"}}>
      <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg1")}>← Back</button>
      <div style={{marginTop:14}}>
        <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n<=2?T.primary:T.n300}}/>)}</div>
        <span className="chip cpr">Step 2 of 4</span>
        <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Your role in the app</h2>
      </div>
      <div className="col gap12 mt16">
        {roles.map(r=>(
          <div key={r.id} className="card" style={{cursor:"pointer",border:`2px solid ${sel===r.id?r.col:"transparent"}`,background:sel===r.id?r.col+"11":T.surf,transition:"all .2s"}} onClick={()=>setSel(r.id)}>
            <div className="row"><div style={{width:48,height:48,borderRadius:14,background:r.col+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{r.ico}</div>
              <div style={{flex:1}}><div style={{fontWeight:800,fontSize:15,color:T.n900}}>{r.label}</div><div style={{fontSize:12,color:T.n500,marginTop:2,lineHeight:1.4}}>{r.desc}</div></div>
              <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${sel===r.id?r.col:T.n300}`,background:sel===r.id?r.col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff"}}>{sel===r.id&&"✓"}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn bp bw blg mt24" onClick={()=>go("reg3")}>Continue →</button>
      </div>
    </div>
  );
};
const Reg3=({go})=>{
  const [tg,setTg]=useState({aac:false,cb:false,lt:false,hc:false,mic:true});
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><div style={{padding:"12px 28px 40px"}}>
      <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg2")}>← Back</button>
      <div style={{marginTop:14}}>
        <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n<=3?T.primary:T.n300}}/>)}</div>
        <span className="chip cpr">Step 3 of 4</span>
        <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Accessibility</h2>
      </div>
      <div className="card mt16">
        <SRow icon="🎙️" label="Use Microphone" sub="Voice journaling" right={<Toggle checked={tg.mic} onChange={v=>setTg(p=>({...p,mic:v}))}/>}/>
        <SRow icon="🃏" label="AAC Symbol Cards" sub="Fitzgerald color-coded board" right={<Toggle checked={tg.aac} onChange={v=>setTg(p=>({...p,aac:v}))}/>}/>
        <SRow icon="🎨" label="Colorblind Theme" sub="Adjusted for color vision differences" right={<Toggle checked={tg.cb} onChange={v=>setTg(p=>({...p,cb:v}))}/>}/>
        <SRow icon="🔤" label="Large Text Mode" sub="150% font size" right={<Toggle checked={tg.lt} onChange={v=>setTg(p=>({...p,lt:v}))}/>}/>
        <SRow icon="⬛" label="High Contrast" sub="Maximum contrast" right={<Toggle checked={tg.hc} onChange={v=>setTg(p=>({...p,hc:v}))}/>}/>
      </div>
      <button className="btn bp bw blg mt24" onClick={()=>go("reg4")}>Continue →</button>
      </div>
    </div>
  );
};
const Reg4=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><div style={{padding:"12px 28px 40px"}}>
    <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg3")}>← Back</button>
    <div style={{marginTop:14}}>
      <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:T.primary}}/>)}</div>
      <span className="chip cpr">Step 4 of 4</span>
      <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Stay consistent 🎯</h2>
    </div>
    <div className="card mt16">
      <label className="inpl">Reminder frequency</label>
      <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
        {["Daily","Twice daily","Weekly","Custom"].map(f=><button key={f} className="btn bs bsm">{f}</button>)}
      </div>
      <label className="inpl mt16" style={{marginTop:16}}>Preferred time</label>
      <input className="inp mt8" type="time" defaultValue="09:00" style={{marginTop:8}}/>
    </div>
    <div className="card mt16" style={{background:T.successSoft,border:`1px solid ${T.success}33`}}>
      <div style={{fontSize:32,marginBottom:8}}>🎉</div>
      <div style={{fontWeight:800,color:T.n900,fontSize:17}}>You're all set!</div>
      <p style={{fontSize:13,color:T.n700,marginTop:6,lineHeight:1.6}}>First clinical check-in reminder will arrive tomorrow morning.</p>
    </div>
    <button className="btn bk bw blg mt20" onClick={()=>go("onboard")}>Start My Journey 🚀</button>
    </div>
  </div>
);

/* A7 FORGOT PW */
const Forgot=({go})=>{
  const [sent,setSent]=useState(false);
  return(
    <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/><div style={{flex:1,padding:"20px 28px 40px",display:"flex",flexDirection:"column"}}>
      <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("login")}>← Back</button>
      <div style={{marginTop:40,textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:16}}>{sent?"📬":"🔑"}</div>
        <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900}}>{sent?"Check your inbox":"Forgot password?"}</h2>
        <p style={{color:T.n500,marginTop:8,lineHeight:1.6}}>{sent?"Reset link sent. Expires in 15 minutes.":"We'll send reset instructions."}</p>
      </div>
      {!sent?<><label className="inpl mt24" style={{marginTop:24}}>Email Address</label><input className="inp mt8" type="email" placeholder="your@email.com" style={{marginTop:8}}/>
        <button className="btn bp bw blg mt20" onClick={()=>setSent(true)}>Send Reset Link</button></>
      :<><button className="btn bp bw blg mt24" onClick={()=>go("login")}>Back to Login</button>
        <button className="btn bg bw mt12" onClick={()=>setSent(false)}>Try different email</button></>}
      </div>
    </div>
  );
};

/* A8 LEGAL */
const Legal=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Privacy & Legal" onBack={()=>go("welcome")}/>
    <div style={{padding:"16px 20px 40px"}}>
      <div className="ab da mb16">
        <span style={{fontSize:18}}>⚠️</span>
        <div><div style={{fontWeight:800,fontSize:13,color:T.n900}}>Medical Disclaimer</div>
        <div style={{fontSize:12,color:T.n700,marginTop:2,lineHeight:1.5}}>This app is NOT a medical device and does NOT diagnose, treat, or predict any medical or mental health condition. It is a data companion only.</div></div>
      </div>
      {[
        ["1. What We Collect","Daily journal entries (voice/text), mood ratings, symptom logs, medication adherence, screening responses (PHQ-9, GAD-7), GPS location (if enabled), and usage metadata. No raw biometric audio is stored."],
        ["2. Clinical Data Processing","Your entries are processed by an LLM to extract structured clinical data points mapped to ICD-10/DSM-5 categories. Screening scores are calculated using validated algorithms. All processing uses anonymised identifiers — your name and email are never sent to AI APIs."],
        ["3. Who Can See Your Data","Only you and any Takers you explicitly invite. Takers see dashboards and AI flags but never raw entries. Clinician reports are generated only on your explicit request. We do not share data with insurers, employers, or advertisers."],
        ["4. AI Clinical Flags","AI pattern observations use heuristic frameworks (PHQ-9, GAD-7, ICD-10, NICE guidelines). These are NOT diagnoses. Confidence scores reflect pattern matching only. Always share observations with a qualified clinician before acting."],
        ["5. GPS & Location","Off by default. Requires explicit consent. Encrypted at rest. Visible only to authorised Takers. You may delete location history at any time from Settings."],
        ["6. Data Retention & Rights","Data retained while your account is active. Permanent deletion within 30 days of account closure. Export in JSON/CSV at any time. EU users: GDPR rights apply. California users: CCPA rights apply."],
        ["7. Emergency Situations","The app provides general crisis guidance only. Always call emergency services (911/112) for immediate danger. Emergency protocol activation may notify your linked Taker."],
        ["8. Children & Special Needs","Users under 13 require guardian (Taker) account management. SNU profiles require Taker oversight. All LLM interactions are filtered for age-appropriate content."],
      ].map(([t,b])=>(
        <div key={t} style={{marginBottom:20}}>
          <div className="lgltit">{t}</div><div className="lgltxt">{b}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ONBOARDING */
const Onboard=({go})=>{
  const [s,setS]=useState(0);
  const slides=[
    {e:"🎙️",t:"Your Voice, Your Story",b:"Speak or type your daily check-in. Our AI listens, understands, and builds your personal wellbeing picture — privately and securely."},
    {e:"🏥",t:"Clinical Intelligence",b:"Track diagnoses, medications, labs and screening scores. The AI monitors your conditions and flags patterns for your care team — without ever diagnosing."},
    {e:"👨‍👩‍👧",t:"Family Together",b:"Connect caregivers and loved ones. Takers monitor, get AI-powered insights, and stay close — without ever seeing your raw diary entries."},
    {e:"📊",t:"Insights, Not Diagnoses",b:"Beautiful clinical dashboards reveal patterns. The app suggests — a professional decides. Your data, your control, always."},
  ];
  const sl=slides[s];
  return(
    <div style={{background:"linear-gradient(160deg,#f4f5fa,#eef4ff)",minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/>
      <div className="onslide" style={{flex:1}}>
        <div style={{fontSize:80,animation:"float 3s ease-in-out infinite"}}>{sl.e}</div>
        <div><h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,textAlign:"center"}}>{sl.t}</h2>
          <p style={{fontSize:14,color:T.n500,marginTop:10,lineHeight:1.7,textAlign:"center"}}>{sl.b}</p></div>
        <div style={{display:"flex",gap:8}}>{slides.map((_,i)=><div key={i} className={`dot${i===s?" on":""}`}/>)}</div>
        <div style={{display:"flex",gap:10,width:"100%"}}>
          {s>0&&<button className="btn bs f1" onClick={()=>setS(x=>x-1)}>← Back</button>}
          <button className="btn bp f1" onClick={()=>s<slides.length-1?setS(x=>x+1):go("home_user")}>
            {s<slides.length-1?"Next →":"Get Started 🎉"}
          </button>
        </div>
        {s<slides.length-1&&<span style={{fontSize:12,color:T.n500,cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("home_user")}>Skip intro</span>}
      </div>
    </div>
  );
};

/* PERMISSION */
const Perm=({go,type})=>{
  const cfg={
    mic:{ico:"🎙️",t:"Microphone Access",b:"Voice journaling and the communication layer need mic access. Audio is never stored as raw files.",col:T.primary,lbl:"Allow Microphone"},
    gps:{ico:"📍",t:"Location Access",b:"GPS is completely optional and encrypted. Only your chosen caregivers can see it. Useful for Alzheimer's, children, or navigation support.",col:T.success,lbl:"Allow Location"},
    notif:{ico:"🔔",t:"Notifications",b:"Friendly daily reminders keep your clinical journal consistent. You control frequency and timing in Settings.",col:T.accent,lbl:"Allow Notifications"},
  };
  const c=cfg[type]||cfg.mic;
  return(
    <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center"}}>
      <div style={{width:96,height:96,borderRadius:28,background:c.col+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,marginBottom:24}}>{c.ico}</div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900}}>{c.t}</h2>
      <p style={{color:T.n500,marginTop:10,lineHeight:1.7,maxWidth:300}}>{c.b}</p>
      <div className="col gap12 mt24" style={{width:"100%"}}>
        <button className="btn bw blg" style={{background:c.col,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}} onClick={()=>go("home_user")}>{c.lbl}</button>
        <button className="btn bg bw" onClick={()=>go("home_user")}>Not now</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   COMMUNICATION SCREENS
───────────────────────────────────────────── */
const VoiceIdle=({go})=>(
  <div style={{background:"#0d0f1a",minHeight:"100%",display:"flex",flexDirection:"column"}}>
    <SBar dark/>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"0 28px"}}>
      <div style={{textAlign:"center"}}><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:700,color:"#fff"}}>How are you doing?</h2><p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginTop:6}}>Tap to talk, or choose another input method</p></div>
      <div style={{position:"relative",width:190,height:190,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"absolute",width:190,height:190,borderRadius:"50%",border:"2px solid rgba(79,142,247,.12)"}}/>
        <div style={{position:"absolute",width:150,height:150,borderRadius:"50%",border:"2px solid rgba(79,142,247,.22)"}}/>
        <button style={{width:114,height:114,borderRadius:"50%",background:"linear-gradient(135deg,#4F8EF7,#2D6FD9)",border:"none",cursor:"pointer",fontSize:42,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 60px rgba(79,142,247,.5)"}} onClick={()=>go("voice_listen")}>🎙️</button>
      </div>
      <div style={{display:"flex",gap:10,width:"100%"}}>
        <button className="btn f1" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",border:"1px solid rgba(255,255,255,.15)",borderRadius:50,fontWeight:800,fontSize:13,padding:"12px 16px"}} onClick={()=>go("guided_q")}>📝 Questions</button>
        <button className="btn f1" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",border:"1px solid rgba(255,255,255,.15)",borderRadius:50,fontWeight:800,fontSize:13,padding:"12px 16px"}} onClick={()=>go("aac_main")}>🃏 AAC Cards</button>
      </div>
    </div>
  </div>
);

const VoiceListen=({go})=>(
  <div style={{background:"#0d0f1a",minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"0 28px"}}>
    <SBar dark/>
    <div style={{background:"rgba(224,92,92,.15)",padding:"5px 16px",borderRadius:100,display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:8,height:8,borderRadius:"50%",background:T.danger,animation:"pulse 1s infinite"}}/>
      <span style={{fontSize:12,color:T.danger,fontWeight:800}}>LISTENING</span>
    </div>
    <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:190,height:190}}>
      <div style={{position:"absolute",width:180,height:180,borderRadius:"50%",border:`2px solid ${T.danger}44`,animation:"ripple 1.5s infinite"}}/>
      <button style={{width:114,height:114,borderRadius:"50%",background:`linear-gradient(135deg,${T.danger},#b04040)`,border:"none",cursor:"pointer",fontSize:42,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 60px ${T.danger}88`}} onClick={()=>go("voice_proc")}>🎙️</button>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:4,height:44}}>
      {[.3,.6,1,.8,.5,.9,.4,.7,1,.6,.3,.8,.5].map((h,i)=>(
        <div key={i} className="wvb" style={{height:`${h*36}px`,animation:`wave ${.6+Math.random()*.5}s ease-in-out infinite`,animationDelay:`${i*.07}s`}}/>
      ))}
    </div>
    <div style={{background:"rgba(255,255,255,.05)",borderRadius:14,padding:"10px 18px",width:"100%"}}>
      <p style={{color:"rgba(255,255,255,.55)",fontSize:13,lineHeight:1.6,fontStyle:"italic"}}>"Today I took my Sertraline, I'm feeling a bit tired but less anxious than yesterday..."</p>
    </div>
    <p style={{color:"rgba(255,255,255,.35)",fontSize:13}}>Tap to stop</p>
  </div>
);

const VoiceProc=({go})=>(
  <div style={{background:"#0d0f1a",minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"0 40px",textAlign:"center"}}>
    <SBar dark/>
    <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(79,142,247,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>🧠</div>
    <div style={{width:56,height:56,borderRadius:"50%",border:"3px solid transparent",borderTopColor:T.primary,animation:"spin 1s linear infinite"}}/>
    <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:700,color:"#fff"}}>Understanding your entry...</h2>
    <p style={{color:"rgba(255,255,255,.4)",fontSize:13,lineHeight:1.6}}>Extracting clinical data points and mapping to your health record.</p>
    <div className="col gap8">
      {["Transcribing audio ✓","Parsing clinical keywords ✓","Mapping to ICD-10 categories...","Checking medication adherence","Saving to clinical record"].map((s,i)=>(
        <div key={i} style={{fontSize:12,color:i<2?T.success:i===2?T.primary:"rgba(255,255,255,.25)",textAlign:"center"}}>{s}</div>
      ))}
    </div>
    <button className="btn bg" style={{color:"rgba(255,255,255,.3)",marginTop:12}} onClick={()=>go("voice_resp")}>Skip preview →</button>
  </div>
);

const VoiceResp=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{padding:"16px 20px 40px"}}>
      <div className="row mb16">
        <span className="chip cok">✓ Entry Captured</span>
        <span style={{fontSize:12,color:T.n500}}>Today, 9:41 AM</span>
      </div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:T.n900}}>Here's what I understood</h2>
      <p style={{color:T.n500,fontSize:13,marginTop:4}}>Review and edit before saving to your clinical record</p>
      <div className="col gap10 mt16">
        {[
          {ico:"💊",lbl:"Medication",val:"Sertraline ✓ taken",cat:"adherence",col:T.med},
          {ico:"😊",lbl:"Mood",val:"Better than yesterday",cat:"mood",col:T.primary},
          {ico:"😟",lbl:"Anxiety",val:"Reduced — mild",cat:"GAD-7 proxy",col:T.accent},
          {ico:"😴",lbl:"Energy",val:"Tired",cat:"PHQ-9 Q4",col:T.n500},
          {ico:"🍽️",lbl:"Appetite",val:"Normal",cat:"PHQ-9 Q5",col:T.success},
        ].map(it=>(
          <div key={it.lbl} className="card">
            <div className="rwb">
              <div className="row" style={{gap:10}}>
                <span style={{fontSize:22}}>{it.ico}</span>
                <div>
                  <div style={{fontSize:10,color:T.n500,fontWeight:800,textTransform:"uppercase",letterSpacing:.4}}>{it.cat}</div>
                  <div style={{fontWeight:700,color:T.n900,fontSize:14}}>{it.lbl}</div>
                </div>
              </div>
              <div className="row" style={{gap:6}}>
                <span style={{fontSize:13,color:it.col,fontWeight:700}}>{it.val}</span>
                <span style={{fontSize:15,cursor:"pointer"}}>✏️</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ab in mt16">
        <span style={{fontSize:14}}>💡</span>
        <span style={{fontSize:12,color:T.n700}}>Pain level and sleep quality not mentioned — tap to add.</span>
      </div>
      <div style={{display:"flex",gap:10,marginTop:20}}>
        <button className="btn bs f1" onClick={()=>go("voice_idle")}>🔄 Re-record</button>
        <button className="btn bk f1" onClick={()=>go("home_user")}>✓ Save to Record</button>
      </div>
    </div>
  </div>
);

const AACMain=({go})=>{
  const cats=[
    {l:"I / Me",bg:T.aacY,ico:"👤"},{l:"People",bg:T.aacY,ico:"👨‍👩‍👧"},
    {l:"Feel",bg:T.aacG,ico:"❤️"},{l:"Want",bg:T.aacG,ico:"⭐"},
    {l:"Food",bg:T.aacP,ico:"🍎"},{l:"Drink",bg:T.aacP,ico:"🥤"},
    {l:"Where",bg:T.aacB,ico:"📍"},{l:"Things",bg:T.aacO,ico:"📦"},
    {l:"Yes",bg:T.aacW,ico:"✅",brd:T.n300},{l:"No",bg:T.aacR,ico:"❌"},
    {l:"Help",bg:T.aacPu,ico:"🆘"},{l:"More",bg:T.aacW,ico:"➕",brd:T.n300},
  ];
  return(
    <div style={{background:"#1a1d2e",minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar dark/>
      <div style={{padding:"8px 14px",background:"rgba(255,255,255,.05)",display:"flex",gap:8,alignItems:"center",minHeight:50}}>
        <div style={{flex:1,minHeight:34,background:"rgba(255,255,255,.08)",borderRadius:8,display:"flex",alignItems:"center",padding:"0 10px"}}>
          <span style={{color:"rgba(255,255,255,.35)",fontSize:12}}>Build your message...</span>
        </div>
        <button style={{background:T.primary,border:"none",color:"#fff",borderRadius:8,padding:"7px 12px",fontWeight:800,fontSize:12,cursor:"pointer"}}>▶ SPEAK</button>
      </div>
      <div style={{flex:1,padding:"10px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,overflow:"auto"}}>
        {cats.map(c=>(
          <div key={c.l} className="aaccard" style={{background:c.bg,borderColor:c.brd||"transparent"}} onClick={()=>go("aac_cat")}>
            <span style={{fontSize:26}}>{c.ico}</span>
            <span className="aacwd" style={{color:c.bg===T.aacY||c.bg===T.aacW?"#1a1d2e":"#fff"}}>{c.l}</span>
          </div>
        ))}
      </div>
      <div style={{padding:"6px 10px 10px",display:"flex",gap:7}}>
        <button className="btn bsm f1" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)",border:"1px solid rgba(255,255,255,.15)",borderRadius:50}}>🔙 Del</button>
        <button className="btn bsm f1" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)",border:"1px solid rgba(255,255,255,.15)",borderRadius:50}}>🗑️ Clear</button>
        <button className="btn bsm f1 bp" onClick={()=>go("voice_resp")}>✓ Save</button>
      </div>
    </div>
  );
};

const AACCat=({go})=>{
  const fs=[{l:"Happy",i:"😊"},{l:"Sad",i:"😢"},{l:"Angry",i:"😠"},{l:"Scared",i:"😨"},{l:"Tired",i:"😴"},{l:"Excited",i:"🤩"},{l:"Sick",i:"🤒"},{l:"Calm",i:"😌"},{l:"Bored",i:"😑"},{l:"Loved",i:"🥰"},{l:"Confused",i:"😕"},{l:"Proud",i:"🦁"}];
  return(
    <div style={{background:"#1a1d2e",minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar dark/>
      <div style={{padding:"8px 14px",background:"rgba(255,255,255,.05)",display:"flex",gap:8,alignItems:"center",minHeight:50}}>
        <button style={{background:"none",border:"none",color:"rgba(255,255,255,.55)",fontSize:20,cursor:"pointer"}} onClick={()=>go("aac_main")}>←</button>
        <div style={{flex:1,background:"rgba(79,142,247,.2)",borderRadius:8,padding:"5px 10px"}}><span style={{color:T.aacG,fontWeight:800,fontSize:12}}>FEEL ❤️</span></div>
        <button style={{background:T.primary,border:"none",color:"#fff",borderRadius:8,padding:"7px 12px",fontWeight:800,fontSize:12,cursor:"pointer"}}>▶ SPEAK</button>
      </div>
      <div style={{flex:1,padding:"8px 10px 10px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,overflow:"auto"}}>
        {fs.map(f=>(
          <div key={f.l} className="aaccard" style={{background:T.aacG}}>
            <span style={{fontSize:26}}>{f.i}</span>
            <span className="aacwd" style={{color:"#fff"}}>{f.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* GUIDED QUESTIONS — CLINICAL */
const GuidedQ=({go})=>{
  const [step,setStep]=useState(0);
  const [ans,setAns]=useState({});
  const qs=[
    {id:"mood",txt:"How are you feeling emotionally right now?",type:"emoji",opts:["😊","😐","😢","😠","😨","🤒","😴","🤩"],clin:"PHQ-9 Q1 proxy"},
    {id:"appetite",txt:"How was your appetite today?",type:"multi",opts:["✅ Ate normally","🍽️ Less than usual","🚫 Skipped meals","🍔 More than usual"],clin:"PHQ-9 Q5"},
    {id:"energy",txt:"Your energy level today?",type:"multi",opts:["⚡ Full energy","😊 Good","😐 OK","😩 Tired","🪫 Exhausted"],clin:"PHQ-9 Q4"},
    {id:"sleep",txt:"How did you sleep last night?",type:"multi",opts:["😴 Well (7–9 hrs)","😕 Fell asleep late","😫 Woke up often","🌙 Too much","❌ Couldn't sleep"],clin:"PHQ-9 Q3 / GAD-7"},
    {id:"worry",txt:"How anxious or worried have you felt today?",type:"multi",opts:["✅ Not really","😟 A little","😰 Quite a lot","🆘 Overwhelmed"],clin:"GAD-7 Q1"},
    {id:"meds",txt:"Did you take your medications today?",type:"multi",opts:["✅ Yes, all taken","❌ No, forgot","⏱️ Not yet","💊 No medications"],clin:"Adherence"},
    {id:"pain",txt:"Any physical pain or discomfort?",type:"multi",opts:["✅ None (0)","😐 Mild (1–3)","😕 Moderate (4–6)","😣 Severe (7–9)","🆘 Worst (10)"],clin:"Somatic symptoms"},
    {id:"function",txt:"Could you do your usual daily activities?",type:"multi",opts:["✅ Yes, fully","🔶 Partially","❌ Struggled","🛋️ Stayed in bed"],clin:"Functional capacity"},
    {id:"note",txt:"Anything else for your clinical record today?",type:"text",clin:"Open clinical note"},
  ];
  const q=qs[step];
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/>
      <div style={{padding:"10px 20px",background:T.surf,borderBottom:`1px solid ${T.n100}`}}>
        <div className="rwb mb8">
          <button className="btn bg bsm" style={{paddingLeft:0,color:T.clin}} onClick={()=>step>0?setStep(s=>s-1):go("voice_idle")}>← Back</button>
          <span style={{fontSize:12,color:T.n500}}>{step+1} / {qs.length}</span>
        </div>
        <div className="pbar"><div className="pfil" style={{width:`${((step+1)/qs.length)*100}%`,background:T.clin}}/></div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px 32px",gap:14}}>
        <div>
          <span style={{fontSize:10,fontFamily:"var(--fm)",color:T.clin,fontWeight:700,background:T.clinSoft,padding:"2px 8px",borderRadius:6}}>{q.clin}</span>
          <h3 style={{fontFamily:"var(--fb)",fontSize:19,fontWeight:800,color:T.n900,marginTop:10,lineHeight:1.4}}>{q.txt}</h3>
        </div>
        <div className="col gap10" style={{flex:1}}>
          {q.type==="emoji"&&<div style={{display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center"}}>
            {q.opts.map(e=><span key={e} className={`emomd${ans[step]===e?" sel":""}`} onClick={()=>setAns(a=>({...a,[step]:e}))}>{e}</span>)}
          </div>}
          {(q.type==="multi")&&q.opts.map((opt,i)=>(
            <button key={opt} className="btn bw" style={{justifyContent:"flex-start",padding:"13px 16px",background:ans[step]===i?T.clin:T.surf,color:ans[step]===i?"#fff":T.n900,border:`2px solid ${ans[step]===i?T.clin:T.n300}`,borderRadius:14,fontWeight:700,fontSize:14,transition:"all .15s"}} onClick={()=>setAns(a=>({...a,[step]:i}))}>
              <span style={{width:26,height:26,borderRadius:"50%",background:ans[step]===i?"rgba(255,255,255,.25)":T.n100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,marginRight:6}}>{i}</span>{opt}
            </button>
          ))}
          {q.type==="text"&&<textarea className="inp" style={{height:110,resize:"none"}} placeholder="Type freely — this goes into your clinical record"/>}
        </div>
        <button className="btn bw blg" style={{background:T.clin,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px",opacity:q.type!=="text"&&ans[step]===undefined?.4:1}}
          onClick={()=>step<qs.length-1?setStep(s=>s+1):go("voice_resp")}>
          {step<qs.length-1?"Next →":"✓ Save Clinical Entry"}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ACTIVITIES
───────────────────────────────────────────── */
const ActHub=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{padding:"18px 20px 8px"}}>
      <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>Activities 🧘</h2>
      <p style={{fontSize:13,color:T.n500,marginTop:4}}>Choose what your mind needs right now</p>
    </div>
    <div style={{padding:"8px 20px 10px"}}><div className="ab wi"><span>⚠️</span><span style={{fontSize:12}}>In crisis? Tap <strong>Emergency Protocol</strong> below.</span></div></div>
    <div style={{padding:"0 20px 24px",overflow:"auto"}}>
      <div className="col gap10">
        {[
          {id:"breath_i",ico:"💨",lbl:"4-7-8 Breathing",desc:"Calm your nervous system",col:T.primary,tag:"Calming"},
          {id:"box_breath",ico:"⬜",lbl:"Box Breathing",desc:"Focus and reset — Navy SEAL technique",col:T.success,tag:"Focus"},
          {id:"grounding",ico:"🌱",lbl:"5-4-3-2-1 Grounding",desc:"Anchor to the present moment",col:T.accent,tag:"Anxiety"},
          {id:"body_scan",ico:"🧘",lbl:"Body Scan",desc:"Progressive full-body relaxation",col:T.taker,tag:"Relax"},
          {id:"emergency",ico:"🆘",lbl:"Emergency Protocol",desc:"Crisis support and guided escalation",col:T.danger,tag:"Crisis"},
          {id:"calm_mode",ico:"🌊",lbl:"Calm Mode",desc:"Ambient gentle activities",col:"#00BCD4",tag:"Chill"},
          {id:"act_hist",ico:"📋",lbl:"Activity History",desc:"Past sessions and mood changes",col:T.n500,tag:"Log"},
        ].map(a=>(
          <div key={a.id} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${a.col}`}} onClick={()=>go(a.id)}>
            <div className="row">
              <div style={{width:48,height:48,borderRadius:13,background:a.col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{a.ico}</div>
              <div style={{flex:1}}>
                <div className="rwb">
                  <span style={{fontWeight:800,color:T.n900,fontSize:14}}>{a.lbl}</span>
                  <span style={{fontSize:10,fontWeight:800,color:a.col,background:a.col+"18",padding:"2px 7px",borderRadius:100}}>{a.tag}</span>
                </div>
                <p style={{fontSize:12,color:T.n500,marginTop:2}}>{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BreathI=({go})=>(
  <div style={{background:"linear-gradient(160deg,#eef4ff,#f4f5fa)",minHeight:"100%",display:"flex",flexDirection:"column"}}>
    <SBar/><PHeader title="4-7-8 Breathing" onBack={()=>go("activities")}/>
    <div style={{flex:1,padding:"20px 24px 40px",display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
      <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}>💨</div>
      <div style={{textAlign:"center"}}><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>The 4-7-8 Technique</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>Activates the parasympathetic nervous system, reducing cortisol and anxiety markers. Clinically associated with HRV improvement.</p></div>
      <div style={{width:"100%"}}>
        {[{s:"Inhale",d:"4 sec",i:"👃",col:T.primary,desc:"Through your nose, quietly"},
          {s:"Hold",d:"7 sec",i:"⏸️",col:T.accent,desc:"Keep all breath inside"},
          {s:"Exhale",d:"8 sec",i:"💨",col:T.success,desc:"Through mouth, with a whoosh"}].map((p,i)=>(
          <div key={p.s} className="card mb8" style={{marginBottom:10,borderLeft:`4px solid ${p.col}`}}>
            <div className="row">
              <div style={{width:40,height:40,borderRadius:12,background:p.col+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.i}</div>
              <div style={{flex:1}}>
                <div className="rwb"><span style={{fontWeight:800,color:T.n900}}>{p.s}</span><span style={{fontSize:13,fontWeight:800,color:p.col}}>{p.d}</span></div>
                <p style={{fontSize:12,color:T.n500,marginTop:1}}>{p.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ab in" style={{width:"100%"}}><span>💡</span><span style={{fontSize:12}}>3–4 cycles per session. Studies link regular practice to GAD symptom reduction.</span></div>
      <button className="btn bp bw blg" onClick={()=>go("breath_a")}>Begin Session 🌬️</button>
    </div>
  </div>
);

const BreathA=({go})=>{
  const [phase,setPhase]=useState("inhale");
  const phases={inhale:{l:"Inhale",c:T.primary,d:"4 sec",i:"👃"},hold:{l:"Hold",c:T.accent,d:"7 sec",i:"⏸️"},exhale:{l:"Exhale",c:T.success,d:"8 sec",i:"💨"}};
  const p=phases[phase];
  return(
    <div style={{background:"#0d0f1a",minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar dark/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:22,padding:"0 28px"}}>
        <div style={{display:"flex",gap:8}}>
          {Object.entries(phases).map(([k,v])=>(
            <button key={k} style={{padding:"5px 13px",borderRadius:100,border:`2px solid ${phase===k?v.c:"rgba(255,255,255,.12)"}`,background:phase===k?v.c+"33":"transparent",color:phase===k?v.c:"rgba(255,255,255,.3)",fontWeight:800,fontSize:11,cursor:"pointer"}} onClick={()=>setPhase(k)}>{v.l}</button>
          ))}
        </div>
        <div style={{width:170,height:170,borderRadius:"50%",background:`radial-gradient(circle,${p.c}44,${p.c}11)`,border:`3px solid ${p.c}88`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,animation:phase==="inhale"?"breatheIn 4s ease-in-out infinite":phase==="exhale"?"breatheOut 8s ease-in-out infinite":"pulse 1s ease-in-out infinite",boxShadow:`0 0 60px ${p.c}44`}}>
          <span style={{fontSize:34}}>{p.i}</span>
          <span style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:p.c}}>{p.l}</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{p.d}</span>
        </div>
        <p style={{color:"rgba(255,255,255,.4)",fontSize:13}}>Cycle 1 of 4</p>
        <div style={{display:"flex",gap:10,width:"100%"}}>
          <button className="btn bg f1" style={{color:"rgba(255,255,255,.35)"}} onClick={()=>go("activities")}>End Session</button>
          <button className="btn bp f1" onClick={()=>go("breath_done")}>Complete ✓</button>
        </div>
      </div>
    </div>
  );
};

const BreathDone=({go})=>(
  <div style={{background:T.successSoft,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
    <SBar/>
    <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}>🌟</div>
    <div><h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:800,color:T.n900}}>Well done! 🎉</h2><p style={{color:T.n700,marginTop:8,lineHeight:1.7}}>4 breathing cycles complete. Your parasympathetic nervous system is active.</p></div>
    <div style={{background:T.surf,borderRadius:18,padding:18,width:"100%"}}>
      <p style={{fontSize:13,fontWeight:700,color:T.n900,marginBottom:10}}>How do you feel now?</p>
      <div style={{display:"flex",justifyContent:"center",gap:14}}>{["😊","😌","😐","😢"].map(e=><span key={e} className="emomd">{e}</span>)}</div>
    </div>
    <div style={{display:"flex",gap:10,width:"100%"}}>
      <button className="btn bs f1" onClick={()=>go("breath_a")}>🔄 Again</button>
      <button className="btn bk f1" onClick={()=>go("activities")}>✓ Done</button>
    </div>
    <button className="btn bg bw" style={{color:T.n500}} onClick={()=>go("home_user")}>Save & Go Home</button>
  </div>
);

const BoxBreath=({go})=>(
  <div style={{background:"#0d0f1a",minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
    <SBar dark/>
    <div style={{textAlign:"center",color:"#fff"}}><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:700}}>Box Breathing ⬜</h2><p style={{color:"rgba(255,255,255,.4)",marginTop:6}}>4 seconds per side · Navy SEAL technique</p></div>
    <div style={{width:180,height:180,border:`4px solid ${T.success}`,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:`0 0 40px ${T.success}44`}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:32}}>💨</div><div style={{fontFamily:"var(--fb)",color:T.success,fontWeight:800,fontSize:16,marginTop:4}}>Inhale</div><div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>4 sec</div></div>
    </div>
    <div style={{display:"flex",gap:10}}><button className="btn bk" onClick={()=>go("breath_done")}>Start</button><button className="btn bg" style={{color:"rgba(255,255,255,.4)"}} onClick={()=>go("activities")}>Back</button></div>
  </div>
);

const Grounding=({go})=>{
  const [step,setStep]=useState(0);
  const steps=[
    {n:5,s:"SEE",i:"👀",col:T.primary,desc:"Name 5 things you can see right now",ex:"e.g. chair, window, book, phone, lamp"},
    {n:4,s:"TOUCH",i:"✋",col:T.success,desc:"Name 4 things you can physically feel",ex:"e.g. shirt fabric, floor, chair, air"},
    {n:3,s:"HEAR",i:"👂",col:T.accent,desc:"Name 3 things you can hear",ex:"e.g. birds, wind, refrigerator"},
    {n:2,s:"SMELL",i:"👃",col:T.taker,desc:"Name 2 things you can smell",ex:"e.g. coffee, fresh air, soap"},
    {n:1,s:"TASTE",i:"👅",col:T.danger,desc:"Name 1 thing you can taste",ex:"e.g. toothpaste, coffee, mint"},
  ];
  const s=steps[step];
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/><PHeader title="5-4-3-2-1 Grounding" onBack={()=>go("activities")}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 28px",gap:16,textAlign:"center"}}>
        <div style={{width:90,height:90,borderRadius:"50%",background:s.col+"18",border:`4px solid ${s.col}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:900,color:s.col}}>{s.n}</div>
          <div style={{fontSize:9,fontWeight:800,color:s.col}}>{s.s}</div>
        </div>
        <div style={{fontSize:44}}>{s.i}</div>
        <div><h3 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900}}>{s.desc}</h3><p style={{color:T.n500,fontSize:12,marginTop:6}}>{s.ex}</p></div>
        <textarea className="inp bw" style={{height:70,resize:"none"}} placeholder={`I can ${s.s.toLowerCase()}...`}/>
        <div style={{display:"flex",gap:8}}>
          {steps.map((st,i)=><div key={i} style={{width:30,height:30,borderRadius:"50%",background:i<=step?st.col:T.n300,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i<=step?"#fff":T.n500,cursor:"pointer"}} onClick={()=>setStep(i)}>{st.n}</div>)}
        </div>
        <div style={{display:"flex",gap:10,width:"100%"}}>
          {step>0&&<button className="btn bs f1" onClick={()=>setStep(s=>s-1)}>← Back</button>}
          <button className="btn f1" style={{background:s.col,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:15,padding:"14px 20px"}} onClick={()=>step<steps.length-1?setStep(s=>s+1):go("breath_done")}>
            {step<steps.length-1?`Next: ${steps[step+1].n} ${steps[step+1].s}`:"✓ Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Emergency=({go})=>{
  const [step,setStep]=useState(0);
  const screens=[
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:68,marginBottom:14}}>🆘</div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:800,color:"#fff"}}>Are you safe right now?</h2>
      <p style={{color:"rgba(255,255,255,.5)",marginTop:10,lineHeight:1.7}}>We're here with you. Take a breath. You're not alone.</p>
      <div className="col gap10 mt24">
        <button className="btn bk bw blg" onClick={()=>setStep(1)}>✅ Yes, I'm physically safe</button>
        <button className="btn bd bw blg" onClick={()=>setStep(2)}>🚨 No, I need emergency help</button>
        <button className="btn bw blg" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",border:"1px solid rgba(255,255,255,.15)",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}} onClick={()=>setStep(3)}>😰 Panic attack</button>
      </div>
    </div>,
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:58,marginBottom:12}}>💚</div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:"#fff"}}>Good. Let's breathe together.</h2>
      <p style={{color:"rgba(255,255,255,.5)",marginTop:8,lineHeight:1.6}}>Your Taker has been notified. You're being looked after.</p>
      <div className="col gap10 mt24">
        <button className="btn bk bw blg" onClick={()=>go("breath_a")}>Start 4-7-8 Breathing 💨</button>
        <button className="btn bg bw mt8" style={{color:"rgba(255,255,255,.4)"}} onClick={()=>go("grounding")}>Try Grounding Instead</button>
      </div>
    </div>,
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:58,marginBottom:8}}>🚨</div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:"#fff"}}>Call Emergency Services Now</h2>
      <div className="col gap10 mt20">
        <button className="btn bd bw blg" style={{fontSize:20}}>📞 Call 911 / 112</button>
        <div className="ab da" style={{textAlign:"left"}}><div><div style={{fontWeight:800,color:T.n900,fontSize:13}}>While waiting for help:</div><div style={{fontSize:12,color:T.n700,marginTop:3,lineHeight:1.6}}>1. Lie down in a safe position<br/>2. Loosen tight clothing<br/>3. Stay on the phone with dispatch<br/>4. Breathe with me below ↓</div></div></div>
        <button className="btn bk bw" onClick={()=>go("breath_a")}>Start Breathing Exercise →</button>
      </div>
    </div>,
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:58,marginBottom:8}}>😰</div>
      <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:"#fff"}}>Panic Attack Protocol</h2>
      <p style={{color:"rgba(255,255,255,.5)",marginTop:8,lineHeight:1.6}}>You are NOT in danger. This will pass. Follow me.</p>
      <div className="col gap8 mt20">
        {["Sit or lie somewhere safe 🛋️","Feel both feet flat on the floor 👣","Press your hands into your thighs ✋","Breathe in through your nose... 👃","Now slowly out through your mouth 💨"].map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.06)",borderRadius:12,padding:"10px 14px",textAlign:"left",display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:T.primary+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:T.primary,flexShrink:0}}>{i+1}</div>
            <span style={{color:"rgba(255,255,255,.75)",fontSize:13}}>{s}</span>
          </div>
        ))}
      </div>
      <button className="btn bp bw blg mt16" onClick={()=>go("breath_a")}>Start Guided Breathing →</button>
      <div style={{marginTop:14,padding:"10px 14px",background:"rgba(224,92,92,.12)",borderRadius:12}}><p style={{color:"rgba(255,255,255,.45)",fontSize:11}}>🌍 Crisis line: 988 (US) · 116 123 (UK) · 10111 (ZA)</p></div>
    </div>,
  ];
  const bgs=["#1a1d2e","#0d1a1a","#1a0d0d","#0d0f1a"];
  return(
    <div style={{background:bgs[step],minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar dark/>
      <div style={{padding:"6px 18px"}}><button style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",fontSize:13}} onClick={()=>step>0?setStep(0):go("activities")}>{step>0?"← Start over":"← Activities"}</button></div>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px 40px"}}>{screens[step]}</div>
    </div>
  );
};

const CalmMode=({go})=>(
  <div style={{background:"linear-gradient(160deg,#0d1a2e,#0d2a1e)",minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"0 28px"}}>
    <SBar dark/>
    <div style={{textAlign:"center",color:"#fff"}}><h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800}}>🌊 Calm Mode</h2><p style={{color:"rgba(255,255,255,.45)",marginTop:8,lineHeight:1.7}}>Take your time. There's no rush. Just be here.</p></div>
    <div style={{width:150,height:150,borderRadius:"50%",background:"radial-gradient(circle,rgba(62,201,142,.28),rgba(62,201,142,.04))",border:"2px solid rgba(62,201,142,.35)",display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 4s ease-in-out infinite",boxShadow:"0 0 70px rgba(62,201,142,.18)"}}>
      <span style={{fontSize:56}}>🌿</span>
    </div>
    <div className="col gap10" style={{width:"100%"}}>
      {["🌊 Ocean sounds (8 min)","🌧️ Rain ambient (15 min)","🔥 Fireplace (20 min)","🎵 Calming music","📖 Read something gentle"].map(opt=>(
        <button key={opt} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",borderRadius:14,padding:"13px 18px",fontSize:13,fontWeight:700,cursor:"pointer",textAlign:"left"}}>{opt}</button>
      ))}
    </div>
    <button className="btn bg" style={{color:"rgba(255,255,255,.3)"}} onClick={()=>go("activities")}>← Back</button>
  </div>
);

const ActHist=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Activity History" onBack={()=>go("activities")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb16"><MiniBar data={[60,80,40,90,70,85,55]} labels={["M","T","W","T","F","S","S"]}/><p style={{fontSize:11,color:T.n500,marginTop:8,textAlign:"center"}}>5 of 7 days active this week 🔥</p></div>
      <div className="col gap10">
        {[{ico:"💨",lbl:"4-7-8 Breathing",date:"Today, 8:30 AM",mood:"😊 → 😌",dur:"6 min",col:T.primary},
          {ico:"🌱",lbl:"5-4-3-2-1 Grounding",date:"Yesterday, 3:15 PM",mood:"😰 → 😊",dur:"8 min",col:T.accent},
          {ico:"💨",lbl:"4-7-8 Breathing",date:"Mon, 9:00 AM",mood:"😐 → 😌",dur:"5 min",col:T.primary},
          {ico:"⬜",lbl:"Box Breathing",date:"Sun, 10:30 AM",mood:"😠 → 😐",dur:"4 min",col:T.success}].map((a,i)=>(
          <div key={i} className="card" style={{borderLeft:`3px solid ${a.col}`}}>
            <div className="rwb"><div className="row" style={{gap:10}}><span style={{fontSize:22}}>{a.ico}</span>
              <div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>{a.lbl}</div><div style={{fontSize:11,color:T.n500,marginTop:1}}>{a.date} · {a.dur}</div></div>
            </div><span style={{fontSize:13}}>{a.mood}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   USER HOME — CLINICAL
───────────────────────────────────────────── */
const HomeUser=({go})=>{
  const hr=new Date().getHours();
  const greet=hr<12?"Good morning":hr<18?"Good afternoon":"Good evening";
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/>
      <div style={{background:"linear-gradient(135deg,#4F8EF7,#2D6FD9)",padding:"18px 20px 34px"}}>
        <div className="rwb">
          <div><p style={{color:"rgba(255,255,255,.7)",fontSize:13}}>{greet} 👋</p><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:"#fff",marginTop:2}}>Maria</h2></div>
          <div className="row" style={{gap:8}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,cursor:"pointer"}} onClick={()=>go("med_hub")}>🏥</div>
            <div style={{position:"relative"}}>
              <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,cursor:"pointer"}}>🔔</div>
              <div className="ndot"/>
            </div>
          </div>
        </div>
        <div style={{marginTop:14,background:"rgba(255,255,255,.13)",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>🔥</span>
          <div><div style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:"#fff"}}>7 days</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>Check-in streak</div></div>
          <button className="btn bsm" style={{background:"rgba(255,255,255,.18)",color:"#fff",marginLeft:"auto",border:"none",borderRadius:50,fontWeight:800}} onClick={()=>go("guided_q")}>Log Today</button>
        </div>
      </div>
      <div style={{flex:1,padding:"14px 20px 24px",marginTop:-14,overflow:"auto"}}>
        {/* Med reminder */}
        <div className="ab wi mb12" style={{cursor:"pointer"}} onClick={()=>go("med_adherence")}>
          <span style={{fontSize:20}}>💊</span>
          <div style={{flex:1}}><div style={{fontWeight:800,color:T.n900,fontSize:13}}>Medication reminder</div><div style={{fontSize:12,color:T.n700}}>Sertraline 50mg — not yet taken today</div></div>
          <button className="btn bsm bk">Mark taken</button>
        </div>
        {/* Today's entry */}
        <div className="card mb12">
          <p style={{fontSize:11,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Today's Clinical Entry</p>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {[{i:"😊",l:"Mood",v:"Happy"},{i:"🍽️",l:"Appetite",v:"Normal"},{i:"⚡",l:"Energy",v:"Good"},{i:"😴",l:"Sleep",v:"7 hrs"},{i:"😟",l:"Anxiety",v:"Low"},{i:"💊",l:"Meds",v:"⚠️ Pending"}].map(s=>(
              <div key={s.l} style={{background:T.n100,borderRadius:11,padding:"8px 9px",minWidth:58,flex:"0 0 calc(33% - 5px)"}}>
                <div style={{fontSize:17}}>{s.i}</div>
                <div style={{fontSize:9,color:T.n500,fontWeight:700,marginTop:2}}>{s.l}</div>
                <div style={{fontSize:12,fontWeight:800,color:T.n900,marginTop:1}}>{s.v}</div>
              </div>
            ))}
          </div>
          <button className="btn bp bw mt12" onClick={()=>go("guided_q")}>⚕️ Complete Clinical Check-in</button>
        </div>
        {/* Active conditions */}
        <div className="card mb12" style={{cursor:"pointer"}} onClick={()=>go("diagnoses")}>
          <div className="rwb mb10"><p style={{fontWeight:800,color:T.n900,fontSize:14}}>🩺 Active Conditions</p><span style={{fontSize:12,color:T.primary}}>View all →</span></div>
          {[{icd:"F41.1",n:"GAD",trend:"↓ Improving",col:T.success},{icd:"F32.1",n:"Depression (mild)",trend:"↓ Improving",col:T.success}].map((c,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i===0?`1px solid ${T.n100}`:"none"}}>
              <div className="row" style={{gap:7}}><span className="icd">{c.icd}</span><span style={{fontSize:13,fontWeight:600,color:T.n900}}>{c.n}</span></div>
              <span style={{fontSize:12,fontWeight:800,color:c.col}}>{c.trend}</span>
            </div>
          ))}
        </div>
        {/* Screening due */}
        <div className="card mb12" style={{background:T.phqSoft,border:`1px solid ${T.phq}22`,cursor:"pointer"}} onClick={()=>go("screen_hub")}>
          <div className="rwb">
            <div className="row" style={{gap:10}}><span style={{fontSize:22}}>🧠</span>
              <div><div style={{fontWeight:800,color:T.phq,fontSize:13}}>Monthly Screening Due</div><div style={{fontSize:11,color:T.n500,marginTop:2}}>PHQ-9 + GAD-7 · Due Feb 10</div></div>
            </div>
            <button className="btn bsm" style={{background:T.phq,color:"#fff",border:"none",borderRadius:50,fontWeight:800}}>Start →</button>
          </div>
        </div>
        {/* AI insight */}
        <div className="card" style={{background:"linear-gradient(135deg,#9B6DFF11,#4F8EF711)",border:`1px solid ${T.primary}33`}}>
          <div className="row mb8" style={{gap:8}}><span style={{fontSize:18}}>🧠</span><span style={{fontSize:11,fontWeight:800,color:T.taker,textTransform:"uppercase",letterSpacing:.5}}>AI Observation</span></div>
          <p style={{fontSize:13,color:T.n700,lineHeight:1.6}}>Your GAD-7 improved 44% since October. Sleep patterns still correlate with next-morning anxiety — breathing exercises on those days help significantly.</p>
          <p style={{fontSize:10,color:T.n500,marginTop:7}}>⚕️ Pattern observation only — not a medical opinion.</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MEDICAL HISTORY — MH1 HUB
───────────────────────────────────────────── */
const MedHub=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{background:`linear-gradient(135deg,${T.clin},${T.clinDark})`,padding:"18px 20px 34px"}}>
      <div className="rwb">
        <div><p style={{color:"rgba(255,255,255,.65)",fontSize:12}}>Medical Record</p><h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:"#fff",marginTop:2}}>Maria's Health File</h2></div>
        <button className="btn bsm" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",borderRadius:50,fontWeight:800}} onClick={()=>go("clin_report")}>📄 Export</button>
      </div>
      <div style={{display:"flex",gap:8,marginTop:16}}>
        {[{i:"🏥",l:"Visits",v:"12"},{i:"🩺",l:"Diagnoses",v:"3"},{i:"💊",l:"Meds",v:"2"},{i:"🧪",l:"Labs",v:"8"}].map(s=>(
          <div key={s.l} style={{flex:1,background:"rgba(255,255,255,.12)",borderRadius:11,padding:"9px 6px",textAlign:"center"}}>
            <div style={{fontSize:18}}>{s.i}</div>
            <div style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:900,color:"#fff",marginTop:2}}>{s.v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.55)",fontWeight:700}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{flex:1,padding:"14px 20px 24px",marginTop:-14,overflow:"auto"}}>
      <Disc short/>
      <div className="col gap10 mt16">
        {[{ico:"🏥",lbl:"Hospital & Clinical Visits",sub:"ER, consultations, admissions",nav:"visits",col:T.clin,ct:"12 visits"},
          {ico:"🩺",lbl:"Active Diagnoses",sub:"Current & historical conditions with ICD-10",nav:"diagnoses",col:T.primary,ct:"3 active"},
          {ico:"💊",lbl:"Medications & Adherence",sub:"Prescriptions and daily tracking",nav:"medications",col:T.med,ct:"2 active"},
          {ico:"🧪",lbl:"Labs & Exams",sub:"Blood work, imaging, psychological tests",nav:"labs",col:T.lab,ct:"8 results"},
          {ico:"🧠",lbl:"Clinical Screening",sub:"PHQ-9, GAD-7, MMSE and more",nav:"screen_hub",col:T.phq,ct:"Due Feb 10"},
          {ico:"⚠️",lbl:"Allergies & Surgeries",sub:"Background medical info",nav:"allergies",col:T.danger,ct:"1 allergy"},
          {ico:"👨‍👩‍👧",lbl:"Family History",sub:"Hereditary risk factors",nav:"fam_hist",col:T.taker,ct:"Logged"},
        ].map(it=>(
          <div key={it.lbl} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${it.col}`}} onClick={()=>go(it.nav)}>
            <div className="rwb">
              <div className="row" style={{gap:11}}>
                <div style={{width:44,height:44,borderRadius:12,background:it.col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{it.ico}</div>
                <div><div style={{fontWeight:800,color:T.n900,fontSize:14}}>{it.lbl}</div><div style={{fontSize:11,color:T.n500,marginTop:2}}>{it.sub}</div></div>
              </div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,fontWeight:700,color:it.col}}>{it.ct}</div><div style={{fontSize:15,color:T.n300,marginTop:2}}>›</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MH2 HOSPITAL VISITS
───────────────────────────────────────────── */
const Visits=({go})=>{
  const vs=[
    {d:"Dec 12, 2023",f:"City General Hospital",dep:"Emergency",r:"Acute anxiety episode",out:"Discharged — follow-up recommended",sev:"moderate",icd:"F41.0"},
    {d:"Oct 3, 2023",f:"Clínica San Rafael",dep:"Psychiatry",r:"Initial psychiatric evaluation",out:"Dx: GAD + mild depression — meds started",sev:"routine",icd:"F41.1"},
    {d:"Jul 18, 2023",f:"City General Hospital",dep:"Pediatrics",r:"School refusal + somatic complaints",out:"Referred to child psychiatry",sev:"moderate",icd:"F93.0"},
    {d:"Mar 5, 2023",f:"Family Health Center",dep:"GP",r:"Annual checkup",out:"All clear — growth normal",sev:"routine",icd:"Z00.0"},
  ];
  const sc={routine:T.success,moderate:T.accent,severe:T.danger};
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="Clinical Visits" onBack={()=>go("med_hub")} right={<button className="btn bsm bp" onClick={()=>go("add_visit")}>+ Add</button>}/>
      <div style={{padding:"14px 20px 32px"}}>
        <div className="tabbar mb16">{["All","Emergency","Psychiatry","GP"].map((t,i)=><div key={t} className={`tabi${i===0?" on":""}`}>{t}</div>)}</div>
        <div className="col gap10">
          {vs.map((v,i)=>(
            <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${sc[v.sev]}`}}>
              <div className="rwb mb8">
                <span style={{fontSize:11,color:T.n500,fontWeight:700}}>{v.d}</span>
                <div className="row" style={{gap:6}}>
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:T.icd,background:T.icd+"11",padding:"2px 6px",borderRadius:6}}>{v.icd}</span>
                  <span style={{fontSize:10,fontWeight:800,color:sc[v.sev],background:sc[v.sev]+"18",padding:"2px 7px",borderRadius:100}}>{v.sev}</span>
                </div>
              </div>
              <div style={{fontWeight:800,color:T.n900,fontSize:14}}>{v.f}</div>
              <div style={{fontSize:11,color:T.primary,fontWeight:700,marginTop:2}}>{v.dep}</div>
              <div style={{fontSize:12,color:T.n700,marginTop:5}}><strong>Reason:</strong> {v.r}</div>
              <div style={{fontSize:11,color:T.n500,marginTop:3}}><strong>Outcome:</strong> {v.out}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddVisit=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Log Clinical Visit" onBack={()=>go("visits")}/>
    <div style={{padding:"14px 20px 40px"}}>
      <Disc short/>
      <div className="card mt16 col gap14">
        <div><label className="inpl">Date of Visit</label><input className="inp mt8" type="date" style={{marginTop:8}}/></div>
        <div><label className="inpl">Healthcare Facility</label><input className="inp mt8" placeholder="e.g. City General Hospital" style={{marginTop:8}}/></div>
        <div><label className="inpl">Department / Specialty</label>
          <select className="inp mt8" style={{marginTop:8}}>{["Emergency (ER)","General Practitioner (GP)","Psychiatry","Psychology","Pediatrics","Neurology","Cardiology","Other"].map(o=><option key={o}>{o}</option>)}</select></div>
        <div><label className="inpl">Reason for Visit</label><textarea className="inp mt8" style={{marginTop:8,height:68,resize:"none"}} placeholder="Describe symptoms or reason..."/></div>
        <div><label className="inpl">Outcome / Doctor's Notes</label><textarea className="inp mt8" style={{marginTop:8,height:68,resize:"none"}} placeholder="Result, referral, or recommendation"/></div>
        <div><label className="inpl">ICD-10 Code (Taker / clinician)</label><input className="inp mt8" placeholder="e.g. F41.1" style={{marginTop:8,fontFamily:"var(--fm)"}}/></div>
        <div><label className="inpl">Severity</label>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>{["Routine","Moderate","Severe","Critical"].map(s=><button key={s} className="btn bs bsm">{s}</button>)}</div></div>
      </div>
      <button className="btn bp bw blg mt20" onClick={()=>go("visits")}>✓ Save Visit Record</button>
    </div>
  </div>
);

/* MH3 DIAGNOSES */
const Diagnoses=({go})=>{
  const dx=[
    {code:"F41.1",name:"Generalised Anxiety Disorder",status:"active",since:"Oct 2023",sev:"Moderate",meds:["Sertraline 50mg"],track:true},
    {code:"F32.1",name:"Major Depressive Episode, moderate",status:"monitoring",since:"Oct 2023",sev:"Mild-moderate",meds:["Sertraline 50mg"],track:true},
    {code:"F93.0",name:"Separation Anxiety Disorder of childhood",status:"resolved",since:"Mar 2022",sev:"Resolved",meds:[],track:false},
  ];
  const sc={active:T.danger,monitoring:T.accent,resolved:T.success};
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="Diagnoses 🩺" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
      <div style={{padding:"14px 20px 32px"}}>
        <Disc short/>
        <div className="col gap10 mt14">
          {dx.map((d,i)=>(
            <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${sc[d.status]}`}} onClick={()=>go("dx_detail")}>
              <div className="rwb mb8"><ICD code={d.code}/><span style={{fontSize:10,fontWeight:800,color:sc[d.status],background:sc[d.status]+"18",padding:"3px 9px",borderRadius:100,textTransform:"uppercase"}}>{d.status}</span></div>
              <div style={{fontWeight:800,color:T.n900,fontSize:14,marginBottom:3}}>{d.name}</div>
              <div style={{fontSize:11,color:T.n500}}>Since {d.since} · {d.sev}</div>
              {d.meds.length>0&&<div style={{display:"flex",gap:6,marginTop:7,flexWrap:"wrap"}}>{d.meds.map(m=><span key={m} style={{fontSize:11,background:T.medSoft,color:T.med,padding:"3px 7px",borderRadius:7,fontWeight:700}}>💊 {m}</span>)}</div>}
              {d.track&&<div style={{fontSize:11,color:T.primary,marginTop:7,fontWeight:700}}>🔍 AI traceability active</div>}
            </div>
          ))}
        </div>
        <div className="card mt14" style={{background:T.clinSoft}}>
          <div style={{fontSize:13,fontWeight:700,color:T.clinDark,marginBottom:5}}>🔍 What is AI Traceability?</div>
          <p style={{fontSize:12,color:T.clinDark,lineHeight:1.6}}>When active, the AI monitors daily entries for symptom patterns linked to each diagnosis — tracking improvement, stability, or worsening, and flagging unusual changes for review.</p>
        </div>
      </div>
    </div>
  );
};

const DxDetail=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Diagnosis Detail" onBack={()=>go("diagnoses")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb14" style={{borderLeft:`4px solid ${T.danger}`}}>
        <div className="rwb mb8"><ICD code="F41.1" label="GAD"/><span className="chip cer">Active</span></div>
        <h2 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900}}>Generalised Anxiety Disorder</h2>
        <p style={{fontSize:12,color:T.n500,marginTop:3}}>Diagnosed Oct 3, 2023 · Dr. A. Martínez · Clínica San Rafael</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
          {["Excessive worry","Restlessness","Fatigue","Difficulty concentrating","Sleep disturbance"].map(s=><span key={s} style={{fontSize:11,background:T.dangerSoft,color:T.danger,padding:"3px 7px",borderRadius:7,fontWeight:700}}>{s}</span>)}
        </div>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>📈 AI Traceability — 30 Days</p>
        <MiniBar data={[70,65,55,60,72,68,58,62,74,70,65,60,55,68]} color={T.danger}/>
        <div className="ab wi mt10"><span>📊</span><div style={{fontSize:12}}><strong>Trend:</strong> Anxiety symptom mentions down 18% vs prior month. Sleep disturbance stable.</div></div>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>📋 Screening Scores Over Time</p>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {[{d:"Oct '23",gad:16,phq:16},{d:"Nov '23",gad:13,phq:13},{d:"Dec '23",gad:11,phq:11},{d:"Jan '24",gad:9,phq:9}].map(s=>(
            <div key={s.d} style={{minWidth:76,textAlign:"center",background:T.n100,borderRadius:11,padding:"9px 7px",flexShrink:0}}>
              <div style={{fontSize:9,color:T.n500,fontWeight:700,marginBottom:5}}>{s.d}</div>
              <div style={{fontSize:15,fontWeight:900,color:s.gad>14?T.danger:s.gad>9?T.accent:T.success}}>{s.gad}</div>
              <div style={{fontSize:9,color:T.n500}}>GAD-7</div>
              <div style={{fontSize:15,fontWeight:900,color:s.phq>14?T.danger:s.phq>9?T.accent:T.success,marginTop:3}}>{s.phq}</div>
              <div style={{fontSize:9,color:T.n500}}>PHQ-9</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn bs f1" onClick={()=>go("phq9")}>Run PHQ-9 Now</button>
        <button className="btn bp f1" onClick={()=>go("clin_report")}>Export Report</button>
      </div>
    </div>
  </div>
);

/* MH4 MEDICATIONS */
const Medications=({go})=>{
  const ms=[
    {n:"Sertraline (Zoloft)",d:"50mg",f:"Once daily — morning",pr:"Dr. A. Martínez",since:"Oct 2023",adh:87,for:"GAD + Depression",active:true},
    {n:"Melatonin",d:"3mg",f:"As needed — bedtime",pr:"Self-managed (GP aware)",since:"Jan 2024",adh:62,for:"Sleep disturbance",active:true},
    {n:"Fluoxetine",d:"20mg",f:"Once daily",pr:"Dr. López",since:"Jan–Sep 2022",adh:91,for:"Prior MDE",active:false},
  ];
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="Medications 💊" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
      <div style={{padding:"14px 20px 32px"}}>
        <div className="ab in mb14"><span>💊</span><span style={{fontSize:12}}>Today: <strong>Sertraline</strong> not yet logged. <strong>Tap to mark taken.</strong></span></div>
        <div className="col gap10">
          {ms.map((m,i)=>(
            <div key={i} className="card" style={{opacity:m.active?1:.6,borderLeft:`4px solid ${m.active?T.med:T.n300}`}}>
              <div className="rwb mb6">
                <div style={{fontWeight:800,color:T.n900,fontSize:14}}>{m.n}</div>
                <span style={{fontSize:10,fontWeight:800,color:m.active?T.med:T.n500,background:m.active?T.medSoft:T.n100,padding:"3px 7px",borderRadius:100}}>{m.active?"Active":"Discontinued"}</span>
              </div>
              <div style={{fontSize:12,color:T.n700}}>💊 {m.d} · {m.f}</div>
              <div style={{fontSize:11,color:T.n500,marginTop:2}}>For: {m.for} · Since {m.since}</div>
              <div style={{fontSize:11,color:T.n500,marginTop:2}}>Rx: {m.pr}</div>
              {m.active&&<div style={{marginTop:10}}>
                <div className="rwb mb6"><span style={{fontSize:10,fontWeight:700,color:T.n500}}>30-day adherence</span><span style={{fontSize:11,fontWeight:800,color:m.adh>80?T.med:m.adh>60?T.accent:T.danger}}>{m.adh}%</span></div>
                <div className="pbar"><div className="pfil" style={{width:`${m.adh}%`,background:m.adh>80?T.med:m.adh>60?T.accent:T.danger}}/></div>
                <button className="btn bsm mt8 bw" style={{background:T.medSoft,color:T.med,border:`1px solid ${T.med}44`,borderRadius:50,fontWeight:800}} onClick={()=>go("med_adherence")}>✓ Mark Taken Today</button>
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MedAdherence=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Adherence Log" onBack={()=>go("medications")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb14 tc"><div style={{fontFamily:"var(--fb)",fontSize:46,fontWeight:900,color:T.med}}>87%</div><div style={{fontSize:13,color:T.n500}}>30-day adherence · Sertraline 50mg</div><div className="pbar mt10"><div className="pfil" style={{width:"87%",background:T.med}}/></div></div>
      <p style={{fontSize:11,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>This Week</p>
      <div className="card mb14">
        {["Mon Jan 8","Tue Jan 9","Wed Jan 10","Thu Jan 11","Fri Jan 12","Sat Jan 13","Sun Jan 14"].map((d,i)=>{
          const taken=[true,true,false,true,true,true,null][i];
          return(
            <div key={d} className="rwb" style={{padding:"9px 0",borderBottom:i<6?`1px solid ${T.n100}`:"none"}}>
              <span style={{fontSize:13,color:T.n700,fontWeight:600}}>{d}</span>
              {taken===null?<button className="btn bsm bp">Mark taken</button>:<span style={{fontSize:12,fontWeight:800,color:taken?T.med:T.danger}}>{taken?"✓ Taken":"✗ Missed"}</span>}
            </div>
          );
        })}
      </div>
      <div className="ab wi"><span>⚠️</span><div style={{fontSize:12}}><strong>Missed dose Wed Jan 10.</strong> If you miss more than 2 in a row, contact your prescriber. Do not double-dose.</div></div>
    </div>
  </div>
);

/* MH6 LABS */
const Labs=({go})=>{
  const ls=[
    {d:"Jan 5, 2024",t:"Blood Panel",items:["CBC","CMP","TSH","Cortisol"],flag:true,flagged:["Cortisol (high)"]},
    {d:"Nov 20, 2023",t:"Psychological Assessment",items:["WISC-V","BASC-3","Conners ADHD"],flag:false,flagged:[]},
    {d:"Oct 10, 2023",t:"Blood Panel",items:["CBC","Vitamin D","Iron","B12"],flag:true,flagged:["Vitamin D (low)"]},
    {d:"Jul 18, 2023",t:"ECG",items:["Heart rhythm","QT interval"],flag:false,flagged:[]},
  ];
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="Labs & Exams 🧪" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
      <div style={{padding:"14px 20px 32px"}}>
        <div className="col gap10">
          {ls.map((l,i)=>(
            <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${l.flag?T.danger:T.success}`}} onClick={()=>go("lab_detail")}>
              <div className="rwb mb6">
                <span style={{fontSize:11,color:T.n500,fontWeight:700}}>{l.d}</span>
                <span style={{fontSize:10,fontWeight:800,color:l.flag?T.danger:T.success,background:l.flag?T.dangerSoft:T.successSoft,padding:"2px 7px",borderRadius:100}}>{l.flag?"⚠️ Flagged":"✓ Normal"}</span>
              </div>
              <div style={{fontWeight:800,color:T.n900,fontSize:14}}>{l.t}</div>
              <div style={{display:"flex",gap:5,marginTop:7,flexWrap:"wrap"}}>
                {l.items.map(it=><span key={it} style={{fontSize:11,background:l.flagged.includes(it)?T.dangerSoft:T.n100,color:l.flagged.includes(it)?T.danger:T.n500,padding:"3px 7px",borderRadius:7,fontWeight:700}}>{it}{l.flagged.includes(it)?" ⚠️":""}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LabDetail=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Blood Panel — Jan 5, 2024" onBack={()=>go("labs")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb14" style={{background:T.dangerSoft,border:`1px solid ${T.danger}33`}}>
        <div style={{fontWeight:800,color:T.n900,marginBottom:4}}>⚠️ Flagged Result</div>
        <p style={{fontSize:13,color:T.n700,lineHeight:1.6}}>Cortisol above reference range. Elevated cortisol correlates with chronic stress and anxiety. Discuss with GP or endocrinologist.</p>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>Test Results</p>
        {[{t:"Cortisol (AM)",r:"28.4",u:"μg/dL",ref:"6–23",flag:true},{t:"CBC — Hemoglobin",r:"12.8",u:"g/dL",ref:"11.5–15.5",flag:false},{t:"TSH",r:"2.1",u:"mIU/L",ref:"0.5–4.0",flag:false},{t:"CMP — Glucose",r:"89",u:"mg/dL",ref:"70–100",flag:false},{t:"Vitamin B12",r:"380",u:"pg/mL",ref:"200–900",flag:false}].map((r,i)=>(
          <div key={r.t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<4?`1px solid ${T.n100}`:"none"}}>
            <div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>{r.t}</div><div style={{fontSize:10,color:T.n500}}>Ref: {r.ref} {r.u}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--fm)",fontWeight:800,color:r.flag?T.danger:T.success,fontSize:14}}>{r.r}</div><div style={{fontSize:10,color:T.n500}}>{r.u}</div></div>
          </div>
        ))}
      </div>
      <div className="card" style={{background:T.clinSoft}}>
        <div style={{fontSize:13,fontWeight:800,color:T.clinDark,marginBottom:5}}>🧠 AI Correlation Note</div>
        <p style={{fontSize:12,color:T.clinDark,lineHeight:1.6}}>Elevated cortisol on Jan 5 aligns with high-anxiety journal entries Dec 28–Jan 6. This may support a physiological stress component to the GAD presentation. Share with treating clinician.</p>
        <Disc short/>
      </div>
    </div>
  </div>
);

const Allergies=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Allergies & Surgeries" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>⚠️ Allergies</p>
        <div style={{background:T.dangerSoft,borderRadius:11,padding:"11px 14px",borderLeft:`4px solid ${T.danger}`}}>
          <div style={{fontWeight:800,color:T.n900}}>Penicillin</div>
          <div style={{fontSize:12,color:T.n700,marginTop:3}}>Reaction: Urticaria (hives) · Severity: Moderate · Confirmed 2019</div>
        </div>
      </div>
      <div className="card"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}>🔪 Surgical History</p><p style={{fontSize:13,color:T.n500}}>No surgical history recorded.</p><button className="btn bs bsm mt10">+ Add Surgery</button></div>
    </div>
  </div>
);

const FamHist=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Family History 👨‍👩‍👧" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
    <div style={{padding:"14px 20px 32px"}}>
      <Disc short/>
      <div className="card mt14">
        <p style={{fontSize:12,color:T.n500,marginBottom:10}}>Used to contextualise AI risk analysis. Not used for diagnosis.</p>
        {[{r:"Mother",cs:["Anxiety disorder","Hypothyroidism"],age:42},{r:"Maternal grandmother",cs:["Depression","Alzheimer's (late onset)"],age:74},{r:"Father",cs:["No known psychiatric history"],age:45},{r:"Paternal grandfather",cs:["Type 2 diabetes","Cardiovascular disease"],age:71}].map((f,i)=>(
          <div key={i} style={{padding:"11px 0",borderBottom:i<3?`1px solid ${T.n100}`:"none"}}>
            <div style={{fontWeight:800,color:T.n900,fontSize:13,marginBottom:5}}>{f.r} <span style={{color:T.n500,fontSize:11,fontWeight:500}}>· Age {f.age}</span></div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{f.cs.map(c=><span key={c} style={{fontSize:11,background:T.n100,color:T.n700,padding:"3px 7px",borderRadius:7,fontWeight:600}}>{c}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="card mt14" style={{background:T.clinSoft}}><p style={{fontSize:12,color:T.clinDark,lineHeight:1.6}}>🔍 Maternal anxiety + maternal grandmother depression flagged as hereditary risk factors. The AI contextualises patterns against these — not to predict, but to inform observations.</p></div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   CLINICAL SCREENING
───────────────────────────────────────────── */
const ScreenHub=({go})=>{
  const ss=[
    {id:"phq9",ico:"🧠",n:"PHQ-9",full:"Patient Health Questionnaire",desc:"Depression severity — 9 questions",col:T.phq,ls:9,ld:"Jan 10",max:27,f:"Monthly"},
    {id:"gad7",ico:"😰",n:"GAD-7",full:"Generalised Anxiety Disorder Scale",desc:"Anxiety severity — 7 questions",col:T.gad,ls:9,ld:"Jan 10",max:21,f:"Monthly"},
    {id:"mmse",ico:"🧩",n:"MMSE",full:"Mini-Mental State Examination",desc:"Cognitive function — 11 questions",col:T.mmse,ls:null,ld:null,max:30,f:"Quarterly"},
    {id:"phq9",ico:"😴",n:"Epworth",full:"Epworth Sleepiness Scale",desc:"Daytime sleepiness — 8 questions",col:T.taker,ls:8,ld:"Dec 15",max:24,f:"On trigger"},
  ];
  const interp=(n,s)=>{
    if(n==="PHQ-9")return s<5?["Minimal",T.success]:s<10?["Mild",T.success]:s<15?["Moderate",T.accent]:["Mod-Severe",T.danger];
    if(n==="GAD-7")return s<5?["Minimal",T.success]:s<10?["Mild",T.success]:s<15?["Moderate",T.accent]:["Severe",T.danger];
    return["—",T.n500];
  };
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="Clinical Screening 🧠" onBack={()=>go("med_hub")} right={<span style={{fontSize:12,color:T.primary,fontWeight:700,cursor:"pointer"}} onClick={()=>go("screen_hist")}>History →</span>}/>
      <div style={{padding:"14px 20px 32px"}}>
        <Disc short/>
        <div className="ab in mt14 mb14"><span>📅</span><span style={{fontSize:12}}><strong>Due this month:</strong> PHQ-9 + GAD-7 — last Jan 10. Next due Feb 10.</span></div>
        <div className="col gap10">
          {ss.map((s,i)=>{
            const [lbl,col]=s.ls!==null?interp(s.n,s.ls):["Not done",T.n500];
            return(
              <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${s.col}`}} onClick={()=>go(s.id)}>
                <div className="rwb mb7">
                  <div className="row" style={{gap:9}}>
                    <div style={{width:42,height:42,borderRadius:12,background:s.col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.ico}</div>
                    <div><div style={{fontWeight:800,color:T.n900,fontSize:14}}>{s.n}</div><div style={{fontSize:10,color:T.n500}}>{s.full}</div></div>
                  </div>
                  {s.ls!==null&&<div style={{textAlign:"center"}}><div style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:col}}>{s.ls}</div><div style={{fontSize:9,color:col,fontWeight:700}}>{lbl}</div></div>}
                </div>
                <div style={{fontSize:11,color:T.n500,marginBottom:7}}>{s.desc}</div>
                <div className="rwb">
                  <span style={{fontSize:10,color:T.n500}}>{s.f}{s.ld?` · Last: ${s.ld}`:" · Never done"}</span>
                  <button className="btn bsm" style={{background:s.col+"18",color:s.col,border:`1px solid ${s.col}44`,borderRadius:50,fontWeight:800,padding:"5px 12px"}}>{s.ls!==null?"Retake":"Start"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* PHQ-9 */
const PHQ9=({go})=>{
  const [ans,setAns]=useState({});
  const [step,setStep]=useState(0);
  const qs=["Little interest or pleasure in doing things","Feeling down, depressed, or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself — or that you are a failure","Trouble concentrating on things","Moving or speaking slowly — or fidgety/restless","Thoughts that you would be better off dead, or of hurting yourself"];
  const opts=["Not at all","Several days","More than half the days","Nearly every day"];
  const isCrisis=step===8;
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/>
      <div style={{padding:"10px 20px",background:T.surf,borderBottom:`1px solid ${T.n100}`}}>
        <div className="rwb mb8"><button className="btn bg bsm" style={{paddingLeft:0,color:T.phq}} onClick={()=>step>0?setStep(s=>s-1):go("screen_hub")}>← Back</button><span style={{fontSize:12,color:T.n500}}>PHQ-9 · Q{step+1}/9</span></div>
        <div className="pbar"><div className="pfil" style={{width:`${((step+1)/9)*100}%`,background:T.phq}}/></div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"18px 22px 28px",gap:14}}>
        <div>
          <span style={{fontSize:10,fontFamily:"var(--fm)",color:T.phq,fontWeight:700,background:T.phqSoft,padding:"2px 7px",borderRadius:6}}>PHQ-9 Depression Screening</span>
          <p style={{fontSize:12,color:T.n500,marginTop:10,marginBottom:10}}>Over the <strong>last 2 weeks</strong>, how often have you been bothered by:</p>
          {isCrisis&&<div className="ab da mb10"><span>❤️</span><div style={{fontSize:12}}><strong>Sensitive:</strong> This is important for your safety. If you're in crisis, call 988 (US) or your local crisis line.</div></div>}
          <h3 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900,lineHeight:1.4}}>"{qs[step]}"</h3>
        </div>
        <div className="col gap9" style={{flex:1}}>
          {opts.map((opt,i)=>(
            <button key={opt} className="btn bw" style={{justifyContent:"flex-start",padding:"13px 16px",background:ans[step]===i?T.phq:T.surf,color:ans[step]===i?"#fff":T.n900,border:`2px solid ${ans[step]===i?T.phq:T.n300}`,borderRadius:14,fontWeight:700,fontSize:14,transition:"all .15s"}} onClick={()=>setAns(a=>({...a,[step]:i}))}>
              <span style={{width:26,height:26,borderRadius:"50%",background:ans[step]===i?"rgba(255,255,255,.25)":T.n100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,marginRight:6}}>{i}</span>{opt}
            </button>
          ))}
        </div>
        <button className="btn bw blg" style={{background:T.phq,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px",opacity:ans[step]!==undefined?1:.4}} onClick={()=>step<8?setStep(s=>s+1):go("screen_result")}>
          {step<8?"Next Question →":"View My Results"}
        </button>
      </div>
    </div>
  );
};

/* GAD-7 */
const GAD7=({go})=>{
  const [ans,setAns]=useState({});
  const [step,setStep]=useState(0);
  const qs=["Feeling nervous, anxious, or on edge","Not being able to stop or control worrying","Worrying too much about different things","Trouble relaxing","Being so restless that it is hard to sit still","Becoming easily annoyed or irritable","Feeling afraid, as if something awful might happen"];
  const opts=["Not at all","Several days","More than half the days","Nearly every day"];
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/>
      <div style={{padding:"10px 20px",background:T.surf,borderBottom:`1px solid ${T.n100}`}}>
        <div className="rwb mb8"><button className="btn bg bsm" style={{paddingLeft:0,color:T.gad}} onClick={()=>step>0?setStep(s=>s-1):go("screen_hub")}>← Back</button><span style={{fontSize:12,color:T.n500}}>GAD-7 · Q{step+1}/7</span></div>
        <div className="pbar"><div className="pfil" style={{width:`${((step+1)/7)*100}%`,background:T.gad}}/></div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"18px 22px 28px",gap:14}}>
        <div>
          <span style={{fontSize:10,fontFamily:"var(--fm)",color:T.gad,fontWeight:700,background:T.gadSoft,padding:"2px 7px",borderRadius:6}}>GAD-7 Anxiety Screening</span>
          <p style={{fontSize:12,color:T.n500,marginTop:10,marginBottom:10}}>Over the <strong>last 2 weeks</strong>, how often have you been bothered by:</p>
          <h3 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900,lineHeight:1.4}}>"{qs[step]}"</h3>
        </div>
        <div className="col gap9" style={{flex:1}}>
          {opts.map((opt,i)=>(
            <button key={opt} className="btn bw" style={{justifyContent:"flex-start",padding:"13px 16px",background:ans[step]===i?T.gad:T.surf,color:ans[step]===i?"#fff":T.n900,border:`2px solid ${ans[step]===i?T.gad:T.n300}`,borderRadius:14,fontWeight:700,fontSize:14,transition:"all .15s"}} onClick={()=>setAns(a=>({...a,[step]:i}))}>
              <span style={{width:26,height:26,borderRadius:"50%",background:ans[step]===i?"rgba(255,255,255,.25)":T.n100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,marginRight:6}}>{i}</span>{opt}
            </button>
          ))}
        </div>
        <button className="btn bw blg" style={{background:T.gad,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px",opacity:ans[step]!==undefined?1:.4}} onClick={()=>step<6?setStep(s=>s+1):go("screen_result")}>
          {step<6?"Next →":"View Results"}
        </button>
      </div>
    </div>
  );
};

const ScreenResult=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Screening Result" onBack={()=>go("screen_hub")}/>
    <div style={{padding:"14px 20px 40px"}}>
      <Disc short/>
      <div className="card mt14 mb14" style={{background:"linear-gradient(135deg,#EEE8FF,#f8f4ff)",border:`1px solid ${T.phq}33`,textAlign:"center"}}>
        <div style={{fontFamily:"var(--fb)",fontSize:54,fontWeight:900,color:T.phq}}>9</div>
        <div style={{fontSize:13,color:T.n700,fontWeight:700}}>PHQ-9 Score</div>
        <div style={{fontSize:12,color:T.accent,fontWeight:800,marginTop:3}}>Mild Depression</div>
        <div className="pbar mt10" style={{height:9}}><div className="pfil" style={{width:"33%",background:`linear-gradient(90deg,${T.success},${T.accent})`,height:9}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:9,color:T.n500}}><span>0 Minimal</span><span>10</span><span>15</span><span>27 Severe</span></div>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>📊 Score Interpretation</p>
        {[{r:"0–4",l:"Minimal",c:T.success,a:false},{r:"5–9",l:"Mild",c:T.success,a:true},{r:"10–14",l:"Moderate",c:T.accent,a:false},{r:"15–19",l:"Mod-Severe",c:T.danger,a:false},{r:"20–27",l:"Severe",c:T.danger,a:false}].map((r,i)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:9,padding:"5px 9px",borderRadius:9,background:r.a?T.phq+"10":"transparent",border:r.a?`1px solid ${T.phq}33`:"1px solid transparent"}}>
            <div style={{width:11,height:11,borderRadius:"50%",background:r.c,flexShrink:0}}/>
            <span style={{fontSize:12,fontWeight:r.a?800:600,color:r.a?T.phq:T.n700}}>{r.l} ({r.r})</span>
            {r.a&&<span style={{fontSize:10,color:T.phq,fontWeight:800,marginLeft:"auto"}}>← Your score</span>}
          </div>
        ))}
      </div>
      <div className="card mb14" style={{background:T.clinSoft}}>
        <p style={{fontWeight:800,color:T.clinDark,marginBottom:7}}>🩺 Clinical Recommendation</p>
        <p style={{fontSize:13,color:T.clinDark,lineHeight:1.7}}>Score of 9 suggests <strong>mild depressive symptoms</strong>. Given active F41.1 + F32.1, discuss with Dr. Martínez at your next appointment. No immediate escalation, but monitor for increases above 12.</p>
        <p style={{fontSize:10,color:T.clinDark,marginTop:8,opacity:.7}}>⚕️ Heuristic pattern analysis — not a clinical decision.</p>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn bs f1" onClick={()=>go("screen_hist")}>📋 History</button>
        <button className="btn bp f1" onClick={()=>go("clin_report")}>📄 Export to Doctor</button>
      </div>
    </div>
  </div>
);

const ScreenHist=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Screening History 📈" onBack={()=>go("screen_hub")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div className="card mb14"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}>PHQ-9 — Depression Trend</p><MiniBar data={[59,48,41,33]} color={T.phq} labels={["Oct '23","Nov '23","Dec '23","Jan '24"]}/><div className="ab ok mt10"><span>📈</span><span style={{fontSize:12}}>Score down 10 points (59%→33% of max) over 3 months — improving.</span></div></div>
      <div className="card mb14"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}>GAD-7 — Anxiety Trend</p><MiniBar data={[76,62,52,43]} color={T.gad} labels={["Oct '23","Nov '23","Dec '23","Jan '24"]}/></div>
      <div className="card">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>All Screening Events</p>
        {[{d:"Jan 10",t:"PHQ-9",s:"9/27",i:"Mild",c:T.success},{d:"Jan 10",t:"GAD-7",s:"9/21",i:"Moderate",c:T.accent},{d:"Dec 12",t:"PHQ-9",s:"11/27",i:"Moderate",c:T.accent},{d:"Nov 15",t:"PHQ-9",s:"13/27",i:"Moderate",c:T.accent},{d:"Oct 10",t:"PHQ-9",s:"16/27",i:"Mod-Severe",c:T.danger},{d:"Oct 10",t:"GAD-7",s:"16/21",i:"Severe",c:T.danger}].map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<5?`1px solid ${T.n100}`:"none"}}>
            <div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>{e.t}</div><div style={{fontSize:10,color:T.n500}}>{e.d}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--fb)",fontWeight:800,color:e.c,fontSize:14}}>{e.s}</div><div style={{fontSize:10,color:e.c,fontWeight:700}}>{e.i}</div></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TAKER SCREENS
───────────────────────────────────────────── */
const TakerHome=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",position:"relative"}}>
    <SBar/>
    <div style={{background:"linear-gradient(135deg,#9B6DFF,#6D3FD9)",padding:"18px 20px 34px"}}>
      <div className="rwb">
        <div><p style={{color:"rgba(255,255,255,.65)",fontSize:12}}>Taker Dashboard 🛠️</p><h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:"#fff",marginTop:2}}>Your Care Circle</h2></div>
        <div style={{position:"relative",cursor:"pointer"}}><div style={{width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>🔔</div><div className="ndot"/></div>
      </div>
      <div style={{display:"flex",gap:10,marginTop:18,overflowX:"auto",paddingBottom:4}}>
        {[{n:"Maria",age:12,mood:"😊",s:"active",av:"#4F8EF7",in:"M"},{n:"Grandpa Joe",age:78,mood:"😐",s:"needs attention",av:"#F5A623",in:"J"},{n:"+ Add",isAdd:true}].map((u,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.13)",borderRadius:14,padding:"11px",minWidth:100,cursor:"pointer",border:u.s==="needs attention"?`2px solid ${T.danger}`:"2px solid transparent",flexShrink:0}} onClick={()=>!u.isAdd&&go("clin_bi")}>
            {u.isAdd?<div style={{textAlign:"center"}}><div style={{fontSize:26}}>➕</div><div style={{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:5,fontWeight:700}}>Add User</div></div>
            :<><div style={{width:40,height:40,borderRadius:"50%",background:u.av,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:16,margin:"0 auto 7px"}}>{u.in}</div>
              <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:"#fff",fontSize:12}}>{u.n}</div><div style={{fontSize:10,color:"rgba(255,255,255,.55)"}}>Age {u.age}</div><div style={{fontSize:18,marginTop:3}}>{u.mood}</div>
              {u.s==="needs attention"&&<div style={{fontSize:9,color:T.danger,fontWeight:700,marginTop:2}}>⚠️ Needs attention</div>}</div></>}
          </div>
        ))}
      </div>
    </div>
    <div style={{flex:1,padding:"14px 20px 24px",marginTop:-14,overflow:"auto"}}>
      <div className="card mb14">
        <div className="rwb mb10"><p style={{fontWeight:800,color:T.n900,fontSize:13}}>🚨 Active Alerts</p><span className="chip cer">2 new</span></div>
        {[{ico:"😢",msg:"Grandpa Joe: 3 consecutive sad entries",t:"2h ago",sev:"wi"},{ico:"📍",msg:"Maria left known area — school route",t:"45m ago",sev:"in"}].map((a,i)=>(
          <div key={i} className={`ab ${a.sev} mb8`} style={{cursor:"pointer"}}><span style={{fontSize:18}}>{a.ico}</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:T.n900}}>{a.msg}</div><div style={{fontSize:10,color:T.n500}}>{a.t}</div></div><span>›</span></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[{ico:"📅",l:"Check-ins today",v:"1/2 users",c:T.primary},{ico:"🧘",l:"Activities done",v:"3 this week",c:T.success},{ico:"📍",l:"GPS: Maria",v:"At school ✓",c:T.accent},{ico:"🤖",l:"AI flags",v:"2 active",c:T.danger}].map(s=>(
          <div key={s.l} className="card" style={{padding:14}}><div style={{fontSize:22}}>{s.ico}</div><div style={{fontSize:10,color:T.n500,marginTop:5}}>{s.l}</div><div style={{fontWeight:800,color:T.n900,fontSize:13,marginTop:2}}>{s.v}</div></div>
        ))}
      </div>
      <button className="btn bcl bw mb10" onClick={()=>go("clin_bi")}>⚕️ Open Clinical BI Dashboard</button>
      <button className="btn bt bw" onClick={()=>go("rag_chat")}>🤖 Ask AI Assistant</button>
    </div>
    <button className="fltbtn" onClick={()=>go("rag_chat")}>💬</button>
  </div>
);

/* CLINICAL BI DASHBOARD */
const ClinBI=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",position:"relative"}}>
    <SBar/>
    <div style={{background:`linear-gradient(135deg,${T.clin},${T.clinDark})`,padding:"16px 20px 32px"}}>
      <div className="rwb">
        <div><p style={{color:"rgba(255,255,255,.65)",fontSize:12}}>Clinical Intelligence</p><h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:"#fff"}}>Maria — Clinical BI</h2></div>
        <button className="btn bsm" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",borderRadius:50,fontWeight:800}} onClick={()=>go("clin_report")}>📄 Report</button>
      </div>
      <div style={{display:"flex",gap:7,marginTop:14,overflowX:"auto"}}>
        {[{l:"PHQ-9",v:"9",s:"Mild",c:T.accent},{l:"GAD-7",v:"9",s:"Moderate",c:T.accent},{l:"Adherence",v:"87%",s:"Sertraline",c:T.success},{l:"AI Flags",v:"2",s:"Active",c:T.danger}].map(s=>(
          <div key={s.l} style={{minWidth:76,background:"rgba(255,255,255,.12)",borderRadius:11,padding:"9px",textAlign:"center",flexShrink:0}}>
            <div style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:s.c}}>{s.v}</div>
            <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.6)"}}>{s.l}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{flex:1,padding:"14px 20px 32px",marginTop:-14,overflow:"auto"}}>
      <div className="card mb14">
        <div className="rwb mb10"><p style={{fontWeight:800,color:T.n900,fontSize:13}}>PHQ-9 + GAD-7 Trend</p><span style={{fontSize:12,color:T.primary,cursor:"pointer"}} onClick={()=>go("screen_hist")}>All →</span></div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
          {[{m:"Oct",p:16,g:16},{m:"Nov",p:13,g:13},{m:"Dec",p:11,g:11},{m:"Jan",p:9,g:9}].map(d=>(
            <div key={d.m} style={{minWidth:64,textAlign:"center",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:4,height:56,justifyContent:"center",marginBottom:4}}>
                <div style={{width:18,background:T.phq,borderRadius:"4px 4px 0 0",height:`${(d.p/27)*100}%`}}/>
                <div style={{width:18,background:T.gad,borderRadius:"4px 4px 0 0",height:`${(d.g/21)*100}%`}}/>
              </div>
              <div style={{fontSize:9,color:T.n500}}>{d.m}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:14,marginTop:7}}>
          <div className="row" style={{gap:5}}><div style={{width:11,height:11,borderRadius:3,background:T.phq}}/><span style={{fontSize:10,color:T.n500}}>PHQ-9</span></div>
          <div className="row" style={{gap:5}}><div style={{width:11,height:11,borderRadius:3,background:T.gad}}/><span style={{fontSize:10,color:T.n500}}>GAD-7</span></div>
        </div>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>🚩 Active AI Clinical Flags</p>
        <div className="col gap10">
          <Flag icon="😴" title="Sleep–Anxiety Feedback Loop" body="Nights < 5hrs co-occur with 40–60% higher anxiety entries. Consistent with known GAD exacerbation via sleep deprivation." sev="medium" action="View pattern" onAct={()=>go("ai_flags")}/>
          <Flag icon="🧪" title="Cortisol + Stress Correlation" body="Elevated cortisol (Jan 5 lab) aligns with 10-day high-stress journal period. Possible HPA axis involvement — flag for clinician." sev="medium" action="View detail" onAct={()=>go("lab_detail")}/>
        </div>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>🗺️ Symptom Heatmap — 30 Days</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {[{s:"Anxiety",f:22},{s:"Low mood",f:14},{s:"Fatigue",f:18},{s:"Sleep ↓",f:16},{s:"Appetite ↓",f:6},{s:"Restless",f:11},{s:"Headache",f:4},{s:"Irritable",f:9},{s:"Concentrate ↓",f:12}].map(s=>(
            <div key={s.s} style={{padding:"5px 9px",borderRadius:9,background:`rgba(79,142,247,${s.f/32})`,border:`1px solid ${T.primary}33`,fontSize:11,fontWeight:700,color:s.f>14?"#fff":T.primary}}>{s.s} ({s.f})</div>
          ))}
        </div>
        <p style={{fontSize:10,color:T.n500,marginTop:7}}>Frequency in journal entries, past 30 days</p>
      </div>
      <button className="btn bs bw" onClick={()=>go("dev_mode")}>🗄️ Raw Database (Dev Mode)</button>
    </div>
    <button className="fltbtn" onClick={()=>go("rag_chat")}>💬</button>
  </div>
);

/* AI FLAGS */
const AIFlags=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",position:"relative"}}>
    <SBar/><PHeader title="AI Clinical Flags 🧠" onBack={()=>go("clin_bi")} right={<span className="chip cer" style={{fontSize:10}}>2 active</span>}/>
    <div style={{padding:"14px 20px 32px"}}>
      <Disc/>
      <div className="col gap12 mt14">
        {[{ico:"😴",sev:"medium",t:"Sleep–Anxiety Feedback Loop Detected",b:"30-day analysis shows nights with <5 hrs sleep followed by 40–60% higher anxiety symptom frequency. Consistent with GAD exacerbation via sleep deprivation (NICE guidelines).",fw:"F41.1 · Sleep disorder G47.0 · NICE anxiety guidelines",act:"Discuss sleep hygiene + possible short-term support with Dr. Martínez",conf:82,icd:"F41.1"},
          {ico:"🧪",sev:"medium",t:"Cortisol Elevation + Chronic Stress",b:"Cortisol 28.4μg/dL (Jan 5) co-occurs with 10-day high-stress period. Sustained elevation linked to HPA dysregulation — bidirectional relationship with anxiety and depression.",fw:"F41.1 + F32.1 comorbidity · HPA research · Endocrine Society",act:"Flag for endocrinology review + track cortisol at next blood panel",conf:71,icd:"F41.1"},
          {ico:"📈",sev:"low",t:"PHQ-9 Improvement — Treatment Response",b:"PHQ-9 dropped from 16→9 over 3 months (Oct–Jan), consistent with positive Sertraline 50mg response. Trajectory suggests continued improvement if adherence maintained.",fw:"PHQ-9 interpretation · SSRI response benchmarks",act:"Monitor — flag if score rises above 12 or 3+ consecutive missed doses",conf:89,icd:"F32.1"},
          {ico:"🔍",sev:"low",t:"Possible New: Academic Anxiety Trigger",b:"School context words (homework, teacher, exam) in 68% of high-anxiety entries over 6 weeks. Not in prior diagnostic record. May warrant exploration of social phobia component.",fw:"F40.10 Social phobia · F93.0 childhood anxiety · SCARED checklist",act:"Add school-specific questions to next check-in. Discuss with Dr. Martínez.",conf:64,icd:"F40.10"},
        ].map((f,i)=>{
          const c=f.sev==="medium"?T.accent:T.success;
          return(
            <div key={i} className="card" style={{border:`1px solid ${c}33`,padding:0,overflow:"hidden"}}>
              <div style={{background:c,padding:"9px 14px",display:"flex",gap:9,alignItems:"center"}}>
                <span style={{fontSize:17}}>{f.ico}</span>
                <span style={{fontWeight:800,color:"#fff",fontSize:13,flex:1}}>{f.t}</span>
                <span style={{background:"rgba(255,255,255,.2)",color:"#fff",fontSize:9,padding:"2px 7px",borderRadius:100,fontWeight:800}}>{f.sev.toUpperCase()}</span>
              </div>
              <div style={{padding:"12px 14px"}}>
                <p style={{fontSize:12,color:T.n700,lineHeight:1.7,marginBottom:10}}>{f.b}</p>
                <div style={{background:T.n100,borderRadius:9,padding:"9px 11px",marginBottom:10}}>
                  <div style={{fontSize:9,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.4,marginBottom:3}}>Framework</div>
                  <div style={{fontSize:10,color:T.n700,fontFamily:"var(--fm)"}}>{f.fw}</div>
                </div>
                <div style={{background:T.clinSoft,borderRadius:9,padding:"9px 11px",marginBottom:10}}>
                  <div style={{fontSize:9,fontWeight:800,color:T.clinDark,textTransform:"uppercase",letterSpacing:.4,marginBottom:3}}>Recommended Action</div>
                  <div style={{fontSize:12,color:T.clinDark,lineHeight:1.6}}>{f.act}</div>
                </div>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:T.n500,fontWeight:700}}>Pattern confidence</span><span style={{fontSize:10,fontWeight:800,color:c}}>{f.conf}%</span></div>
                  <div className="pbar"><div className="pfil" style={{width:`${f.conf}%`,background:c}}/></div>
                  <div style={{marginTop:8}}><ICD code={f.icd}/></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Disc/>
    </div>
    <button className="fltbtn" onClick={()=>go("rag_chat")}>💬</button>
  </div>
);

/* CLINICIAN REPORT */
const ClinReport=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Clinician Report 📄" onBack={()=>go("med_hub")}/>
    <div style={{padding:"14px 20px 40px"}}>
      <div className="card mb14" style={{background:"linear-gradient(135deg,#f8fffe,#e8f5f3)",border:`2px solid ${T.clin}33`}}>
        <div className="rwb mb10">
          <div><p style={{fontSize:10,fontWeight:800,color:T.clin,textTransform:"uppercase",letterSpacing:.5}}>Patient Summary Report</p><h2 style={{fontFamily:"var(--fb)",fontSize:17,fontWeight:800,color:T.n900,marginTop:2}}>Maria García, F, 12</h2></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.n500}}>Generated</div><div style={{fontWeight:700,color:T.n900,fontSize:12}}>Jan 14, 2024</div></div>
        </div>
        <div style={{height:1,background:T.clin+"22",margin:"10px 0"}}/>
        {[{l:"Active Diagnoses",v:"F41.1 (GAD) · F32.1 (MDE mod)"},{l:"Current Medications",v:"Sertraline 50mg OD · Melatonin 3mg PRN"},{l:"Reporting Period",v:"Oct 2023 – Jan 2024"},{l:"Last Clinical Visit",v:"Dec 12, 2023 — City General ER"}].map(r=>(
          <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.n100}`,fontSize:11}}>
            <span style={{color:T.n500,fontWeight:700}}>{r.l}</span><span style={{color:T.n900,fontWeight:600,textAlign:"right",maxWidth:"55%"}}>{r.v}</span>
          </div>
        ))}
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:10}}>📊 Screening Scores</p>
        <div style={{display:"flex",gap:10}}>
          <ScBadge score={9} max={27} label="PHQ-9" color={T.phq}/>
          <ScBadge score={9} max={21} label="GAD-7" color={T.gad}/>
        </div>
        <p style={{fontSize:11,color:T.n500,marginTop:9}}>Trend: PHQ-9 ↓44% · GAD-7 ↓44% vs baseline (Oct 2023)</p>
      </div>
      <div className="card mb14">
        <p style={{fontWeight:800,color:T.n900,marginBottom:8}}>🧠 AI Pattern Observations</p>
        <Disc short/>
        <div className="col gap10 mt10">
          {["Sleep–anxiety feedback loop detected (82% confidence)","Positive SSRI treatment response (89% confidence)","Academic context as possible anxiety trigger — not formally assessed (64%)"].map((o,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{color:T.clin,fontSize:13,flexShrink:0}}>→</span>
              <span style={{fontSize:12,color:T.n700,lineHeight:1.6}}>{o}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col gap10">
        <button className="btn bw blg" style={{background:T.clin,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}}>📤 Share with Dr. Martínez</button>
        <button className="btn bs bw">📥 Download PDF</button>
        <p style={{fontSize:11,color:T.n500,textAlign:"center"}}>⚕️ Observational only — not a clinical assessment.</p>
      </div>
    </div>
  </div>
);

/* RAG CHAT */
const RagChat=({go})=>{
  const [inp,setInp]=useState("");
  const msgs=[
    {r:"a",t:"👋 Hi! I'm your AI assistant. I have context from Maria's journals and clinical record. What would you like to know?"},
    {r:"u",t:"How has Maria's mood been this week compared to last?"},
    {r:"a",t:"Maria's average mood score this week is 74/100, up 6 points from last week (68/100). Best day Friday (92/100) — she mentioned a fun PE class. Lowest was Wednesday (55/100) — tired + high homework load."},
    {r:"u",t:"Should I worry about the Wednesday dip?"},
    {r:"a",t:"Wednesday dips are recurring but self-correcting in her data. If this persists 2+ more weeks, it's worth discussing mid-week schedule load. I'd suggest a breathing session after school on Wednesdays — her post-activity scores are 28 points higher. Want me to create a calendar reminder?"},
  ];
  return(
    <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <SBar/><PHeader title="AI Assistant 🤖" onBack={()=>go("taker_home")} right={<span className="chip cta" style={{fontSize:10}}>RAG</span>}/>
      <div style={{background:T.takerSoft,padding:"7px 14px"}}><p style={{fontSize:11,color:T.taker,fontWeight:700}}>🧠 Powered by clinical journal data · Not a medical professional</p></div>
      <div style={{flex:1,padding:14,overflow:"auto",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=><div key={i} className={`ragbub ${m.r}`}>{m.t}</div>)}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
          {["📊 PHQ-9 trend","📅 Set reminder","🧘 Suggest activity","⚠️ Red flags?","🏥 Medication status"].map(s=>(
            <button key={s} style={{padding:"5px 11px",borderRadius:100,background:T.surf,border:`1px solid ${T.n300}`,fontSize:11,fontWeight:700,cursor:"pointer",color:T.taker,boxShadow:"0 1px 4px rgba(26,29,46,.08)"}}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"10px 14px 14px",background:T.surf,borderTop:`1px solid ${T.n100}`,display:"flex",gap:9}}>
        <input className="inp f1" style={{padding:"11px 13px"}} placeholder="Ask about your care circle..." value={inp} onChange={e=>setInp(e.target.value)}/>
        <button className="btn bt" style={{padding:"11px 14px"}}>→</button>
      </div>
    </div>
  );
};

/* TAKER CONNECT */
const TakerConn=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
    <SBar/><PHeader title="Connect with Maria 💬" onBack={()=>go("taker_home")} right={<span className="chip cta" style={{fontSize:10}}>Read-only data</span>}/>
    <div style={{background:T.takerSoft,padding:"7px 14px"}}><p style={{fontSize:11,color:T.taker,fontWeight:700}}>💬 Messages go to Maria's AAC board. NOT stored as clinical data.</p></div>
    <div style={{flex:1,padding:14,overflow:"auto",display:"flex",flexDirection:"column",gap:10}}>
      <div className="ragbub a">👋 Hi Papa! I feel happy today.</div>
      <div className="ragbub u">So glad! Did you have lunch?</div>
      <div className="ragbub a">Yes! 🍽️ Rice and chicken. Yummy!</div>
      <div className="ragbub u">Great! Don't forget math homework 📚</div>
    </div>
    <div style={{padding:"10px 14px 14px",background:T.surf,borderTop:`1px solid ${T.n100}`}}>
      <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"}}>
        {["❤️ Love you","✅ Good job!","📚 Homework time","🍎 Snack time?"].map(q=>(
          <button key={q} style={{padding:"5px 11px",borderRadius:100,background:T.takerSoft,border:`1px solid ${T.taker}33`,fontSize:11,fontWeight:700,cursor:"pointer",color:T.taker}}>{q}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:9}}><input className="inp f1" style={{padding:"11px 13px"}} placeholder="Type a message..."/><button className="btn bt" style={{padding:"11px 14px"}}>→</button></div>
    </div>
  </div>
);

/* TAKER CALENDAR */
const TakerCal=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{background:T.surf,padding:"14px 20px",borderBottom:`1px solid ${T.n100}`}}>
      <div className="rwb mb10"><h2 style={{fontFamily:"var(--fb)",fontSize:19,fontWeight:800,color:T.n900}}>Calendar 🗓️</h2><button className="btn bsm bp">+ Event</button></div>
      <div style={{display:"flex",gap:5}}>
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>(
          <div key={d} style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:9,color:T.n500,fontWeight:700,marginBottom:5}}>{d}</div>
            <div style={{width:"100%",aspectRatio:"1",borderRadius:"50%",background:[8,9,10,11,12,13,14][i]===14?T.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:[8,9,10,11,12,13,14][i]===14?"#fff":T.n900,fontWeight:800,fontSize:13}}>{[8,9,10,11,12,13,14][i]}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{padding:"14px 20px 32px"}}>
      <p style={{fontSize:11,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Upcoming</p>
      <div className="col gap10">
        {[{t:"9:00 AM",l:"Maria's school check-in",ico:"🏫",c:T.primary,u:"Maria"},{t:"2:30 PM",l:"Grandpa Joe — medication reminder",ico:"💊",c:T.success,u:"Joe"},{t:"4:00 PM",l:"After-school mood check",ico:"😊",c:T.accent,u:"Maria"},{t:"Tomorrow 9:00 AM",l:"Dr. Martínez appointment",ico:"🏥",c:T.taker,u:"Joe"}].map((e,i)=>(
          <div key={i} className="card" style={{borderLeft:`4px solid ${e.c}`}}>
            <div className="rwb"><div className="row" style={{gap:10}}><span style={{fontSize:20}}>{e.ico}</span><div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>{e.l}</div><div style={{fontSize:11,color:T.n500,marginTop:2}}>{e.t} · {e.u}</div></div></div><span style={{fontSize:14,cursor:"pointer",color:T.n300}}>⋯</span></div>
          </div>
        ))}
      </div>
    </div>
    <button className="fltbtn" onClick={()=>go("rag_chat")}>💬</button>
  </div>
);

/* ─────────────────────────────────────────────
   SETTINGS & SYSTEM
───────────────────────────────────────────── */
const Settings=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{background:T.surf,padding:"18px 20px 14px"}}>
      <div className="row" style={{gap:12}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:T.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:800,color:"#fff"}}>M</div>
        <div><h2 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900}}>Maria García</h2><p style={{fontSize:12,color:T.n500}}>User · Active since Jan 2024</p><span className="chip cpr mt8" style={{marginTop:6,fontSize:10}}>✓ 7 day streak</span></div>
      </div>
    </div>
    <div style={{padding:"14px 20px 32px"}}>
      {[{s:"Profile",items:[{i:"👤",l:"Edit Profile",sb:"Name, photo, pronouns",n:"settings"},{i:"🔒",l:"Password & Security",sb:"Change password, biometrics",n:"settings"},{i:"🔗",l:"Linked Takers",sb:"Manage access to your data",n:"settings"}]},
        {s:"Accessibility",items:[{i:"♿",l:"Accessibility Options",sb:"AAC, colorblind, font size",n:"reg3"},{i:"🎙️",l:"Input Preferences",sb:"Mic, guided questions, AAC",n:"settings"},{i:"🔔",l:"Notifications",sb:"Reminders, frequency, style",n:"settings"}]},
        {s:"Privacy & Data",items:[{i:"📍",l:"GPS Tracking",sb:"Location sharing settings",n:"gps"},{i:"📦",l:"My Data",sb:"Export, delete, what's stored",n:"legal"},{i:"📜",l:"Privacy & Legal",sb:"Terms, disclaimer, policy",n:"legal"}]},
        {s:"Clinical",items:[{i:"🏥",l:"Medical Record",sb:"Visits, diagnoses, labs, meds",n:"med_hub"},{i:"🧠",l:"Screening Schedule",sb:"PHQ-9, GAD-7 frequency",n:"screen_hub"},{i:"📄",l:"Generate Clinician Report",sb:"Export summary for doctor",n:"clin_report"}]},
        {s:"Support",items:[{i:"❓",l:"Help Center",sb:"FAQ and guides",n:"settings"},{i:"🚪",l:"Sign Out",sb:"",n:"welcome"}]},
      ].map(section=>(
        <div key={section.s} style={{marginBottom:18}}>
          <p style={{fontSize:10,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{section.s}</p>
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            {section.items.map((it,i)=><SRow key={i} icon={it.i} label={it.l} sub={it.sb} right={<span style={{color:T.n300,fontSize:15}}>›</span>} onClick={()=>go(it.n)}/>)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GPS=({go})=>{
  const [on,setOn]=useState(false);
  return(
    <div style={{background:T.n100,minHeight:"100%"}}>
      <SBar/><PHeader title="GPS Tracking 📍" onBack={()=>go("settings")}/>
      <div style={{padding:"14px 20px 32px"}}>
        <div className="ab wi mb14"><span>⚠️</span><div><div style={{fontWeight:700,fontSize:13,color:T.n900}}>Privacy Notice</div><div style={{fontSize:12,color:T.n700,marginTop:2}}>GPS is OFF by default. Encrypted at rest. Only authorised Takers can see location data.</div></div></div>
        <div className="card mb14"><SRow icon="📍" label="Enable GPS Tracking" sub="Share location with authorised Takers" right={<Toggle checked={on} onChange={setOn}/>}/>{on&&<><SRow icon="🏠" label="Safe Zones" sub="Home, school, trusted locations" right={<span style={{color:T.primary,fontWeight:700,fontSize:12}}>3 zones</span>}/><SRow icon="🔔" label="Alert when leaving zone" sub="Notify Taker" right={<Toggle checked onChange={()=>{}}/>}/></>}</div>
        {on&&<div style={{background:"linear-gradient(135deg,#e8f4e8,#d4e8d4)",borderRadius:18,height:140,marginBottom:14,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
          <div style={{position:"absolute",top:"40%",left:"48%",fontSize:26}}>📍</div>
          <div style={{position:"absolute",bottom:9,right:9,background:T.success,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:100}}>✓ In safe zone</div>
        </div>}
        <div className="card"><div style={{fontWeight:700,color:T.n900,marginBottom:7}}>Who can see my location</div><div className="row" style={{gap:9,padding:"7px 0"}}><div style={{width:34,height:34,borderRadius:"50%",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13}}>C</div><div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>Papa Carlos</div><div style={{fontSize:11,color:T.n500}}>Taker</div></div><button className="btn bsm" style={{marginLeft:"auto",color:T.danger,border:`1px solid ${T.danger}`,background:"transparent",borderRadius:50,fontWeight:800}}>Revoke</button></div></div>
      </div>
    </div>
  );
};

const DevMode=({go})=>(
  <div style={{background:"#0d1a0d",minHeight:"100%"}}>
    <SBar dark/>
    <div style={{background:"#1a2e1a",padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
      <button style={{background:"none",border:"none",color:"#00ff88",cursor:"pointer",fontSize:12}} onClick={()=>go("clin_bi")}>← Exit Dev</button>
      <span style={{fontFamily:"var(--fm)",color:"#00ff88",fontSize:12}}>RAW DATABASE VIEW</span>
      <span className="chip" style={{background:"#ff4444",color:"#fff",marginLeft:"auto",fontSize:9}}>DEV ONLY</span>
    </div>
    <div style={{padding:"10px 14px"}}>
      <div style={{background:"#0a120a",borderRadius:11,padding:"11px 13px",marginBottom:10}}>
        <div style={{fontFamily:"var(--fm)",fontSize:10,color:"#00ff88",marginBottom:10}}>db.clinical_entries.find({"{"}user_id:"usr_maria_001"{"}"}).limit(3)</div>
        {[{id:"ce_001",ts:"2024-01-15T09:41:00Z",phq_proxy:2,gad_proxy:1,mood:"happy",anxiety:"low",meds_taken:true,sleep_hrs:7.5,appetite:"normal",func_cap:"full",icd_flags:["F41.1"]},
          {id:"ce_002",ts:"2024-01-14T10:15:00Z",phq_proxy:3,gad_proxy:2,mood:"tired",anxiety:"moderate",meds_taken:true,sleep_hrs:5.5,appetite:"reduced",func_cap:"partial",icd_flags:["F41.1","F32.1"]},
          {id:"ce_003",ts:"2024-01-13T08:55:00Z",phq_proxy:2,gad_proxy:1,mood:"calm",anxiety:"low",meds_taken:false,sleep_hrs:8,appetite:"normal",func_cap:"full",icd_flags:["F41.1"]},
        ].map((row,i)=>(
          <div key={i} className="devrow"><div style={{color:"#ffd700",fontSize:10}}>{JSON.stringify(row)}</div></div>
        ))}
        <div style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(0,255,136,.4)",marginTop:7}}>3 documents · 14ms</div>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {["clinical_entries","screening_scores","ai_flags","medications","gps_events","lab_results"].map(t=>(
          <button key={t} style={{background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.25)",color:"#00ff88",borderRadius:7,padding:"5px 10px",fontFamily:"var(--fm)",fontSize:10,cursor:"pointer"}}>{t}</button>
        ))}
      </div>
      <div style={{background:"#0a120a",borderRadius:11,padding:"11px 13px",marginTop:10}}>
        <div style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(0,255,136,.5)",marginBottom:5}}>Query console</div>
        <input style={{width:"100%",background:"transparent",border:"1px solid rgba(0,255,136,.25)",borderRadius:6,padding:"7px 9px",fontFamily:"var(--fm)",fontSize:11,color:"#00ff88",outline:"none"}} placeholder="db.collection.find({...})"/>
      </div>
    </div>
  </div>
);

/* SYSTEM SCREENS */
const CheckIn=({go})=>(
  <div style={{background:"linear-gradient(160deg,#1a1d2e,#2a3550)",minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:20,textAlign:"center"}}>
    <SBar dark/>
    <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}>🌞</div>
    <div><p style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Good afternoon!</p><h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:800,color:"#fff",marginTop:4}}>Time for your check-in 💙</h2><p style={{color:"rgba(255,255,255,.5)",marginTop:10,lineHeight:1.7}}>You're on a <strong style={{color:T.accent}}>7-day streak</strong>. Just 60 seconds to keep it going!</p></div>
    <div className="col gap10" style={{width:"100%"}}>
      <button className="btn bp bw blg" onClick={()=>go("voice_idle")}>🎙️ Talk to me</button>
      <button className="btn bw blg" style={{background:"rgba(255,255,255,.08)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}} onClick={()=>go("guided_q")}>📝 Clinical Questions</button>
      <button className="btn bg bw" style={{color:"rgba(255,255,255,.3)"}} onClick={()=>go("home_user")}>Remind me later</button>
    </div>
    <p style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>Skipping 3+ days reduces AI pattern accuracy</p>
  </div>
);

const Offline=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
    <SBar/>
    <div style={{fontSize:72,filter:"grayscale(1)"}}>📡</div>
    <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>You're offline</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>No connection. Entries are saved locally and synced when you reconnect.</p></div>
    <div className="card" style={{width:"100%",textAlign:"left"}}>
      {["✅ View past entries","✅ Record new entry (saves locally)","✅ All breathing activities","✅ Grounding exercises","❌ AI insights (need internet)","❌ Taker sync (need internet)"].map(f=><p key={f} style={{fontSize:12,color:T.n700,padding:"3px 0"}}>{f}</p>)}
    </div>
    <button className="btn bp bw" onClick={()=>go("home_user")}>Continue Offline</button>
  </div>
);

const EmptyState=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:14}}>
    <SBar/>
    <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}>📖</div>
    <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>No entries yet</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>Start your first clinical check-in today — it only takes 60 seconds!</p></div>
    <button className="btn bp bw blg" onClick={()=>go("voice_idle")}>🎙️ Make My First Entry</button>
    <button className="btn bs bw" onClick={()=>go("guided_q")}>📝 Use Clinical Questions</button>
  </div>
);

const ErrorSc=({go})=>(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
    <SBar/><div style={{fontSize:68}}>⚠️</div>
    <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>Something went wrong</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>Your data is safe. This is a temporary issue.</p></div>
    <div className="card" style={{width:"100%",textAlign:"left"}}><p style={{fontFamily:"var(--fm)",fontSize:10,color:T.n500}}>Error: NetworkRequestFailed · 503 Service Unavailable</p></div>
    <div style={{display:"flex",gap:10,width:"100%"}}><button className="btn bp f1">🔄 Retry</button><button className="btn bs f1" onClick={()=>go("home_user")}>Go Home</button></div>
  </div>
);

const Loading=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/>
    <div style={{background:T.surf,padding:18}}><div className="row" style={{gap:12}}><div className="skl" style={{width:56,height:56,borderRadius:"50%"}}/><div style={{flex:1}}><div className="skl" style={{height:16,marginBottom:7,width:"60%"}}/><div className="skl" style={{height:12,width:"40%"}}/></div></div></div>
    <div style={{padding:"14px 18px"}}>{[1,2,3].map(i=><div key={i} className="card" style={{marginBottom:10}}><div className="skl" style={{height:14,width:"70%",marginBottom:9}}/><div className="skl" style={{height:72}}/><div className="skl" style={{height:12,width:"50%",marginTop:9}}/></div>)}</div>
  </div>
);

/* JOURNEY DASHBOARD */
const JourneyDash=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="My Journey 📊" onBack={()=>go("home_user")}/>
    <div style={{padding:"14px 20px 32px",overflow:"auto"}}>
      <div className="tabbar mb14">{["Week","Month","3 Months","Year"].map((t,i)=><div key={t} className={`tabi${i===0?" on":""}`}>{t}</div>)}</div>
      {[{t:"Mood Score",i:"😊",d:[65,80,55,90,70,85,60],c:T.primary,l:["M","T","W","T","F","S","S"],avg:"72/100"},
        {t:"PHQ-9 Proxy",i:"🧠",d:[45,52,38,42,35,38,30],c:T.phq,l:["M","T","W","T","F","S","S"],avg:"Mild range"},
        {t:"GAD-7 Proxy",i:"😰",d:[55,60,48,52,42,45,38],c:T.gad,l:["M","T","W","T","F","S","S"],avg:"Mild range"},
        {t:"Sleep Hours",i:"😴",d:[70,85,60,75,90,95,80],c:T.taker,l:["M","T","W","T","F","S","S"],avg:"7.4 hrs"},
        {t:"Activity Minutes",i:"🧘",d:[20,0,30,15,25,40,10],c:T.success,l:["M","T","W","T","F","S","S"],avg:"20 min/day"},
        {t:"Medication Adherence",i:"💊",d:[100,100,0,100,100,100,0],c:T.med,l:["M","T","W","T","F","S","S"],avg:"87% this week"},
      ].map(c=>(
        <div key={c.t} className="card mb14">
          <div className="rwb mb10"><div className="row" style={{gap:7}}><span style={{fontSize:18}}>{c.i}</span><span style={{fontWeight:800,color:T.n900,fontSize:13}}>{c.t}</span></div><span style={{fontSize:12,fontWeight:700,color:c.c}}>{c.avg}</span></div>
          <MiniBar data={c.d} labels={c.l} color={c.c}/>
        </div>
      ))}
    </div>
  </div>
);

/* WEEKLY SUMMARY */
const WeeklySummary=({go})=>(
  <div style={{background:T.n100,minHeight:"100%"}}>
    <SBar/><PHeader title="Weekly Summary 📅" onBack={()=>go("home_user")}/>
    <div style={{padding:"14px 20px 32px"}}>
      <div style={{background:"linear-gradient(135deg,#4F8EF7,#9B6DFF)",borderRadius:18,padding:18,marginBottom:14,color:"#fff"}}>
        <p style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>Jan 8–14, 2024</p>
        <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,marginTop:4}}>A pretty good week! 🌟</h2>
        <p style={{fontSize:13,marginTop:8,color:"rgba(255,255,255,.85)",lineHeight:1.6}}>Logged 6/7 days. Average mood 74/100 (up from 68). PHQ-9 proxy stable. 4 breathing sessions completed. Medication adherence 87%.</p>
      </div>
      {[{i:"📈",t:"Highlights",items:["Mood up 9% vs last week","PHQ-9 proxy score improving (9→stable)","4 breathing exercises completed","Medication adherence 87%"]},
        {i:"🎯",t:"Areas to watch",items:["Wednesday energy dip persists (cortisol pattern)","Missed Monday check-in","Only 5.5 hrs sleep Sunday","1 missed Sertraline dose (Wed)"]},
        {i:"🔮",t:"Next week",items:["Try breathing exercise Wednesday afternoon","Set 9 PM sleep alarm for consistency","Log sleep hours each morning","PHQ-9 + GAD-7 due Feb 10"]},
      ].map(section=>(
        <div key={section.t} className="card mb12">
          <div className="row mb9" style={{gap:7}}><span style={{fontSize:18}}>{section.i}</span><span style={{fontWeight:800,color:T.n900,fontSize:14}}>{section.t}</span></div>
          {section.items.map(it=><div key={it} style={{display:"flex",gap:7,alignItems:"flex-start",padding:"3px 0"}}><span style={{color:T.primary,fontSize:12,marginTop:1}}>·</span><span style={{fontSize:12,color:T.n700,lineHeight:1.5}}>{it}</span></div>)}
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SCREEN REGISTRY
───────────────────────────────────────────── */
const SCREENS = {
  // Auth (no nav)
  welcome:     {C:Welcome,     noNav:true},
  login:       {C:Login,       noNav:true},
  reg1:        {C:Reg1,        noNav:true},
  reg2:        {C:Reg2,        noNav:true},
  reg3:        {C:Reg3,        noNav:true},
  reg4:        {C:Reg4,        noNav:true},
  forgot:      {C:Forgot,      noNav:true},
  legal:       {C:Legal,       noNav:true},
  onboard:     {C:Onboard,     noNav:true},
  perm_mic:    {C:(p)=><Perm {...p} type="mic"/>,  noNav:true},
  perm_gps:    {C:(p)=><Perm {...p} type="gps"/>,  noNav:true},
  perm_notif:  {C:(p)=><Perm {...p} type="notif"/>,noNav:true},
  // User flow
  home_user:   {C:HomeUser,    role:"user",  tab:"home"},
  voice_idle:  {C:VoiceIdle,   role:"user",  tab:"talk"},
  voice_listen:{C:VoiceListen, role:"user",  tab:"talk"},
  voice_proc:  {C:VoiceProc,   role:"user",  tab:"talk"},
  voice_resp:  {C:VoiceResp,   role:"user",  tab:"talk"},
  aac_main:    {C:AACMain,     role:"user",  tab:"talk"},
  aac_cat:     {C:AACCat,      role:"user",  tab:"talk"},
  guided_q:    {C:GuidedQ,     role:"user",  tab:"talk"},
  // Activities
  activities:  {C:ActHub,      role:"user",  tab:"activities"},
  breath_i:    {C:BreathI,     role:"user",  tab:"activities"},
  breath_a:    {C:BreathA,     role:"user",  tab:"activities"},
  breath_done: {C:BreathDone,  role:"user",  tab:"activities"},
  box_breath:  {C:BoxBreath,   role:"user",  tab:"activities"},
  grounding:   {C:Grounding,   role:"user",  tab:"activities"},
  emergency:   {C:Emergency,   role:"user",  tab:"activities"},
  calm_mode:   {C:CalmMode,    role:"user",  tab:"activities"},
  act_hist:    {C:ActHist,     role:"user",  tab:"activities"},
  body_scan:   {C:CalmMode,    role:"user",  tab:"activities"},
  // User dashboards
  journey_dash:{C:JourneyDash, role:"user",  tab:"home"},
  weekly_sum:  {C:WeeklySummary,role:"user", tab:"home"},
  // Medical history
  med_hub:     {C:MedHub,      role:"user",  tab:"medical"},
  visits:      {C:Visits,      role:"user",  tab:"medical"},
  add_visit:   {C:AddVisit,    role:"user",  tab:"medical"},
  diagnoses:   {C:Diagnoses,   role:"user",  tab:"medical"},
  dx_detail:   {C:DxDetail,    role:"user",  tab:"medical"},
  medications: {C:Medications, role:"user",  tab:"medical"},
  med_adherence:{C:MedAdherence,role:"user", tab:"medical"},
  labs:        {C:Labs,        role:"user",  tab:"medical"},
  lab_detail:  {C:LabDetail,   role:"user",  tab:"medical"},
  allergies:   {C:Allergies,   role:"user",  tab:"medical"},
  fam_hist:    {C:FamHist,     role:"user",  tab:"medical"},
  // Screening
  screen_hub:  {C:ScreenHub,   role:"user",  tab:"medical"},
  phq9:        {C:PHQ9,        role:"user",  tab:"medical"},
  gad7:        {C:GAD7,        role:"user",  tab:"medical"},
  screen_result:{C:ScreenResult,role:"user", tab:"medical"},
  screen_hist: {C:ScreenHist,  role:"user",  tab:"medical"},
  // Clinician report (accessible both roles)
  clin_report: {C:ClinReport,  role:"user",  tab:"medical"},
  // Settings
  settings:    {C:Settings,    role:"user",  tab:"settings"},
  gps:         {C:GPS,         role:"user",  tab:"settings"},
  // Taker flow
  taker_home:  {C:TakerHome,   role:"taker", tab:"dashboard"},
  clin_bi:     {C:ClinBI,      role:"taker", tab:"dashboard"},
  ai_flags:    {C:AIFlags,     role:"taker", tab:"dashboard"},
  rag_chat:    {C:RagChat,     role:"taker", tab:"control"},
  taker_conn:  {C:TakerConn,   role:"taker", tab:"connect"},
  taker_cal:   {C:TakerCal,    role:"taker", tab:"calendar"},
  dev_mode:    {C:DevMode,     role:"taker", tab:"control"},
  // System (no nav)
  checkin:     {C:CheckIn,     noNav:true},
  offline:     {C:Offline,     role:"user",  tab:"home"},
  empty:       {C:EmptyState,  role:"user",  tab:"home"},
  error_sc:    {C:ErrorSc,     role:"user",  tab:"home"},
  loading:     {C:Loading,     role:"user",  tab:"home"},
};

/* ─────────────────────────────────────────────
   NAVIGATOR GROUPS
───────────────────────────────────────────── */
const NAV = [
  {g:"Auth Flow", ss:[["welcome","Welcome"],["login","Login"],["reg1","Register 1"],["reg2","Register 2"],["reg3","Register 3"],["reg4","Register 4"],["forgot","Forgot PW"],["legal","Legal"],["onboard","Onboarding"],["perm_mic","Perm: Mic"],["perm_gps","Perm: GPS"],["perm_notif","Perm: Notif"]]},
  {g:"Communication", ss:[["voice_idle","Voice Idle"],["voice_listen","Listening"],["voice_proc","Processing"],["voice_resp","Response"],["aac_main","AAC Board"],["aac_cat","AAC Category"],["guided_q","Clinical Q's"]]},
  {g:"Activities", ss:[["activities","Hub"],["breath_i","4-7-8 Intro"],["breath_a","Breathing"],["breath_done","Done!"],["box_breath","Box Breathing"],["grounding","Grounding"],["emergency","Emergency"],["calm_mode","Calm Mode"],["act_hist","History"]]},
  {g:"User Home & Dashboard", ss:[["checkin","Check-in Prompt"],["home_user","User Home"],["journey_dash","My Journey"],["weekly_sum","Weekly Summary"]]},
  {g:"Medical History", ss:[["med_hub","Med Hub"],["visits","Visits"],["add_visit","Add Visit"],["diagnoses","Diagnoses"],["dx_detail","Dx Detail"],["medications","Medications"],["med_adherence","Adherence"],["labs","Labs"],["lab_detail","Lab Detail"],["allergies","Allergies"],["fam_hist","Family Hx"]]},
  {g:"Clinical Screening", ss:[["screen_hub","Screening Hub"],["phq9","PHQ-9"],["gad7","GAD-7"],["screen_result","Result"],["screen_hist","History"]]},
  {g:"Taker & Clinical AI", ss:[["taker_home","Taker Home"],["clin_bi","Clinical BI"],["ai_flags","AI Flags"],["clin_report","Dr. Report"],["rag_chat","RAG Chat"],["taker_conn","Connect"],["taker_cal","Calendar"],["dev_mode","Dev Mode"]]},
  {g:"Settings & System", ss:[["settings","Settings"],["gps","GPS"],["offline","Offline"],["empty","Empty State"],["error_sc","Error"],["loading","Loading"]]},
];

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [cur, setCur] = useState("welcome");
  const [open, setOpen] = useState(false);

  const go = (id) => {
    if (SCREENS[id]) { setCur(id); setOpen(false); }
    else setCur("home_user");
  };

  const onTab = (tabId) => {
    const map = {
      talk:"voice_idle", activities:"activities", home:"home_user",
      medical:"med_hub", settings:"settings",
      connect:"taker_conn", dashboard:"taker_home",
      calendar:"taker_cal", control:"rag_chat",
    };
    if (map[tabId]) setCur(map[tabId]);
  };

  const sc = SCREENS[cur] || SCREENS.welcome;
  const Comp = sc.C;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: CSS}}/>

      {/* ── Collapsible meta-nav ── */}
      <div className="mnav">
        <button className="mnavtg" onClick={()=>setOpen(o=>!o)}>
          <span style={{fontSize:13}}>{open?"▲":"▼"}</span>
          {open ? "HIDE SCREEN NAVIGATOR" : "▼  SCREEN NAVIGATOR — tap to browse all screens"}
          <span style={{background:T.primary,color:"#fff",borderRadius:100,padding:"2px 8px",fontSize:9,fontWeight:800,marginLeft:6}}>
            {Object.keys(SCREENS).length} screens
          </span>
        </button>
        {open && (
          <div className="mnavpanel">
            <div className="mnvbar">
              {NAV.map(grp=>(
                <div key={grp.g} className="mnvgrp">
                  <div className="mnvgl">{grp.g}</div>
                  <div className="mnvrow">
                    {grp.ss.map(([id,lbl])=>(
                      <button key={id} className={`mnvbtn${cur===id?" on":""}`} onClick={()=>go(id)}>{lbl}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Phone shell ── */}
      <div style={{paddingTop:40,display:"flex",justifyContent:"center",alignItems:"flex-start",minHeight:"100vh"}}>
        <div className="shell">
          <div className="scr">
            <Comp go={go}/>
          </div>
          {!sc.noNav && (
            <BNav role={sc.role||"user"} active={sc.tab} onNav={onTab}/>
          )}
        </div>
      </div>
    </>
  );
}
