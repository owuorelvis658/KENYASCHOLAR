import React from "react";
import { motion } from "framer-motion";

/* =========================================================
   CLEAN MINIMAL KENYASCHOLAR SECTION
   EXACTLY LIKE YOUR REFERENCE IMAGE
========================================================= */

const FEATURES = [
  {
    title: "Verified Opportunities",
    desc: "All scholarships are verified before being listed.",
    color: "#16a34a",

    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L4 6v5c0 5 3.5 9.5 8 10.8 4.5-1.3 8-5.8 8-10.8V6l-8-4z"
          stroke="#16a34a"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 12l2.3 2.3 4.7-4.7"
          stroke="#16a34a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    title: "Deadline Reminders",
    desc: "Get alerts so you never miss an opportunity.",
    color: "#2563eb",

    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="#2563eb"
          strokeWidth="1.8"
        />
        <path
          d="M12 8v4l2.5 2.5"
          stroke="#2563eb"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    title: "Easy to Use",
    desc: "Simple, organized and mobile-friendly.",
    color: "#7c3aed",

    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="7"
          y="3"
          width="10"
          height="18"
          rx="2.5"
          stroke="#7c3aed"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="17.5" r="1" fill="#7c3aed" />
      </svg>
    ),
  },

  {
    title: "For Every Student",
    desc: "Opportunities for all students across Kenya.",
    color: "#ea580c",

    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">

        <circle
          cx="8"
          cy="9"
          r="2.5"
          stroke="#ea580c"
          strokeWidth="1.8"
        />

        <circle
          cx="16"
          cy="9"
          r="2.5"
          stroke="#ea580c"
          strokeWidth="1.8"
        />

        <path
          d="M4.5 18c.8-2.2 2.5-3.5 5-3.5"
          stroke="#ea580c"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M19.5 18c-.8-2.2-2.5-3.5-5-3.5"
          stroke="#ea580c"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

      </svg>
    ),
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          font-family:'Plus Jakarta Sans',sans-serif;
          background:#fff;
        }

        .ks-why{
          padding:32px 24px 60px;
          background:#ffffff;
        }

        .ks-inner{
          max-width:1200px;
          margin:auto;
        }

        /* heading */

        .ks-heading{
          margin-bottom:22px;
        }

        .ks-heading h2{
          font-size:19px;
          font-weight:800;
          color:#111827;
          margin:0;
          letter-spacing:-0.3px;
        }

        /* grid */

        .ks-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:24px;
        }

        /* item */

        .ks-item{
          display:flex;
          align-items:flex-start;
          gap:12px;
        }

        /* icon */

        .ks-icon{
          width:42px;
          height:42px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          background:#f8fafc;
        }

        /* text */

        .ks-text{
          padding-top:2px;
        }

        .ks-title{
          font-size:13.5px;
          font-weight:700;
          color:#111827;
          margin-bottom:4px;
          line-height:1.3;
        }

        .ks-desc{
          font-size:12px;
          color:#6b7280;
          line-height:1.55;
        }

        /* responsive */

        @media(max-width:1024px){

          .ks-grid{
            grid-template-columns:repeat(2,1fr);
            gap:18px;
          }
        }

        @media(max-width:640px){

          .ks-why{
            padding:28px 16px 4px;
          }

          .ks-grid{
            grid-template-columns:1fr;
            gap:16px;
          }

          .ks-heading h2{
            font-size:17px;
          }
        }

      `}</style>

      <section className="ks-why">

        <div className="ks-inner">

          <motion.div
            className="ks-heading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Why Use KenyaScholar?</h2>
          </motion.div>

          <div className="ks-grid">

            {FEATURES.map((item, i) => (

              <motion.div
                key={item.title}
                className="ks-item"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >

                <div className="ks-icon">
                  {item.icon}
                </div>

                <div className="ks-text">

                  <div className="ks-title">
                    {item.title}
                  </div>

                  <div className="ks-desc">
                    {item.desc}
                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
}