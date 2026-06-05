import { motion } from "framer-motion";

/* ─── Stat data ───────────────────────────────────── */
const STATS = [
  {
    value: "250+",
    label: "Scholarships\nAvailable",
    accent: "#1a56db",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Mortarboard cap */}
        <polygon points="14,4 26,10 14,16 2,10" fill="#1a56db" opacity="0.18" />
        <polygon points="14,4 26,10 14,16 2,10" fill="none" stroke="#1a56db" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 12.5v6c0 2.5 3.1 4.5 7 4.5s7-2 7-4.5v-6" stroke="#1a56db" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <line x1="26" y1="10" x2="26" y2="17" stroke="#1a56db" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="26" cy="18.5" r="1.5" fill="#1a56db" />
      </svg>
    ),
  },
  {
    value: "100+",
    label: "Organizations\nListed",
    accent: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Two people / org icon */}
        <circle cx="10" cy="9" r="3.5" stroke="#7c3aed" strokeWidth="1.6" fill="#7c3aed" fillOpacity="0.12" />
        <path d="M3 22c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="9" r="3" stroke="#7c3aed" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.1" />
        <path d="M23 22c0-3.3-1.8-6.1-4.5-7" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Deadlines\nThis Month",
    accent: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    isDeadline: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Calendar */}
        <rect x="3" y="5" width="22" height="20" rx="3" stroke="#dc2626" strokeWidth="1.6" fill="#dc2626" fillOpacity="0.1" />
        <path d="M3 11h22" stroke="#dc2626" strokeWidth="1.6" />
        <path d="M9 3v4M19 3v4" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" />
        {/* date dots */}
        <circle cx="9"  cy="17" r="1.4" fill="#dc2626" />
        <circle cx="14" cy="17" r="1.4" fill="#dc2626" opacity="0.55" />
        <circle cx="19" cy="17" r="1.4" fill="#dc2626" opacity="0.35" />
        <circle cx="9"  cy="22" r="1.4" fill="#dc2626" opacity="0.35" />
        <circle cx="14" cy="22" r="1.4" fill="#dc2626" opacity="0.25" />
      </svg>
    ),
  },
  {
    value: "1M+",
    label: "Students\nSupported",
    accent: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    isMilestone: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Three people */}
        <circle cx="8"  cy="9"  r="3"   stroke="#16a34a" strokeWidth="1.5" fill="#16a34a" fillOpacity="0.12" />
        <circle cx="20" cy="9"  r="3"   stroke="#16a34a" strokeWidth="1.5" fill="#16a34a" fillOpacity="0.12" />
        <circle cx="14" cy="8"  r="3.5" stroke="#16a34a" strokeWidth="1.6" fill="#16a34a" fillOpacity="0.18" />
        <path d="M1.5 23c0-3.5 2.9-6.3 6.5-6.3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M26.5 23c0-3.5-2.9-6.3-6.5-6.3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M7 23c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

/* ─── Stats ───────────────────────────────────────── */
export default function Stats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .ks-stats * { box-sizing: border-box; margin: 0; padding: 0; }

        .ks-stats {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .ks-stats-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        /* individual card cell */
        .ks-stat-cell {
          padding: 28px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-right: 1px solid #f1f5f9;
          cursor: default;
          transition: background 0.18s ease, transform 0.22s ease;
          position: relative;
          overflow: hidden;
        }

        .ks-stat-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .ks-stat-cell.ks-blue::after   { background: radial-gradient(circle at 50% 120%, #dbeafe 0%, transparent 70%); }
        .ks-stat-cell.ks-purple::after { background: radial-gradient(circle at 50% 120%, #ede9fe 0%, transparent 70%); }
        .ks-stat-cell.ks-red::after    { background: radial-gradient(circle at 50% 120%, #fee2e2 0%, transparent 70%); }
        .ks-stat-cell.ks-green::after  { background: radial-gradient(circle at 50% 120%, #dcfce7 0%, transparent 70%); }

        .ks-stat-cell:hover::after { opacity: 1; }
        .ks-stat-cell:last-child { border-right: none; }
        .ks-stat-cell:hover { transform: translateY(-2px); }

        /* icon container */
        .ks-stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-width: 1px;
          border-style: solid;
          transition: transform 0.22s ease;
          position: relative;
          z-index: 1;
        }

        .ks-stat-cell:hover .ks-stat-icon {
          transform: scale(1.1) rotate(-4deg);
        }

        /* Pulsing ring for deadline icon */
        .ks-stat-icon.ks-deadline-pulse {
          animation: ks-pulse-border 2s ease-in-out infinite;
        }
        @keyframes ks-pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.08); }
        }

        /* text */
        .ks-stat-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          position: relative;
          z-index: 1;
        }

        .ks-stat-value {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.6px;
          line-height: 1;
        }
        .ks-stat-value.ks-milestone-value {
          font-size: 24px;
        }

        .ks-stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          line-height: 1.45;
          white-space: pre-line;
        }
        .ks-stat-label.ks-deadline-label {
          color: #dc2626;
          font-weight: 600;
        }

        /* Urgent badge */
        .ks-urgent-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #dc2626;
          background: #fee2e2;
          border: 1px solid #fca5a5;
          border-radius: 4px;
          padding: 1px 5px;
          letter-spacing: 0.3px;
          width: fit-content;
          margin-top: 3px;
          animation: ks-badge-pulse 2s ease-in-out infinite;
        }
        @keyframes ks-badge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
        .ks-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #dc2626;
          animation: ks-dot-blink 1.4s ease-in-out infinite;
        }
        @keyframes ks-dot-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }

        /* Milestone chip */
        .ks-milestone-chip {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 700;
          color: #15803d;
          background: #dcfce7;
          border: 1px solid #86efac;
          border-radius: 4px;
          padding: 1px 5px;
          letter-spacing: 0.3px;
          width: fit-content;
          margin-top: 3px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ks-stats-inner { 
            grid-template-columns: repeat(2, 1fr);
            padding: 0 20px;
          }
          .ks-stat-cell {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 22px 16px;
          }
          .ks-stat-cell:nth-child(odd) {
            border-right: 1px solid #f1f5f9;
          }
          .ks-stat-cell:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }

        @media (max-width: 480px) {
          .ks-stats-inner {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 12px;
          }
          .ks-stat-cell {
            padding: 18px 12px;
            gap: 12px;
          }
          .ks-stat-icon {
            width: 44px;
            height: 44px;
            border-radius: 11px;
          }
          .ks-stat-value {
            font-size: 22px;
          }
          .ks-stat-label {
            font-size: 11px;
          }
        }
      `}</style>

      <section className="ks-stats" aria-label="Platform statistics">
        <div className="ks-stats-inner">
          {STATS.map(({ value, label, accent, bg, border, icon, isDeadline, isMilestone }, i) => {
            const colorClass = accent === "#1a56db" ? "ks-blue"
              : accent === "#7c3aed" ? "ks-purple"
              : accent === "#dc2626" ? "ks-red"
              : "ks-green";

            return (
              <motion.div
                key={value}
                className={`ks-stat-cell ${colorClass}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.48,
                  delay: 0.08 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -2 }}
              >
                {/* Icon box */}
                <div
                  className={`ks-stat-icon${isDeadline ? " ks-deadline-pulse" : ""}`}
                  style={{ background: bg, borderColor: border }}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="ks-stat-text">
                  <motion.span
                    className={`ks-stat-value${isMilestone ? " ks-milestone-value" : ""}`}
                    style={{ color: accent }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.42,
                      delay: 0.18 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {value}
                  </motion.span>
                  <div>
                    <span className={`ks-stat-label${isDeadline ? " ks-deadline-label" : ""}`}>
                      {label}
                    </span>
                    {isDeadline && (
                      <div className="ks-urgent-badge">
                        <span className="ks-badge-dot" />
                        URGENT
                      </div>
                    )}
                    {isMilestone && (
                      <div className="ks-milestone-chip">🎉 Milestone reached</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
