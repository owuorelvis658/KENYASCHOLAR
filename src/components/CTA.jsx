import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check } from "lucide-react";

/* ─── CTA Section ─────────────────────────────────── */
export default function CTA() {
  const [clicked, setClicked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleEnable = () => {
    setClicked(true);
  };

  if (dismissed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .ks-cta-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .ks-cta-section {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
          background: #eff6ff;
          border-top: 1px solid #dbeafe;
          border-bottom: 1px solid #dbeafe;
          padding: 6px 12px;
          position: relative;
          overflow: hidden;
        }

        /* subtle dot grid texture */
        .ks-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #bfdbfe 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.22;
          pointer-events: none;
        }

        /* soft glow blobs */
        .ks-cta-blob-l {
          position: absolute;
          left: -60px;
          top: 50%;
          transform: translateY(-50%);
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, #bfdbfe 0%, transparent 70%);
          opacity: 0.45;
          pointer-events: none;
        }

        .ks-cta-blob-r {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, #c7d2fe 0%, transparent 70%);
          opacity: 0.35;
          pointer-events: none;
        }

.ks-cta-inner { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; }

        /* ── Left ── */
        .ks-cta-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .ks-cta-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #ffffff;
          border: 1.5px solid #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(26, 86, 219, 0.1);
          position: relative;
        }

        .ks-cta-ping {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid #eff6ff;
        }

        .ks-cta-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .ks-cta-heading {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.25px;
          line-height: 1.2;
        }

        .ks-cta-sub {
          font-size: 13px;
          font-weight: 400;
          color: #475569;
          line-height: 1.45;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Right ── */
        .ks-cta-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .ks-cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          background: #1a56db;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: -0.1px;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(26, 86, 219, 0.28);
          transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease;
          position: relative;
          overflow: hidden;
        }

        .ks-cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .ks-cta-btn:hover {
          background: #1244b8;
          box-shadow: 0 5px 18px rgba(26, 86, 219, 0.36);
          transform: translateY(-1px);
        }

        .ks-cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .ks-cta-btn.success {
          background: #16a34a;
          box-shadow: 0 2px 10px rgba(22, 163, 74, 0.28);
          cursor: default;
        }

        .ks-cta-btn.success:hover {
          background: #15803d;
          transform: none;
        }

        .ks-cta-dismiss {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: background 0.14s, color 0.14s, border-color 0.14s;
          flex-shrink: 0;
        }

        .ks-cta-dismiss:hover {
          background: #dbeafe;
          border-color: #93c5fd;
          color: #1a56db;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ks-cta-section { padding: 18px 20px; }
          .ks-cta-heading { font-size: 14px; }
          .ks-cta-sub { font-size: 12px; }
          .ks-cta-btn { padding: 10px 16px; font-size: 13px; }
        }

        @media (max-width: 560px) {
          .ks-cta-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ks-cta-sub { white-space: normal; }
          .ks-cta-right { width: 100%; }
          .ks-cta-btn { flex: 1; justify-content: center; }
          .ks-cta-heading { white-space: normal; }
        }

        @media (max-width: 380px) {
          .ks-cta-section { padding: 16px; }
          .ks-cta-icon-box { width: 40px; height: 40px; border-radius: 10px; }
        }
      `}</style>

      <motion.section
        className="ks-cta-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Scholarship deadline alerts"
      >
        <div className="ks-cta-blob-l" aria-hidden="true" />
        <div className="ks-cta-blob-r" aria-hidden="true" />

   <div className="ks-cta-inner">

  {/* ── Left: Bell icon + text ── */}
  <div className="ks-cta-left">
    <motion.div
      className="ks-cta-icon-box"
      animate={{ rotate: [0, -14, 14, -10, 10, -6, 6, 0] }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.5 }}
      aria-hidden="true"
    >
      <Bell size={20} color="#1a56db" strokeWidth={2} />
      <motion.span
        className="ks-cta-ping"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </motion.div>

    <div className="ks-cta-text">
      <motion.p className="ks-cta-heading"
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.14, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        Never miss a scholarship deadline!
      </motion.p>
      <motion.p className="ks-cta-sub"
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.22, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        Get email or WhatsApp alerts for new scholarships and deadlines.
      </motion.p>
    </div>
  </div>

  {/* ── Middle: Enable Alerts button ── */}
  <div className="ks-cta-right">
    <AnimatePresence mode="wait">
      {!clicked ? (
        <motion.button key="enable" className="ks-cta-btn" onClick={handleEnable}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
          transition={{ delay: 0.32, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
          <motion.span animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
            transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
            <Bell size={15} strokeWidth={2.5} />
          </motion.span>
          Enable Alerts
        </motion.button>
      ) : (
        <motion.button key="success" className="ks-cta-btn success"
          initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} disabled>
          <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.08, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
            <Check size={15} strokeWidth={2.8} />
          </motion.span>
          Alerts Enabled!
        </motion.button>
      )}
    </AnimatePresence>
  </div>

  {/* ── Far Right: Dismiss (X) button ── */}
  <motion.button
    className="ks-cta-dismiss"
    onClick={() => setDismissed(true)}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    transition={{ delay: 0.42 }}
    whileTap={{ scale: 0.9 }}
    aria-label="Dismiss this notification"
  >
    <X size={13} strokeWidth={2.5} />
  </motion.button>

</div>
      </motion.section>
    </>
  );
}
