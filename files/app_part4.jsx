
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
