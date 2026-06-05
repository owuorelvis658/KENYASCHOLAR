import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import graduationImg from './graduation.webp';
/* ─── Animation Variants ──────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── 2024 → 2026, Form 1 Scholarships → Students ── */
const POPULAR_SEARCHES = [
  "KCSE 2026",
  "Student Scholarships",
  "County Bursaries",
  "NGO Scholarships",
];

/* ─── Illustration ────────────────────────────────── */
function ScholarshipIllustration() {
  return (
    <svg
      viewBox="0 0 420 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <ellipse cx="218" cy="210" rx="155" ry="145" fill="#dbeafe" opacity="0.55" />
      <ellipse cx="218" cy="215" rx="115" ry="108" fill="#bfdbfe" opacity="0.35" />
      <rect x="58" y="268" width="248" height="46" rx="8" fill="#ef4444" />
      <rect x="58" y="268" width="22" height="46" rx="6" fill="#dc2626" />
      <rect x="66" y="278" width="5" height="26" rx="2.5" fill="#fca5a5" opacity="0.8" />
      <rect x="74" y="282" width="3" height="18" rx="1.5" fill="#fca5a5" opacity="0.5" />
      <rect x="84" y="274" width="210" height="3" rx="1.5" fill="#fecaca" opacity="0.3" />
      <rect x="84" y="280" width="180" height="2" rx="1" fill="#fecaca" opacity="0.2" />
      <rect x="84" y="285" width="200" height="2" rx="1" fill="#fecaca" opacity="0.2" />
      <rect x="70" y="228" width="232" height="44" rx="8" fill="#1d4ed8" />
      <rect x="70" y="228" width="22" height="44" rx="6" fill="#1e40af" />
      <rect x="78" y="238" width="5" height="24" rx="2.5" fill="#93c5fd" opacity="0.8" />
      <rect x="86" y="242" width="3" height="16" rx="1.5" fill="#93c5fd" opacity="0.5" />
      <rect x="96" y="233" width="190" height="3" rx="1.5" fill="#bfdbfe" opacity="0.3" />
      <rect x="96" y="240" width="160" height="2" rx="1" fill="#bfdbfe" opacity="0.2" />
      <rect x="96" y="246" width="180" height="2" rx="1" fill="#bfdbfe" opacity="0.2" />
      <rect x="82" y="193" width="210" height="40" rx="8" fill="#f59e0b" />
      <rect x="82" y="193" width="22" height="40" rx="6" fill="#d97706" />
      <rect x="90" y="202" width="5" height="22" rx="2.5" fill="#fde68a" opacity="0.85" />
      <rect x="98" y="206" width="3" height="14" rx="1.5" fill="#fde68a" opacity="0.5" />
      <rect x="108" y="198" width="168" height="3" rx="1.5" fill="#fef3c7" opacity="0.4" />
      <rect x="108" y="205" width="140" height="2" rx="1" fill="#fef3c7" opacity="0.25" />
      <rect x="108" y="211" width="155" height="2" rx="1" fill="#fef3c7" opacity="0.25" />
      <rect x="206" y="254" width="100" height="76" rx="10" fill="#fffbeb" />
      <rect x="206" y="254" width="100" height="16" rx="6" fill="#f59e0b" />
      <rect x="206" y="262" width="100" height="8" rx="0" fill="#d97706" />
      <rect x="215" y="278" width="60" height="4" rx="2" fill="#d97706" opacity="0.4" />
      <rect x="215" y="287" width="80" height="3" rx="1.5" fill="#d97706" opacity="0.28" />
      <rect x="215" y="295" width="70" height="3" rx="1.5" fill="#d97706" opacity="0.28" />
      <rect x="215" y="303" width="75" height="3" rx="1.5" fill="#d97706" opacity="0.22" />
      <circle cx="256" cy="330" r="10" fill="#ef4444" opacity="0.9" />
      <circle cx="256" cy="330" r="6" fill="#dc2626" />
      <path d="M249 340 L244 354 L256 346 L268 354 L263 340 Z" fill="#ef4444" />
      <rect x="148" y="100" width="140" height="68" rx="6" fill="#1e293b" />
      <polygon points="218,62  278,92  218,112  158,92" fill="#0f172a" />
      <circle cx="218" cy="92" r="8" fill="#f59e0b" />
      <circle cx="218" cy="92" r="4" fill="#fbbf24" />
      <rect x="162" y="108" width="55" height="4" rx="2" fill="#334155" opacity="0.5" />
      <path d="M278 92 Q292 92 292 106 L292 136" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="292" cy="142" r="7" fill="#f59e0b" />
      <line x1="292" y1="149" x2="286" y2="172" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="292" y1="149" x2="292" y2="174" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="292" y1="149" x2="298" y2="172" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="292" y1="149" x2="303" y2="168" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="82" cy="152" r="9" fill="#93c5fd" opacity="0.7" />
      <circle cx="62" cy="230" r="6" fill="#fca5a5" opacity="0.65" />
      <circle cx="345" cy="170" r="10" fill="#86efac" opacity="0.6" />
      <circle cx="360" cy="258" r="7" fill="#fde68a" opacity="0.65" />
      <circle cx="100" cy="310" r="5" fill="#c4b5fd" opacity="0.6" />
      <circle cx="358" cy="308" r="5" fill="#fda4af" opacity="0.55" />
      <path d="M340 128 L342 134 L348 136 L342 138 L340 144 L338 138 L332 136 L338 134 Z" fill="#fbbf24" opacity="0.75" />
      <path d="M74 185 L75.5 189 L80 190 L75.5 191 L74 195 L72.5 191 L68 190 L72.5 189 Z" fill="#60a5fa" opacity="0.7" />
      <circle cx="326" cy="232" r="26" fill="white" opacity="0.9" />
      <circle cx="326" cy="232" r="26" stroke="#e2e8f0" strokeWidth="1" fill="none" />
      <g transform="translate(317, 222)">
        <rect x="2" y="2" width="10" height="14" rx="1.5" fill="#94a3b8" />
        <polygon points="2,16 12,16 7,21" fill="#cbd5e1" />
        <rect x="3" y="3" width="8" height="3" rx="1" fill="#e2e8f0" opacity="0.8" />
        <line x1="7" y1="7" x2="7" y2="15" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ─── Hero ────────────────────────────────────────── */
export default function Hero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  useEffect(() => {
    if (!showLoginNotice) return undefined;

    const timer = window.setTimeout(() => {
      setShowLoginNotice(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [showLoginNotice]);

  /* Show login notice the first time user types anything */
  
const handleInputChange = (e) => {
  const val = e.target.value;
  setQuery(val);
 if (val.length > 0) {
  setShowLoginNotice(true);
  setQuery("");
}
};

const handlePopularTag = (tag) => {
  setQuery(tag);
  setShowLoginNotice(true);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .ks-hero * { box-sizing: border-box; margin: 0; padding: 0; }

    .ks-hero {
  font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
  position: relative;
  overflow: hidden;
  padding: 64px 24px 56px;
  min-height: 520px;
}

.ks-hero::before {
  content: '';
  position: absolute;
  inset: -10%;
background-image: linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.0)), var(--hero-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: heroZoom 9s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes heroZoom {
  0%   { transform: scale(1); }
  100% { transform: scale(1.1); }
}
        .ks-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        /* ── Left content ── */
        .ks-hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 450px;       }

        /* ── Animated glow pill ── */
        .ks-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(219, 234, 254, 0.15);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 24px;
          letter-spacing: 0.04em;
          width: fit-content;
          margin-bottom: 18px;
          border: 1px solid rgba(255,255,255,0.3);
          position: relative;
          overflow: hidden;
          animation: ks-pill-glow 3s ease-in-out infinite;
          text-shadow: 0 0 12px rgba(96, 165, 250, 0.8);
          backdrop-filter: blur(4px);
        }

        .ks-hero-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.18) 40%,
            rgba(255,255,255,0.32) 50%,
            rgba(255,255,255,0.18) 60%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: ks-pill-shimmer 3s ease-in-out infinite;
        }

        @keyframes ks-pill-shimmer {
          0%    { transform: translateX(-100%); }
          45%   { transform: translateX(-100%); }
          65%   { transform: translateX(100%); }
          100%  { transform: translateX(100%); }
        }

        @keyframes ks-pill-glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(96,165,250,0.4), 0 0 20px rgba(96,165,250,0.15);
            border-color: rgba(96,165,250,0.5);
          }
          50% {
            box-shadow: 0 0 16px rgba(96,165,250,0.7), 0 0 40px rgba(96,165,250,0.3);
            border-color: rgba(96,165,250,0.85);
          }
        }

        .ks-hero-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          flex-shrink: 0;
          animation: ks-dot-pulse 1.8s ease-in-out infinite;
          box-shadow: 0 0 6px #60a5fa;
        }

        @keyframes ks-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 4px #60a5fa; }
          50%       { transform: scale(1.4); opacity: 0.7; box-shadow: 0 0 10px #60a5fa; }
        }

        .ks-hero-heading {
          font-size: clamp(30px, 3.8vw, 46px);
          font-weight: 900;
          line-height: 1.13;
          color: #eaedf3;
          letter-spacing: -0.8px;
          margin-bottom: 18px;
        }

        .ks-hero-heading-blue {
          color: #60a5fa;
          position: relative;
          display: inline;
        }

        .ks-hero-heading-blue::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #1a56db, #60a5fa);
          border-radius: 2px;
          opacity: 0.55;
        }

        .ks-hero-sub {
          font-size: 15.5px;
          font-weight: 400;
          color: #d8a80b;
          line-height: 1.65;
          margin-bottom: 30px;
          max-width: 420px;
        }

        /* ── Search bar ── */
        .ks-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          position: relative;
        }

        .ks-search-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 11px;
          padding: 0 16px;
          height: 50px;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 1px 4px rgba(15,23,42,0.05);
        }

        .ks-search-field.focused {
          border-color: #1a56db;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.1), 0 1px 6px rgba(15,23,42,0.06);
        }

        .ks-search-field input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          font-weight: 400;
          color: #0f172a;
          flex: 1;
          min-width: 0;
          font-family: inherit;
        }

        .ks-search-field input::placeholder {
          color: #94a3b8;
        }

        .ks-search-icon {
          color: #94a3b8;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .ks-search-field.focused .ks-search-icon {
          color: #1a56db;
        }

        .ks-search-btn {
          height: 50px;
          padding: 0 22px;
          background: #1a56db;
          color: #ffffff;
          border: none;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: inherit;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s ease, transform 0.12s ease, box-shadow 0.15s ease;
          box-shadow: 0 2px 8px rgba(26,86,219,0.28);
          letter-spacing: -0.1px;
        }

        .ks-search-btn:hover {
          background: #1244b8;
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(26,86,219,0.36);
        }

        .ks-search-btn:active { transform: translateY(0); }

        /* ── Login notice toast ── */
        .ks-login-notice {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15,23,42,0.92);
          border: 1px solid rgba(96,165,250,0.35);
          border-radius: 10px;
          padding: 11px 14px;
          margin-bottom: 12px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        .ks-login-notice-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(26,86,219,0.25);
          border: 1px solid rgba(96,165,250,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ks-login-notice-text {
          flex: 1;
          font-size: 13px;
          color: #e2e8f0;
          line-height: 1.45;
        }

        .ks-login-notice-text a {
          color: #60a5fa;
          font-weight: 700;
          text-decoration: none;
          border-bottom: 1px solid rgba(96,165,250,0.4);
          transition: border-color 0.15s;
        }

        .ks-login-notice-text a:hover { border-color: #60a5fa; }

        .ks-login-notice-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 2px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
          flex-shrink: 0;
        }

        .ks-login-notice-close:hover { color: #94a3b8; }

        /* ── Popular searches ── */
        .ks-popular {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ks-popular-label {
          font-size: 12.5px;
          color: #94a3b8;
          font-weight: 500;
          flex-shrink: 0;
        }

        .ks-popular-tag {
          font-size: 12px;
          font-weight: 500;
          color: #475569;
          background: rgba(255,255,255,0.85);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 4px 11px;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.14s, color 0.14s, border-color 0.14s;
          letter-spacing: -0.05px;
        }

        .ks-popular-tag:hover {
          background: #eff6ff;
          color: #1a56db;
          border-color: #bfdbfe;
        }

        /* ── Right illustration panel — fully responsive ── */
        .ks-hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .ks-illus-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 420 / 380;
          max-width: 420px;
          filter: drop-shadow(0 24px 48px rgba(26,86,219,0.1)) drop-shadow(0 8px 16px rgba(15,23,42,0.08));
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ks-hero { padding: 48px 20px 40px; }
          .ks-hero-inner { grid-template-columns: 1fr; gap: 36px; }
          .ks-hero-right { order: -1; }
          .ks-illus-wrap { max-width: 300px; margin: 0 auto; }
          .ks-hero-heading { font-size: clamp(28px, 7vw, 38px); }
          .ks-hero-sub { max-width: 100%; }
        }

        @media (max-width: 520px) {
          .ks-hero { padding: 36px 16px 32px; min-height: unset; }
          .ks-hero-heading { font-size: 28px; letter-spacing: -0.5px; }
          .ks-search-wrap { flex-direction: row; }
          .ks-search-btn span { display: none; }
          .ks-illus-wrap { max-width: 220px; }
        }
      `}</style>

  <section className="ks-hero" aria-label="Hero" style={{ '--hero-bg': `url(${graduationImg})` }}>
        <div className="ks-hero-blob-1" aria-hidden="true" />
        <div className="ks-hero-blob-2" aria-hidden="true" />
        <div className="ks-hero-blob-3" aria-hidden="true" />

        <div className="ks-hero-inner">

          {/* ── Left: text + search ── */}
          <div className="ks-hero-left">

            {/* Animated glow pill */}
            <motion.div {...fadeUp(0)}>
              <div className="ks-hero-pill">
                <span className="ks-hero-pill-dot" aria-hidden="true" />
                All Scholarships. One Place. More Opportunities.
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 className="ks-hero-heading" {...fadeUp(0.07)}>
              Find Secondary School{" "}
              <span className="ks-hero-heading-blue">Scholarships</span>{" "}
              in Kenya
            </motion.h1>

            {/* Subtext — "students" only, no form range */}
            <motion.p className="ks-hero-sub" {...fadeUp(0.13)}>
              Discover verified scholarships, bursaries and sponsorships
              for students across Kenya.
            </motion.p>

            {/* Login notice — appears when user starts typing */}
            <AnimatePresence>
              {showLoginNotice && (
                <motion.div
                  className="ks-login-notice"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  role="alert"
                  aria-live="polite"
                >
                  <div className="ks-login-notice-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#60a5fa" strokeWidth="1.4"/>
                      <path d="M7 6v4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7" cy="4" r="0.8" fill="#60a5fa"/>
                    </svg>
                  </div>
                  <span className="ks-login-notice-text">
                    Get started to search and apply for a scholarship.
                  </span>
                  <button
                    className="ks-login-notice-close"
                    onClick={() => setShowLoginNotice(false)}
                    aria-label="Dismiss notice"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search bar */}
            <motion.div {...fadeUp(0.19)} style={{ width: "100%" }}>
              <div className="ks-search-wrap">
                <div className={`ks-search-field${focused ? " focused" : ""}`}>
                  <Search size={17} className="ks-search-icon" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="Search scholarships, bursaries..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    aria-label="Search scholarships and bursaries"
                  />
                </div>
                <motion.button
                  className="ks-search-btn"
                  whileTap={{ scale: 0.96 }}
                  aria-label="Search"
                  type="button"
                >
                  <Search size={14} strokeWidth={2.5} />
                  <span>Search</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Popular searches */}
            <motion.div className="ks-popular" {...fadeUp(0.26)}>
              <span className="ks-popular-label">Popular searches:</span>
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  className="ks-popular-tag"
                  onClick={() => handlePopularTag(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>

          {/* ── Right: illustration — responsive by design ── */}
         
        </div>
      </section>
    </>
  );
}
