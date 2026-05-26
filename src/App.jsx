import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.png";
import { Bell, HeartPulse, BedDouble, Zap, Pill, ClipboardList, CalendarDays, Stethoscope, Hospital, FlaskConical, CheckCircle2, AlertCircle, ShieldCheck, TrendingUp, Users, User, Mic, Activity, Home, Settings2, MessageCircle, BarChart3, Wrench, FileText, SignalHigh, BatteryCharging, Layers, Palette, Type, ChevronLeft, Database, Settings, ChevronRight } from "lucide-react";

/* 
 DESIGN TOKENS
 */
const T = {
 primary:"#4F8EF7", primaryDark:"#2D6FD9", primarySoft:"#EEF4FF",
 accent:"#F5A623", accentSoft:"#FFF4E0",
 success:"#3EC98E", successSoft:"#E8FBF3",
 danger:"#E05C5C", dangerSoft:"#FDEAEA",
 taker:"#9B6DFF", takerSoft:"#F3EEFF",
 n900:"#1A1D2E", n700:"#3D4060", n500:"#7A7F9A",
 n300:"#C4C8DA", n100:"#F4F5FA", surf:"#FFFFFF",
 // Clinical
 clin:"#1E7E6E", clinSoft:"#E8F5F3", clinDark:"#145A4E",
 phq:"#5B4FCF", phqSoft:"#EEE8FF",
 gad:"#D4700A", gadSoft:"#FFF0E0",
 mmse:"#1E6BAE", mmseSoft:"#E3F0FB",
 med:"#27AE60", medSoft:"#E9F7EF",
 lab:"#8E44AD", labSoft:"#F5EEF8",
 icd:"#2C3E50",
 // AAC Fitzgerald
 aacY:"#FFD700", aacO:"#FF8C00", aacG:"#3CB371",
 aacB:"#4169E1", aacW:"#F8F8F8", aacP:"#FF69B4",
 aacPu:"#8A2BE2",aacR:"#DC143C",
};

/* 
 GLOBAL CSS
 */
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
body{font-family:var(--fn);background:url('https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&w=2000&q=80') center/cover fixed #1a1a1a;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;padding-top:40px}
.shell{width:390px;height:844px;background:var(--sf);border-radius:48px;overflow:hidden;position:relative;box-shadow:15px 30px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(0,0,0,0.5),inset 0 1px 4px rgba(255,255,255,0.3);display:flex;flex-direction:column}
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
.fltbtn{display:none !important;}
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

let LM_STUDIO_URL = "http://127.0.0.1:1234/api/v1/chat";

// Fetch raw config from GitHub at startup to dynamically update LM Studio URL if overridden
fetch("https://raw.githubusercontent.com/JuanDLemus/capstone/main/config.json?t=" + Date.now())
  .then(res => res.json())
  .then(config => {
    if (config.lm_studio_url) {
      LM_STUDIO_URL = config.lm_studio_url;
    }
  })
  .catch(() => {});

const RESPONSE_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "chat_response",
    strict: true,
    schema: {
      type: "object",
      properties: {
        reply: { type: "string" },
        summary: { type: "string" },
        intent: { type: "string" }
      },
      required: [
        "reply",
        "summary",
        "intent"
      ],
      additionalProperties: false
    }
  }
};

async function sendToModel(userText, conversationMessages = []) {
  const simulatedRAG = `
PATIENT FILE:
Name: Maria.
Conditions: Clinical Depression (PHQ-9 Score: 16 - Mod-Severe), Generalized Anxiety (GAD-7 Score: 16 - Severe).
Current Medications: Sertraline 50mg.
Recent Trends: Overall stress improving. Vocal pacing was speaking faster today (possible anxiety cue).
APP WORKFLOW CONTEXT:
EchoVolt is a cognitive accessibility app. If the user indicates extreme anxiety or panic, suggest navigating to the "Breathing Exercise" or "Emergency Dial" modules. If they indicate a medication issue, suggest checking the "Medication Hub".
`;

  // Stringify previous history since the custom endpoint might only take a single 'input'
  const historyText = conversationMessages.length > 0 
    ? "Conversation History:\n" + conversationMessages.map(m => `${m.sender}: ${m.text}`).join("\n") + "\n\nUser:" 
    : "";

  const payload = {
    model: "openai/gpt-oss-20b",
    system_prompt: `You operate as EchoVolt API. You MUST output ONLY raw JSON without any markdown formatting. Follow this EXACT format: {"reply":"your short response","summary":"3 words","intent":"navigation intent"}. Do not add any conversational text before or after the JSON block. RAG Context:\n${simulatedRAG}`,
    input: `${historyText} ${userText}`
  };

  const res = await fetch(LM_STUDIO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  
  // Extract response based on standard custom chat endpoint schemas, or fallback to choices array
  let raw = data?.response ?? data?.reply ?? data?.text ?? data?.choices?.[0]?.message?.content ?? "";
  
  // Clean potential markdown blocks
  raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    // If it still truncates, construct a safe fallback object
    console.warn("JSON Parse err, text was:", raw);
    parsed = { reply: raw.replace(/[{}"\\]/g,''), summary: "Parsing Error", intent: "unknown" };
  }

  return { raw, parsed, full: data };
}



function useSpeechRecognition(onResult) {
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onResult]);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  };

  return { isListening, startListening };
}

/* 
 SHARED COMPONENTS
 */
const SBar = ({dark})=>(
 <div className="sbar" style={{color:dark?"#fff":T.n900}}>
 <span className="stm">9:41</span><span className="sic"><SignalHigh size={14} style={{marginRight:6}}/><BatteryCharging size={14}/></span>
 </div>
);
const PHeader = ({title,onBack,right})=>(
 <div className="phdr">
 {onBack&&<button className="bkb" onClick={onBack} style={{color:T.n700}}><ChevronLeft size={22}/></button>}
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
 <span style={{fontSize:17,flexShrink:0}}><ShieldCheck size={16} color={T.danger}/></span>
 <p style={{fontSize:11,color:T.danger,lineHeight:1.5,fontWeight:600}}>
 {short?"Pattern analysis only  not a medical diagnosis. Always consult a qualified clinician."
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
 {action&&<button className="btn bsm" style={{background:c+"18",color:c,border:`1px solid ${c}44`,borderRadius:50,padding:"6px 14px",fontSize:12}} onClick={onAct}>{action} </button>}
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

/* 
 BOTTOM NAV
 */
const BNav=({role,active,onNav})=>{
 const base=[
 {id:"talk",Icon:Mic,lbl:"Talk"},
 {id:"activities",Icon:Activity,lbl:"Activities"},
 {id:"dashboard",Icon:BarChart3,lbl:"Dashboard"},
 {id:"settings",Icon:Settings2,lbl:"Settings"},
 ];
 const items = role==="user"
 ? base
 : role==="snu"
 ? base.filter(i=>i.id!=="settings")
 : role==="taker"
 ? base.filter(i=>i.id!=="talk")
 : base;
 const activeId = active==="home"?"dashboard":active;
 return(
 <div className="bnav">
 {items.map(it=>(
 <button key={it.id} className={`ni${activeId===it.id?" on":""}`} onClick={()=>onNav(it.id)}>
 <span className="ico"><it.Icon size={18}/></span><span className="lbl">{it.lbl}</span>
 </button>
 ))}
 </div>
 );
};

const RoleSwitch=({role,onSwitch})=>{
 const options=[
 {id:"user",label:"User"},
 {id:"snu",label:"SNU"},
 {id:"taker",label:"Taker"},
 ];
 return(
 <div style={{padding:"10px 18px",display:"flex",justifyContent:"space-around",gap:10,background:"rgba(255,255,255,.92)",borderBottom:"1px solid rgba(0,0,0,.08)"}}>
 {options.map(opt=>(
 <button key={opt.id} onClick={()=>onSwitch(opt.id)} style={{flex:1,minWidth:0,padding:"10px 12px",borderRadius:20,border:`1px solid ${role===opt.id?T.primary:"rgba(148,163,184,.3)"}`,background:role===opt.id?T.primary: T.surf,color:role===opt.id?"#fff":T.n700,fontWeight:800,cursor:"pointer",fontSize:12}}>{opt.label}</button>
 ))}
 </div>
 );
};



/* 
 A1 WELCOME
 */
const Welcome=({go})=>(
 <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column",padding:"0 28px 40px",position:"relative",overflow:"hidden"}}>
 <SBar/>
 <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18,textAlign:"center"}}>
 <img src={logo} alt="EchoVolt" style={{width:200,height:200,objectFit:"contain"}}/>
 <div>
 <h1 style={{fontFamily:"var(--fb)",fontSize:40,fontWeight:800,color:T.n900,letterSpacing:-1.2,marginBottom:10}}>ECHOVOLT</h1>
 <p style={{color:T.n700,fontSize:15,marginTop:0,lineHeight:1.75,maxWidth:280}}>Voice-first care tools for daily wellbeing and simple support.</p>
 </div>
 </div>
 <div className="col gap12" style={{paddingTop:10}}>
 <button className="btn bp bw blg" onClick={()=>go("login")}>Log In</button>
 <button className="btn bs bw blg" style={{background:T.surf,color:T.primary,border:`1px solid ${T.primary}`}} onClick={()=>go("reg1")}>Create Account</button>
 <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:6,fontSize:12,color:T.n500}}>
 <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("legal")}>Privacy & Terms</span>
 <span style={{color:T.n300}}></span>
 <span>Not a medical device</span>
 </div>
 </div>
 </div>
);

/* A2 LOGIN */
const Login=({go})=>(
 <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <div style={{flex:1,padding:"20px 28px 40px",display:"flex",flexDirection:"column"}}>
 <button className="btn bg bsm" style={{alignSelf:"flex-start",paddingLeft:0,color:T.primary}} onClick={()=>go("welcome")}>Back</button>
 <div style={{marginTop:28,marginBottom:28}}>
 <h2 style={{fontFamily:"var(--fb)",fontSize:28,fontWeight:800,color:T.n900}}>Log in</h2>
 <p style={{color:T.n500,marginTop:6}}>Access your EchoVolt account</p>
 </div>
 <div className="col gap16">
 <div><label className="inpl">Email</label><input className="inp mt8" type="email" placeholder="you@example.com" style={{marginTop:8}}/></div>
 <div>
 <label className="inpl">Password</label><input className="inp mt8" type="password" placeholder="Enter your password" style={{marginTop:8}}/>
 <div style={{textAlign:"right",marginTop:6}}><span style={{fontSize:13,color:T.primary,fontWeight:700,cursor:"pointer"}} onClick={()=>go("forgot")}>Forgot password?</span></div>
 </div>
 <button className="btn bp bw blg" onClick={()=>go("home_user")}>Continue</button>
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
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("welcome")}>Back</button>
 <div style={{marginTop:14}}>
 <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n===1?T.primary:T.n300}}/>)}</div>
 <span className="chip cpr">Step 1 of 4</span>
 <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Account details</h2>
 <p style={{color:T.n500,fontSize:13,marginTop:8,maxWidth:320}}>Enter the basic details to create your account.</p>
 </div>
 <div className="card mt16 col gap16">
 <div><label className="inpl">Full name</label><input className="inp mt8" placeholder="Your name" style={{marginTop:8}}/></div>
 <div><label className="inpl">Email address</label><input className="inp mt8" type="email" placeholder="you@example.com" style={{marginTop:8}}/></div>
 <div><label className="inpl">Password</label><input className="inp mt8" type="password" placeholder="Create a secure password" style={{marginTop:8}}/></div>
 </div>
 <button className="btn bp bw blg mt24" onClick={()=>go("reg2")}>Continue</button>
 </div>
 </div>
);
const Reg2=({go,setRole})=>{
 const [sel,setSel]=useState(null);
 const roles=[
 {id:"user",Icon:User,label:"User",desc:"Manage your own journal and health information",col:T.primary},
 {id:"snu",Icon:Users,label:"Special Needs User",desc:"A caregiver supports my account",col:T.success},
 {id:"taker",Icon:Users,label:"Taker",desc:"I care for someone and view their wellbeing",col:T.taker},
 ];
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><div style={{padding:"12px 28px 40px"}}>
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg1")}>Back</button>
 <div style={{marginTop:14}}>
 <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n<=2?T.primary:T.n300}}/>)}</div>
 <span className="chip cpr">Step 2 of 4</span>
 <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Choose your role</h2>
 </div>
 <div className="col gap12 mt16">
 {roles.map(r=>(
 <button key={r.id} className="card" style={{textAlign:"left",cursor:"pointer",border:`2px solid ${sel===r.id?r.col:"transparent"}`,background:sel===r.id?r.col+"11":T.surf,transition:"all .2s",padding:16}} onClick={()=>setSel(r.id)}>
 <div className="row" style={{gap:12}}>
 <div style={{width:42,height:42,borderRadius:14,background:r.col+"22",display:"flex",alignItems:"center",justifyContent:"center"}}><r.Icon size={18} color={r.col}/></div>
 <div style={{flex:1}}>
 <div style={{fontWeight:800,fontSize:15,color:T.n900}}>{r.label}</div>
 <div style={{fontSize:12,color:T.n500,marginTop:4,lineHeight:1.4}}>{r.desc}</div>
 </div>
 <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${sel===r.id?r.col:T.n300}`,background:sel===r.id?r.col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff"}}>{sel===r.id&&""}</div>
 </div>
 </button>
 ))}
 </div>
 <button className="btn bp bw blg mt24" onClick={()=>{ if(sel){ setRole(sel); go("reg3"); } }} disabled={!sel} style={{opacity:sel?1:0.45,cursor:sel?"pointer":"not-allowed"}}>Continue</button>
 </div>
 </div>
 );
};
const Reg3=({go})=>{
 const [tg,setTg]=useState({aac:false,cb:false,lt:false,hc:false,mic:true});
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><div style={{padding:"12px 28px 40px"}}>
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg2")}>Back</button>
 <div style={{marginTop:14}}>
 <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:n<=3?T.primary:T.n300}}/>)}</div>
 <span className="chip cpr">Step 3 of 4</span>
 <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Accessibility</h2>
 <p style={{color:T.n500,fontSize:13,marginTop:8,maxWidth:320}}>Choose the accessibility features that help you most.</p>
 </div>
 <div className="card mt16 col gap12">
 <SRow label="Microphone" sub="Enable voice entry" right={<Toggle checked={tg.mic} onChange={v=>setTg(p=>({...p,mic:v}))}/>}/>
 <SRow label="Symbol cards" sub="Simplified pictorial choices" right={<Toggle checked={tg.aac} onChange={v=>setTg(p=>({...p,aac:v}))}/>}/>
 <SRow label="Color mode" sub="Colorblind friendly" right={<Toggle checked={tg.cb} onChange={v=>setTg(p=>({...p,cb:v}))}/>}/>
 <SRow label="Large text" sub="Easier to read labels" right={<Toggle checked={tg.lt} onChange={v=>setTg(p=>({...p,lt:v}))}/>}/>
 <SRow label="High contrast" sub="Sharper visuals" right={<Toggle checked={tg.hc} onChange={v=>setTg(p=>({...p,hc:v}))}/>}/>
 </div>
 <button className="btn bp bw blg mt24" onClick={()=>go("reg4")}>Continue</button>
 </div>
 </div>
 );
};
const Reg4=({go})=>{
 const [freq,setFreq]=useState("Daily");
 const [time,setTime]=useState("09:00");
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><div style={{padding:"12px 28px 40px"}}>
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("reg3")}>Back</button>
 <div style={{marginTop:14}}>
 <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:T.primary}}/>)}</div>
 <span className="chip cpr">Step 4 of 4</span>
 <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900,marginTop:10}}>Reminder settings</h2>
 <p style={{color:T.n500,fontSize:13,marginTop:8,maxWidth:320}}>Pick a reminder schedule that fits your day.</p>
 </div>
 <div className="card mt16 col gap16">
 <div>
 <label className="inpl">Frequency</label>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(100px,1fr))",gap:10,marginTop:10}}>
 {["Daily","Twice daily","Weekly","Custom"].map(f=>(
 <button key={f} type="button" className="btn bsm" onClick={()=>setFreq(f)} style={{width:'100%',border:freq===f?`2px solid ${T.primary}`:`1px solid ${T.n300}`,background:freq===f?T.primarySoft:T.surf,color:freq===f?T.primary:T.n900,fontWeight:freq===f?800:700}}>{f}</button>
 ))}
 </div>
 </div>
 <div>
 <label className="inpl">Preferred time</label>
 <input className="inp mt8" type="time" value={time} onChange={e=>setTime(e.target.value)} style={{marginTop:8}}/>
 </div>
 </div>
 <div className="card mt16" style={{background:T.successSoft,border:`1px solid ${T.success}33`}}>
 <div style={{fontWeight:800,color:T.n900,fontSize:17}}>You're ready</div>
 <p style={{fontSize:13,color:T.n700,marginTop:6,lineHeight:1.6}}>Your first reminder will arrive at the chosen time.</p>
 </div>
 <button className="btn bk bw blg mt20" onClick={()=>go("home_user")}>Finish setup</button>
 </div>
 </div>
 );
};

/* A7 FORGOT PW */
const Forgot=({go})=>{
 const [sent,setSent]=useState(false);
 return(
 <div style={{background:T.surf,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/><div style={{flex:1,padding:"20px 28px 40px",display:"flex",flexDirection:"column"}}>
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.primary}} onClick={()=>go("login")}> Back</button>
 <div style={{marginTop:40,textAlign:"center"}}>
 <div style={{fontSize:60,marginBottom:16}}>{sent?"":""}</div>
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
 <span style={{fontSize:18}}></span>
 <div><div style={{fontWeight:800,fontSize:13,color:T.n900}}>Medical Disclaimer</div>
 <div style={{fontSize:12,color:T.n700,marginTop:2,lineHeight:1.5}}>This app is NOT a medical device and does NOT diagnose, treat, or predict any medical or mental health condition. It is a data companion only.</div></div>
 </div>
 {[
 ["1. What We Collect","Daily journal entries (voice/text), mood ratings, symptom logs, medication adherence, screening responses (PHQ-9, GAD-7), GPS location (if enabled), and usage metadata. No raw biometric audio is stored."],
 ["2. Clinical Data Processing","Your entries are processed by an LLM to extract structured clinical data points mapped to ICD-10/DSM-5 categories. Screening scores are calculated using validated algorithms. All processing uses anonymised identifiers  your name and email are never sent to AI APIs."],
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

/* 
 COMMUNICATION SCREENS
 */
const VoiceIdle=({go})=>{
 const [trans,setTrans]=useState(false);
 return (
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar/>
   <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 28px 28px"}}>
    <div style={{textAlign:"center",transition:"opacity .5s",opacity:trans?0:1,marginTop:40}}>
     <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:700,color:T.n900}}>How are you doing?</h2>
     <p style={{color:T.n500,fontSize:13,marginTop:6}}>Tap to talk, or choose another input method</p>
    </div>
    <div style={{position:"relative",width:190,height:190,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto"}}>
     <div style={{position:"absolute",width:190,height:190,borderRadius:"50%",border:`2px solid ${trans?T.dangerSoft:T.primarySoft}`,transition:"all .5s"}}/>
     <div style={{position:"absolute",width:150,height:150,borderRadius:"50%",border:`2px solid ${trans?"rgba(224,92,92,.3)":"rgba(79,142,247,.2)"}`,transition:"all .5s"}}/>
     <button style={{position:"relative",zIndex:10,width:114,height:114,borderRadius:"50%",background:trans?"linear-gradient(135deg,#E05C5C,#b04040)":"linear-gradient(135deg,#4F8EF7,#2D6FD9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 60px ${trans?"rgba(224,92,92,.3)":"rgba(79,142,247,.3)"}`,transition:"all .5s",animation:trans?"ripple 1.5s infinite":""}} onClick={()=>{setTrans(true);setTimeout(()=>go("voice_listen"),800);}}>
      <Mic size={38} color="#fff" />
     </button>
    </div>
    <div style={{display:"flex",gap:10,width:"100%",transition:"all .4s ease",opacity:trans?0:1,transform:trans?"translateY(20px)":"translateY(0)"}}>
     <button className="btn f1" style={{background:T.surf,color:T.n700,border:`1px solid ${T.n300}`,borderRadius:50,fontWeight:800,fontSize:13,padding:"12px 16px",display:"flex",gap:8,alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(26,29,46,.05)"}} onClick={()=>go("guided_q")}> <FileText size={16}/>Questions</button>
     <button className="btn f1" style={{background:T.surf,color:T.n700,border:`1px solid ${T.n300}`,borderRadius:50,fontWeight:800,fontSize:13,padding:"12px 16px",display:"flex",gap:8,alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(26,29,46,.05)"}} onClick={()=>go("aac_main")}> <Layers size={16}/>AAC Cards</button>
    </div>
   </div>
  </div>
 );
};

const VoiceListen=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar/>
  <div style={{background:T.dangerSoft,padding:"5px 16px",borderRadius:100,display:"flex",alignItems:"center",gap:8,alignSelf:"center",marginTop:40}}>
   <div style={{width:8,height:8,borderRadius:"50%",background:T.danger,animation:"pulse 1s infinite"}}/>
   <span style={{fontSize:12,color:T.danger,fontWeight:800}}>LISTENING</span>
  </div>
  <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px"}}>
   <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:190,height:190,marginBottom:40}}>
    <div style={{position:"absolute",width:180,height:180,borderRadius:"50%",border:`2px solid ${T.dangerSoft}`,animation:"ripple 1.5s infinite",pointerEvents:"none"}}/>
    <button style={{position:"relative",zIndex:10,width:114,height:114,borderRadius:"50%",background:`linear-gradient(135deg,${T.danger},#b04040)`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 60px rgba(224,92,92,.3)`}} onClick={()=>go("voice_proc")}>
     <Mic size={38} color="#fff" />
    </button>
   </div>
   <div style={{display:"flex",alignItems:"center",gap:4,height:44}}>
   {[.3,.6,1,.8,.5,.9,.4,.7,1,.6,.3,.8,.5].map((h,i)=>(
   <div key={i} className="wvb" style={{height:`${h*36}px`,animation:`wave ${.6+Math.random()*.5}s ease-in-out infinite`,animationDelay:`${i*.07}s`}}/>
   ))}
   </div>
   <div style={{background:T.surf,borderRadius:14,padding:"10px 18px",width:"100%",marginTop:30,marginBottom:20,boxShadow:"0 2px 8px rgba(26,29,46,.05)"}}>
   <p style={{color:T.n700,fontSize:13,lineHeight:1.6,fontStyle:"italic"}}>"Today I took my Sertraline, I'm feeling a bit tired but less anxious than yesterday..."</p>
   </div>
   <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,marginBottom:28}}>
    <p style={{color:T.n500,fontSize:13}}>Tap to stop</p>
    <button onClick={()=>go("voice_idle")} style={{background:"transparent",border:"none",color:T.n500,fontSize:13,textDecoration:"underline",cursor:"pointer",position:"relative",zIndex:10}}>Cancel</button>
   </div>
  </div>
 </div>
);

const VoiceProc=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"0 40px",textAlign:"center"}}>
 <SBar/>
 <div style={{width:80,height:80,borderRadius:"50%",background:T.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}><Activity size={36} color={T.primary} /></div>
 <div style={{width:56,height:56,borderRadius:"50%",border:"3px solid transparent",borderTopColor:T.primary,animation:"spin 1s linear infinite"}}/>
 <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:700,color:T.n900}}>Understanding your entry...</h2>
 <p style={{color:T.n500,fontSize:13,lineHeight:1.6}}>Organizing what you shared into your journal.</p>
 <div className="col gap8">
 {["Saving audio...","Understanding your words...","Organizing your entry...","Updating your tracking...","Saving to your journal"].map((s,i)=>(
 <div key={i} style={{fontSize:12,color:i<2?T.success:i===2?T.primary:T.n500,textAlign:"center"}}>{s}</div>
 ))}
 </div>
 <button className="btn bg" style={{color:T.n500,marginTop:12}} onClick={()=>go("voice_resp")}>Skip preview </button>
 </div>
);

const VoiceResp=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/>
 <div style={{padding:"16px 20px 40px"}}>
 <div className="row mb16">
 <span className="chip cok" style={{display:"inline-flex", gap:4, alignItems:"center"}}><CheckCircle2 size={12}/> Entry Captured</span>
 <span style={{fontSize:12,color:T.n500}}>Today, 9:41 AM</span>
 </div>
 <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:T.n900}}>Here's what I understood</h2>
 <p style={{color:T.n500,fontSize:13,marginTop:4}}>Review before saving to your journal</p>
 <div className="col gap10 mt16">
 {[
 {ico:<Pill size={20}/>,lbl:"Medication",val:"Sertraline taken",cat:"Tracking",col:T.med},
 {ico:<HeartPulse size={20}/>,lbl:"Mood",val:"Better than yesterday",cat:"General",col:T.primary},
 {ico:<Activity size={20}/>,lbl:"Anxiety",val:"Reduced, mild",cat:"Feeling Worried",col:T.accent},
 {ico:<BatteryCharging size={20}/>,lbl:"Energy",val:"Tired",cat:"Feeling Tired",col:T.n500},
 {ico:<MessageCircle size={20}/>,lbl:"Appetite",val:"Normal",cat:"Eating Habits",col:T.success},
 ].map(it=>(
 <div key={it.lbl} className="card">
 <div className="rwb">
 <div className="row" style={{gap:10}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10,background:it.col+"15",color:it.col}}>{it.ico}</div>
 <div>
 <div style={{fontSize:10,color:T.n500,fontWeight:800,textTransform:"uppercase",letterSpacing:.4}}>{it.cat}</div>
 <div style={{fontWeight:700,color:T.n900,fontSize:14}}>{it.lbl}</div>
 </div>
 </div>
 <div className="row" style={{gap:6}}>
 <span style={{fontSize:13,color:it.col,fontWeight:700}}>{it.val}</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 <div className="ab in mt16" style={{display:"flex", gap:8, alignItems:"center"}}>
 <span style={{fontSize:14}}><AlertCircle size={16} color={T.primary}/></span>
 <span style={{fontSize:12,color:T.n700}}>Pain level and sleep quality not mentioned - tap to add.</span>
 </div>
 <div style={{display:"flex",gap:10,marginTop:20}}>
 <button className="btn bs f1" onClick={()=>go("voice_idle")}>Re-record</button>
 <button className="btn bk f1" style={{display:"flex", gap:6, alignItems:"center"}} onClick={()=>go("home_user")}><CheckCircle2 size={16}/> Save to Record</button>
 </div>
 </div>
 </div>
);

const AACMain=({go})=>{
 const [wds, setWds] = useState([]);
 const [cat, setCat] = useState(null);

 const fitzCats=[
  { l:"PRONOUNS", bg:T.aacY, w:["I", "You", "He", "She", "We", "They", "It", "Me"] },
  { l:"NOUNS", bg:T.aacO, w:["Apple", "Book", "Car", "House", "Dog", "Cat", "Water", "Food", "Toilet", "Football"] },
  { l:"VERBS", bg:T.aacG, w:["Want", "Go", "Stop", "Think", "Am", "Is", "Have", "Like", "Make", "Look"] },
  { l:"ADJECTIVES", bg:T.aacB, w:["Happy", "Sad", "Mad", "Good", "Bad", "Big", "Small", "Hot", "Cold", "Tired"] },
  { l:"PREP/SOCIAL", bg:T.aacP, w:["In", "On", "Under", "Up", "Down", "Hello", "Bye", "Please", "Thanks", "With"] },
  { l:"QUESTIONS", bg:T.aacPu, w:["Who", "What", "When", "Where", "Why", "How"] },
  { l:"NEGATION", bg:T.aacR, w:["Not", "Don't", "Can't", "Won't"] },
  { l:"ADVERBS", bg:"#B8860B", w:["Now", "Later", "Here", "There", "Fast", "Slow"] },
  { l:"CONJUNCTION", bg:T.aacW, brd:T.n300, w:["And", "But", "Or", "Because"] },
  { l:"DETERMINERS", bg:"#555555", w:["The", "A", "This", "That", "Some", "All"] }
 ];
 const coreWords=["Yes", "No", "Help"];
 const quickPhrases=[
   {l:"I'm hungry", bg:T.aacP},
   {l:"Need a break", bg:T.aacG},
   {l:"Let's go", bg:T.aacG},
   {l:"I don't know", bg:T.aacR}
 ];

 let interpreted = "";
 const wStr = wds.map(w=>w.l).join(" ").toLowerCase();
 if(wds.length>0){
   if(wStr.includes("i") && wStr.includes("football")) interpreted = "I want to watch a football match.";
   else if(wStr.includes("i") && wStr.includes("think") && wStr.includes("happy")) interpreted = "I think I am feeling happy.";
   else interpreted = wds.map(w=>w.l).join(" ") + " (Interpreting...)";
 }

 const addW = (w, bg) => setWds([...wds, {l:w, bg}]);

 return(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar/>
  <div style={{padding:"8px 14px",background:T.surf,display:"flex",flexDirection:"column",gap:8,minHeight:80,borderBottom:`1px solid ${T.n300}`,boxShadow:"0 2px 8px rgba(26,29,46,.05)",zIndex:10}}>
   <div style={{display:"flex",gap:8,alignItems:"center",width:"100%"}}>
    <div style={{flex:1,minHeight:42,background:T.n100,borderRadius:8,display:"flex",alignItems:"center",padding:"5px 10px",border:`1px solid ${T.n300}`,flexWrap:"wrap",gap:4}}>
     {wds.length === 0 && <span style={{color:T.n500,fontSize:13,fontWeight:700}}>Build your message...</span>}
     {wds.map((w,i)=>(
       <div key={i} style={{background:w.bg||T.n300,padding:"4px 8px",borderRadius:6,fontSize:12,fontWeight:800,color:w.bg===T.aacY||w.bg===T.aacW?"#1a1d2e":"#fff",boxShadow:"0 1px 3px rgba(0,0,0,.1)"}}>{w.l}</div>
     ))}
    </div>
    <button style={{background:T.dangerSoft,color:T.danger,border:"none",borderRadius:8,padding:"0 14px",height:42,fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>setWds(wds.slice(0,-1))}>DEL</button>
    <button style={{background:T.success,color:"#fff",border:"none",borderRadius:8,padding:"0 14px",height:42,fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(62,201,142,.3)",cursor:"pointer"}} onClick={()=>go("voice_resp")}>SAVE</button>
   </div>
   {interpreted && (
    <div style={{background:T.primarySoft,borderRadius:8,padding:"6px 10px",display:"flex",alignItems:"center",gap:8}}>
     <Zap size={14} color={T.primary}/>
     <span style={{color:T.primary,fontSize:12,fontWeight:700,flex:1}}>{interpreted}</span>
    </div>
   )}
  </div>
  
  <div style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column"}}>
   {!cat ? (
     <>
       <div style={{padding:"14px 14px 8px",fontWeight:800,fontSize:12,color:T.n500,textTransform:"uppercase",letterSpacing:0.5}}>Categories</div>
       <div style={{padding:"0 14px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {fitzCats.map(c=>(
         <div key={c.l} className="aaccard" style={{background:c.bg,borderColor:c.brd||"transparent",borderRadius:12,padding:"16px 8px",boxShadow:"0 2px 4px rgba(26,29,46,.06)"}} onClick={()=>setCat(c)}>
          <span className="aacwd" style={{color:c.bg===T.aacY||c.bg===T.aacW?"#1a1d2e":"#fff",fontSize:11,letterSpacing:0.5}}>{c.l}</span>
         </div>
        ))}
       </div>

       <div style={{padding:"14px 14px 8px",fontWeight:800,fontSize:12,color:T.n500,textTransform:"uppercase",letterSpacing:0.5}}>Quick Phrases</div>
       <div style={{padding:"0 14px",display:"flex",gap:8,overflowX:"auto",paddingBottom:10}}>
        {quickPhrases.map(q=>(
         <div key={q.l} className="aaccard" style={{background:q.bg,borderRadius:12,minHeight:54,padding:"0 16px",boxShadow:"0 2px 4px rgba(26,29,46,.06)",whiteSpace:"nowrap",cursor:"pointer"}} onClick={()=>addW(q.l, q.bg)}>
          <span className="aacwd" style={{fontSize:13,color:q.bg===T.aacY||q.bg===T.aacW?"#1a1d2e":"#fff"}}>{q.l}</span>
         </div>
        ))}
       </div>

       <div style={{padding:"20px 14px 8px",fontWeight:800,fontSize:12,color:T.n500,textTransform:"uppercase",letterSpacing:0.5}}>Core Words & Needs</div>
       <div style={{padding:"0 14px 20px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {coreWords.map(cw=>(
         <div key={cw} className="aaccard" style={{background:T.aacR,borderRadius:12,minHeight:54,boxShadow:"0 2px 4px rgba(26,29,46,.06)"}} onClick={()=>addW(cw, T.aacR)}>
          <span className="aacwd" style={{color:"#fff",fontSize:13}}>{cw}</span>
         </div>
        ))}
       </div>
     </>
   ) : (
     <>
       <div style={{padding:"14px",display:"flex",alignItems:"center",gap:10,background:T.surf,borderBottom:`1px solid ${T.n300}`}}>
        <button style={{background:"none",border:"none",color:T.primary,fontSize:14,fontWeight:800,cursor:"pointer"}} onClick={()=>setCat(null)}>← Back</button>
        <div style={{flex:1,textAlign:"center"}}><span style={{background:cat.bg,color:cat.bg===T.aacY||cat.bg===T.aacW?"#1a1d2e":"#fff",fontWeight:800,fontSize:12,padding:"4px 10px",borderRadius:8}}>{cat.l}</span></div>
        <div style={{width:40}}/>
       </div>
       <div style={{padding:"14px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {cat.w.map(w=>(
         <div key={w} className="aaccard" style={{background:cat.bg,borderColor:cat.brd||"transparent",borderRadius:12,minHeight:64,boxShadow:"0 2px 4px rgba(26,29,46,.06)",padding:"4px"}} onClick={()=>addW(w, cat.bg)}>
          <span className="aacwd" style={{color:cat.bg===T.aacY||cat.bg===T.aacW?"#1a1d2e":"#fff",fontSize:13}}>{w}</span>
         </div>
        ))}
       </div>
     </>
   )}
  </div>
 </div>
 );
};

const AACCat=()=>null;

/* GUIDED QUESTIONS  CLINICAL */
const GuidedQ=({go})=>{
 const [step,setStep]=useState(0);
 const [ans,setAns]=useState({});
 const qs=[
 {id:"mood",txt:"How are you feeling emotionally right now?",type:"emoji",opts:["","","","","","","",""],clin:"PHQ-9 Q1 proxy"},
 {id:"appetite",txt:"How was your appetite today?",type:"multi",opts:[" Ate normally"," Less than usual"," Skipped meals"," More than usual"],clin:"PHQ-9 Q5"},
 {id:"energy",txt:"Your energy level today?",type:"multi",opts:[" Full energy"," Good"," OK"," Tired"," Exhausted"],clin:"PHQ-9 Q4"},
 {id:"sleep",txt:"How did you sleep last night?",type:"multi",opts:[" Well (79 hrs)"," Fell asleep late"," Woke up often"," Too much"," Couldn't sleep"],clin:"PHQ-9 Q3 / GAD-7"},
 {id:"worry",txt:"How anxious or worried have you felt today?",type:"multi",opts:[" Not really"," A little"," Quite a lot"," Overwhelmed"],clin:"GAD-7 Q1"},
 {id:"meds",txt:"Did you take your medications today?",type:"multi",opts:[" Yes, all taken"," No, forgot"," Not yet"," No medications"],clin:"Adherence"},
 {id:"pain",txt:"Any physical pain or discomfort?",type:"multi",opts:[" None (0)"," Mild (13)"," Moderate (46)"," Severe (79)"," Worst (10)"],clin:"Somatic symptoms"},
 {id:"function",txt:"Could you do your usual daily activities?",type:"multi",opts:[" Yes, fully"," Partially"," Struggled"," Stayed in bed"],clin:"Functional capacity"},
 {id:"note",txt:"Anything else for your clinical record today?",type:"text",clin:"Open clinical note"},
 ];
 const q=qs[step];
 return(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <div style={{padding:"10px 20px",background:T.surf,borderBottom:`1px solid ${T.n100}`}}>
 <div className="rwb mb8">
 <button className="btn bg bsm" style={{paddingLeft:0,color:T.clin}} onClick={()=>step>0?setStep(s=>s-1):go("voice_idle")}> Back</button>
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
 {q.type==="text"&&<textarea className="inp" style={{height:110,resize:"none"}} placeholder="Type freely  this goes into your clinical record"/>}
 </div>
 <button className="btn bw blg" style={{background:T.clin,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px",opacity:q.type!=="text"&&ans[step]===undefined?.4:1}}
 onClick={()=>step<qs.length-1?setStep(s=>s+1):go("voice_resp")}>
 {step<qs.length-1?"Next ":" Save Clinical Entry"}
 </button>
 </div>
 </div>
 );
};

/* 
 ACTIVITIES
 */
const ActHub=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <div style={{background:`linear-gradient(135deg, ${T.primaryDark}, ${T.primary})`,padding:"30px 20px 40px",borderBottomLeftRadius:30,borderBottomRightRadius:30,boxShadow:"0 10px 30px rgba(79,142,247,.2)"}}>
  <h2 style={{fontFamily:"var(--fb)",fontSize:32,fontWeight:900,color:"#fff",lineHeight:1.1}}>How can we help?</h2>
  <p style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,.8)",marginTop:6}}>Select a tool to balance your mind.</p>
 </div>
 
 <div style={{flex:1,padding:"0 20px 24px",marginTop:-24,overflow:"auto"}}>
 
  <div style={{background:T.danger,padding:"20px",borderRadius:24,display:"flex",gap:16,alignItems:"center",boxShadow:`0 8px 24px ${T.danger}44`,cursor:"pointer",marginBottom:24}} onClick={()=>go("emergency")}>
   <div style={{background:"#fff",borderRadius:16,padding:12,display:"flex",alignItems:"center",justifyContent:"center"}}><AlertCircle color={T.danger} size={28} strokeWidth={3}/></div>
   <div>
    <h3 style={{fontFamily:"var(--fb)",color:"#fff",fontSize:20,fontWeight:900}}>I'm in a Crisis</h3>
    <p style={{color:"rgba(255,255,255,.8)",fontSize:13,fontWeight:600,marginTop:2}}>Tap for immediate Emergency Protocol</p>
   </div>
  </div>

  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
   <h4 style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:T.n900}}>Quick Relief (Under 5 mins)</h4>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:24}}>
   <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",border:`1px solid ${T.n300}66`}} onClick={()=>go("breath_i")}>
    <div style={{width:54,height:54,borderRadius:16,background:T.primary+"1A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Activity size={24} color={T.primary}/></div>
    <span style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:14}}>4-7-8 Breath</span>
    <span style={{fontSize:11,color:T.n500,fontWeight:600,marginTop:4}}>Calm nerves</span>
   </div>
   <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",border:`1px solid ${T.n300}66`}} onClick={()=>go("grounding")}>
    <div style={{width:54,height:54,borderRadius:16,background:T.accent+"1A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Zap size={24} color={T.accent}/></div>
    <span style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:14}}>5-4-3-2-1</span>
    <span style={{fontSize:11,color:T.n500,fontWeight:600,marginTop:4}}>Anchor focus</span>
   </div>
   <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",border:`1px solid ${T.n300}66`}} onClick={()=>go("box_breath")}>
    <div style={{width:54,height:54,borderRadius:16,background:T.success+"1A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Layers size={24} color={T.success}/></div>
    <span style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:14}}>Box Breath</span>
    <span style={{fontSize:11,color:T.n500,fontWeight:600,marginTop:4}}>Reset panic</span>
   </div>
   <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",border:`1px solid ${T.n300}66`}} onClick={()=>go("act_hist")}>
    <div style={{width:54,height:54,borderRadius:16,background:T.n500+"1A",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><CalendarDays size={24} color={T.n500}/></div>
    <span style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:14}}>Journey Log</span>
    <span style={{fontSize:11,color:T.n500,fontWeight:600,marginTop:4}}>Past sessions</span>
   </div>
  </div>

  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
   <h4 style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:T.n900}}>Deep Rest & Ambient</h4>
  </div>
  <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
   <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",alignItems:"center",gap:14,border:`1px solid ${T.n300}66`}} onClick={()=>go("calm_mode")}>
    <div style={{width:50,height:50,borderRadius:16,background:"#00BCD4"+"1A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><HeartPulse size={24} color="#00BCD4"/></div>
    <div>
     <div style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:15}}>Calm Mode</div>
     <div style={{fontSize:12,color:T.n500,fontWeight:600,marginTop:2}}>Ambient gentle activities</div>
    </div>
   </div>
  </div>

  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,marginTop:12}}>
    <h4 style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:T.n900}}>Routines & Support</h4>
   </div>
   <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
    <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",alignItems:"center",gap:14,border:`1px solid ${T.n300}66`}} onClick={()=>go("taker_conn")}>
     <div style={{width:50,height:50,borderRadius:16,background:T.primary+"1A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Users size={24} color={T.primary}/></div>
     <div>
      <div style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:15}}>Call Taker</div>
      <div style={{fontSize:12,color:T.n500,fontWeight:600,marginTop:2}}>Connect securely over VoIP</div>
     </div>
    </div>
    <div style={{background:T.surf,padding:"16px",borderRadius:20,cursor:"pointer",boxShadow:"0 4px 12px rgba(26,29,46,.04)",display:"flex",alignItems:"center",gap:14,border:`1px solid ${T.n300}66`}} onClick={()=>go("taker_cal")}>
     <div style={{width:50,height:50,borderRadius:16,background:T.accent+"1A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><CalendarDays size={24} color={T.accent}/></div>
     <div>
      <div style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:15}}>Schedule Routine</div>
      <div style={{fontSize:12,color:T.n500,fontWeight:600,marginTop:2}}>Add activities to your calendar</div>
     </div>
    </div>
   </div>

  </div>
 </div>
);

const BreathI=({go})=>{
 const [phase, setPhase] = useState("start");
 const [timer, setTimer] = useState(0);

 useEffect(() => {
   if(phase === "start" || phase === "done") return;
   let duration = 0;
   let nextPhase = "done";
   if(phase === "inhale") { duration = 4000; nextPhase = "hold"; }
   else if(phase === "hold") { duration = 7000; nextPhase = "exhale"; }
   else if(phase === "exhale") { duration = 8000; nextPhase = "inhale"; }
   setTimer(duration/1000);
   const int = setInterval(()=>setTimer(t=>t>1?t-1:0), 1000);
   const to = setTimeout(()=>setPhase(nextPhase), duration);
   return () => { clearTimeout(to); clearInterval(int); }
 }, [phase]);

 const scale = phase === "start" ? 1 : phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 1;
 const phases={start:{c:T.n500},inhale:{l:"Inhale",c:T.primary},hold:{l:"Hold",c:T.accent},exhale:{l:"Exhale",c:T.success},done:{l:"Done",c:T.n500}};
 const p = phases[phase] || phases.start;

 return (
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar />
   <PHeader title="4-7-8 Breathing" onBack={()=>go("activities")}/>
   <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:22,padding:"0 28px"}}>
    <div style={{width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,${p.c}44,${p.c}11)`,border:`3px solid ${p.c}88`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,transform:`scale(${scale})`,transition:"transform 4s ease-in-out, background 1s ease",boxShadow:`0 0 60px ${p.c}44`}}>
     {phase === "start" ? (
      <span style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:p.c}}>Ready?</span>
     ) : (
      <>
       <span style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:p.c}}>{p.l}</span>
       <span style={{fontSize:28,fontWeight:800,color:p.c}}>{timer}</span>
      </>
     )}
    </div>
    <div style={{display:"flex",gap:10,width:"100%",marginTop:40}}>
     {phase === "start" ? (
      <button className="btn bp f1 blg" onClick={()=>setPhase("inhale")}>Start Sequence</button>
     ) : (
      <>
       <button className="btn bg f1" style={{color:T.n500}} onClick={()=>setPhase("start")}>Stop</button>
       <button className="btn bp f1" onClick={()=>go("breath_done")}>Complete</button>
      </>
     )}
    </div>
   </div>
  </div>
 );
};

const BreathA=()=>null;

const BreathDone=({go})=>(
 <div style={{background:T.successSoft,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
 <SBar/>
 <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}></div>
 <div><h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:800,color:T.n900}}>Well done! </h2><p style={{color:T.n700,marginTop:8,lineHeight:1.7}}>Breathing cycles complete. Your parasympathetic nervous system is active.</p></div>
 <div style={{background:T.surf,borderRadius:18,padding:18,width:"100%"}}>
 <p style={{fontSize:13,fontWeight:700,color:T.n900,marginBottom:10}}>How do you feel now?</p>
  <div style={{display:"flex",justifyContent:"center",gap:14}}>{["","","",""].map(e=><span key={e} className="emomd">{e}</span>)}</div>
 </div>
 <div style={{display:"flex",gap:10,width:"100%"}}>
  <button className="btn bs f1" onClick={()=>go("breath_i")}> Again</button>
  <button className="btn bk f1" onClick={()=>go("activities")}> Done</button>
 </div>
 <button className="btn bg bw" style={{color:T.n500}} onClick={()=>go("home_user")}>Save & Go Home</button>
 </div>
);

const BoxBreath=({go})=>{
 const [phase, setPhase] = useState("start");
 const [timer, setTimer] = useState(0);
 const [loopKey, setLoopKey] = useState(0);

 useEffect(() => {
   if(phase === "start" || phase === "done") return;
   let nextPhase = "done";
   if(phase === "inhale") nextPhase = "hold1";
   else if(phase === "hold1") nextPhase = "exhale";
   else if(phase === "exhale") nextPhase = "hold2"; 
   else if(phase === "hold2") { nextPhase = "inhale"; setLoopKey(k => k + 1); }
   setTimer(4);
   const int = setInterval(()=>setTimer(t=>t>1?t-1:0), 1000);
   const to = setTimeout(()=>setPhase(nextPhase), 4000);
   return () => { clearTimeout(to); clearInterval(int); }
 }, [phase, loopKey]);

 const getLineStyle = (lineId) => {
  const order = ["inhale", "hold1", "exhale", "hold2"];
  const pIdx = order.indexOf(phase);
  const lIdx = order.indexOf(lineId);
  const base = { strokeDasharray: 152, strokeDashoffset: 152 };
  if (phase === "start") return base;
  if (pIdx > lIdx) return { ...base, strokeDashoffset: 0 };
  if (pIdx === lIdx) return { ...base, strokeDashoffset: 0, animation: 'fillLine 4s linear forwards' };
  return base;
 };

 const phases={start:{c:T.n500},inhale:{l:"Inhale",c:T.success},hold1:{l:"Hold",c:T.accent},exhale:{l:"Exhale",c:T.primary},hold2:{l:"Hold",c:T.accent},done:{l:"Done",c:T.n500}};
 const p = phases[phase] || phases.start;

 return (
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar />
   <PHeader title="Box Breathing" onBack={()=>go("activities")}/>
   <style>{`@keyframes fillLine { from { stroke-dashoffset: 152; } to { stroke-dashoffset: 0; } }`}</style>
   <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:22,padding:"0 28px"}}>
    <div style={{width:160,height:160,position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,background:T.surf,boxShadow:`0 4px 20px rgba(0,0,0,0.05)`}}>
     <svg key={loopKey} width="160" height="160" style={{position:"absolute",top:0,left:0,pointerEvents:"none"}}>
       <rect x="4" y="4" width="152" height="152" fill="none" stroke={T.n300} strokeWidth="8" style={{opacity:0.3}} />
       <g fill="none" stroke={p.c} strokeWidth="8" strokeLinecap="square">
         <line x1="4" y1="156" x2="4" y2="4" style={getLineStyle('inhale')} />
         <line x1="4" y1="4" x2="156" y2="4" style={getLineStyle('hold1')} />
         <line x1="156" y1="4" x2="156" y2="156" style={getLineStyle('exhale')} />
         <line x1="156" y1="156" x2="4" y2="156" style={getLineStyle('hold2')} />
       </g>
     </svg>
     {phase === "start" ? (
      <span style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:p.c}}>Ready?</span>
     ) : (
      <>
       <span style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:p.c}}>{p.l}</span>
       <span style={{fontSize:28,fontWeight:800,color:p.c}}>{timer}</span>
      </>
     )}
    </div>
    <div style={{display:"flex",gap:10,width:"100%",marginTop:40}}>
     {phase === "start" ? (
      <button className="btn bp f1 blg" style={{background:T.success}} onClick={()=>setPhase("inhale")}>Start Sequence</button>
     ) : (
      <>
       <button className="btn bg f1" style={{color:T.n500}} onClick={()=>{setPhase("start"); setLoopKey(0);}}>Stop</button>
       <button className="btn bp f1" style={{background:T.success}} onClick={()=>go("breath_done")}>Complete</button>
      </>
     )}
    </div>
   </div>
  </div>
 );
};

const Grounding=({go})=>{
 const [step,setStep]=useState(0);
 const [taps,setTaps]=useState(0);
 const steps=[
  {n:5,s:"SEE",col:T.primary,desc:"Identify 5 things you can see",ex:"Notice the lighting, colors, or objects"},
  {n:4,s:"TOUCH",col:T.success,desc:"Acknowledge 4 things you feel",ex:"Focus on textures, temperature, or the floor"},
  {n:3,s:"HEAR",col:T.accent,desc:"Listen for 3 distinct sounds",ex:"Try picking up background noises"},
  {n:2,s:"SMELL",col:T.taker,desc:"Find 2 things you can smell",ex:"Fresh air, coffee, or a nearby scent"},
  {n:1,s:"TASTE",col:T.danger,desc:"Focus on 1 thing you can taste",ex:"A mint, water, or the aftertaste in your mouth"},
 ];
 const s=steps[step];

 const nextStep = () => {
    if(step < steps.length - 1) { setStep(s=>s+1); setTaps(0); }
    else go("breath_done");
 };

 return(
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar/><PHeader title="5-4-3-2-1 Grounding" onBack={()=>go("activities")}/>
   <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 28px",gap:16,textAlign:"center"}}>
    <div style={{width:90,height:90,borderRadius:"50%",background:s.col+"18",border:`4px solid ${s.col}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
     <div style={{fontFamily:"var(--fb)",fontSize:32,fontWeight:900,color:s.col}}>{s.n}</div>
     <div style={{fontSize:11,fontWeight:800,color:s.col}}>{s.s}</div>
    </div>
    
    <div><h3 style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:800,color:T.n900}}>{s.desc}</h3><p style={{color:T.n500,fontSize:13,fontWeight:600,marginTop:6}}>{s.ex}</p></div>
    
    <div style={{display:"flex",gap:10,marginTop:20,marginBottom:20}}>
      {Array.from({length: s.n}).map((_, i) => (
       <div key={i} onClick={() => setTaps(prev => Math.max(prev, i+1))} style={{width:50,height:50,borderRadius:16,background:i < taps ? s.col : T.surf,border:`2px solid ${i < taps ? s.col : T.n300}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s",boxShadow:i<taps?`0 4px 14px ${s.col}66`:"none"}}>
         {i < taps && <CheckCircle2 size={24} color="#fff" strokeWidth={3}/>}
       </div>
      ))}
    </div>

    <div style={{display:"flex",gap:10,width:"100%"}}>
     {step>0&&<button className="btn bs f1" onClick={()=>{setStep(s=>s-1); setTaps(steps[step-1].n);}}> Back</button>}
     <button className="btn f1" style={{background:taps === s.n ? s.col : T.n300,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:15,padding:"14px 20px",pointerEvents:taps===s.n?"auto":"none"}} onClick={nextStep}>
      {step<steps.length-1?`Next: ${steps[step+1].n} ${steps[step+1].s}`:" Done"}
     </button>
    </div>
   </div>
  </div>
 );
};

const Emergency=({go})=>(
 <div style={{background:T.danger,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar dark={false} />
  
  <div style={{flex:1,display:"flex",flexDirection:"column",padding:"30px 24px",alignItems:"center",justifyContent:"center"}}>
   
   <h1 style={{fontFamily:"var(--fb)",fontSize:36,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>I NEED HELP</h1>
   <p style={{color:"rgba(255,255,255,.9)",fontSize:16,fontWeight:700,marginBottom:32,textAlign:"center"}}>Tap what you need right now.</p>

   <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:16,width:"100%"}}>
     <div style={{background:"#fff",borderRadius:24,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 12px 30px rgba(0,0,0,0.15)",cursor:"pointer"}} onClick={()=>go("panic_protocol")}>
       <Activity size={56} color={T.accent} strokeWidth={2.5}/>
       <span style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:T.n900,textAlign:"center",lineHeight:1.1}}>PANIC<br/>ATTACK</span>
     </div>

     <div style={{background:"#fff",borderRadius:24,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 12px 30px rgba(0,0,0,0.15)",cursor:"pointer"}} onClick={()=>go("breath_i")}>
       <HeartPulse size={56} color={T.success} strokeWidth={2.5}/>
       <span style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:T.n900,textAlign:"center",lineHeight:1.1}}>CALM<br/>DOWN</span>
     </div>

     <div style={{background:"#fff",borderRadius:24,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 12px 30px rgba(0,0,0,0.15)",cursor:"pointer"}} onClick={()=>go("taker_conn")}>
       <Users size={56} color={T.primary} strokeWidth={2.5}/>
       <span style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:T.n900,textAlign:"center",lineHeight:1.1}}>CALL<br/>TAKER</span>
     </div>

     <div style={{background:"#fff",border:`6px solid ${T.n900}`,borderRadius:24,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 12px 30px rgba(0,0,0,0.15)",cursor:"pointer"}} onClick={()=>go("dial_911")}>
       <AlertCircle size={56} color={T.n900} strokeWidth={2.5}/>
       <span style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:T.n900,textAlign:"center",lineHeight:1.1}}>CALL<br/>911</span>
     </div>
   </div>

   <button className="btn bg" style={{color:"#fff",marginTop:40,fontSize:16,fontWeight:800,border:"2px solid rgba(255,255,255,0.3)"}} onClick={()=>go("activities")}>CANCEL</button>
  </div>
 </div>
);

const Dial911=({go})=>(
 <div style={{background:T.n900,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar dark />
  <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30}}>
    <div className="apls" style={{width:120,height:120,borderRadius:"50%",background:T.danger,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 0 20px ${T.danger}33, 0 0 0 40px ${T.danger}11`,marginBottom:40}}>
      <AlertCircle size={60} color="#fff" strokeWidth={2}/>
    </div>
    <h2 style={{fontFamily:"var(--fb)",fontSize:32,fontWeight:900,color:"#fff",marginBottom:8}}>Dialing 911</h2>
    <p style={{color:T.dangerSoft,fontSize:16,fontWeight:600}}>(Emergency Services)</p>

    <div style={{display:"flex",gap:40,marginTop:80}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:T.n800,display:"flex",alignItems:"center",justifyContent:"center"}}><Mic size={24} color="#fff"/></div>
        <span style={{color:T.n300,fontSize:13,fontWeight:700}}>Speaker</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>go("activities")}>
        <div style={{width:72,height:72,borderRadius:"50%",background:T.danger,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${T.danger}55`}}>
          <AlertCircle size={32} color="#fff"/>
        </div>
        <span style={{color:T.dangerSoft,fontSize:13,fontWeight:800}}>End Call</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:T.n800,display:"flex",alignItems:"center",justifyContent:"center"}}><MessageCircle size={24} color="#fff"/></div>
        <span style={{color:T.n300,fontSize:13,fontWeight:700}}>Keypad</span>
      </div>
    </div>
  </div>
 </div>
);

const PanicProtocol=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar />
  <PHeader title="Panic Attack" onBack={()=>go("emergency")} />
  <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 28px 40px",alignItems:"center",justifyContent:"center"}}>
    
    <div style={{textAlign:"center",marginBottom:30}}>
     <div style={{width:70,height:70,borderRadius:"50%",background:T.dangerSoft,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
       <Activity size={36} color={T.danger} strokeWidth={3}/>
     </div>
     <h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:900,color:T.n900}}>This will pass.</h2>
     <p style={{color:T.n700,fontSize:14,fontWeight:700,marginTop:8}}>You are safe. Follow these steps with me.</p>
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:14,width:"100%"}}>
     {[
       "Sit or lie down securely",
       "Press both feet flat onto the floor",
       "Rest your hands firmly on your thighs",
       "Drop your shoulders down",
       "Notice 1 thing you can see right now"
     ].map((s,i)=>(
      <div key={i} className="card" style={{padding:"18px",display:"flex",alignItems:"center",gap:16,borderLeft:`4px solid ${T.danger}`,boxShadow:"0 4px 14px rgba(0,0,0,0.03)"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:T.dangerSoft,display:"flex",alignItems:"center",justifyContent:"center",color:T.danger,fontWeight:900,fontSize:16,flexShrink:0}}>{i+1}</div>
        <div style={{fontFamily:"var(--fb)",fontSize:15,fontWeight:800,color:T.n900,lineHeight:1.4}}>{s}</div>
      </div>
     ))}
    </div>

    <button className="btn bd bw blg" style={{marginTop:40,borderRadius:50,boxShadow:`0 8px 20px ${T.danger}55`}} onClick={()=>go("breath_i")}>I'm ready to breathe</button>

  </div>
 </div>
);

const CalmMode=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar /><PHeader title="Calm Mode" onBack={()=>go("activities")} />
  <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 28px 40px",gap:24}}>
   
   <div style={{textAlign:"center",width:"100%"}}>
     <h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:800,color:T.n900}}>Deep Rest Mode</h2>
     <p style={{color:T.n500,marginTop:8,lineHeight:1.7,fontWeight:600,fontSize:13}}>Lower your stimulation. Focus on gentle ambient sounds.</p>
   </div>

   <div style={{width:130,height:130,borderRadius:"50%",background:T.success+"15",border:`4px solid ${T.success}`,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 4s ease-in-out infinite",boxShadow:`0 0 50px ${T.success}33`,margin:"20px 0"}}>
    <HeartPulse size={48} color={T.success} />
   </div>

   <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
    {[
      {ico:<Activity size={18}/>,lbl:"Ocean Sounds (8 min)"},
      {ico:<Layers size={18}/>,lbl:"Rain Ambient (15 min)"},
      {ico:<Bell size={18}/>,lbl:"Wind Chimes (10 min)"},
      {ico:<BedDouble size={18}/>,lbl:"Sleep Preparation"}
    ].map((opt, i)=>(
     <button key={i} className="card" style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,border:`1px solid ${T.success}33`,cursor:"pointer",textAlign:"left",boxShadow:"0 2px 10px rgba(0,0,0,0.02)"}}>
       <div style={{width:32,height:32,borderRadius:10,background:T.success+"15",display:"flex",alignItems:"center",justifyContent:"center",color:T.success,flexShrink:0}}>{opt.ico}</div>
       <span style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:14}}>{opt.lbl}</span>
     </button>
    ))}
   </div>
   
  </div>
 </div>
);

const BodyScan=({go})=>{
 const [step, setStep] = useState(0);
 const steps = [
   {lbl:"Feet & Legs", desc:"Notice the weight of your feet on the ground. Relax your leg muscles."},
   {lbl:"Hips & Core", desc:"Feel the support of your chair. Let your stomach soften and expand."},
   {lbl:"Chest & Back", desc:"Gently drop your shoulders. Feel your ribcage expand as you breathe."},
   {lbl:"Arms & Hands", desc:"Let your fingers go loose. Drop any tension in your forearms."},
   {lbl:"Neck & Head", desc:"Unclench your jaw. Smooth your forehead. Let everything rest."}
 ];
 const s = steps[step];

 return (
  <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar /><PHeader title="Body Scan" onBack={()=>go("activities")} />
   <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 28px 40px",gap:24,textAlign:"center"}}>
    
    <div style={{width:100,height:100,borderRadius:"50%",background:T.taker+"15",border:`4px solid ${T.taker}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 30px ${T.taker}33`}}>
      <User size={40} color={T.taker} />
    </div>

    <div style={{marginTop:10}}>
      <h3 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>{s.lbl}</h3>
      <p style={{color:T.n500,fontSize:14,fontWeight:600,marginTop:10,lineHeight:1.6}}>{s.desc}</p>
    </div>

    <div style={{display:"flex",gap:8,marginTop:10}}>
      {steps.map((_, i) => (
        <div key={i} style={{width:10,height:10,borderRadius:"50%",background:i === step ? T.taker : (i < step ? T.taker+"66" : T.n300),transition:"all 0.3s"}} />
      ))}
    </div>

    <div style={{display:"flex",gap:10,width:"100%",marginTop:40}}>
      {step > 0 && <button className="btn bs f1" onClick={()=>setStep(s=>s-1)}>Back</button>}
      <button className="btn f1" style={{background:T.taker,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:15,padding:"14px 20px"}} onClick={()=>step<steps.length-1?setStep(s=>s+1):go("breath_done")}>
       {step < steps.length - 1 ? "Next Area" : "Finish Scan"}
      </button>
    </div>

   </div>
  </div>
 );
};

const ActHist=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
  <SBar/><PHeader title="Journey Log" onBack={()=>go("activities")}/>
  <div style={{padding:"20px 24px 40px"}}>
   
   <div style={{display:"flex",gap:12,marginBottom:24}}>
     <div style={{flex:1,background:T.surf,borderRadius:24,padding:"18px 16px",boxShadow:"0 4px 16px rgba(0,0,0,0.03)",border:`1px solid ${T.n300}66`,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
       <div style={{width:40,height:40,borderRadius:"50%",background:T.success+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><TrendingUp size={20} color={T.success} /></div>
       <div style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:T.n900,marginTop:6}}>5 Days</div>
       <div style={{fontSize:11,color:T.n500,fontWeight:700}}>Current Streak</div>
     </div>
     <div style={{flex:1,background:T.surf,borderRadius:24,padding:"18px 16px",boxShadow:"0 4px 16px rgba(0,0,0,0.03)",border:`1px solid ${T.n300}66`,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
       <div style={{width:40,height:40,borderRadius:"50%",background:T.primary+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><Activity size={20} color={T.primary} /></div>
       <div style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:T.n900,marginTop:6}}>14</div>
       <div style={{fontSize:11,color:T.n500,fontWeight:700}}>Total Sessions</div>
     </div>
   </div>

   <div style={{background:T.surf,borderRadius:24,padding:"24px 20px",boxShadow:"0 6px 20px rgba(0,0,0,0.04)",border:`1px solid ${T.n300}66`,marginBottom:30}}>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
       <h3 style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:T.n900}}>Weekly Overview</h3>
       <span style={{fontSize:12,fontWeight:700,color:T.n500,background:T.n300+"44",padding:"4px 10px",borderRadius:50}}>Last 7 Days</span>
     </div>
     <MiniBar data={[60,80,40,90,70,85,55]} labels={["M","T","W","T","F","S","S"]}/>
   </div>

   <h3 style={{fontFamily:"var(--fb)",fontSize:16,fontWeight:800,color:T.n900,marginBottom:14}}>Recent Activity</h3>
   <div style={{display:"flex",flexDirection:"column",gap:12}}>
    {[
      {Icon:Activity,lbl:"4-7-8 Breathing",date:"Today, 8:30 AM",dur:"6 min",col:T.primary},
      {Icon:CheckCircle2,lbl:"5-4-3-2-1 Grounding",date:"Yesterday, 3:15 PM",dur:"8 min",col:T.accent},
      {Icon:Activity,lbl:"4-7-8 Breathing",date:"Mon, 9:00 AM",dur:"5 min",col:T.primary},
      {Icon:Layers,lbl:"Box Breathing",date:"Sun, 10:30 AM",dur:"4 min",col:T.success}
    ].map((a,i)=>(
     <div key={i} style={{background:T.surf,borderRadius:20,padding:"16px",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 10px rgba(0,0,0,0.02)",border:`1px solid ${T.n300}44`}}>
       <div style={{width:48,height:48,borderRadius:16,background:a.col+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
         <a.Icon size={24} color={a.col} />
       </div>
       <div style={{flex:1}}>
         <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div style={{fontFamily:"var(--fb)",fontWeight:800,color:T.n900,fontSize:15}}>{a.lbl}</div>
           <div style={{fontSize:11,fontWeight:700,color:T.n500,background:T.n300+"44",padding:"3px 8px",borderRadius:50}}>{a.dur}</div>
         </div>
         <div style={{fontSize:12,color:T.n500,marginTop:4}}>{a.date}</div>
       </div>
     </div>
    ))}
   </div>
   
  </div>
 </div>
);

/* 
 USER HOME  CLINICAL
 */const Ring=({pct,col,size=100,trk="#DEE4ED",w=10})=>{
 const r=(size-w)/2, c=size/2, circ=2*Math.PI*r;
 return(
   <div style={{position:"relative",width:size,height:size}}>
     <svg width={size} height={size}>
       <circle cx={c} cy={c} r={r} fill="none" stroke={trk} strokeWidth={w}/>
       <circle cx={c} cy={c} r={r} fill="none" stroke={col} strokeWidth={w} strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round" transform={`rotate(-90 ${c} ${c})`}/>
     </svg>
     <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
       <span style={{fontFamily:"var(--fb)",fontWeight:900,fontSize:size/3.5,color:T.n900,marginTop:2}}>{pct}</span>
     </div>
   </div>
 );
};

const HomeUser=({go,role})=>{
 const hr=new Date().getHours();
 const greet=hr<12?"Good morning":hr<18?"Good afternoon":"Good evening";

 const [insightText, setInsightText] = useState("I noticed you're speaking faster today. Doing a 5-minute breathing exercise can help calm your body down.");
 const [isThinking, setIsThinking] = useState(false);
 const [customInput, setCustomInput] = useState("");

 const handleAIRequest = async (text) => {
   if(!text) return;
   setIsThinking(true);
   try {
     const res = await sendToModel(text);
     setInsightText(res.parsed.reply);
     setCustomInput("");
   } catch (e) {
     setInsightText("Error connecting to AI Backend: " + e.message);
   }
   setIsThinking(false);
 };

 const { isListening, startListening } = useSpeechRecognition((transcript) => {
   handleAIRequest(transcript);
 });

 const handleSimulatedText = (text) => {
   handleAIRequest(text);
 };

 const user = {
   name: role==="taker"?"Maria":"Maria",
   aiScore: 84,
   vocal: 72,
   physical: 65,
   metadata: [
     { label: "Vocal Pacing", val: "Steady", col: T.success, icn: Mic },
     { label: "Check-in Streak", val: "14 Days", col: T.primary, icn: CheckCircle2 },
     { label: "Usage Focus", val: "High", col: T.accent, icn: Activity }
   ],
   timeline: [
     { time: "Today, 8:30 AM", type: "AI Voice Trace", dur: "2m 14s", inf: "Steady baseline detected.", icon: Mic, col: T.primary },
     { time: "Yesterday, 11:00 PM", type: "Sleep Health", dur: "7h 20m", inf: "Deep sleep ratio optimal.", icon: BedDouble, col: T.clin },
     { time: "Yesterday, 5:30 PM", type: "Google Fit Sync", dur: "4,200 Steps", inf: "Moderate activity block.", icon: Zap, col: T.gad }
   ]
 };

 return(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar/>
   
   {/* HERO SECTION */}
   <div style={{background:`linear-gradient(135deg, ${T.n100}, #fff)`,padding:"20px 20px 24px",borderBottom:`1px solid ${T.n300}44`}}>
     <div className="rwb mb10">
       <div style={{display:"flex",alignItems:"center",gap:12}}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.primaryDark,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#fff",boxShadow:`0 4px 12px ${T.primary}44`}}>M</div>
         <div>
           <p style={{color:T.n500,fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:0.5}}>{role==="taker"?"Client Engine":"Your Dashboard"}</p>
           <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:T.n900,lineHeight:1.1}}>{greet}, {user.name}.</h2>
         </div>
       </div>
       {role!=="snu"&&<button className="btn bg bsm" style={{background:T.surf,color:T.n900,border:`1px solid ${T.n300}`,borderRadius:50,padding:12,boxShadow:"0 2px 10px rgba(0,0,0,.03)"}} onClick={()=>go("settings")}><Bell size={18}/></button>}
     </div>
   </div>

   {/* MAIN CONTENT BODY */}
   <div style={{flex:1,padding:"16px 20px 40px",overflow:"auto"}}>
     
     {/* HEALTH RINGS */}
     <div className="card mb24" style={{padding:24,background:"#fff",boxShadow:"0 8px 30px rgba(0,0,0,0.03)"}}>
       <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
         <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
           <Ring pct={user.aiScore} col={T.primary} size={84} w={8}/>
           <span style={{fontSize:12,fontWeight:800,color:T.n500,marginTop:10}}>AI Score</span>
         </div>
         <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
           <Ring pct={user.vocal} col={T.success} size={84} w={8}/>
           <span style={{fontSize:12,fontWeight:800,color:T.n500,marginTop:10}}>Vocal Norm</span>
         </div>
         <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
           <Ring pct={user.physical} col={T.accent} size={84} w={8}/>
           <span style={{fontSize:12,fontWeight:800,color:T.n500,marginTop:10}}>Physical</span>
         </div>
       </div>
     </div>

     <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Today's Snapshot</p>
     
     {/* METADATA CARDS */}
     <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24}}>
       {user.metadata.map((m,i)=>(
         <div key={i} className="card" style={{padding:14,borderTop:`3px solid ${m.col}`,textAlign:"center",background:"#fff"}}>
           <div style={{display:"flex",justifyContent:"center",marginBottom:6}}><m.icn size={20} color={m.col}/></div>
           <div style={{fontFamily:"var(--fb)",fontWeight:900,fontSize:14,color:T.n900,whiteSpace:"nowrap"}}>{m.val}</div>
           <div style={{fontSize:10,fontWeight:700,color:T.n500,textTransform:"uppercase",marginTop:4}}>{m.label==="Vocal Pacing"?"Voice":m.label==="Check-in Streak"?"Streak":m.label}</div>
         </div>
       ))}
     </div>

     {/* AI INSIGHT BLOCK (Now Live with LLM) */}
     <div className="rwb mb12"><p style={{fontSize:12,fontWeight:900,color:T.primary,textTransform:"uppercase",letterSpacing:.5}}>Your Health AI</p></div>
     <div className="card mb24" style={{background:T.primarySoft, border:`1px solid ${T.primary}44`, padding:20, position:"relative", overflow:"hidden"}}>
       {isThinking && <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(90deg, transparent, ${T.primary}, transparent)`,animation:"ai_load 1.5s infinite"}}/>}
       <style>{`@keyframes ai_load { 0% {transform:translateX(-100%);} 100% {transform:translateX(100%);} }`}</style>
       
       <div className="rwb mb12">
         <div style={{display:"flex",gap:10,alignItems:"center"}}>
           <div style={{background:T.primary,borderRadius:10,padding:8}}><Zap size={18} color="#fff"/></div>
           <span style={{fontWeight:900,fontSize:15,color:T.primaryDark}}>
             {isThinking ? "AI is analyzing..." : isListening ? "Listening to you..." : "Today's Insight"}
           </span>
         </div>
       </div>
       <p style={{fontSize:14,lineHeight:1.6,color:T.n900,fontWeight:600,marginBottom:16}}>{insightText}</p>
       
       {/* DEBUG: MANUAL TEXT INPUT */}
       <div style={{display:"flex",gap:8,marginBottom:12}}>
         <input 
           type="text" 
           value={customInput}
           onChange={e=>setCustomInput(e.target.value)}
           onKeyDown={e=>{if(e.key==='Enter') handleAIRequest(customInput);}}
           placeholder="Type manual prompt for testing..." 
           style={{flex:1,padding:"10px 14px",borderRadius:12,border:`1px solid ${T.n300}`,fontSize:13,fontFamily:"inherit"}}
         />
         <button className="btn" style={{background:T.primary,color:"#fff",borderRadius:12,padding:"0 16px",fontWeight:800}} onClick={()=>handleAIRequest(customInput)}>Send</button>
       </div>


     </div>

     {/* MY PASSIVE DATA (Replaces Timeline) */}
     <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>My Passive Data</p>
     <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
       {user.timeline.map((act,i)=>(
         <div key={i} className="card" style={{padding:16,display:"flex",gap:14,alignItems:"center",background:"#fff"}}>
           <div style={{width:44,height:44,borderRadius:12,background:act.col+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><act.icon size={22} color={act.col}/></div>
           <div style={{flex:1}}>
             <div className="rwb"><span style={{fontWeight:800,color:T.n900,fontSize:14}}>{act.type}</span><span style={{fontSize:11,fontWeight:700,color:T.n500,background:T.n100,padding:"2px 8px",borderRadius:50}}>{act.dur}</span></div>
             <div style={{fontSize:12,color:T.n500,marginTop:2}}>{act.time}</div>
           </div>
         </div>
       ))}
     </div>

     {/* MY TRENDS (Replaces Biomarkers) */}
     <div className="rwb mb12"><p style={{fontSize:12,fontWeight:900,color:T.danger,textTransform:"uppercase",letterSpacing:.5}}>My Trends</p><span style={{fontSize:12,fontWeight:800,color:T.primary,cursor:"pointer"}} onClick={()=>go("diagnoses")}>See All</span></div>
     <div className="card mb24" style={{background:"#fff"}}>
       <div className="rwb mb12"><span style={{fontWeight:900,color:T.n900,fontSize:16}}>Overall Stress</span><span className="chip cer" style={{background:T.successSoft,color:T.success,border:"none"}}>Improving</span></div>
       <div style={{display:"flex",alignItems:"flex-end",gap:4,height:40,marginBottom:8}}>
         {[70,65,55,60,40,40,30,40,55,50,45,40,35,40].map((v,i)=><div key={i} style={{flex:1,background:v>50?T.danger:v>40?T.accent:T.success,borderRadius:"4px 4px 0 0",height:`${v}%`,opacity:i===13?1:0.4}}/>)}
       </div>
       <p style={{fontSize:12,color:T.n700,fontWeight:600,marginTop:12}}>Your stress levels are much lower this week compared to last week!</p>
     </div>

     {/* MEDICATION TRACKER (Replaces Supplement Engine) */}
     <div className="rwb mb12"><p style={{fontSize:12,fontWeight:900,color:T.success,textTransform:"uppercase",letterSpacing:.5}}>Medication Progress</p></div>
     <div className="card mb24" style={{background:"#fff",padding:16}}>
       <div className="rwb mb12">
         <div style={{fontWeight:900,color:T.n900,fontSize:16}}>Sertraline</div>
         <span style={{fontSize:12,fontWeight:800,color:T.n500}}>50mg</span>
       </div>
       <div style={{display:"flex",gap:6,marginBottom:14}}>
         {["M","T","W","T","F","S","S"].map((d,i)=>{
           const taken=[true,true,false,true,true,true,null][i];
           return(
             <div key={i} style={{flex:1,textAlign:"center",background:taken?T.success:taken===false?T.dangerSoft:T.n100,color:taken?"#fff":taken===false?T.danger:T.n500,padding:"6px 0",borderRadius:8,fontWeight:800,fontSize:12}}>
               {d}
             </div>
           )
         })}
       </div>
       <button className="btn bw" style={{width:"100%",background:T.successSoft,color:T.success,border:`1px solid ${T.success}44`,borderRadius:12,fontWeight:800,padding:"10px 0"}} onClick={()=>go("med_adherence")}> Log Today's Medicine</button>
     </div>

     {/* QUICK ACTIONS */}
     <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
       <button className="btn bs bw" style={{flexDirection:"column",padding:"20px",borderRadius:20,gap:12,border:`1px solid ${T.n300}`}} onClick={()=>go("activities")}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.accentSoft,display:"flex",alignItems:"center",justifyContent:"center"}}><HeartPulse size={24} color={T.accent}/></div>
         <span style={{fontSize:14,fontWeight:800,color:T.n900}}>Activities</span>
       </button>
       <button className="btn bs bw" style={{flexDirection:"column",padding:"20px",borderRadius:20,gap:12,border:`1px solid ${T.n300}`}} onClick={()=>go("med_hub")}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.clinSoft,display:"flex",alignItems:"center",justifyContent:"center"}}><FileText size={24} color={T.clin}/></div>
         <span style={{fontSize:14,fontWeight:800,color:T.n900}}>Health File</span>
       </button>
     </div>
   </div>
 </div>
 );
};

/* 
 MEDICAL ENGINE  MH1 DATA WAREHOUSE
 */
const MedHub=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <div style={{background:`linear-gradient(135deg, ${T.primaryDark}, ${T.primary})`,padding:"18px 20px 34px",borderBottomLeftRadius:30,borderBottomRightRadius:30,boxShadow:`0 10px 30px ${T.primary}44`}}>
   <div className="rwb mb10">
     <div><p style={{color:"rgba(255,255,255,.8)",fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:0.5}}>My Health File</p><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:"#fff",lineHeight:1.1}}>My Health Data</h2></div>
     <button className="btn bg bsm" style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"none",borderRadius:50,padding:12,backdropFilter:"blur(10px)"}} onClick={()=>go("clin_report")}><FileText size={18}/></button>
   </div>
   <div style={{display:"flex",gap:8,marginTop:16}}>
     {[{Icon:Activity,l:"Visits",v:"12"},{Icon:ShieldCheck,l:"Conditions",v:"3"},{Icon:Zap,l:"Meds",v:"2"},{Icon:Database,l:"Labs",v:"8"}].map(s=>(
     <div key={s.l} style={{flex:1,background:"rgba(255,255,255,.15)",borderRadius:16,padding:"12px 6px",textAlign:"center",backdropFilter:"blur(12px)"}}>
       <div style={{display:"flex",justifyContent:"center",marginBottom:4}}><s.Icon size={20} color="#fff"/></div>
       <div style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:900,color:"#fff"}}>{s.v}</div>
       <div style={{fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</div>
     </div>
     ))}
   </div>
 </div>

 <div style={{flex:1,padding:"24px 20px 24px",marginTop:-14,overflow:"auto"}}>
   <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>My Records</p>
   <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginTop:10}}>
     {[{ico:Activity,lbl:"Medical Visits",sub:"ER, Doctors",nav:"visits",col:T.primary},
     {ico:ShieldCheck,lbl:"My Conditions",sub:"Active diagnoses",nav:"diagnoses",col:T.accent},
     {ico:Zap,lbl:"Medications",sub:"Pills & Reminders",nav:"medications",col:T.success},
     {ico:Database,lbl:"Lab Results",sub:"Blood work, exams",nav:"labs",col:T.phq},
     ].map(it=>(
     <div key={it.lbl} className="card" style={{cursor:"pointer",background:"#fff",padding:20,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",boxShadow:"0 4px 15px rgba(0,0,0,0.03)",border:"none"}} onClick={()=>go(it.nav)}>
       <div style={{width:54,height:54,borderRadius:18,background:it.col+"15",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><it.ico size={28} color={it.col}/></div>
       <div style={{fontWeight:900,color:T.n900,fontSize:15}}>{it.lbl}</div>
       <div style={{fontSize:11,color:T.n500,marginTop:4,fontWeight:600}}>{it.sub}</div>
     </div>
     ))}
   </div>
 </div>
 </div>
);

/* 
 MH2 EXTERNAL INTEGRATIONS (VISITS)
 */
const Visits=({go})=>{
 const vs=[
 {d:"Dec 12, 2023",f:"City API / Node",dep:"Emergency Flag",r:"Acute stress baseline spike",out:"Algorithmic normalization recommended",sev:"moderate",id:"#A129"},
 {d:"Oct 3, 2023",f:"San Rafael Hub",dep:"Psych Eval",r:"Initial metadata evaluation",out:"Supplement engine started",sev:"routine",id:"#B412"},
 {d:"Mar 5, 2023",f:"Google Health Sync",dep:"General",r:"Annual sync refresh",out:"All parameters nominal",sev:"routine",id:"#C991"},
 ];
 const sc={routine:T.success,moderate:T.accent,severe:T.danger};
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Integrations Sync" onBack={()=>go("med_hub")} right={<button className="btn bsm bp" onClick={()=>go("add_visit")}>+ Manual Sync</button>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="tabbar mb16">{["All","Emergency","Routine","API Logs"].map((t,i)=><div key={t} className={`tabi${i===0?" on":""}`}>{t}</div>)}</div>
 <div className="col gap12">
 {vs.map((v,i)=>(
 <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${sc[v.sev]}`,background:"#fff",padding:16}}>
   <div className="rwb mb8">
     <span style={{fontSize:12,color:T.n500,fontWeight:800,textTransform:"uppercase"}}>{v.d}</span>
     <div className="row" style={{gap:6}}>
       <span style={{fontFamily:"var(--fm)",fontSize:10,color:T.n500,background:T.n100,padding:"3px 8px",borderRadius:6,fontWeight:800}}>{v.id}</span>
       <span style={{fontSize:10,fontWeight:900,color:sc[v.sev],background:sc[v.sev]+"15",padding:"3px 8px",borderRadius:100,textTransform:"uppercase"}}>{v.sev}</span>
     </div>
   </div>
   <div style={{fontWeight:900,color:T.n900,fontSize:15}}>{v.f}</div>
   <div style={{fontSize:12,color:T.primary,fontWeight:800,marginTop:2}}>{v.dep}</div>
   <div style={{fontSize:12,color:T.n700,marginTop:8}}><strong>Query Log:</strong> {v.r}</div>
   <div style={{fontSize:12,color:T.n500,marginTop:4}}><strong>Output:</strong> {v.out}</div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};

const AddVisit=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Manual Data Injection" onBack={()=>go("visits")}/>
 <div style={{padding:"14px 20px 40px"}}>
 <Disc short/>
 <div className="card mt16 col gap14" style={{background:"#fff"}}>
 <div><label className="inpl">Sync Header Date</label><input className="inp mt8" type="date" style={{marginTop:8}}/></div>
 <div><label className="inpl">Source Node</label><input className="inp mt8" placeholder="e.g. Fitbit Tracker" style={{marginTop:8}}/></div>
 <div><label className="inpl">Data Stream Vector</label>
 <select className="inp mt8" style={{marginTop:8}}>{["Heart Rate Variability","Sleep Cycle","General Consult","Blood Panel","Dietary Input"].map(o=><option key={o}>{o}</option>)}</select></div>
 <div><label className="inpl">Payload Notes</label><textarea className="inp mt8" style={{marginTop:8,height:68,resize:"none"}} placeholder="Details of the sync payload..."/></div>
 <div><label className="inpl">System Override Classification</label>
 <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>{["Routine","Moderate","Critical Drop"].map(s=><button key={s} className="btn bs bsm">{s}</button>)}</div></div>
 </div>
 <button className="btn bp bw blg mt20" style={{width:"100%"}} onClick={()=>go("visits")}> Inject Payload</button>
 </div>
 </div>
);

/* MH3 TRACKED BIOMARKERS (DIAGNOSES) */
const Diagnoses=({go})=>{
 const dx=[
 {code:"#A1-SYS",name:"Cortisol / Stress Baseline",status:"active",since:"Oct 2023",sev:"Elevated",meds:["Sertraline API"],track:true},
 {code:"#B2-SLP",name:"REM Cycle Deprivation",status:"monitoring",since:"Oct 2023",sev:"Sub-optimal",meds:["Melatonin Node"],track:true},
 {code:"#C3-HRV",name:"Heart Rate Variability",status:"resolved",since:"Mar 2022",sev:"Baseline",meds:[],track:false},
 ];
 const sc={active:T.danger,monitoring:T.accent,resolved:T.success};
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Tracked Biomarkers" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add Node</button>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <Disc short/>
 <div className="col gap12 mt14">
 {dx.map((d,i)=>(
 <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${sc[d.status]}`,background:"#fff",padding:16}} onClick={()=>go("dx_detail")}>
 <div className="rwb mb10"><span style={{fontFamily:"var(--fm)",fontSize:11,color:T.n500,background:T.n100,padding:"3px 8px",borderRadius:6,fontWeight:800}}>{d.code}</span><span style={{fontSize:10,fontWeight:800,color:sc[d.status],background:sc[d.status]+"15",padding:"3px 9px",borderRadius:100,textTransform:"uppercase"}}>{d.status}</span></div>
 <div style={{fontWeight:900,color:T.n900,fontSize:16,marginBottom:4}}>{d.name}</div>
 <div style={{fontSize:12,color:T.n500,fontWeight:700}}>Tracking active since {d.since}  {d.sev}</div>
 {d.meds.length>0&&<div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>{d.meds.map(m=><span key={m} style={{fontSize:11,background:T.n100,color:T.n700,padding:"4px 10px",borderRadius:8,fontWeight:800}}> {m}</span>)}</div>}
 {d.track&&<div style={{fontSize:11,color:T.primary,marginTop:10,fontWeight:800}}> ML Algorithmic trace active</div>}
 </div>
 ))}
 </div>
 <div className="card mt14" style={{border:`1px solid ${T.primary}33`,background:T.primarySoft}}>
 <div style={{fontSize:13,fontWeight:800,color:T.primaryDark,marginBottom:5}}> AI Pattern Recognition</div>
 <p style={{fontSize:12,color:T.primaryDark,lineHeight:1.6}}>When active, the machine learning engine monitors connected devices and passive logs to track algorithmic deviations from baseline for each biomarker.</p>
 </div>
 </div>
 </div>
 );
};

const DxDetail=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Biomarker Detail" onBack={()=>go("diagnoses")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="card mb14" style={{borderLeft:`4px solid ${T.danger}`,background:"#fff"}}>
 <div className="rwb mb8"><span style={{fontFamily:"var(--fm)",fontSize:11,color:T.n500,background:T.n100,padding:"3px 8px",borderRadius:6,fontWeight:800}}>#A1-SYS</span><span className="chip cer">Active trace</span></div>
 <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:900,color:T.n900}}>Cortisol / Stress Baseline</h2>
 <p style={{fontSize:12,color:T.n500,marginTop:4,fontWeight:700}}>System node deployed Oct 3, 2023  Algorithm V2.4</p>
 <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
 {["Vocal tension","Irregular sleep timing","Elevated resting BPM","Vagal tone variance"].map(s=><span key={s} style={{fontSize:11,background:T.dangerSoft,color:T.danger,padding:"4px 10px",borderRadius:8,fontWeight:800}}>{s}</span>)}
 </div>
 </div>
 <div className="card mb14" style={{background:"#fff"}}>
 <p style={{fontWeight:900,color:T.n900,marginBottom:12}}> Algorithmic Variance  30 Days</p>
 <MiniBar data={[70,65,55,60,72,68,58,62,74,70,65,60,55,68]} color={T.danger}/>
 <div className="ab wi mt12" style={{borderRadius:12}}><span></span><div style={{fontSize:12}}><strong>ML Vector:</strong> Stress deviations down 18% vs prior dataset block. Parameters stabilizing.</div></div>
 </div>
 <div style={{display:"flex",gap:10}}>
 <button className="btn bp f1" style={{borderRadius:12,fontWeight:800,padding:14}} onClick={()=>go("clin_report")}>Generate Payload</button>
 </div>
 </div>
 </div>
);

/* MH4 SUPPLEMENT ENGINE (MEDICATIONS) */
const Medications=({go})=>{
 const ms=[
 {n:"Sertraline Modulator",d:"50mg",f:"Once daily config",pr:"System assigned",since:"Oct 2023",adh:87,for:"#A1-SYS Baseline",active:true},
 {n:"Melatonin Syncer",d:"3mg",f:"As needed  bedtime",pr:"User input",since:"Jan 2024",adh:62,for:"#B2-SLP Node",active:true},
 {n:"Fluoxetine Array",d:"20mg",f:"Once daily",pr:"Deprecated",since:"JanSep 2022",adh:91,for:"Archived",active:false},
 ];
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Supplement Engine" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="ab in mb14" style={{borderRadius:12}}><span></span><span style={{fontSize:12}}>Engine alert: <strong>Sertraline</strong> payload not yet verified. <strong>Tap to execute sequence.</strong></span></div>
 <div className="col gap12">
 {ms.map((m,i)=>(
 <div key={i} className="card" style={{opacity:m.active?1:.6,borderLeft:`4px solid ${m.active?T.success:T.n300}`,background:"#fff",padding:16}}>
 <div className="rwb mb8">
 <div style={{fontWeight:900,color:T.n900,fontSize:16}}>{m.n}</div>
 <span style={{fontSize:10,fontWeight:800,color:m.active?T.success:T.n500,background:m.active?T.successSoft:T.n100,padding:"4px 10px",borderRadius:100}}>{m.active?"Executing":"Terminated"}</span>
 </div>
 <div style={{fontSize:12,color:T.n700,fontWeight:700}}> {m.d}  {m.f}</div>
 <div style={{fontSize:12,color:T.n500,marginTop:2}}>Target: {m.for}  Deployed {m.since}</div>
 {m.active&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.n100}`}}>
 <div className="rwb mb8"><span style={{fontSize:10,fontWeight:800,color:T.n500,textTransform:"uppercase",letterSpacing:0.5}}>30-day runtime</span><span style={{fontSize:12,fontWeight:900,color:m.adh>80?T.success:m.adh>60?T.accent:T.danger}}>{m.adh}%</span></div>
 <div className="pbar"><div className="pfil" style={{width:`${m.adh}%`,background:m.adh>80?T.success:m.adh>60?T.accent:T.danger}}/></div>
 <button className="btn bsm mt10 bw" style={{width:"100%",background:T.successSoft,color:T.success,border:`1px solid ${T.success}44`,borderRadius:12,fontWeight:800,padding:"10px 0"}} onClick={()=>go("med_adherence")}> Verify Payload Now</button>
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
 <SBar/><PHeader title="Runtime Logs" onBack={()=>go("medications")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="card mb14 tc" style={{background:"#fff",padding:24,border:"none",boxShadow:"0 4px 14px rgba(0,0,0,0.03)"}}><div style={{fontFamily:"var(--fb)",fontSize:54,fontWeight:900,color:T.success}}>87%</div><div style={{fontSize:13,fontWeight:700,color:T.n500}}>30-day hardware adherence  Sertraline 50mg</div><div className="pbar mt14"><div className="pfil" style={{width:"87%",background:T.success}}/></div></div>
 <p style={{fontSize:11,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Execution Timeline</p>
 <div className="card mb14" style={{background:"#fff",padding:0,overflow:"hidden"}}>
 {["Mon Jan 8","Tue Jan 9","Wed Jan 10","Thu Jan 11","Fri Jan 12","Sat Jan 13","Sun Jan 14"].map((d,i)=>{
 const taken=[true,true,false,true,true,true,null][i];
 return(
 <div key={d} className="rwb" style={{padding:"14px 16px",borderBottom:i<6?`1px solid ${T.n100}`:"none"}}>
 <span style={{fontSize:13,color:T.n700,fontWeight:700}}>{d}</span>
 {taken===null?<button className="btn bsm bg" style={{borderRadius:8,padding:"6px 12px",fontWeight:800,background:T.success,color:"#fff"}}>Execute</button>:<span style={{fontSize:12,fontWeight:800,color:taken?T.success:T.danger}}>{taken?" Verified":" Drop"}</span>}
 </div>
 );
 })}
 </div>
 <div className="ab wi" style={{borderRadius:12}}><span></span><div style={{fontSize:12}}><strong>Execution drop Wed Jan 10.</strong> Consecutive packet drops trigger AI warnings. Maintain sequences.</div></div>
 </div>
 </div>
);

/* MH6 LABS / METRICS */
const Labs=({go})=>{
 const ls=[
 {d:"Jan 5, 2024",t:"Blood Panel Array",items:["CBC","CMP","TSH","Cortisol"],flag:true,flagged:["Cortisol (high)"]},
 {d:"Nov 20, 2023",t:"Psychological Telemetry",items:["WISC-V","BASC-3","Conners ADHD"],flag:false,flagged:[]},
 {d:"Oct 10, 2023",t:"Blood Panel Array",items:["CBC","Vitamin D","Iron","B12"],flag:true,flagged:["Vitamin D (low)"]},
 {d:"Jul 18, 2023",t:"ECG Signal",items:["Heart rhythm","QT interval"],flag:false,flagged:[]},
 ];
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Raw Metric Inputs" onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Upload XML</button>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="col gap12">
 {ls.map((l,i)=>(
 <div key={i} className="card" style={{cursor:"pointer",borderLeft:`4px solid ${l.flag?T.accent:T.primary}`,background:"#fff",padding:16}} onClick={()=>go("lab_detail")}>
 <div className="rwb mb8">
 <span style={{fontSize:11,color:T.n500,fontWeight:800,textTransform:"uppercase"}}>{l.d}</span>
 <span style={{fontSize:10,fontWeight:900,color:l.flag?T.accent:T.primary,background:l.flag?T.accentSoft:T.primarySoft,padding:"3px 8px",borderRadius:100,textTransform:"uppercase"}}>{l.flag?" Variance detected":" Normal vector"}</span>
 </div>
 <div style={{fontWeight:900,color:T.n900,fontSize:16}}>{l.t}</div>
 <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
 {l.items.map(it=><span key={it} style={{fontSize:11,background:l.flagged.includes(it)?T.accentSoft:T.n100,color:l.flagged.includes(it)?T.accent:T.n500,padding:"4px 10px",borderRadius:8,fontWeight:800}}>{it}{l.flagged.includes(it)?" ":""}</span>)}
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
 <SBar/><PHeader title="Array Parse: Jan 5, 2024" onBack={()=>go("labs")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="card mb14" style={{background:T.accentSoft,border:`1px solid ${T.accent}33`,padding:16}}>
 <div style={{fontWeight:900,color:T.accent,marginBottom:6}}> Variance Detected</div>
 <p style={{fontSize:13,color:T.n700,lineHeight:1.6,fontWeight:600}}>Cortisol parameter out of bounds. Algorithmic correlation confirmed with #A1-SYS baseline tracking. Recommendation added to execution engine.</p>
 </div>
 <div className="card mb14" style={{background:"#fff",padding:0}}>
 <p style={{fontWeight:900,color:T.n900,margin:"16px 16px 12px",textTransform:"uppercase",fontSize:13}}>Raw Array Dump</p>
 {[{t:"Cortisol (AM)",r:"28.4",u:"g/dL",ref:"623",flag:true},{t:"CBC  Hemoglobin",r:"12.8",u:"g/dL",ref:"11.515.5",flag:false},{t:"TSH",r:"2.1",u:"mIU/L",ref:"0.54.0",flag:false},{t:"CMP  Glucose",r:"89",u:"mg/dL",ref:"70100",flag:false},{t:"Vitamin B12",r:"380",u:"pg/mL",ref:"200900",flag:false}].map((r,i)=>(
 <div key={r.t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:i<4?`1px solid ${T.n100}`:"none"}}>
 <div><div style={{fontWeight:800,color:T.n900,fontSize:14}}>{r.t}</div><div style={{fontSize:11,color:T.n500,fontWeight:700,marginTop:2}}>Ref limit: {r.ref} {r.u}</div></div>
 <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--fb)",fontWeight:900,color:r.flag?T.accent:T.primary,fontSize:16}}>{r.r}</div><div style={{fontSize:11,color:T.n500,fontWeight:800}}>{r.u}</div></div>
 </div>
 ))}
 </div>
 <div className="card" style={{border:`1px solid ${T.primary}33`,background:T.primarySoft,padding:16}}>
 <div style={{fontSize:13,fontWeight:900,color:T.primaryDark,marginBottom:6}}> ML Correlation Note</div>
 <p style={{fontSize:12,color:T.primaryDark,lineHeight:1.6,fontWeight:600}}>Elevated cortisol matrix aligns with vocal stress variance tracked Dec 28Jan 6. Adjusting sleep algorithms +2hrs to compensate.</p>
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
 <p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Allergies</p>
 <div style={{background:T.dangerSoft,borderRadius:11,padding:"11px 14px",borderLeft:`4px solid ${T.danger}`}}>
 <div style={{fontWeight:800,color:T.n900}}>Penicillin</div>
 <div style={{fontSize:12,color:T.n700,marginTop:3}}>Reaction: Urticaria (hives)  Severity: Moderate  Confirmed 2019</div>
 </div>
 </div>
 <div className="card"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Surgical History</p><p style={{fontSize:13,color:T.n500}}>No surgical history recorded.</p><button className="btn bs bsm mt10">+ Add Surgery</button></div>
 </div>
 </div>
);

const FamHist=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Family History " onBack={()=>go("med_hub")} right={<button className="btn bsm bp">+ Add</button>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <Disc short/>
 <div className="card mt14">
 <p style={{fontSize:12,color:T.n500,marginBottom:10}}>Used to contextualise AI risk analysis. Not used for diagnosis.</p>
 {[{r:"Mother",cs:["Anxiety disorder","Hypothyroidism"],age:42},{r:"Maternal grandmother",cs:["Depression","Alzheimer's (late onset)"],age:74},{r:"Father",cs:["No known psychiatric history"],age:45},{r:"Paternal grandfather",cs:["Type 2 diabetes","Cardiovascular disease"],age:71}].map((f,i)=>(
 <div key={i} style={{padding:"11px 0",borderBottom:i<3?`1px solid ${T.n100}`:"none"}}>
 <div style={{fontWeight:800,color:T.n900,fontSize:13,marginBottom:5}}>{f.r} <span style={{color:T.n500,fontSize:11,fontWeight:500}}> Age {f.age}</span></div>
 <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{f.cs.map(c=><span key={c} style={{fontSize:11,background:T.n100,color:T.n700,padding:"3px 7px",borderRadius:7,fontWeight:600}}>{c}</span>)}</div>
 </div>
 ))}
 </div>
 <div className="card mt14" style={{background:T.clinSoft}}><p style={{fontSize:12,color:T.clinDark,lineHeight:1.6}}> Maternal anxiety + maternal grandmother depression flagged as hereditary risk factors. The AI contextualises patterns against these  not to predict, but to inform observations.</p></div>
 </div>
 </div>
);

/* 
 CLINICAL SCREENING
 */
const ScreenHub=({go})=>{
 const ss=[
 {id:"phq9",ico:"",n:"PHQ-9",full:"Patient Health Questionnaire",desc:"Depression severity  9 questions",col:T.phq,ls:9,ld:"Jan 10",max:27,f:"Monthly"},
 {id:"gad7",ico:"",n:"GAD-7",full:"Generalised Anxiety Disorder Scale",desc:"Anxiety severity  7 questions",col:T.gad,ls:9,ld:"Jan 10",max:21,f:"Monthly"},
 {id:"mmse",ico:"",n:"MMSE",full:"Mini-Mental State Examination",desc:"Cognitive function  11 questions",col:T.mmse,ls:null,ld:null,max:30,f:"Quarterly"},
 {id:"phq9",ico:"",n:"Epworth",full:"Epworth Sleepiness Scale",desc:"Daytime sleepiness  8 questions",col:T.taker,ls:8,ld:"Dec 15",max:24,f:"On trigger"},
 ];
 const interp=(n,s)=>{
 if(n==="PHQ-9")return s<5?["Minimal",T.success]:s<10?["Mild",T.success]:s<15?["Moderate",T.accent]:["Mod-Severe",T.danger];
 if(n==="GAD-7")return s<5?["Minimal",T.success]:s<10?["Mild",T.success]:s<15?["Moderate",T.accent]:["Severe",T.danger];
 return["",T.n500];
 };
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Clinical Screening " onBack={()=>go("med_hub")} right={<span style={{fontSize:12,color:T.primary,fontWeight:700,cursor:"pointer"}} onClick={()=>go("screen_hist")}>History </span>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <Disc short/>
 <div className="ab in mt14 mb14"><span></span><span style={{fontSize:12}}><strong>Due this month:</strong> PHQ-9 + GAD-7  last Jan 10. Next due Feb 10.</span></div>
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
 <span style={{fontSize:10,color:T.n500}}>{s.f}{s.ld?`  Last: ${s.ld}`:"  Never done"}</span>
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
 const qs=["Little interest or pleasure in doing things","Feeling down, depressed, or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself  or that you are a failure","Trouble concentrating on things","Moving or speaking slowly  or fidgety/restless","Thoughts that you would be better off dead, or of hurting yourself"];
 const opts=["Not at all","Several days","More than half the days","Nearly every day"];
 const isCrisis=step===8;
 return(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <div style={{padding:"10px 20px",background:T.surf,borderBottom:`1px solid ${T.n100}`}}>
 <div className="rwb mb8"><button className="btn bg bsm" style={{paddingLeft:0,color:T.phq}} onClick={()=>step>0?setStep(s=>s-1):go("screen_hub")}> Back</button><span style={{fontSize:12,color:T.n500}}>PHQ-9  Q{step+1}/9</span></div>
 <div className="pbar"><div className="pfil" style={{width:`${((step+1)/9)*100}%`,background:T.phq}}/></div>
 </div>
 <div style={{flex:1,display:"flex",flexDirection:"column",padding:"18px 22px 28px",gap:14}}>
 <div>
 <span style={{fontSize:10,fontFamily:"var(--fm)",color:T.phq,fontWeight:700,background:T.phqSoft,padding:"2px 7px",borderRadius:6}}>PHQ-9 Depression Screening</span>
 <p style={{fontSize:12,color:T.n500,marginTop:10,marginBottom:10}}>Over the <strong>last 2 weeks</strong>, how often have you been bothered by:</p>
 {isCrisis&&<div className="ab da mb10"><span></span><div style={{fontSize:12}}><strong>Sensitive:</strong> This is important for your safety. If you're in crisis, call 988 (US) or your local crisis line.</div></div>}
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
 {step<8?"Next Question ":"View My Results"}
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
 <div className="rwb mb8"><button className="btn bg bsm" style={{paddingLeft:0,color:T.gad}} onClick={()=>step>0?setStep(s=>s-1):go("screen_hub")}> Back</button><span style={{fontSize:12,color:T.n500}}>GAD-7  Q{step+1}/7</span></div>
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
 {step<6?"Next ":"View Results"}
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
 <p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Score Interpretation</p>
 {[{r:"04",l:"Minimal",c:T.success,a:false},{r:"59",l:"Mild",c:T.success,a:true},{r:"1014",l:"Moderate",c:T.accent,a:false},{r:"1519",l:"Mod-Severe",c:T.danger,a:false},{r:"2027",l:"Severe",c:T.danger,a:false}].map((r,i)=>(
 <div key={r.l} style={{display:"flex",alignItems:"center",gap:9,padding:"5px 9px",borderRadius:9,background:r.a?T.phq+"10":"transparent",border:r.a?`1px solid ${T.phq}33`:"1px solid transparent"}}>
 <div style={{width:11,height:11,borderRadius:"50%",background:r.c,flexShrink:0}}/>
 <span style={{fontSize:12,fontWeight:r.a?800:600,color:r.a?T.phq:T.n700}}>{r.l} ({r.r})</span>
 {r.a&&<span style={{fontSize:10,color:T.phq,fontWeight:800,marginLeft:"auto"}}> Your score</span>}
 </div>
 ))}
 </div>
 <div className="card mb14" style={{background:T.clinSoft}}>
 <p style={{fontWeight:800,color:T.clinDark,marginBottom:7}}> Clinical Recommendation</p>
 <p style={{fontSize:13,color:T.clinDark,lineHeight:1.7}}>Score of 9 suggests <strong>mild depressive symptoms</strong>. Given active F41.1 + F32.1, discuss with Dr. Martnez at your next appointment. No immediate escalation, but monitor for increases above 12.</p>
 <p style={{fontSize:10,color:T.clinDark,marginTop:8,opacity:.7}}> Heuristic pattern analysis  not a clinical decision.</p>
 </div>
 <div style={{display:"flex",gap:10}}>
 <button className="btn bs f1" onClick={()=>go("screen_hist")}> History</button>
 <button className="btn bp f1" onClick={()=>go("clin_report")}> Export to Doctor</button>
 </div>
 </div>
 </div>
);

const ScreenHist=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Screening History " onBack={()=>go("screen_hub")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="card mb14"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}>PHQ-9  Depression Trend</p><MiniBar data={[59,48,41,33]} color={T.phq} labels={["Oct '23","Nov '23","Dec '23","Jan '24"]}/><div className="ab ok mt10"><span></span><span style={{fontSize:12}}>Score down 10 points (59%33% of max) over 3 months  improving.</span></div></div>
 <div className="card mb14"><p style={{fontWeight:800,color:T.n900,marginBottom:10}}>GAD-7  Anxiety Trend</p><MiniBar data={[76,62,52,43]} color={T.gad} labels={["Oct '23","Nov '23","Dec '23","Jan '24"]}/></div>
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

/* 
 TAKER SCREENS
 */
const TakerHome=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
   <SBar/>
   
   {/* HERO SECTION (Light Mode) */}
   <div style={{background:`linear-gradient(135deg, ${T.n100}, #fff)`,padding:"20px 20px 24px",borderBottom:`1px solid ${T.n300}44`}}>
     <div className="rwb mb10">
       <div style={{display:"flex",alignItems:"center",gap:12}}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.taker,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#fff",boxShadow:`0 4px 12px ${T.taker}44`}}>P</div>
         <div>
           <p style={{color:T.n500,fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:0.5}}>Taker Dashboard</p>
           <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:T.n900,lineHeight:1.1}}>Your Clients</h2>
         </div>
       </div>
       <button className="btn bg bsm" style={{background:T.surf,color:T.n900,border:`1px solid ${T.n300}`,borderRadius:50,padding:12,boxShadow:"0 2px 10px rgba(0,0,0,.03)"}} onClick={()=>go("settings")}><Settings size={18}/></button>
     </div>
   </div>

   <div style={{flex:1,padding:"16px 20px 40px",overflow:"auto"}}>
     {/* CRITICAL ALERTS ACROSS ALL CLIENTS */}
     <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Critical Alerts</p>
     <div className="card mb24" style={{background:T.dangerSoft,border:`1px solid ${T.danger}44`,padding:16}}>
       <div className="rwb mb10">
         <div style={{display:"flex",gap:10,alignItems:"center"}}>
           <div style={{background:T.danger,color:"#fff",padding:8,borderRadius:10}}><AlertCircle size={18}/></div>
           <span style={{fontWeight:900,fontSize:15,color:T.dangerDark}}>Maria Garca</span>
         </div>
         <span style={{fontSize:11,fontWeight:800,color:T.danger,background:"#fff",padding:"2px 8px",borderRadius:50}}>10m ago</span>
       </div>
       <p style={{fontSize:13,lineHeight:1.5,fontWeight:600,color:T.n900,marginBottom:12}}>Missed Sertraline dosage. Stress patterns detect elevated anxiety trend.</p>
       <button className="btn bsm" style={{background:"#fff",color:T.danger,border:`1px solid ${T.danger}22`,fontWeight:800,borderRadius:12,width:"100%",padding:"10px 0"}} onClick={()=>go("home_user")}>Open Client File</button>
     </div>

     {/* CLIENT DIRECTORY */}
     <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Client Directory</p>
     {[{n:"Maria", status:"Online", last:"Synced 2m ago", ring:84, col:T.primary}, {n:"Grandpa Joe", status:"Away", last:"Synced 4h ago", ring:42, col:T.accent}].map((u)=>(
       <div key={u.n} className="card mb12" style={{padding:20,cursor:"pointer",border:`1px solid transparent`,transition:"all .2s",background:"#fff",boxShadow:"0 4px 15px rgba(0,0,0,.04)"}} onClick={()=>go("home_user")} onMouseDown={e=>e.currentTarget.style.border=`1px solid ${T.taker}`} onMouseUp={e=>e.currentTarget.style.border=`1px solid transparent`}>
         <div style={{display:"flex",gap:16,alignItems:"center"}}>
           <div style={{position:"relative"}}>
             <Ring pct={u.ring} col={u.col} size={54} w={6}/>
             <div style={{width:12,height:12,background:u.status==="Online"?T.success:T.n400,borderRadius:"50%",border:"2px solid #fff",position:"absolute",bottom:0,right:0}}/>
           </div>
           <div style={{flex:1}}>
             <div style={{fontFamily:"var(--fb)",fontSize:18,fontWeight:900,color:T.n900}}>{u.n}</div>
             <div style={{fontSize:12,fontWeight:700,color:T.n500,marginTop:2}}>{u.status}  {u.last}</div>
           </div>
           <ChevronRight size={20} color={T.n300}/>
         </div>
       </div>
     ))}

     <button className="btn bw mt10" style={{width:"100%",padding:16,borderRadius:16,border:`2px dashed ${T.n300}`,background:"transparent",color:T.n700,fontWeight:800}} onClick={()=>{}}>
       + Link New Hardware / User
     </button>
   </div>
 </div>
);

/* CLINICAL BI DASHBOARD */
const ClinBI=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",position:"relative"}}>
 <SBar/>
 <div style={{background:`linear-gradient(135deg,${T.clin},${T.clinDark})`,padding:"16px 20px 32px"}}>
 <div className="rwb">
 <div><p style={{color:"rgba(255,255,255,.65)",fontSize:12}}>Clinical Intelligence</p><h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,color:"#fff"}}>Maria  Clinical BI</h2></div>
 <button className="btn bsm" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",borderRadius:50,fontWeight:800}} onClick={()=>go("clin_report")}> Report</button>
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
 <div className="rwb mb10"><p style={{fontWeight:800,color:T.n900,fontSize:13}}>PHQ-9 + GAD-7 Trend</p><span style={{fontSize:12,color:T.primary,cursor:"pointer"}} onClick={()=>go("screen_hist")}>All </span></div>
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
 <p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Active AI Clinical Flags</p>
 <div className="col gap10">
 <Flag icon="" title="SleepAnxiety Feedback Loop" body="Nights < 5hrs co-occur with 4060% higher anxiety entries. Consistent with known GAD exacerbation via sleep deprivation." sev="medium" action="View pattern" onAct={()=>go("ai_flags")}/>
 <Flag icon="" title="Cortisol + Stress Correlation" body="Elevated cortisol (Jan 5 lab) aligns with 10-day high-stress journal period. Possible HPA axis involvement  flag for clinician." sev="medium" action="View detail" onAct={()=>go("lab_detail")}/>
 </div>
 </div>
 <div className="card mb14">
 <p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Symptom Heatmap  30 Days</p>
 <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
 {[{s:"Anxiety",f:22},{s:"Low mood",f:14},{s:"Fatigue",f:18},{s:"Sleep ",f:16},{s:"Appetite ",f:6},{s:"Restless",f:11},{s:"Headache",f:4},{s:"Irritable",f:9},{s:"Concentrate ",f:12}].map(s=>(
 <div key={s.s} style={{padding:"5px 9px",borderRadius:9,background:`rgba(79,142,247,${s.f/32})`,border:`1px solid ${T.primary}33`,fontSize:11,fontWeight:700,color:s.f>14?"#fff":T.primary}}>{s.s} ({s.f})</div>
 ))}
 </div>
 <p style={{fontSize:10,color:T.n500,marginTop:7}}>Frequency in journal entries, past 30 days</p>
 </div>
 <button className="btn bs bw" onClick={()=>go("dev_mode")}> Raw Database (Dev Mode)</button>
 </div>
 <button className="fltbtn" onClick={()=>go("rag_chat")}></button>
 </div>
);

/* AI FLAGS */
const AIFlags=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",position:"relative"}}>
 <SBar/><PHeader title="AI Clinical Flags " onBack={()=>go("clin_bi")} right={<span className="chip cer" style={{fontSize:10}}>2 active</span>}/>
 <div style={{padding:"14px 20px 32px"}}>
 <Disc/>
 <div className="col gap12 mt14">
 {[{ico:"",sev:"medium",t:"SleepAnxiety Feedback Loop Detected",b:"30-day analysis shows nights with <5 hrs sleep followed by 4060% higher anxiety symptom frequency. Consistent with GAD exacerbation via sleep deprivation (NICE guidelines).",fw:"F41.1  Sleep disorder G47.0  NICE anxiety guidelines",act:"Discuss sleep hygiene + possible short-term support with Dr. Martnez",conf:82,icd:"F41.1"},
 {ico:"",sev:"medium",t:"Cortisol Elevation + Chronic Stress",b:"Cortisol 28.4g/dL (Jan 5) co-occurs with 10-day high-stress period. Sustained elevation linked to HPA dysregulation  bidirectional relationship with anxiety and depression.",fw:"F41.1 + F32.1 comorbidity  HPA research  Endocrine Society",act:"Flag for endocrinology review + track cortisol at next blood panel",conf:71,icd:"F41.1"},
 {ico:"",sev:"low",t:"PHQ-9 Improvement  Treatment Response",b:"PHQ-9 dropped from 169 over 3 months (OctJan), consistent with positive Sertraline 50mg response. Trajectory suggests continued improvement if adherence maintained.",fw:"PHQ-9 interpretation  SSRI response benchmarks",act:"Monitor  flag if score rises above 12 or 3+ consecutive missed doses",conf:89,icd:"F32.1"},
 {ico:"",sev:"low",t:"Possible New: Academic Anxiety Trigger",b:"School context words (homework, teacher, exam) in 68% of high-anxiety entries over 6 weeks. Not in prior diagnostic record. May warrant exploration of social phobia component.",fw:"F40.10 Social phobia  F93.0 childhood anxiety  SCARED checklist",act:"Add school-specific questions to next check-in. Discuss with Dr. Martnez.",conf:64,icd:"F40.10"},
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
 <button className="fltbtn" onClick={()=>go("rag_chat")}></button>
 </div>
);

/* CLINICIAN REPORT */
const ClinReport=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Clinician Report " onBack={()=>go("med_hub")}/>
 <div style={{padding:"14px 20px 40px"}}>
 <div className="card mb14" style={{background:"linear-gradient(135deg,#f8fffe,#e8f5f3)",border:`2px solid ${T.clin}33`}}>
 <div className="rwb mb10">
 <div><p style={{fontSize:10,fontWeight:800,color:T.clin,textTransform:"uppercase",letterSpacing:.5}}>Patient Summary Report</p><h2 style={{fontFamily:"var(--fb)",fontSize:17,fontWeight:800,color:T.n900,marginTop:2}}>Maria Garca, F, 12</h2></div>
 <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.n500}}>Generated</div><div style={{fontWeight:700,color:T.n900,fontSize:12}}>Jan 14, 2024</div></div>
 </div>
 <div style={{height:1,background:T.clin+"22",margin:"10px 0"}}/>
 {[{l:"Active Diagnoses",v:"F41.1 (GAD)  F32.1 (MDE mod)"},{l:"Current Medications",v:"Sertraline 50mg OD  Melatonin 3mg PRN"},{l:"Reporting Period",v:"Oct 2023  Jan 2024"},{l:"Last Clinical Visit",v:"Dec 12, 2023  City General ER"}].map(r=>(
 <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.n100}`,fontSize:11}}>
 <span style={{color:T.n500,fontWeight:700}}>{r.l}</span><span style={{color:T.n900,fontWeight:600,textAlign:"right",maxWidth:"55%"}}>{r.v}</span>
 </div>
 ))}
 </div>
 <div className="card mb14">
 <p style={{fontWeight:800,color:T.n900,marginBottom:10}}> Screening Scores</p>
 <div style={{display:"flex",gap:10}}>
 <ScBadge score={9} max={27} label="PHQ-9" color={T.phq}/>
 <ScBadge score={9} max={21} label="GAD-7" color={T.gad}/>
 </div>
 <p style={{fontSize:11,color:T.n500,marginTop:9}}>Trend: PHQ-9 44%  GAD-7 44% vs baseline (Oct 2023)</p>
 </div>
 <div className="card mb14">
 <p style={{fontWeight:800,color:T.n900,marginBottom:8}}> AI Pattern Observations</p>
 <Disc short/>
 <div className="col gap10 mt10">
 {["Sleepanxiety feedback loop detected (82% confidence)","Positive SSRI treatment response (89% confidence)","Academic context as possible anxiety trigger  not formally assessed (64%)"].map((o,i)=>(
 <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
 <span style={{color:T.clin,fontSize:13,flexShrink:0}}></span>
 <span style={{fontSize:12,color:T.n700,lineHeight:1.6}}>{o}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="col gap10">
 <button className="btn bw blg" style={{background:T.clin,color:"#fff",border:"none",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}}> Share with Dr. Martnez</button>
 <button className="btn bs bw"> Download PDF</button>
 <p style={{fontSize:11,color:T.n500,textAlign:"center"}}> Observational only  not a clinical assessment.</p>
 </div>
 </div>
 </div>
);

/* RAG CHAT */
const RagChat=({go})=>{
 const [inp,setInp]=useState("");
 const msgs=[
 {r:"a",t:" Hi! I'm your AI assistant. I have context from Maria's journals and clinical record. What would you like to know?"},
 {r:"u",t:"How has Maria's mood been this week compared to last?"},
 {r:"a",t:"Maria's average mood score this week is 74/100, up 6 points from last week (68/100). Best day Friday (92/100)  she mentioned a fun PE class. Lowest was Wednesday (55/100)  tired + high homework load."},
 {r:"u",t:"Should I worry about the Wednesday dip?"},
 {r:"a",t:"Wednesday dips are recurring but self-correcting in her data. If this persists 2+ more weeks, it's worth discussing mid-week schedule load. I'd suggest a breathing session after school on Wednesdays  her post-activity scores are 28 points higher. Want me to create a calendar reminder?"},
 ];
 return(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/><PHeader title="AI Assistant " onBack={()=>go("taker_home")} right={<span className="chip cta" style={{fontSize:10}}>RAG</span>}/>
 <div style={{background:T.takerSoft,padding:"7px 14px"}}><p style={{fontSize:11,color:T.taker,fontWeight:700}}> Powered by clinical journal data  Not a medical professional</p></div>
 <div style={{flex:1,padding:14,overflow:"auto",display:"flex",flexDirection:"column",gap:10}}>
 {msgs.map((m,i)=><div key={i} className={`ragbub ${m.r}`}>{m.t}</div>)}
 <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
 {[" PHQ-9 trend"," Set reminder"," Suggest activity"," Red flags?"," Medication status"].map(s=>(
 <button key={s} style={{padding:"5px 11px",borderRadius:100,background:T.surf,border:`1px solid ${T.n300}`,fontSize:11,fontWeight:700,cursor:"pointer",color:T.taker,boxShadow:"0 1px 4px rgba(26,29,46,.08)"}}>{s}</button>
 ))}
 </div>
 </div>
 <div style={{padding:"10px 14px 14px",background:T.surf,borderTop:`1px solid ${T.n100}`,display:"flex",gap:9}}>
 <input className="inp f1" style={{padding:"11px 13px"}} placeholder="Ask about your care circle..." value={inp} onChange={e=>setInp(e.target.value)}/>
 <button className="btn bt" style={{padding:"11px 14px"}}></button>
 </div>
 </div>
 );
};

/* TAKER CONNECT */
const TakerConn=({go})=>(
 <div style={{background:T.n900,minHeight:"100%",display:"flex",flexDirection:"column"}}>
  <SBar dark />
  <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30}}>
    <div className="apls" style={{width:120,height:120,borderRadius:"50%",background:T.primary,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 0 20px ${T.primary}33, 0 0 0 40px ${T.primary}11`,marginBottom:40}}>
      <Users size={60} color="#fff" strokeWidth={2}/>
    </div>
    <h2 style={{fontFamily:"var(--fb)",fontSize:32,fontWeight:900,color:"#fff",marginBottom:8}}>Calling Taker</h2>
    <p style={{color:T.n300,fontSize:16,fontWeight:600}}>(Secure VoIP Connection)</p>

    <div style={{display:"flex",gap:40,marginTop:80}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:T.n800,display:"flex",alignItems:"center",justifyContent:"center"}}><Mic size={24} color="#fff"/></div>
        <span style={{color:T.n300,fontSize:13,fontWeight:700}}>Mute</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>go("activities")}>
        <div style={{width:72,height:72,borderRadius:"50%",background:T.danger,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${T.danger}55`}}><AlertCircle size={32} color="#fff"/></div>
        <span style={{color:T.dangerSoft,fontSize:13,fontWeight:800}}>End Call</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:T.n800,display:"flex",alignItems:"center",justifyContent:"center"}}><MessageCircle size={24} color="#fff"/></div>
        <span style={{color:T.n300,fontSize:13,fontWeight:700}}>Keypad</span>
      </div>
    </div>
  </div>
 </div>
);

/* TAKER CALENDAR */
const TakerCal=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column"}}>
 <SBar/>
 <PHeader title="Schedule Routine" onBack={()=>go("activities")} />
 <div style={{padding:"24px 20px 32px"}}>
  <div className="rwb mb16"><h2 style={{fontFamily:"var(--fb)",fontSize:24,fontWeight:900,color:T.n900}}>Calendar</h2><button className="btn bsm bp" style={{borderRadius:50,boxShadow:"0 4px 12px rgba(79,142,247,.3)"}}>+ Add Event</button></div>
  
  <div className="card mb24" style={{padding:"20px 14px"}}>
   <div style={{display:"flex",gap:5}}>
   {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>(
   <div key={d} style={{flex:1,textAlign:"center"}}>
   <div style={{fontSize:11,color:T.n500,fontWeight:800,marginBottom:8}}>{d}</div>
   <div style={{width:36,height:36,margin:"0 auto",borderRadius:"50%",background:[8,9,10,11,12,13,14][i]===14?T.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:[8,9,10,11,12,13,14][i]===14?"#fff":T.n900,fontWeight:800,fontSize:15}}>{[8,9,10,11,12,13,14][i]}</div>
   {[8,9,14].includes([8,9,10,11,12,13,14][i]) && <div style={{width:4,height:4,borderRadius:"50%",background:[8,9,10,11,12,13,14][i]===14?"#fff":T.accent,margin:"4px auto 0"}}/>}
   </div>
   ))}
   </div>
  </div>

  <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Upcoming</p>
  <div className="col gap12">
  {[{t:"9:00 AM",l:"Morning Check-in",ico:<ClipboardList size={20} color={T.primary}/>,c:T.primarySoft,bx:`1px solid ${T.primary}44`},{t:"2:30 PM",l:"Medication Reminder",ico:<Pill size={20} color={T.success}/>,c:T.successSoft,bx:`1px solid ${T.success}44`},{t:"4:00 PM",l:"Breathing Exercise",ico:<Activity size={20} color={T.accent}/>,c:T.accentSoft,bx:`1px solid ${T.accent}44`},{t:"Tomorrow",l:"Therapy Appointment",ico:<Stethoscope size={20} color={T.taker}/>,c:T.takerSoft,bx:`1px solid ${T.taker}44`}].map((e,i)=>(
  <div key={i} className="card" style={{padding:"16px",display:"flex",alignItems:"center",gap:16,border:e.bx}}>
    <div style={{width:50,height:50,borderRadius:16,background:e.c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{e.ico}</div>
    <div>
     <div style={{fontWeight:800,color:T.n900,fontSize:15}}>{e.l}</div>
     <div style={{fontSize:12,color:T.n500,fontWeight:600,marginTop:4}}>{e.t}</div>
    </div>
  </div>
  ))}
  </div>
 </div>
 </div>
);

/* 
 SETTINGS & SYSTEM
 */
const SettingsScreen=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/>
 {/* Premium Hero Block */}
 <div style={{padding:"24px 20px 0"}}>
   <div className="card mb24" style={{background:"#fff",padding:24,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",border:"none",boxShadow:"0 8px 30px rgba(0,0,0,0.03)"}}>
     <div style={{width:84,height:84,borderRadius:"50%",background:`linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,fontWeight:900,color:"#fff",marginBottom:16,boxShadow:`0 4px 15px ${T.primary}44`}}>M</div>
     <h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:900,color:T.n900}}>Maria Garca</h2>
     <p style={{fontSize:13,color:T.n500,fontWeight:600,marginTop:4}}>Pro User  Active since Jan 2024</p>
     <div style={{background:T.accentSoft,color:T.accent,padding:"6px 14px",borderRadius:50,fontSize:11,fontWeight:900,textTransform:"uppercase",letterSpacing:0.5,marginTop:16,display:"flex",alignItems:"center",gap:6}}>
       <Zap size={14}/> 7 Day Streak
     </div>
   </div>
 </div>

 <div style={{padding:"0 20px 40px"}}>
 {[{s:"Profile",items:[
     {i:User, c:T.primary, l:"Edit Profile",sb:"Name, photo, pronouns",n:"settings"},
     {i:ShieldCheck, c:T.success, l:"Password & Security",sb:"Change password, biometrics",n:"settings"},
     {i:Users, c:T.taker, l:"Linked Takers",sb:"Manage access to your data",n:"linked_takers"}
   ]},
 {s:"Accessibility",items:[
     {i:Type, c:T.accent, l:"Display & Text",sb:"AAC mode, colorblind, font size",n:"reg3"},
     {i:Mic, c:T.primary, l:"Input Preferences",sb:"Voice, guided questions, AAC",n:"input_prefs"},
     {i:Bell, c:T.danger, l:"Notifications",sb:"Reminders, frequency, style",n:"settings"}
   ]},
 {s:"Privacy & Data",items:[
     {i:Activity, c:T.success, l:"Location & GPS",sb:"Location sharing settings",n:"gps"},
     {i:Database, c:T.phq, l:"My Data Archive",sb:"Export, delete, what's stored",n:"legal"},
     {i:FileText, c:T.n500, l:"Privacy & Legal",sb:"Terms, disclaimer, policy",n:"legal"}
   ]},
 {s:"Clinical Data",items:[
     {i:HeartPulse, c:T.clin, l:"My Health File",sb:"Visits, diagnoses, labs, meds",n:"med_hub"},
     {i:CalendarDays, c:T.primary, l:"Screening Schedule",sb:"PHQ-9, GAD-7 frequency",n:"screen_hub"},
     {i:FileText, c:T.accent, l:"Generate Clinician Report",sb:"Export summary for doctor",n:"clin_report"}
   ]},
 {s:"Support",items:[
     {i:MessageCircle, c:T.primary, l:"Help Center",sb:"FAQ and visual guides",n:"settings"},
     {i:Settings, c:T.n500, l:"Sign Out",sb:"Disconnect account",n:"welcome"}
   ]},
 ].map(section=>(
 <div key={section.s} style={{marginBottom:24}}>
   <p style={{fontSize:11,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:0.5,marginBottom:8,paddingLeft:16}}>{section.s}</p>
   <div className="card" style={{padding:0,background:"#fff",boxShadow:"0 4px 15px rgba(0,0,0,0.02)",border:"none",borderRadius:24,overflow:"hidden"}}>
     {section.items.map((it,i)=>(
       <div key={i} className="rwb" style={{padding:"16px 20px",borderBottom:i<section.items.length-1?`1px solid ${T.n100}`:"none",cursor:"pointer"}} onClick={()=>go(it.n)}>
         <div style={{display:"flex",alignItems:"center",gap:16}}>
           <div style={{width:40,height:40,borderRadius:12,background:it.c+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><it.i size={20} color={it.c}/></div>
           <div>
             <div style={{fontWeight:800,color:T.n900,fontSize:15}}>{it.l}</div>
             <div style={{fontSize:11,fontWeight:600,color:T.n500,marginTop:2}}>{it.sb}</div>
           </div>
         </div>
         <ChevronRight size={20} color={T.n300}/>
       </div>
     ))}
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
 <SBar/><PHeader title="GPS Tracking " onBack={()=>go("settings")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div className="ab wi mb14"><span></span><div><div style={{fontWeight:700,fontSize:13,color:T.n900}}>Privacy Notice</div><div style={{fontSize:12,color:T.n700,marginTop:2}}>GPS is OFF by default. Encrypted at rest. Only authorised Takers can see location data.</div></div></div>
 <div className="card mb14"><SRow icon="" label="Enable GPS Tracking" sub="Share location with authorised Takers" right={<Toggle checked={on} onChange={setOn}/>}/>{on&&<><SRow icon="" label="Safe Zones" sub="Home, school, trusted locations" right={<span style={{color:T.primary,fontWeight:700,fontSize:12}}>3 zones</span>}/><SRow icon="" label="Alert when leaving zone" sub="Notify Taker" right={<Toggle checked onChange={()=>{}}/>}/></>}</div>
 {on&&<div style={{background:"linear-gradient(135deg,#e8f4e8,#d4e8d4)",borderRadius:18,height:140,marginBottom:14,position:"relative",overflow:"hidden"}}>
 <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
 <div style={{position:"absolute",top:"40%",left:"48%",fontSize:26}}></div>
 <div style={{position:"absolute",bottom:9,right:9,background:T.success,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:100}}> In safe zone</div>
 </div>}
 <div className="card"><div style={{fontWeight:700,color:T.n900,marginBottom:7}}>Who can see my location</div><div className="row" style={{gap:9,padding:"7px 0"}}><div style={{width:34,height:34,borderRadius:"50%",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13}}>C</div><div><div style={{fontWeight:700,color:T.n900,fontSize:13}}>Papa Carlos</div><div style={{fontSize:11,color:T.n500}}>Taker</div></div><button className="btn bsm" style={{marginLeft:"auto",color:T.danger,border:`1px solid ${T.danger}`,background:"transparent",borderRadius:50,fontWeight:800}}>Revoke</button></div></div>
 </div>
 </div>
 );
 };

const LinkedTakers=({go})=>(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Linked Takers" onBack={()=>go("settings")}/>
 <div style={{padding:"20px"}}>
   <button className="btn bw mb24" style={{width:"100%",background:`linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,color:"#fff",border:"none",padding:18,borderRadius:20,fontWeight:900,fontSize:16,boxShadow:`0 8px 24px ${T.primary}44`}}>
     + Connect New Taker Link
   </button>
   
   <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Active Connections</p>
   
   <div className="card mb12" style={{padding:20,background:"#fff",borderRadius:20,border:"none",boxShadow:"0 4px 15px rgba(0,0,0,0.03)"}}>
     <div className="rwb mb16">
       <div style={{display:"flex",alignItems:"center",gap:14}}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.takerSoft,display:"flex",alignItems:"center",justifyContent:"center",color:T.taker,fontWeight:900,fontSize:20}}>P</div>
         <div>
           <div style={{fontWeight:900,fontSize:16,color:T.n900}}>Papa Carlos</div>
           <div style={{fontSize:12,fontWeight:700,color:T.n500}}>Primary Guardian</div>
         </div>
       </div>
       <span style={{fontSize:11,fontWeight:800,color:T.success,background:T.successSoft,padding:"4px 10px",borderRadius:50}}>Active</span>
     </div>
     <div style={{background:T.n100,padding:12,borderRadius:12,marginBottom:16}}>
       <div className="row" style={{gap:8,alignItems:"center"}}><ShieldCheck size={14} color={T.primary}/><span style={{fontSize:12,fontWeight:700,color:T.n900}}>Full Medical Access</span></div>
       <div className="row mt4" style={{gap:8,alignItems:"center"}}><Activity size={14} color={T.primary}/><span style={{fontSize:12,fontWeight:700,color:T.n900}}>Live GPS Tracking</span></div>
     </div>
     <button className="btn bsm bw" style={{width:"100%",background:"#fff",color:T.danger,border:`2px solid ${T.danger}22`,borderRadius:12,fontWeight:900,padding:"12px 0"}}>Revoke Access</button>
   </div>

   <div className="card" style={{padding:20,background:"#fff",borderRadius:20,border:"none",boxShadow:"0 4px 15px rgba(0,0,0,0.03)"}}>
     <div className="rwb mb16">
       <div style={{display:"flex",alignItems:"center",gap:14}}>
         <div style={{width:48,height:48,borderRadius:"50%",background:T.clinSoft,display:"flex",alignItems:"center",justifyContent:"center",color:T.clin,fontWeight:900,fontSize:20}}>D</div>
         <div>
           <div style={{fontWeight:900,fontSize:16,color:T.n900}}>Dr. Miller</div>
           <div style={{fontSize:12,fontWeight:700,color:T.n500}}>Clinician</div>
         </div>
       </div>
       <span style={{fontSize:11,fontWeight:800,color:T.n500,background:T.n100,padding:"4px 10px",borderRadius:50}}>Offline</span>
     </div>
     <div style={{background:T.n100,padding:12,borderRadius:12,marginBottom:16}}>
       <div className="row" style={{gap:8,alignItems:"center"}}><ShieldCheck size={14} color={T.primary}/><span style={{fontSize:12,fontWeight:700,color:T.n900}}>Medical Logs Only</span></div>
     </div>
     <button className="btn bsm bw" style={{width:"100%",background:"#fff",color:T.danger,border:`2px solid ${T.danger}22`,borderRadius:12,fontWeight:900,padding:"12px 0"}}>Revoke Access</button>
   </div>
 </div>
 </div>
);

const InputPrefs=({go})=>{
 const [mode,setMode]=useState("voice");
 return(
 <div style={{background:T.n100,minHeight:"100%"}}>
 <SBar/><PHeader title="Input Preferences" onBack={()=>go("settings")}/>
 <div style={{padding:"20px"}}>
   
   <div className="card mb24" style={{background:T.dangerSoft,border:`1px solid ${T.danger}44`,padding:16}}>
     <div style={{display:"flex",gap:10,marginBottom:8}}>
       <AlertCircle size={20} color={T.danger}/>
       <div style={{fontWeight:900,color:T.dangerDark}}>Global Lock Override</div>
     </div>
     <p style={{fontSize:13,fontWeight:600,color:T.n900,lineHeight:1.5}}>This setting completely locks the communication interface across the entire app. It cannot be bypassed on the Main Dashboard.</p>
   </div>

   <p style={{fontSize:12,fontWeight:900,color:T.n500,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Select Input Mode</p>

   <div className="card mb12" style={{padding:20,background:mode==="voice"?"#fff":T.n100,border:mode==="voice"?`2px solid ${T.primary}`:`2px solid transparent`,borderRadius:20,cursor:"pointer",transition:"all 0.2s"}} onClick={()=>setMode("voice")}>
     <div className="rwb">
       <div style={{display:"flex",alignItems:"center",gap:16}}>
         <div style={{width:54,height:54,borderRadius:16,background:mode==="voice"?T.primarySoft:"rgba(0,0,0,.05)",display:"flex",alignItems:"center",justifyContent:"center"}}><Mic size={24} color={mode==="voice"?T.primary:T.n500}/></div>
         <div>
           <div style={{fontWeight:900,fontSize:16,color:T.n900}}>Voice AI System</div>
           <div style={{fontSize:12,fontWeight:600,color:T.n500,marginTop:2}}>Live microphone analysis</div>
         </div>
       </div>
       <div style={{width:24,height:24,borderRadius:"50%",border:mode==="voice"?`7px solid ${T.primary}`:`2px solid ${T.n300}`}}/>
     </div>
   </div>

   <div className="card mb12" style={{padding:20,background:mode==="aac"?"#fff":T.n100,border:mode==="aac"?`2px solid ${T.accent}`:`2px solid transparent`,borderRadius:20,cursor:"pointer",transition:"all 0.2s"}} onClick={()=>setMode("aac")}>
     <div className="rwb">
       <div style={{display:"flex",alignItems:"center",gap:16}}>
         <div style={{width:54,height:54,borderRadius:16,background:mode==="aac"?T.accentSoft:"rgba(0,0,0,.05)",display:"flex",alignItems:"center",justifyContent:"center"}}><Layers size={24} color={mode==="aac"?T.accent:T.n500}/></div>
         <div>
           <div style={{fontWeight:900,fontSize:16,color:T.n900}}>AAC Picture Board</div>
           <div style={{fontSize:12,fontWeight:600,color:T.n500,marginTop:2}}>Tap-to-speak visual cards</div>
         </div>
       </div>
       <div style={{width:24,height:24,borderRadius:"50%",border:mode==="aac"?`7px solid ${T.accent}`:`2px solid ${T.n300}`}}/>
     </div>
   </div>

 </div>
 </div>
 )
};

const DevMode=({go})=>(
 <div style={{background:"#0d1a0d",minHeight:"100%"}}>
 <SBar dark/>
 <div style={{background:"#1a2e1a",padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
 <button style={{background:"none",border:"none",color:"#00ff88",cursor:"pointer",fontSize:12}} onClick={()=>go("clin_bi")}> Exit Dev</button>
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
 <div style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(0,255,136,.4)",marginTop:7}}>3 documents  14ms</div>
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
 <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}></div>
 <div><p style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Good afternoon!</p><h2 style={{fontFamily:"var(--fb)",fontSize:26,fontWeight:800,color:"#fff",marginTop:4}}>Time for your check-in </h2><p style={{color:"rgba(255,255,255,.5)",marginTop:10,lineHeight:1.7}}>You're on a <strong style={{color:T.accent}}>7-day streak</strong>. Just 60 seconds to keep it going!</p></div>
 <div className="col gap10" style={{width:"100%"}}>
 <button className="btn bp bw blg" onClick={()=>go("voice_idle")}> Talk to me</button>
 <button className="btn bw blg" style={{background:"rgba(255,255,255,.08)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,fontWeight:800,fontSize:17,padding:"18px 28px"}} onClick={()=>go("guided_q")}> Clinical Questions</button>
 <button className="btn bg bw" style={{color:"rgba(255,255,255,.3)"}} onClick={()=>go("home_user")}>Remind me later</button>
 </div>
 <p style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>Skipping 3+ days reduces AI pattern accuracy</p>
 </div>
);

const Offline=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
 <SBar/>
 <div style={{fontSize:72,filter:"grayscale(1)"}}></div>
 <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>You're offline</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>No connection. Entries are saved locally and synced when you reconnect.</p></div>
 <div className="card" style={{width:"100%",textAlign:"left"}}>
 {[" View past entries"," Record new entry (saves locally)"," All breathing activities"," Grounding exercises"," AI insights (need internet)"," Taker sync (need internet)"].map(f=><p key={f} style={{fontSize:12,color:T.n700,padding:"3px 0"}}>{f}</p>)}
 </div>
 <button className="btn bp bw" onClick={()=>go("home_user")}>Continue Offline</button>
 </div>
);

const EmptyState=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:14}}>
 <SBar/>
 <div style={{fontSize:76,animation:"float 3s ease-in-out infinite"}}></div>
 <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>No entries yet</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>Start your first clinical check-in today  it only takes 60 seconds!</p></div>
 <button className="btn bp bw blg" onClick={()=>go("voice_idle")}> Make My First Entry</button>
 <button className="btn bs bw" onClick={()=>go("guided_q")}> Use Clinical Questions</button>
 </div>
);

const ErrorSc=({go})=>(
 <div style={{background:T.n100,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",gap:18}}>
 <SBar/><div style={{fontSize:68}}></div>
 <div><h2 style={{fontFamily:"var(--fb)",fontSize:22,fontWeight:800,color:T.n900}}>Something went wrong</h2><p style={{color:T.n500,marginTop:8,lineHeight:1.7}}>Your data is safe. This is a temporary issue.</p></div>
 <div className="card" style={{width:"100%",textAlign:"left"}}><p style={{fontFamily:"var(--fm)",fontSize:10,color:T.n500}}>Error: NetworkRequestFailed  503 Service Unavailable</p></div>
 <div style={{display:"flex",gap:10,width:"100%"}}><button className="btn bp f1"> Retry</button><button className="btn bs f1" onClick={()=>go("home_user")}>Go Home</button></div>
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
 <SBar/><PHeader title="My Journey " onBack={()=>go("home_user")}/>
 <div style={{padding:"14px 20px 32px",overflow:"auto"}}>
 <div className="tabbar mb14">{["Week","Month","3 Months","Year"].map((t,i)=><div key={t} className={`tabi${i===0?" on":""}`}>{t}</div>)}</div>
 {[{t:"Mood Score",i:"",d:[65,80,55,90,70,85,60],c:T.primary,l:["M","T","W","T","F","S","S"],avg:"72/100"},
 {t:"PHQ-9 Proxy",i:"",d:[45,52,38,42,35,38,30],c:T.phq,l:["M","T","W","T","F","S","S"],avg:"Mild range"},
 {t:"GAD-7 Proxy",i:"",d:[55,60,48,52,42,45,38],c:T.gad,l:["M","T","W","T","F","S","S"],avg:"Mild range"},
 {t:"Sleep Hours",i:"",d:[70,85,60,75,90,95,80],c:T.taker,l:["M","T","W","T","F","S","S"],avg:"7.4 hrs"},
 {t:"Activity Minutes",i:"",d:[20,0,30,15,25,40,10],c:T.success,l:["M","T","W","T","F","S","S"],avg:"20 min/day"},
 {t:"Medication Adherence",i:"",d:[100,100,0,100,100,100,0],c:T.med,l:["M","T","W","T","F","S","S"],avg:"87% this week"},
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
 <SBar/><PHeader title="Weekly Summary " onBack={()=>go("home_user")}/>
 <div style={{padding:"14px 20px 32px"}}>
 <div style={{background:"linear-gradient(135deg,#4F8EF7,#9B6DFF)",borderRadius:18,padding:18,marginBottom:14,color:"#fff"}}>
 <p style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>Jan 814, 2024</p>
 <h2 style={{fontFamily:"var(--fb)",fontSize:20,fontWeight:800,marginTop:4}}>A pretty good week! </h2>
 <p style={{fontSize:13,marginTop:8,color:"rgba(255,255,255,.85)",lineHeight:1.6}}>Logged 6/7 days. Average mood 74/100 (up from 68). PHQ-9 proxy stable. 4 breathing sessions completed. Medication adherence 87%.</p>
 </div>
 {[{i:"",t:"Highlights",items:["Mood up 9% vs last week","PHQ-9 proxy score improving (9stable)","4 breathing exercises completed","Medication adherence 87%"]},
 {i:"",t:"Areas to watch",items:["Wednesday energy dip persists (cortisol pattern)","Missed Monday check-in","Only 5.5 hrs sleep Sunday","1 missed Sertraline dose (Wed)"]},
 {i:"",t:"Next week",items:["Try breathing exercise Wednesday afternoon","Set 9 PM sleep alarm for consistency","Log sleep hours each morning","PHQ-9 + GAD-7 due Feb 10"]},
 ].map(section=>(
 <div key={section.t} className="card mb12">
 <div className="row mb9" style={{gap:7}}><span style={{fontSize:18}}>{section.i}</span><span style={{fontWeight:800,color:T.n900,fontSize:14}}>{section.t}</span></div>
 {section.items.map(it=><div key={it} style={{display:"flex",gap:7,alignItems:"flex-start",padding:"3px 0"}}><span style={{color:T.primary,fontSize:12,marginTop:1}}></span><span style={{fontSize:12,color:T.n700,lineHeight:1.5}}>{it}</span></div>)}
 </div>
 ))}
 </div>
 </div>
);

/* 
 SCREEN REGISTRY
 */
const SCREENS = {
 // Auth (no nav)
 welcome: {C:Welcome, noNav:true},
 login: {C:Login, noNav:true},
 reg1: {C:Reg1, noNav:true},
 reg2: {C:Reg2, noNav:true},
 reg3: {C:Reg3, noNav:true},
 reg4: {C:Reg4, noNav:true},
 forgot: {C:Forgot, noNav:true},
 legal: {C:Legal, noNav:true},
 // User flow
 home_user: {C:HomeUser, role:"user", tab:"home"},
 voice_idle: {C:VoiceIdle, role:"user", tab:"talk"},
 voice_listen:{C:VoiceListen, role:"user", tab:"talk"},
 voice_proc: {C:VoiceProc, role:"user", tab:"talk"},
 voice_resp: {C:VoiceResp, role:"user", tab:"talk"},
 aac_main: {C:AACMain, role:"user", tab:"talk"},
 aac_cat: {C:AACCat, role:"user", tab:"talk"},
 guided_q: {C:GuidedQ, role:"user", tab:"talk"},
 // Activities
 activities: {C:ActHub, role:"user", tab:"activities"},
 breath_i: {C:BreathI, role:"user", tab:"activities"},
 breath_a: {C:BreathA, role:"user", tab:"activities"},
 breath_done: {C:BreathDone, role:"user", tab:"activities"},
 box_breath: {C:BoxBreath, role:"user", tab:"activities"},
 grounding: {C:Grounding, role:"user", tab:"activities"},
 emergency: {C:Emergency, role:"user", tab:"activities"},
 dial_911: {C:Dial911, role:"user", tab:"activities"},
 panic_protocol: {C:PanicProtocol, role:"user", tab:"activities"},
 calm_mode: {C:CalmMode, role:"user", tab:"activities"},
 act_hist: {C:ActHist, role:"user", tab:"activities"},
 body_scan: {C:BodyScan, role:"user", tab:"activities"},
 // User dashboards
 journey_dash:{C:JourneyDash, role:"user", tab:"home"},
 weekly_sum: {C:WeeklySummary,role:"user", tab:"home"},
 // Medical history
 med_hub: {C:MedHub, role:"user", tab:"medical"},
 visits: {C:Visits, role:"user", tab:"medical"},
 add_visit: {C:AddVisit, role:"user", tab:"medical"},
 diagnoses: {C:Diagnoses, role:"user", tab:"medical"},
 dx_detail: {C:DxDetail, role:"user", tab:"medical"},
 medications: {C:Medications, role:"user", tab:"medical"},
 med_adherence:{C:MedAdherence,role:"user", tab:"medical"},
 labs: {C:Labs, role:"user", tab:"medical"},
 lab_detail: {C:LabDetail, role:"user", tab:"medical"},
 allergies: {C:Allergies, role:"user", tab:"medical"},
 fam_hist: {C:FamHist, role:"user", tab:"medical"},
 // Screening
 screen_hub: {C:ScreenHub, role:"user", tab:"medical"},
 phq9: {C:PHQ9, role:"user", tab:"medical"},
 gad7: {C:GAD7, role:"user", tab:"medical"},
 screen_result:{C:ScreenResult,role:"user", tab:"medical"},
 screen_hist: {C:ScreenHist, role:"user", tab:"medical"},
 // Clinician report (accessible both roles)
 clin_report: {C:ClinReport, role:"user", tab:"medical"},
 // Settings
 settings: {C:SettingsScreen, role:"user", tab:"settings"},
 gps: {C:GPS, role:"user", tab:"settings"},
 linked_takers: {C:LinkedTakers, role:"user", tab:"settings"},
 input_prefs: {C:InputPrefs, role:"user", tab:"settings"},
 // Taker flow
 taker_home: {C:TakerHome, role:"taker", tab:"dashboard"},
 clin_bi: {C:ClinBI, role:"taker", tab:"dashboard"},
 ai_flags: {C:AIFlags, role:"taker", tab:"dashboard"},
 rag_chat: {C:RagChat, role:"taker", tab:"control"},
 taker_conn: {C:TakerConn, role:"taker", tab:"connect"},
 taker_cal: {C:TakerCal, role:"taker", tab:"calendar"},
 dev_mode: {C:DevMode, role:"taker", tab:"control"},
 // System (no nav)
 checkin: {C:CheckIn, noNav:true},
 offline: {C:Offline, role:"user", tab:"home"},
 empty: {C:EmptyState, role:"user", tab:"home"},
 error_sc: {C:ErrorSc, role:"user", tab:"home"},
 loading: {C:Loading, role:"user", tab:"home"},
};

/* 
 NAVIGATOR GROUPS
 */
const NAV = [
 {g:"Auth Flow", ss:[["welcome","Welcome"],["login","Login"],["reg1","Register"],["forgot","Forgot PW"],["legal","Legal"]]},
 {g:"Communication", ss:[["voice_idle","Voice Idle"],["voice_listen","Listening"],["voice_proc","Processing"],["voice_resp","Response"],["aac_main","AAC Board"],["aac_cat","AAC Category"],["guided_q","Clinical Q's"]]},
 {g:"Activities", ss:[["activities","Hub"],["breath_i","4-7-8 Intro"],["breath_a","Breathing"],["breath_done","Done!"],["box_breath","Box Breathing"],["grounding","Grounding"],["emergency","Emergency"],["calm_mode","Calm Mode"],["act_hist","History"]]},
 {g:"User Home & Dashboard", ss:[["checkin","Check-in Prompt"],["home_user","User Home"],["journey_dash","My Journey"],["weekly_sum","Weekly Summary"]]},
 {g:"Medical History", ss:[["med_hub","Med Hub"],["visits","Visits"],["add_visit","Add Visit"],["diagnoses","Diagnoses"],["dx_detail","Dx Detail"],["medications","Medications"],["med_adherence","Adherence"],["labs","Labs"],["lab_detail","Lab Detail"],["allergies","Allergies"],["fam_hist","Family Hx"]]},
 {g:"Clinical Screening", ss:[["screen_hub","Screening Hub"],["phq9","PHQ-9"],["gad7","GAD-7"],["screen_result","Result"],["screen_hist","History"]]},
 {g:"Taker & Clinical AI", ss:[["taker_home","Taker Home"],["clin_bi","Clinical BI"],["ai_flags","AI Flags"],["clin_report","Dr. Report"],["rag_chat","RAG Chat"],["taker_conn","Connect"],["taker_cal","Calendar"],["dev_mode","Dev Mode"]]},
 {g:"Settings & System", ss:[["settings","Settings"],["gps","GPS"],["offline","Offline"],["empty","Empty State"],["error_sc","Error"],["loading","Loading"]]},
];

/* 
 MAIN APP
 */
export default function App() {
 const [cur, setCur] = useState("welcome");
 const [open, setOpen] = useState(false);
 const [role, setRole] = useState("user");

 const go = (id) => {
 if (id === "settings" && role === "snu") return;
 if (SCREENS[id]) { setCur(id); setOpen(false); }
 else setCur(role==="taker"?"taker_home":"home_user");
 };

 const onTab = (tabId) => {
 const map = {
 talk:"voice_idle",
 activities: "activities",
 dashboard: role === "taker" ? "taker_home" : "home_user",
 settings:"settings",
 };
 if (map[tabId]) setCur(map[tabId]);
 };

 const switchRole = (newRole) => {
 setRole(newRole);
 setCur(newRole === "taker" ? "taker_home" : "home_user");
 };

 const sc = SCREENS[cur] || SCREENS.welcome;
 const Comp = sc.C;

 return (
 <>
 <style dangerouslySetInnerHTML={{__html: CSS}}/>

 {/*  Collapsible meta-nav  */}
 <div className="mnav">
 <button className="mnavtg" onClick={()=>setOpen(o=>!o)}>
 <span style={{fontSize:13}}>{open?"":""}</span>
 {open ? "HIDE SCREEN NAVIGATOR" : " SCREEN NAVIGATOR  tap to browse all screens"}
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

 {!sc.noNav && <RoleSwitch role={role} onSwitch={switchRole}/>}

 {/*  Phone shell  */}
 <div style={{paddingTop:40,display:"flex",justifyContent:"center",alignItems:"flex-start",minHeight:"100vh"}}>
 <div className="shell">
 <div className="scr">
 <Comp go={go} role={role} setRole={setRole}/>
 </div>
 {!sc.noNav && (
 <BNav role={role} active={sc.tab} onNav={onTab}/>
 )}
 </div>
 </div>
 </>
 );
}

