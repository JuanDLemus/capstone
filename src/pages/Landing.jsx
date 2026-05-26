import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

/* ANIMATED STAT BADGE */
function StatBadge({ value, label, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease", textAlign: "center",
    }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#00ff88", fontFamily: "JetBrains Mono, monospace" }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

/* FEATURE PILL */
function Pill({ icon, text }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)",
      borderRadius: 100, padding: "6px 14px", fontSize: 13, color: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(8px)",
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden",
      fontFamily: "Nunito, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cta-primary {
          background: linear-gradient(135deg, #00ff88, #00c4ff);
          color: #000; border: none; border-radius: 100px;
          padding: 16px 40px; font-size: 17px; font-weight: 900;
          cursor: pointer; font-family: Sora, sans-serif;
          transition: all 0.3s; letter-spacing: 0.3px;
          box-shadow: 0 0 30px rgba(0,255,136,0.4);
        }
        .cta-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 0 50px rgba(0,255,136,0.6); }
        .cta-secondary {
          background: transparent; color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 100px;
          padding: 14px 32px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: Nunito, sans-serif;
          transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .cta-secondary:hover { border-color: rgba(0,255,136,0.5); color: #00ff88; transform: translateY(-1px); }
        .glow-text {
          background: linear-gradient(135deg, #00ff88 0%, #00c4ff 50%, #a855f7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse at 50% 60%, rgba(0,255,136,0.06) 0%, transparent 70%), radial-gradient(ellipse at 80% 20%, rgba(0,196,255,0.05) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* CONTENT */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 900, margin: "0 auto", padding: "0 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
        minHeight: "100vh", justifyContent: "center", gap: 0,
        opacity: contentVisible ? 1 : 0, transition: "opacity 0.8s",
      }}>

        {/* LOGO + BADGE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 24,
            background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(0,255,136,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}>
            <img src={logo} alt="EchoVolt" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 12 }} />
          </div>
          <div style={{
            background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)",
            borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 800,
            color: "#00ff88", letterSpacing: 2, textTransform: "uppercase",
          }}>
            Capstone 2026 • Universidad de la Sabana
          </div>
        </div>

        {/* HEADLINE */}
        <h1 style={{
          fontFamily: "Sora, sans-serif", fontSize: "clamp(36px, 7vw, 72px)",
          fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.1,
          marginBottom: 20,
        }}>
          <span className="glow-text">EchoVolt</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.65em", fontWeight: 700 }}>
            Cognitive Accessibility<br />Health Assistant
          </span>
        </h1>

        {/* SUBTITLE */}
        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.55)",
          textAlign: "center", maxWidth: 560, lineHeight: 1.7, marginBottom: 40,
        }}>
          Voice & AAC communication, real-time AI health guidance,<br />
          and personalized patient context — built for accessibility.
        </p>

        {/* FEATURE PILLS */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 48,
        }}>
          <Pill icon="🎤" text="Voice STT" />
          <Pill icon="🃏" text="AAC Cards" />
          <Pill icon="🧠" text="RAG Health Context" />
          <Pill icon="📊" text="Mood Tracking" />
          <Pill icon="💊" text="Medication Hub" />
          <Pill icon="🌐" text="Multilingual" />
        </div>

        {/* CTA BUTTONS */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <button className="cta-primary" onClick={() => navigate("/download")}>
            Get the App
          </button>
          <button className="cta-secondary" onClick={() => navigate("/demo")}>
            Web Demo
          </button>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40,
          padding: "32px 48px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24, backdropFilter: "blur(16px)",
          marginBottom: 48,
        }}>
          <StatBadge value="3000+" label="Concurrent Users" delay={400} />
          <StatBadge value="98.1%" label="Test Coverage" delay={600} />
          <StatBadge value="< 800ms" label="AI Response" delay={800} />
        </div>

        {/* FOOTER NOTE */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
          Built with FastAPI · React Native · Expo · LM Studio · PostgreSQL
        </p>
      </div>
    </div>
  );
}
