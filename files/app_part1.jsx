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
