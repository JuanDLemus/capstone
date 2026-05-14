
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
