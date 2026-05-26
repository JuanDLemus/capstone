import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setContentVisible(true);
    
    // Allow keyboard navigation for presentation
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSlide((prev) => Math.min(prev + 1, 9));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 9));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const slides = [
    /* SLIDE 1: PORTADA */
    {
      tag: "PORTADA",
      title: "EchoVolt",
      subtitle: "El puente entre el bienestar cotidiano y la detección oportuna",
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 32,
            background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 50px rgba(168,85,247,0.2)",
          }}>
            <img src={logo} alt="EchoVolt Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 16 }} />
          </div>
          <div>
            <p style={{ color: "#a855f7", fontWeight: 800, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
              PROYECTO DE GRADO DE INGENIERÍA 2026
            </p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, maxWidth: 800 }}>
              Monitoreo emocional diario con inteligencia artificial ética para adultos mayores y sus familias.
            </h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Universidad de la Sabana · Facultad de Ingeniería · Informática
          </p>
        </div>
      )
    },
    /* SLIDE 2: EL PROBLEMA */
    {
      tag: "EL PROBLEMA",
      title: "El Reto Silencioso",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#a855f7", fontFamily: "JetBrains Mono, monospace" }}>720K+</div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, marginTop: 8 }}>Suicidios al año</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>— OMS, 2024</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#00c4ff", fontFamily: "JetBrains Mono, monospace" }}>1.1B</div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, marginTop: 8 }}>Personas con trastornos sin apoyo</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>— OMS, 2025</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#ec4899", fontFamily: "JetBrains Mono, monospace" }}>14%</div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, marginTop: 8 }}>Adultos 70+ con trastornos</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>— OMS</div>
            </div>
          </div>
          <div style={{ background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.85)" }}>
              Las herramientas de salud mental actuales suelen alienar al adulto mayor. La <strong>fricción tecnológica</strong>, interfaces complejas y un <strong>lenguaje clínico alarmista</strong> crean una barrera que genera un vacío de observación crítica entre el estado del día a día y una crisis real.
            </p>
          </div>
        </div>
      )
    },
    /* SLIDE 3: LA SOLUCIÓN */
    {
      tag: "LA SOLUCIÓN",
      title: "Un Ecosistema que Facilita la Conexión",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>🃏</div>
              <h4 style={{ color: "#a855f7", fontSize: 17, marginBottom: 8 }}>Registro Amable</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Check-in diario interactivo y gamificado usando tarjetas AAC (Augmentative and Alternative Communication) libres de tecnicismos y lenguaje clínico intimidante.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>🧠</div>
              <h4 style={{ color: "#a855f7", fontSize: 17, marginBottom: 8 }}>IA y Procesamiento Ético</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Análisis de lenguaje natural y voz mediante un modelo de lenguaje local que detecta patrones de decaimiento sostenido en el tiempo sin emitir diagnósticos intrusivos.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>👥</div>
              <h4 style={{ color: "#a855f7", fontSize: 17, marginBottom: 8 }}>Acompañamiento Familiar</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Alertas oportunas y preventivas en bucle cerrado directo con el núcleo de cuidadores y familia, permitiendo actuar antes de que ocurra una crisis aguda.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 14, fontStyle: "italic" }}>
            "Nuestra tecnología no reemplaza la conexión humana — la facilita en el momento exacto."
          </div>
        </div>
      )
    },
    /* SLIDE 4: ARQUITECTURA TÉCNICA */
    {
      tag: "ARQUITECTURA TÉCNICA",
      title: "Infraestructura Escalable y Segura",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <div style={{ background: "rgba(168,85,247,0.03)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 800, marginBottom: 6 }}>FRONTEND</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>React Native / Expo</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Aplicación móvil multiplataforma adaptada para accesibilidad cognitiva con comandos de voz y AAC.
              </p>
            </div>
            <div style={{ background: "rgba(0,196,255,0.03)", border: "1px solid rgba(0,196,255,0.15)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#00c4ff", fontWeight: 800, marginBottom: 6 }}>BACKEND API</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>FastAPI (Python)</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Endpoints asíncronos ultrarrápidos para ingesta de datos clínicos, logs de emociones y control de APIs.
              </p>
            </div>
            <div style={{ background: "rgba(236,72,153,0.03)", border: "1px solid rgba(236,72,153,0.15)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 800, marginBottom: 6 }}>BASE DE DATOS</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>PostgreSQL (Docker)</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Almacenamiento persistente estructurado, optimizado para series de tiempo emocionales y alertas.
              </p>
            </div>
            <div style={{ background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 800, marginBottom: 6 }}>MOTOR DE IA</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>LM Studio (Local LLM)</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Llamadas a LLM offline integradas que aíslan los datos de salud del paciente, garantizando privacidad absoluta.
              </p>
            </div>
          </div>
          <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            ⚡ <strong>Nota de Arquitectura:</strong> A diferencia de prototipos heredados que usaban Spring Boot, el backend oficial actual de EchoVolt está unificado en <strong>FastAPI y Python</strong> para lograr tiempos de respuesta de IA inferiores a 800ms.
          </div>
        </div>
      )
    },
    /* SLIDE 5: CALIDAD DE SOFTWARE & QA */
    {
      tag: "CALIDAD DE SOFTWARE & QA",
      title: "Confiabilidad e Integridad de Nivel Clínico",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 16, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#a855f7", fontFamily: "JetBrains Mono, monospace" }}>98.1%</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 700, marginTop: 4 }}>Cobertura General de Pruebas</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Módulos críticos con 100% de cobertura</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>Estrategia de Pruebas Automatizadas</h4>
              <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column", gap: 10, padding: 0 }}>
                <li style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#a855f7" }}>✔</span>
                  <strong>Pruebas de MPU & MCU:</strong> pytest con mocks para aislar la comunicación en el bridge y Zephyr OS ztest para el microcontrolador.
                </li>
                <li style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#a855f7" }}>✔</span>
                  <strong>QA Agente Autónomo (Antigravity):</strong> Suite de pruebas ejecutadas de forma autónoma con la tecnología del SDK de Antigravity para validar comportamientos aleatorios, flujos móviles y endpoints de Vercel.
                </li>
                <li style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#a855f7" }}>✔</span>
                  <strong>Pruebas de Estrés & Inyección:</strong> Pruebas continuas de stress contra sockets, fugas de memoria y sanitización estricta de inputs contra prompt injection y OWASP.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    /* SLIDE 6: MODELO DE NEGOCIO */
    {
      tag: "MODELO DE NEGOCIO",
      title: "Sostenibilidad y Diversificación de Ingresos",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, width: "100%" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🔓</div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Freemium</h4>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Acceso a la app base con check-in amable y herramientas básicas de calma para maximizar el impacto social y alcance.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>👑</div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Premium</h4>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Suscripción mensual para monitoreo analítico avanzado, alertas y mensajería en tiempo real con familiares ilimitados.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>⌚</div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>B2B & Wearables</h4>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Alianzas con proveedores de salud (EPS/cajas) e integración con smartwatches para telemetría física (ritmo cardíaco, caídas).
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🎁</div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Subvenciones de Salud</h4>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Acceso a grants gubernamentales y fondos internacionales dedicados a innovación en salud y envejecimiento activo.
            </p>
          </div>
        </div>
      )
    },
    /* SLIDE 7: VIABILIDAD FINANCIERA */
    {
      tag: "VIABILIDAD FINANCIERA",
      title: "Rentabilidad y Proyecciones",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>INGRESOS AÑO 5</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a855f7", margin: "6px 0" }}>$6,072M</div>
              <div style={{ fontSize: 11, color: "#00c4ff" }}>EBITDA positivo desde 2030</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>PUNTO DE EQUILIBRIO</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a855f7", margin: "6px 0" }}>Mes 29</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Retorno de inversión en 2.5a</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>TIR (TASA INT. RETORNO)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a855f7", margin: "6px 0" }}>41.5%</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Muy superior al WACC (25%)</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>VALOR PRESENTE NETO</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a855f7", margin: "6px 0" }}>$545M</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>VPN total en pesos (COP)</div>
            </div>
          </div>
          <div style={{ padding: 14, background: "rgba(168,85,247,0.03)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 12, fontSize: 12, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
            ℹ <strong>Estructura de Inversión:</strong> Requerimiento de $2,050M COP en 3 rondas escalonadas según hitos de tracción. 0% de deuda bancaria para mitigar riesgos progresivamente.
          </div>
        </div>
      )
    },
    /* SLIDE 8: PROPIEDAD INTELECTUAL */
    {
      tag: "PROPIEDAD INTELECTUAL",
      title: "Protección Dual de Activos Intangibles",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: "100%" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28 }}>
            <div style={{ display: "inline-block", background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 800, marginBottom: 16 }}>
              ACTIVO 1
            </div>
            <h4 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Derecho de Autor — DNDA</h4>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>
              Registro formal del código fuente (frontend y backend) ante la Dirección Nacional de Derecho de Autor de Colombia.
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#a855f7" }}>Costo de Trámite: $0 COP</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28 }}>
            <div style={{ display: "inline-block", background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 800, marginBottom: 16 }}>
              ACTIVO 2
            </div>
            <h4 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Propiedad Industrial — SIC</h4>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>
              Registro de la marca mixta "ECHOVOLT" ante la Superintendencia de Industria y Comercio para proteger la identidad del ecosistema.
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#a855f7" }}>Costo: ~$2.5M COP (Contemplado en modelo)</div>
          </div>
        </div>
      )
    },
    /* SLIDE 9: IMPACTO SOCIAL */
    {
      tag: "IMPACTO SOCIAL",
      title: "La Tecnología como Facilitador Humano",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(168,85,247,0.03)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
              <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>ODS 3: Salud y Bienestar</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Impacto directo sobre la salud mental y la prevención oportuna del riesgo de suicidio en adultos mayores vulnerables.
              </p>
            </div>
            <div style={{ background: "rgba(168,85,247,0.03)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
              <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>ODS 11: Comunidades Sostenibles</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Fortalece el tejido de cuidado familiar y comunitario, haciendo las viviendas y comunidades entornos seguros para envejecer.
              </p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              "EchoVolt no es solo software y rentabilidad financiera; es un salvavidas diseñado para devolverle la tranquilidad y la conexión humana a miles de familias que cuidan de sus adultos mayores."
            </p>
          </div>
        </div>
      )
    },
    /* SLIDE 10: REFERENCIAS Y ACCESO */
    {
      tag: "REFERENCIAS Y ACCESO",
      title: "Fuentes e Inicio del Piloto",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, width: "100%" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, fontSize: 12 }}>
              <strong style={{ color: "#a855f7" }}>1. Suicidio</strong>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 4 }}>OMS, 2024. Cifras globales de salud mental y causas de fallecimiento.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, fontSize: 12 }}>
              <strong style={{ color: "#a855f7" }}>2. Trastornos Mentales</strong>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 4 }}>OMS, 2025. Prevalencia de trastornos cognitivos y del ánimo en el adulto mayor.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, fontSize: 12 }}>
              <strong style={{ color: "#a855f7" }}>3. Envejecimiento Activo</strong>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Recomendaciones de cuidado en el hogar de la OMS para personas 70+.</p>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 16 }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>¿Listo para iniciar el demo?</p>
            <div style={{ display: "flex", gap: 16 }}>
              <button 
                onClick={() => navigate("/download")}
                style={{
                  background: "linear-gradient(135deg, #a855f7, #00c4ff)",
                  color: "#000", border: "none", borderRadius: 100,
                  padding: "16px 40px", fontSize: 15, fontWeight: 900,
                  cursor: "pointer", fontFamily: "Sora, sans-serif",
                  transition: "all 0.3s", boxShadow: "0 0 30px rgba(168,85,247,0.4)"
                }}
              >
                Instalar App Móvil
              </button>
              <button 
                onClick={() => navigate("/demo")}
                style={{
                  background: "transparent", color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100,
                  padding: "14px 32px", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "Nunito, sans-serif",
                  transition: "all 0.3s"
                }}
              >
                Ver Demo Web
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden",
      fontFamily: "Nunito, sans-serif", color: "#fff",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .slide-indicator {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 4px 14px; fontSize: 11px; fontWeight: 800;
          color: #a855f7; letter-spacing: 1px; text-transform: uppercase;
        }
        .nav-arrow {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; width: 44px; height: 44px; border-radius: 50%;
          display: flex; alignItems: center; justifyContent: center;
          cursor: pointer; transition: all 0.2s; font-size: 18px;
        }
        .nav-arrow:hover { background: rgba(168,85,247,0.15); border-color: #a855f7; color: #a855f7; }
        .nav-arrow:disabled { opacity: 0.15; cursor: not-allowed; }
        .dot {
          width: 8px; height: 8px; borderRadius: 50%; background: rgba(255,255,255,0.2);
          cursor: pointer; transition: all 0.3s;
        }
        .dot.active { background: #a855f7; transform: scale(1.4); box-shadow: 0 0 10px #a855f7; }
        .glow-title {
          background: linear-gradient(135deg, #a855f7 0%, #00c4ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* GRADIENT GLOWS */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(0,196,255,0.08) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* HEADER */}
      <div style={{
        position: "relative", zIndex: 2, padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 20 }}>
            <span style={{ color: "#a855f7" }}>Echo</span>Volt
          </span>
          <span className="slide-indicator">{slides[currentSlide].tag}</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button 
            onClick={() => navigate("/download")}
            style={{
              background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)",
              color: "#a855f7", borderRadius: 100, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Obtener App
          </button>
          <button 
            onClick={() => navigate("/demo")}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)", borderRadius: 100, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Web Demo
          </button>
        </div>
      </div>

      {/* SLIDE CONTENT AREA */}
      <div style={{
        position: "relative", zIndex: 1, flex: 1,
        maxWidth: 900, width: "100%", margin: "0 auto", padding: "40px 24px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        opacity: contentVisible ? 1 : 0, transition: "opacity 0.6s",
      }}>
        {/* SLIDE TITLE */}
        {currentSlide > 0 && (
          <h1 className="glow-title" style={{
            fontFamily: "Sora, sans-serif", fontSize: "clamp(24px, 5vw, 40px)",
            fontWeight: 800, marginBottom: 32, textAlign: "center",
          }}>
            {slides[currentSlide].title}
          </h1>
        )}

        {/* DYNAMIC RENDER */}
        <div style={{ width: "100%", minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {slides[currentSlide].content}
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div style={{
        position: "relative", zIndex: 2, padding: "24px 32px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="nav-arrow" onClick={prevSlide} disabled={currentSlide === 0}>‹</button>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>
            {currentSlide + 1} / 10
          </span>
          <button className="nav-arrow" onClick={nextSlide} disabled={currentSlide === 9}>›</button>
        </div>

        {/* DOTS */}
        <div style={{ display: "flex", gap: 8 }}>
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`dot ${currentSlide === i ? "active" : ""}`} 
              onClick={() => setCurrentSlide(i)} 
            />
          ))}
        </div>

        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          Use arrow keys [← / →] or space to present
        </div>
      </div>
    </div>
  );
}
