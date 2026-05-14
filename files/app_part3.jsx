
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
