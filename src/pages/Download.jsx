import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* CONFIG SOURCE — fetched from GitHub raw on every load */
const CONFIG_URL = "https://raw.githubusercontent.com/JuanDLemus/capstone/main/config.json";

/* CURRENT EXPO ASCII QR (fallback if config.json not yet updated) */
const FALLBACK_ASCII_QR = `▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀█ █▄█▄▀██ ▄▄▄▄▄ █
█ █   █ █▀▀▀█ ▀▄█▄█ █   █ █
█ █▄▄▄█ █▀ █▀▀▄▄▀██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀ ▀▄█ ▀▄█▄▄▄▄▄▄▄█
█▄   ▄▀▄▄▄▄▀▄▀▄▀▄▄▄█▄█ █ ██
█▄█▀██ ▄▀██▄█▀██▄█▄██▄ █▄ █
█ ▄▄▄  ▄█▄ ▄█▄ ▀▄▄▀▄▄▄▀ ▀██
█ █▄▀█ ▄▀▄█▀ ▄▄█▄▀▀ ▄▀ ▄  █
█▄██▄▄▄▄▄▀█ ▄  ▀▀ ▄▄▄ ▄ ▄▄█
█ ▄▄▄▄▄ █▄ ▄█▀██▀ █▄█ ▀▄  █
█ █   █ █ ▄▄▀▀▄▀ ▄▄   ▄ ▀▀█
█ █▄▄▄█ █ ▄▀█ ██▄  ▀▀█▀▄█ █
█▄▄▄▄▄▄▄█▄█▄▄█▄█▄██████▄▄▄█`;

/* EXPO TUNNEL URL (fallback) */
const FALLBACK_EXPO_URL = "exp://u.expo.dev/update";

/* MATRIX RAIN CANVAS */
function MatrixRain({ running = true, fadeOut = false }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const chars = "アイウエオECHOVOLTHEALTH010110";
    let drops = Array.from({ length: Math.floor(canvas.width / 16) }, () => Math.random() * -80);

    let running_ = running;
    const tick = setInterval(() => {
      if (!running_) return;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#a855f7";
      ctx.font = "13px JetBrains Mono, monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 16, y * 16);
        drops[i] = y > canvas.height / 16 + Math.random() * 15 ? 0 : y + 1;
      });
    }, 45);

    return () => { clearInterval(tick); ro.disconnect(); };
  }, [running]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: fadeOut ? 0 : 1, transition: "opacity 1.2s ease",
        borderRadius: 20,
      }}
    />
  );
}

/* OPTION CARD */
function OptionCard({ id, icon, title, subtitle, badge, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        background: selected ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.03)",
        border: `2px solid ${selected ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 20, padding: "20px 24px",
        cursor: "pointer", textAlign: "left", transition: "all 0.3s",
        display: "flex", alignItems: "center", gap: 18,
        transform: selected ? "scale(1.02)" : "scale(1)",
        boxShadow: selected ? "0 0 30px rgba(168,85,247,0.12)" : "none",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 36 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>{title}</span>
          {badge && (
            <span style={{
              background: "rgba(168,85,247,0.15)", color: "#a855f7",
              border: "1px solid rgba(168,85,247,0.3)", borderRadius: 100,
              padding: "2px 10px", fontSize: 10, fontWeight: 800, letterSpacing: 1,
              textTransform: "uppercase",
            }}>{badge}</span>
          )}
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{subtitle}</span>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        border: `2px solid ${selected ? "#a855f7" : "rgba(255,255,255,0.2)"}`,
        background: selected ? "#a855f7" : "transparent",
        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s",
      }}>
        {selected && <span style={{ color: "#000", fontSize: 12, fontWeight: 900 }}>V</span>}
      </div>
    </button>
  );
}

/* STEP BADGE */
function Step({ n, text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 700, color: "#a855f7",
      }}>{n}</div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, paddingTop: 4 }}>{text}</p>
    </div>
  );
}

export default function Download() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  /* MATRIX LOADING PHASE */
  const [phase, setPhase] = useState("matrix"); // matrix | reveal | content
  const [matrixText, setMatrixText] = useState("");

  /* CONFIG FROM GITHUB */
  const [expoAsciiQr, setExpoAsciiQr] = useState(FALLBACK_ASCII_QR);
  const [expoUrl, setExpoUrl] = useState(FALLBACK_EXPO_URL);
  const [apkUrl, setApkUrl] = useState(null);

  /* FETCH LIVE CONFIG */
  useEffect(() => {
    fetch(CONFIG_URL + "?t=" + Date.now())
      .then(r => r.json())
      .then(cfg => {
        if (cfg.expo_ascii_qr) setExpoAsciiQr(cfg.expo_ascii_qr);
        if (cfg.expo_tunnel_url) setExpoUrl(cfg.expo_tunnel_url);
        if (cfg.apk_download_url) setApkUrl(cfg.apk_download_url);
      })
      .catch(() => {});
  }, []);

  /* MATRIX → ASCII QR REVEAL SEQUENCE */
  useEffect(() => {
    let t1, t2;
    if (selected === "expo") {
      setPhase("matrix");
      setMatrixText("");
      const lines = expoAsciiQr.split("\n");
      let revealedLines = 0;
      t1 = setTimeout(() => {
        const interval = setInterval(() => {
          revealedLines++;
          setMatrixText(lines.slice(0, revealedLines).join("\n"));
          if (revealedLines >= lines.length) {
            clearInterval(interval);
            setPhase("reveal");
          }
        }, 120);
        t2 = interval;
      }, 1500);
    } else {
      setPhase("content");
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [selected, expoAsciiQr]);

  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      fontFamily: "Nunito, sans-serif", color: "#fff",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dl-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #a855f7, #00c4ff);
          color: #000; border: none; border-radius: 100px;
          padding: 14px 32px; font-size: 16px; font-weight: 900;
          cursor: pointer; font-family: Sora, sans-serif;
          transition: all 0.3s; text-decoration: none;
          box-shadow: 0 0 24px rgba(168,85,247,0.3);
        }
        .dl-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(168,85,247,0.5); }
        .back-btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5); border-radius: 100px;
          padding: 8px 20px; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; font-family: Nunito, sans-serif;
        }
        .back-btn:hover { color: #a855f7; border-color: rgba(168,85,247,0.4); }
        .ascii-qr {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(8px, 1.8vw, 13px);
          line-height: 1.15; white-space: pre; color: #a855f7;
          text-align: center; letter-spacing: 0.05em;
        }
      `}</style>

      {/* NAV BAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 18 }}>
            <span style={{ color: "#a855f7" }}>Echo</span>Volt
          </span>
        </div>
        <button className="back-btn" onClick={() => navigate("/demo")}>Web Demo →</button>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "100px 24px 60px" }}>

        {/* HEADLINE */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{
            fontFamily: "Sora, sans-serif", fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800, marginBottom: 16, lineHeight: 1.1,
          }}>
            Get EchoVolt on{" "}
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #00c4ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>your device</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
            Choose the option that works best for you.
          </p>
        </div>

        {/* OPTION CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          <OptionCard
            id="expo"
            icon=""
            title="Expo Go"
            subtitle="Scan the ASCII QR code with the Expo Go app. Works on Android and iOS. Perfect for 4G/5G testing via Expo Tunnel."
            badge="Recommended"
            selected={selected === "expo"}
            onClick={setSelected}
          />
          <OptionCard
            id="apk"
            icon=""
            title="Download APK"
            subtitle="Install the APK directly on your Android device. No Expo Go needed — standalone app."
            selected={selected === "apk"}
            onClick={setSelected}
          />
          <OptionCard
            id="iphone"
            icon=""
            title="iPhone instructions"
            subtitle="Use Expo Go from the App Store and scan the QR code."
            selected={selected === "iphone"}
            onClick={setSelected}
          />
        </div>

        {/* DETAIL PANELS */}
        {selected === "expo" && (
          <div style={{
            background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: 24, padding: 32, marginBottom: 32,
          }}>
            {/* MATRIX LOADING PANEL */}
            <div style={{
              position: "relative", overflow: "hidden", borderRadius: 20,
              background: "#050505", minHeight: 260,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 28,
            }}>
              {phase === "matrix" && (
                <>
                  <MatrixRain running fadeOut={matrixText.length > 0} />
                  <div style={{
                    position: "absolute", zIndex: 2, textAlign: "center",
                    opacity: matrixText.length > 0 ? 0 : 1, transition: "opacity 0.5s",
                  }}>
                    <div className="ascii-qr" style={{ fontSize: 11, color: "rgba(168,85,247,0.4)" }}>
                      LOADING TERMINAL QR...
                    </div>
                  </div>
                  {matrixText && (
                    <div style={{ position: "absolute", zIndex: 3, padding: 24 }}>
                      <div className="ascii-qr">{matrixText}</div>
                    </div>
                  )}
                </>
              )}
              {(phase === "reveal" || phase === "content") && (
                <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=a855f7&bgcolor=050505&data=${encodeURIComponent(expoUrl)}`}
                    alt="Expo Go QR Code"
                    style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid rgba(168,85,247,0.3)", boxShadow: "0 0 30px rgba(168,85,247,0.15)" }}
                  />
                  <div style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.45)", wordBreak: "break-all", maxWidth: 280, textAlign: "center" }}>
                    {expoUrl}
                  </div>
                </div>
              )}
            </div>

            {/* EXPO STEPS */}
            <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
              How to connect with Expo Go
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              <Step n="1" text="Download Expo Go from the App Store (iOS) or Google Play (Android)." />
              <Step n="2" text='Open Expo Go, tap "Scan QR Code", and scan the code above.' />
              <Step n="3" text="The app will load automatically. Make sure your device is on any internet connection (4G/5G or WiFi)." />
            </div>

            <div style={{
              background: "rgba(255,196,0,0.08)", border: "1px solid rgba(255,196,0,0.2)",
              borderRadius: 14, padding: "14px 18px", fontSize: 13,
              color: "rgba(255,196,0,0.85)", lineHeight: 1.6,
            }}>
              The QR code above is generated each time the Expo server starts. If it doesn't work, the team may need to restart Metro and update this page.
            </div>
          </div>
        )}

        {selected === "apk" && (
          <div style={{
            background: "rgba(0,196,255,0.04)", border: "1px solid rgba(0,196,255,0.15)",
            borderRadius: 24, padding: 32, marginBottom: 32,
          }}>
            <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
              Install the Android APK
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              <Step n="1" text='Tap the download button below. Your browser will download an .apk file.' />
              <Step n="2" text='On your Android device, open Settings → Security → enable "Install from unknown sources" (or "Install unknown apps").' />
              <Step n="3" text="Open the downloaded .apk file and follow the install prompts." />
              <Step n="4" text="Launch EchoVolt and sign in or create an account." />
            </div>

            {apkUrl ? (
              <a href={apkUrl} className="dl-btn">
                Download APK
              </a>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14, padding: "16px 20px", fontSize: 14,
                color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
              }}>
                APK build in progress. The team is building it now — check back in a few minutes or use Expo Go in the meantime.
              </div>
            )}
          </div>
        )}

        {selected === "iphone" && (
          <div style={{
            background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: 24, padding: 32, marginBottom: 32,
          }}>
            <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
              iPhone Instructions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              <Step n="1" text='Install Expo Go from the App Store — search "Expo Go" and install the free app.' />
              <Step n="2" text='Open Expo Go. Tap "Scan QR Code" in the bottom tab bar.' />
              <Step n="3" text="Go back to the Expo Go option on this page and scan the QR code shown there." />
              <Step n="4" text="Alternatively, iOS Camera app can scan the QR directly — it will offer to open in Expo Go." />
            </div>
            <div style={{
              background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: 14, padding: "14px 18px", fontSize: 13,
              color: "rgba(168,85,247,0.9)", lineHeight: 1.6,
            }}>
              Tip: iOS native Camera app works too — just point it at the QR code from the Expo Go tab.
            </div>
          </div>
        )}

        {!selected && (
          <div style={{
            textAlign: "center", padding: "48px 24px",
            color: "rgba(255,255,255,0.2)", fontSize: 15,
          }}>
            ↑ Select an option above to see instructions
          </div>
        )}

        {/* ALSO SEE DEMO */}
        <div style={{
          textAlign: "center", paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>
            Don't want to install anything?
          </p>
          <button
            onClick={() => navigate("/demo")}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)", borderRadius: 100,
              padding: "10px 28px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s", fontFamily: "Nunito, sans-serif",
            }}
          >
            View Web Demo instead →
          </button>
        </div>
      </div>
    </div>
  );
}
