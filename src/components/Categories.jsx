import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScholarships } from '../hooks/useScholarships';

/* ─── LOGO PATHS ────────────────────────────────────────────────────────── */
const LOGOS = {
  stem:     "public/assets/logos/stem-scholarships -logo.jpg",
  county:   "public/assets/logos/Bursarie logo.webp",
  girls:    "public/assets/logos/girls scholarship -logo.jpg",
  national: "public/assets/logos/National scholarship -logo.jpg",
  ngo:      "public/assets/logos/ngo -logo.jpg",
  other:    null,
};

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const CATS = {
  national: {
    name: "National Scholarships",
    shortName: "National",
    icon: "🏛️",
    color: "#1a56db",
    light: "#eff6ff",
    mid: "#bfdbfe",
    dark: "#1e3a8a",
    tagBg: "#dbeafe",
    tagColor: "#1e40af",
    heroGradient: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 45%, #0ea5e9 100%)",
    heroPattern: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
    desc: "Government-funded scholarships and bursaries available to all Kenyan citizens pursuing secondary and higher education.",
    cardColors: [
      { accent:"#1a56db", bg:"#eff6ff", tag:"#dbeafe", tagText:"#1e40af" },
      { accent:"#0ea5e9", bg:"#f0f9ff", tag:"#e0f2fe", tagText:"#0369a1" },
      { accent:"#6366f1", bg:"#eef2ff", tag:"#e0e7ff", tagText:"#4338ca" },
      { accent:"#0891b2", bg:"#ecfeff", tag:"#cffafe", tagText:"#0e7490" },
      { accent:"#1e3a8a", bg:"#dbeafe", tag:"#bfdbfe", tagText:"#1e40af" },
    ],
    scholarships: [
      { title:"Higher Education Fund (HEF) – HELB", tag:"Undergraduate & TVET", amount:"Varies by need", level:"University / TVET", desc:"Administered by HELB, provides loans, bursaries and scholarships for students in public and private universities, national polytechnics and TVET institutions. Applications submitted via the HELB portal with proof of admission, financial need, and supporting documents.", url:"https://www.helb.co.ke" },
      { title:"Kenya Vision 2030 Scholarship", tag:"Merit-based", amount:"Full tuition", level:"University", desc:"Targets students in strategic sectors aligned with Kenya's Vision 2030 goals including ICT, engineering, health sciences, and agriculture. Requires strong KCSE results and a place at a recognised Kenyan university.", url:"https://www.education.go.ke" },
      { title:"NG-CDF Constituency Bursary", tag:"Need-based", amount:"Ksh 5,000 – 50,000", level:"Secondary & University", desc:"Each of Kenya's 290 constituencies disburses bursary funds to needy students. Download forms from the NG-CDF website or collect from your local constituency office. Applications reviewed by the local bursary committee.", url:"https://ngcdf.go.ke" },
      { title:"HELB Special Scholarships", tag:"Marginalised Groups", amount:"Full funding", level:"University", desc:"Dedicated scholarships for students with disabilities, orphans, and students from marginalised communities. Apply through the HELB portal with supporting documentation including a disability certificate or orphan documentation.", url:"https://www.helb.co.ke" },
      { title:"Presidential Scholarship – Bright but Needy", tag:"Merit + Need", amount:"Full secondary (4 yrs)", level:"Secondary", desc:"Awarded to high-achieving Form 1 entrants from financially disadvantaged families. Selection conducted by the Ministry of Education's national panel based on KCPE performance and documented socioeconomic status.", url:"https://www.education.go.ke" },
    ],
  },
  county: {
    name: "County Bursaries",
    shortName: "County",
    icon: "📍",
    color: "#16a34a",
    light: "#f0fdf4",
    mid: "#bbf7d0",
    dark: "#14532d",
    tagBg: "#dcfce7",
    tagColor: "#166534",
    heroGradient: "linear-gradient(135deg, #14532d 0%, #16a34a 45%, #4ade80 100%)",
    heroPattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)",
    desc: "All 47 county governments allocate bursary funds through their education departments for residents from financially disadvantaged backgrounds.",
    cardColors: [
      { accent:"#16a34a", bg:"#f0fdf4", tag:"#dcfce7", tagText:"#166534" },
      { accent:"#059669", bg:"#ecfdf5", tag:"#d1fae5", tagText:"#065f46" },
      { accent:"#0d9488", bg:"#f0fdfa", tag:"#ccfbf1", tagText:"#0f766e" },
      { accent:"#15803d", bg:"#f0fdf4", tag:"#bbf7d0", tagText:"#14532d" },
      { accent:"#16a34a", bg:"#dcfce7", tag:"#bbf7d0", tagText:"#166534" },
    ],
    scholarships: [
      { title:"Nairobi County Bursary Fund", tag:"Secondary & University", amount:"Ksh 5,000 – 30,000", level:"Secondary & University", desc:"Available to Nairobi County residents pursuing secondary education, TVETs and university programmes. Apply at county education offices or via the Nairobi County Government portal with an admission letter and proof of residency.", url:"https://nairobi.go.ke" },
      { title:"Kiambu County Education Bursary", tag:"Need-based", amount:"Ksh 10,000 – 40,000", level:"Secondary & University", desc:"Kiambu County Government allocates bursaries for students from the county, prioritising orphans, children with disabilities, and those from vulnerable households. Applications at sub-county education offices.", url:"https://kiambu.go.ke" },
      { title:"Kakamega County University Scholarship", tag:"University", amount:"Partial tuition", level:"University", desc:"Supports students from Kakamega County undertaking undergraduate degree programmes in Kenyan universities. Aims to increase university attendance among county residents from low-income backgrounds.", url:"https://kakamega.go.ke" },
      { title:"Mombasa County–Ministry of Education Bursary", tag:"All levels", amount:"Varies", level:"Primary – University", desc:"A joint framework signed January 2025 transfers bursary functions to Mombasa County. Covers primary, secondary, special education, university, and tertiary students. Applications at county education sub-offices.", url:"https://mombasa.go.ke" },
      { title:"Kisumu County Bursary Programme", tag:"Need-based", amount:"Ksh 5,000 – 25,000", level:"Secondary & University", desc:"Supported under the Ministry of Education–Kisumu County agreement of October 2025. Applications submitted at sub-county education offices with proof of admission and documented financial need.", url:"https://kisumu.go.ke" },
    ],
  },
  ngo: {
    name: "NGO Sponsorships",
    shortName: "NGO",
    icon: "🤝",
    color: "#7c3aed",
    light: "#f5f3ff",
    mid: "#ddd6fe",
    dark: "#4c1d95",
    tagBg: "#ede9fe",
    tagColor: "#5b21b6",
    heroGradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 45%, #a78bfa 100%)",
    heroPattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.18) 0%, transparent 55%)",
    desc: "Non-governmental organisations and foundations providing comprehensive sponsorships for Kenyan students at all education levels.",
    cardColors: [
      { accent:"#7c3aed", bg:"#f5f3ff", tag:"#ede9fe", tagText:"#5b21b6" },
      { accent:"#9333ea", bg:"#faf5ff", tag:"#f3e8ff", tagText:"#7e22ce" },
      { accent:"#6d28d9", bg:"#f5f3ff", tag:"#ede9fe", tagText:"#4c1d95" },
      { accent:"#a21caf", bg:"#fdf4ff", tag:"#fae8ff", tagText:"#86198f" },
      { accent:"#7c3aed", bg:"#ede9fe", tag:"#ddd6fe", tagText:"#5b21b6" },
    ],
    scholarships: [
      { title:"Equity Group Foundation – Wings to Fly", tag:"Fully Funded", amount:"Full secondary (4 years)", level:"Secondary", desc:"Partnership between Equity Group Foundation and Mastercard Foundation. Covers tuition, accommodation, books, uniform, pocket money and transport. Over 60,000 students funded to date with a 97% secondary completion rate. Selection from all 47 counties.", url:"https://equitygroupfoundation.com/wings-to-fly/" },
      { title:"M-Pesa Foundation Scholarship", tag:"University", amount:"Full university", level:"University", desc:"Supports needy but academically excellent students at Kenyan universities. Covers tuition and living expenses. Beneficiaries receive mentorship and career support through the Safaricom Foundation network.", url:"https://www.safaricomfoundation.org" },
      { title:"Zawadi Africa Education Fund", tag:"Fully Funded", amount:"Full undergraduate", level:"Undergraduate", desc:"Provides scholarships to academically gifted girls from disadvantaged African backgrounds to pursue higher education in the USA, Uganda, Ghana, South Africa, and Kenya.", url:"https://www.zawadiafrica.org" },
      { title:"Co-operative Bank Foundation Scholarship", tag:"University", amount:"Full tuition", level:"University", desc:"Co-op Bank's CSR arm funds academically brilliant but needy students through university. Beneficiaries also receive mentorship and internship opportunities within the Co-op Bank network across Kenya.", url:"https://www.co-opbank.co.ke" },
      { title:"KCB Foundation Scholarship", tag:"University", amount:"Partial – Full", level:"University", desc:"Targets bright and needy Kenyan students for university education. Prioritises students from marginalised communities and those pursuing STEM, business, and law at accredited Kenyan universities.", url:"https://kcbfoundation.co.ke" },
    ],
  },
  girls: {
    name: "Girls' Scholarships",
    shortName: "Girls",
    icon: "⭐",
    color: "#db2777",
    light: "#fdf2f8",
    mid: "#fbcfe8",
    dark: "#831843",
    tagBg: "#fce7f3",
    tagColor: "#9d174d",
    heroGradient: "linear-gradient(135deg, #831843 0%, #db2777 45%, #f472b6 100%)",
    heroPattern: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.18) 0%, transparent 55%)",
    desc: "Dedicated scholarships empowering girls and young women in Kenya to access and excel in education at all levels.",
    cardColors: [
      { accent:"#db2777", bg:"#fdf2f8", tag:"#fce7f3", tagText:"#9d174d" },
      { accent:"#e11d48", bg:"#fff1f2", tag:"#ffe4e6", tagText:"#9f1239" },
      { accent:"#c026d3", bg:"#fdf4ff", tag:"#fae8ff", tagText:"#86198f" },
      { accent:"#be185d", bg:"#fdf2f8", tag:"#fbcfe8", tagText:"#831843" },
      { accent:"#db2777", bg:"#fce7f3", tag:"#fbcfe8", tagText:"#9d174d" },
    ],
    scholarships: [
      { title:"Fanikisha Girls' Secondary Scholarship", tag:"Secondary", amount:"Full secondary", level:"Secondary", desc:"Targets bright but needy girls entering Form 1. Funded by a consortium of donors, covers full school fees, boarding, and provides a mentorship programme across all four years of secondary school.", url:"https://www.education.go.ke" },
      { title:"Zawadi Africa Education Fund (Girls)", tag:"Fully Funded", amount:"Full undergraduate", level:"Undergraduate", desc:"Focuses specifically on academically gifted girls from disadvantaged African backgrounds, supporting undergraduate study across several countries including Kenya.", url:"https://www.zawadiafrica.org" },
      { title:"Gender + AI Fellowship – DW Akademie & AWJP", tag:"Fellowship", amount:"Fully funded", level:"Graduate / Professional", desc:"Jointly run by the African Women's Journalism Project and DW Akademie. Equips women journalists in Kenya with tools to understand AI and its gender impact. Study based in Kenya.", url:"https://www.dw.com/en/dw-akademie" },
      { title:"Brookhouse School Scholarship for Girls", tag:"Secondary", amount:"Partial – Full", level:"Secondary", desc:"Merit and bursary-based scholarships for Grade 10 entry. Special consideration for girls from under-resourced backgrounds applying to the IB Diploma Programme at Brookhouse.", url:"https://www.brookhouse.ac.ke" },
      { title:"Imperial College London Trigon Scholarship (Women)", tag:"International", amount:"Full tuition (UK)", level:"Undergraduate", desc:"Open to female students from Kenya pursuing an undergraduate MEng in Mechanical Engineering at Imperial College London. Part of Imperial's commitment to advancing women in global engineering.", url:"https://www.imperial.ac.uk" },
    ],
  },
  stem: {
    name: "STEM Scholarships",
    shortName: "STEM",
    icon: "🔬",
    color: "#d97706",
    light: "#fffbeb",
    mid: "#fde68a",
    dark: "#78350f",
    tagBg: "#fef3c7",
    tagColor: "#92400e",
    heroGradient: "linear-gradient(135deg, #78350f 0%, #d97706 45%, #fbbf24 100%)",
    heroPattern: "radial-gradient(circle at 60% 60%, rgba(255,255,255,0.18) 0%, transparent 55%)",
    desc: "Scholarships targeting science, technology, engineering and mathematics students pursuing innovation-driven careers aligned with Kenya Vision 2030.",
    cardColors: [
      { accent:"#d97706", bg:"#fffbeb", tag:"#fef3c7", tagText:"#92400e" },
      { accent:"#ea580c", bg:"#fff7ed", tag:"#ffedd5", tagText:"#9a3412" },
      { accent:"#ca8a04", bg:"#fefce8", tag:"#fef9c3", tagText:"#854d0e" },
      { accent:"#b45309", bg:"#fffbeb", tag:"#fde68a", tagText:"#78350f" },
      { accent:"#d97706", bg:"#fef3c7", tag:"#fde68a", tagText:"#92400e" },
    ],
    scholarships: [
      { title:"Inceptor ICT Scholarship – Nairobi", tag:"Tech / ICT", amount:"Programme-based", level:"Certificate / Diploma", desc:"Offered by Inceptor ICT Support Centre in Nairobi. Covers Digital Entrepreneurship and Software Development programmes. Open to Kenyan students based on passion and talent in technology. Includes incubation space and mentorship.", url:"https://scholarship-positions.com" },
      { title:"Deakin University STEM Scholarship", tag:"International", amount:"20% tuition waiver", level:"Undergraduate / Postgraduate", desc:"Australian university offers a 20% scholarship to international students including Kenyans, applying for undergraduate or postgraduate coursework within STEM faculties at Deakin University.", url:"https://www.deakin.edu.au" },
      { title:"Strathmore–DAAD In-Country Scholarship", tag:"Postgraduate", amount:"Fully funded", level:"Master's / PhD", desc:"Up to 5 scholarships for Master and PhD studies at Strathmore University, Nairobi. Covers Mathematical Finance, Mathematical Sciences, and related STEM fields. Partnership with Germany's DAAD academic exchange programme.", url:"https://www.strathmore.edu" },
      { title:"ICIPE ARPPIS PhD Scholarships", tag:"PhD", amount:"Fully funded", level:"PhD", desc:"International Centre of Insect Physiology and Ecology (ICIPE), Nairobi. African Regional Postgraduate Programme in Insect Sciences trains young African researchers for global STEM competition in research and development.", url:"https://www.icipe.org" },
      { title:"Kenya–Denmark JUCAN PhD Scholarships", tag:"PhD", amount:"Fully funded", level:"PhD", desc:"Joint University of Nairobi–University of Copenhagen PhD programme on Nature-Based Solutions and green transition in Kenya. Three fully funded positions covering tuition, stipend and research costs.", url:"https://www.uonbi.ac.ke" },
    ],
  },
  other: {
    name: "Other Opportunities",
    shortName: "Other",
    icon: "📚",
    color: "#475569",
    light: "#f8fafc",
    mid: "#e2e8f0",
    dark: "#1e293b",
    tagBg: "#f1f5f9",
    tagColor: "#334155",
    heroGradient: "linear-gradient(135deg, #1e293b 0%, #475569 45%, #94a3b8 100%)",
    heroPattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
    desc: "Additional scholarships, fellowships and bursaries from banks, international bodies, and professional organisations open to Kenyan students.",
    cardColors: [
      { accent:"#475569", bg:"#f8fafc", tag:"#f1f5f9", tagText:"#334155" },
      { accent:"#334155", bg:"#f1f5f9", tag:"#e2e8f0", tagText:"#1e293b" },
      { accent:"#1e40af", bg:"#eff6ff", tag:"#dbeafe", tagText:"#1e3a8a" },
      { accent:"#374151", bg:"#f9fafb", tag:"#f3f4f6", tagText:"#111827" },
      { accent:"#475569", bg:"#f1f5f9", tag:"#e2e8f0", tagText:"#334155" },
    ],
    scholarships: [
      { title:"Standard Chartered Bank Scholarship", tag:"University", amount:"Partial – Full", level:"University", desc:"Standard Chartered's community scholarship programmes support Kenyan students in higher education, particularly in business, finance, and STEM fields. Apply through the Standard Chartered Kenya website.", url:"https://www.sc.com/ke" },
      { title:"Schwarzman Scholars – Tsinghua University", tag:"International Masters", amount:"Fully funded", level:"Master's", desc:"Fully funded one-year master's in global affairs at Tsinghua University, China. Open to Kenyan applicants under 29. Covers tuition, accommodation, living stipend, international travel, and health insurance.", url:"https://www.schwarzmanscholars.org" },
      { title:"Beacon Scholarship (UK)", tag:"International", amount:"Fully funded", level:"Undergraduate", desc:"Change-maker programme offering financially disadvantaged students from Kenya, Tanzania, and Uganda access to undergraduate programmes at world-class UK schools and universities.", url:"https://www.beaconscholarship.org" },
      { title:"Ritchie-Jennings Memorial Scholarship (ACFE)", tag:"Undergraduate", amount:"Cash award + membership", level:"Undergraduate", desc:"Supports students advancing anti-fraud education and career paths. Provides a full year of Association of Certified Fraud Examiners (ACFE) membership alongside a financial award for qualifying students.", url:"https://www.acfe.com" },
      { title:"Swedish Institute Scholarship for Women (Africa)", tag:"International Masters", amount:"Fully funded", level:"Master's", desc:"Awards academic scholarships for master's studies in Sweden to women from Africa and Asia. Focuses on pioneering women in STEM, leadership, and sustainable development fields.", url:"https://si.se/en" },
    ],
  },
};

const CAT_KEYS = ["national", "county", "ngo", "girls", "stem", "other"];

/* ─── STYLES ────────────────────────────────────────────────────────────── */
const styles = {
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.3px",
  },
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 12,
  },
  catCard: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 14,
    padding: "20px 14px 16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    position: "relative",
  },
  catIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid transparent",
    overflow: "hidden",
  },
  catCardName: {
    fontSize: 12.5,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.4,
    whiteSpace: "pre-line",
  },
  catCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginTop: "auto",
  },
  catCount: {
    fontSize: 11.5,
    fontWeight: 600,
  },
};

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
export default function Categories() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ks-cats * { box-sizing: border-box; margin: 0; padding: 0; }
        .ks-cats {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          background: #ffffff;
          padding: 44px 24px 48px;
        }
        .ks-cats-inner { max-width: 1200px; margin: 0 auto; }
        @media (max-width: 1024px) {
          .ks-cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ks-cats { padding: 36px 16px 40px; }
          .ks-cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>

      <section className="ks-cats" aria-labelledby="ks-cats-heading">
        <div className="ks-cats-inner">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle} id="ks-cats-heading">
              Browse Scholarships by Category
            </h2>
          </div>
          <div className="ks-cat-grid" style={styles.catGrid} role="list">
            {CAT_KEYS.map((k) => (
              <CategoryCard key={k} catKey={k} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryCard({ catKey }) {
  const c = CATS[catKey];
  const { scholarships } = useScholarships(catKey);
  const navigate = useNavigate();
  const logo = LOGOS[catKey];

  return (
    <div
      role="listitem"
      style={{ ...styles.catCard }}
      onClick={() => navigate(`/scholarships/${catKey}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/scholarships/${catKey}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = c.mid;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
      }}
      tabIndex={0}
      aria-label={`${c.name}, ${scholarships.length} opportunities`}
    >
      <div style={{ ...styles.catIconWrap, background: c.light, borderColor: c.mid }}>
        {logo ? (
          <img src={logo} alt={`${c.name} logo`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
        ) : (
          <span style={{ fontSize: 22 }}>{c.icon}</span>
        )}
      </div>
      <p style={styles.catCardName}>{c.name.replace(" ", "\n")}</p>
      <div style={styles.catCardFooter}>
        <span style={{ ...styles.catCount, color: c.color }}>{scholarships.length} opportunities</span>
        <span style={{ color: c.color, fontSize: 13, marginLeft: 2 }}>›</span>
      </div>
    </div>
  );
}

/* ─── CATEGORY PAGE ─────────────────────────────────────────────────────── */
export function CategoryPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const c = CATS[slug];
  const logo = LOGOS[slug];

  if (!c) {
    return (
      <div style={{ padding: 40, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <p style={{ color: "#64748b" }}>Category not found.</p>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>← Back</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #f1f5f9; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-hero-content { animation: fadeUp 0.45s ease both; }
        .cat-card-item { animation: fadeUp 0.4s ease both; }
        .cat-card-item:nth-child(1)  { animation-delay: 0.05s; }
        .cat-card-item:nth-child(2)  { animation-delay: 0.10s; }
        .cat-card-item:nth-child(3)  { animation-delay: 0.15s; }
        .cat-card-item:nth-child(4)  { animation-delay: 0.20s; }
        .cat-card-item:nth-child(5)  { animation-delay: 0.25s; }
        .cat-card-item:nth-child(6)  { animation-delay: 0.30s; }
        .cat-card-item:nth-child(7)  { animation-delay: 0.35s; }
        .cat-card-item:nth-child(8)  { animation-delay: 0.40s; }
        .cat-card-item:nth-child(9)  { animation-delay: 0.45s; }
        .cat-card-item:nth-child(10) { animation-delay: 0.50s; }

        .apply-btn:hover {
          opacity: 0.88 !important;
          transform: translateY(-1px) !important;
        }
        .scholar-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.11) !important;
        }

        @media (max-width: 640px) {
          .cat-hero-inner { padding: 24px 16px 28px !important; }
          .cat-cards-wrap { padding: 20px 16px 48px !important; }
          .card-meta-row { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .card-meta-row .apply-btn { width: 100% !important; text-align: center !important; justify-content: center !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

        {/* ── Hero Banner ── */}
        <div style={{ background: c.heroGradient, position: "relative", overflow: "hidden" }}>
          <div style={{ position:"absolute", inset:0, background: c.heroPattern, pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:-60, top:-60, width:260, height:260, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", left:-40, bottom:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />

          <div className="cat-hero-inner" style={{ maxWidth:960, margin:"0 auto", padding:"32px 24px 36px", position:"relative", zIndex:1 }}>
            <button
              onClick={() => navigate(-1)}
              style={{ fontSize:13, color:"rgba(255,255,255,0.9)", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:500, transition:"background 0.15s", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              ← Back to categories
            </button>

            <div className="cat-hero-content" style={{ display:"flex", alignItems:"flex-start", gap:20, marginTop:22 }}>
              <div style={{ width:72, height:72, borderRadius:18, background:"rgba(255,255,255,0.95)", border:"2px solid rgba(255,255,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", boxShadow:"0 8px 24px rgba(0,0,0,0.18)" }}>
                {logo ? (
                  <img src={logo} alt={`${c.name} logo`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                ) : (
                  <span style={{ fontSize:32 }}>{c.icon}</span>
                )}
              </div>
              <div>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#ffffff", marginBottom:8, letterSpacing:"-0.4px", textShadow:"0 1px 4px rgba(0,0,0,0.15)" }}>{c.name}</h1>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.88)", lineHeight:1.7, maxWidth:580 }}>{c.desc}</p>
                <div style={{ display:"flex", gap:10, marginTop:14, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12, padding:"5px 14px", borderRadius:20, fontWeight:700, background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", backdropFilter:"blur(6px)" }}>
                    {c.scholarships.length} opportunities listed
                  </span>
                  <span style={{ fontSize:12, padding:"5px 14px", borderRadius:20, fontWeight:600, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.85)", border:"1px solid rgba(255,255,255,0.2)", backdropFilter:"blur(6px)" }}>
                    ↻ Updated 2025/26
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div style={{ height:6, background:`linear-gradient(90deg, ${c.color}55, ${c.mid}, ${c.color}55)` }} />

        {/* ── Scholarship Cards — VERTICAL STACK ── */}
        <div className="cat-cards-wrap" style={{ maxWidth:860, margin:"0 auto", padding:"32px 24px 64px", display:"flex", flexDirection:"column", gap:18 }}>

          {c.scholarships.map((s, i) => {
            const col = c.cardColors[i % c.cardColors.length];
            return (
              <div
                key={i}
                className="cat-card-item scholar-card"
                style={{
                  background: col.bg,
                  border: `1.5px solid ${col.accent}44`,
                  borderRadius: 20,
                  overflow: "hidden",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  boxShadow: `0 2px 8px ${col.accent}15`,
                  cursor: "default",
                }}
              >
                {/* Coloured top bar */}
                <div style={{ height: 6, background: `linear-gradient(90deg, ${col.accent}, ${col.accent}88)` }} />

                <div style={{ padding: "22px 24px 20px" }}>

                  {/* Number badge + tag row */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      {/* Numbered circle */}
                      <div style={{
                        width:32, height:32, borderRadius:"50%",
                        background: col.accent,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:13, fontWeight:800, color:"#fff",
                        flexShrink:0, boxShadow:`0 2px 8px ${col.accent}55`,
                      }}>
                        {i + 1}
                      </div>
                      {/* Tag pill */}
                      <span style={{
                        fontSize:11, padding:"4px 12px", borderRadius:20,
                        fontWeight:700, background: col.tag, color: col.tagText,
                        border:`1px solid ${col.accent}30`,
                        letterSpacing:0.3,
                      }}>
                        {s.tag}
                      </span>
                    </div>

                    {/* Amount badge */}
                    <span style={{
                      fontSize:12, padding:"4px 12px", borderRadius:10,
                      fontWeight:700, background: col.bg,
                      color: col.accent,
                      border:`1.5px solid ${col.accent}40`,
                      boxShadow:`0 1px 4px ${col.accent}18`,
                    }}>
                      💰 {s.amount}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: col.accent,
                    marginBottom: 10,
                    letterSpacing: "-0.3px",
                    lineHeight: 1.35,
                  }}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 13.5,
                    color: col.accent,
                    lineHeight: 1.7,
                    marginBottom: 18,
                    opacity: 0.85,
                  }}>
                    {s.desc}
                  </p>

                  {/* Divider */}
                  <div style={{ height:1.5, background:`linear-gradient(90deg, ${col.accent}80, ${col.accent}20, transparent)`, marginBottom:16 }} />

                  {/* Bottom row: level chip + apply button */}
                  <div className="card-meta-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                    <span style={{
                      fontSize:12.5, fontWeight:700,
                      background: col.bg,
                      color: col.accent,
                      padding:"5px 14px", borderRadius:10,
                      border:`1.5px solid ${col.accent}35`,
                    }}>
                      🎓 {s.level}
                    </span>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-btn"
                      style={{
                        fontSize:13, textDecoration:"none",
                        padding:"9px 22px", borderRadius:12,
                        fontWeight:700, color:"#fff",
                        background:`linear-gradient(135deg, ${col.accent} 0%, ${col.accent}cc 100%)`,
                        boxShadow:`0 3px 12px ${col.accent}44`,
                        transition:"opacity 0.15s, transform 0.15s",
                        display:"inline-flex", alignItems:"center", gap:6,
                        fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
                      }}
                    >
                      Apply / Learn more <span style={{ fontSize:14 }}>↗</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

const backBtnStyle = {
  fontSize: 13, color: "#1a56db", background: "#eff6ff",
  border: "1px solid #bfdbfe", borderRadius: 8,
  padding: "6px 14px", cursor: "pointer", fontWeight: 500,
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
};
