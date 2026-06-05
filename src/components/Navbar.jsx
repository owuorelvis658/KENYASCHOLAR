import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Constants ─────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", active: true },
];

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => { const y = window.scrollY; setScrolled(y > 4); setHidden(y > 80); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleGetStarted = () => {
    setMobileOpen(false);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ks-nav * { box-sizing:border-box;margin:0;padding:0; }
        .ks-nav { font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;position:sticky;top:0;z-index:999;width:100%;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #e8edf5;transition:box-shadow 0.25s ease; }
        .ks-nav.scrolled { box-shadow:0 1px 0 #e2e8f0,0 4px 20px rgba(15,23,42,0.06); }
        .ks-nav-inner { max-width:1200px;margin:0 auto;height:64px;padding:0 24px;display:flex;align-items:center;gap:0; }
        .ks-logo { display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;margin-right:32px; }
        .ks-logo-icon { width:34px;height:34px;background:linear-gradient(135deg,#1a56db 0%,#1244b8 100%);border-radius:9px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(26,86,219,0.28);flex-shrink:0; }
        .ks-logo-text { font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.35px;line-height:1; }
        .ks-logo-text span { color:#1a56db; }
        .ks-links { display:flex;align-items:center;gap:2px;list-style:none; }
        .ks-link-item { position:relative;display:flex;flex-direction:column;align-items:center; }
        .ks-link { display:flex;align-items:center;padding:6px 11px;font-size:13.5px;font-weight:500;color:#475569;text-decoration:none;border-radius:7px;transition:color 0.15s ease,background 0.15s ease;white-space:nowrap;letter-spacing:-0.1px;cursor:pointer;border:none;background:transparent;font-family:inherit; }
        .ks-link:hover { color:#1a56db;background:#eff6ff; }
        .ks-link.active { color:#1a56db;font-weight:600; }
        .ks-link-underline { position:absolute;bottom:-20px;left:6px;right:6px;height:2.5px;background:#1a56db;border-radius:2px 2px 0 0; }
        .ks-auth-btns { display:flex;align-items:center;gap:8px;margin-left:auto; }
        .ks-hamburger { display:none;align-items:center;justify-content:center;width:38px;height:38px;border:1px solid #e2e8f0;border-radius:9px;background:transparent;cursor:pointer;color:#334155;margin-left:16px;transition:background 0.15s,color 0.15s;flex-shrink:0; }
        .ks-hamburger:hover { background:#f1f5f9;color:#1a56db; }
        .ks-mobile-overlay { position:fixed;inset:0;background:rgba(15,23,42,0.35);z-index:998;cursor:pointer; }
        .ks-mobile-menu { position:fixed;top:0;right:0;bottom:0;width:min(320px,85vw);background:#ffffff;z-index:999;display:flex;flex-direction:column;box-shadow:-8px 0 32px rgba(15,23,42,0.12);overflow-y:auto; }
        .ks-mobile-header { display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #f1f5f9;flex-shrink:0; }
        .ks-mobile-links { padding:12px;display:flex;flex-direction:column;gap:2px;list-style:none; }
        .ks-mobile-link { display:flex;align-items:center;padding:11px 14px;font-size:14.5px;font-weight:500;color:#334155;text-decoration:none;border-radius:9px;cursor:pointer;transition:background 0.13s,color 0.13s;font-family:inherit;border:none;background:transparent;width:100%;text-align:left; }
        .ks-mobile-link:hover { background:#eff6ff;color:#1a56db; }
        .ks-mobile-link.active { background:#eff6ff;color:#1a56db;font-weight:700; }
        .ks-mobile-link-dot { width:6px;height:6px;border-radius:50%;background:#1a56db;margin-right:10px;flex-shrink:0; }
        .ks-mobile-auth { padding:16px;border-top:1px solid #f1f5f9;margin-top:auto; }
        .ks-mobile-get-started-btn { width:100%;height:46px;border:none;border-radius:11px;background:linear-gradient(135deg,#1a56db 0%,#1244b8 100%);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px;font-weight:700;color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;transition:opacity 0.13s; }
        .ks-mobile-get-started-btn:hover { opacity:0.9; }
        .ks-close-btn { display:flex;align-items:center;justify-content:center;width:34px;height:34px;border:1px solid #e2e8f0;border-radius:8px;background:transparent;cursor:pointer;color:#64748b;transition:background 0.13s;flex-shrink:0; }
        .ks-close-btn:hover { background:#f1f5f9;color:#0f172a; }
        @media (max-width:1023px) { .ks-hamburger { display:flex; } .ks-logo { margin-right:0; } .ks-auth-btns { display:none; } .ks-links { display:none; } }
        @media (max-width:480px) { .ks-nav-inner { padding:0 16px; } }
      `}</style>

      <header className={`ks-nav${scrolled ? " scrolled" : ""}`} style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)", transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div className="ks-nav-inner">
          <a className="ks-logo" href="#" aria-label="KenyaScholar home">
            <div className="ks-logo-icon"><GraduationCap size={18} color="#ffffff" strokeWidth={2.5} /></div>
            <span className="ks-logo-text">Kenya<span>Scholar</span></span>
          </a>

          <ul className="ks-links" role="list">
            {NAV_LINKS.map(({ label }) => {
              const isActive = activeLink === label;
              return (
                <li key={label} className="ks-link-item">
                  <button className={`ks-link${isActive ? " active" : ""}`} onClick={() => setActiveLink(label)} aria-current={isActive ? "page" : undefined}>{label}</button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div className="ks-link-underline" layoutId="nav-underline"
                        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left" }} />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop — Get Started button */}
          <div className="ks-auth-btns">
            <motion.button
              onClick={handleGetStarted}
              animate={{
                scale: [1, 1.04, 0.97, 1.04, 1],
                rotate: [0, -1.5, 1.5, -1, 0],
                boxShadow: [
                  "0 2px 8px rgba(26,86,219,0.25)",
                  "0 6px 24px rgba(26,86,219,0.45)",
                  "0 2px 8px rgba(26,86,219,0.25)",
                  "0 6px 24px rgba(26,86,219,0.45)",
                  "0 2px 8px rgba(26,86,219,0.25)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 28px rgba(26,86,219,0.5)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                height: 36, padding: "0 18px",
                background: "linear-gradient(135deg,#1a56db 0%,#1244b8 100%)",
                border: "none", borderRadius: 9, cursor: "pointer", color: "#fff",
                fontSize: 13.5, fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              Get Started
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              >→</motion.span>
            </motion.button>
          </div>

          <button className="ks-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen}>
            <Menu size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="ks-mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <motion.nav className="ks-mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 34 }} aria-label="Mobile navigation">
              <div className="ks-mobile-header">
                <a className="ks-logo" href="#" style={{ marginRight: 0 }} onClick={() => setMobileOpen(false)}>
                  <div className="ks-logo-icon"><GraduationCap size={16} color="#ffffff" strokeWidth={2.5} /></div>
                  <span className="ks-logo-text">Kenya<span>Scholar</span></span>
                </a>
                <button className="ks-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><X size={16} strokeWidth={2} /></button>
              </div>

              <ul className="ks-mobile-links" role="list">
                {[...NAV_LINKS, { label: "Contact" }].map(({ label }, i) => {
                  const isActive = activeLink === label;
                  return (
                    <motion.li key={label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.035, duration: 0.22 }}>
                      {label === "Contact" ? (
                        <a href="/contact" className="ks-mobile-link" onClick={() => setMobileOpen(false)}>Contact Us</a>
                      ) : (
                        <button className={`ks-mobile-link${isActive ? " active" : ""}`} onClick={() => { setActiveLink(label); setMobileOpen(false); }} aria-current={isActive ? "page" : undefined}>
                          {isActive && <span className="ks-mobile-link-dot" aria-hidden="true" />}
                          {label}
                        </button>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile — Get Started button */}
              <div className="ks-mobile-auth">
                <button className="ks-mobile-get-started-btn" onClick={handleGetStarted}>
                  Get Started →
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
