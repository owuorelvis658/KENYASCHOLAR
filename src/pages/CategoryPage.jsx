import { useNavigate, useParams } from "react-router-dom";

const LOGOS = {
  stem:     "/assets/logos/stem-scholarships -logo.jpg",
  county:   "/assets/logos/Bursarie logo.webp",
  girls:    "/assets/logos/girls scholarship -logo.jpg",
  national: "/assets/logos/National scholarship -logo.jpg",
  ngo:      "/assets/logos/ngo -logo.jpg",
  other:    null,
};

const CATS = {
  national: {
    name: "National Scholarships", icon: "🏛️",
    color: "#1a56db", light: "#eff6ff", mid: "#bfdbfe",
    heroGradient: "linear-gradient(135deg,#1e3a8a 0%,#1a56db 55%,#0ea5e9 100%)",
    desc: "Government-funded scholarships and bursaries available to all Kenyan citizens pursuing secondary and higher education.",
    cardPalette: [
      { topBar:"#1a56db", bg:"#eff6ff", numBg:"#1a56db", tagBg:"#dbeafe", tagText:"#1e40af", accentText:"#1a56db", btnBg:"linear-gradient(135deg,#1a56db,#1244b8)" },
      { topBar:"#0ea5e9", bg:"#f0f9ff", numBg:"#0ea5e9", tagBg:"#e0f2fe", tagText:"#0369a1", accentText:"#0ea5e9", btnBg:"linear-gradient(135deg,#0ea5e9,#0284c7)" },
      { topBar:"#6366f1", bg:"#eef2ff", numBg:"#6366f1", tagBg:"#e0e7ff", tagText:"#4338ca", accentText:"#6366f1", btnBg:"linear-gradient(135deg,#6366f1,#4f46e5)" },
      { topBar:"#0891b2", bg:"#ecfeff", numBg:"#0891b2", tagBg:"#cffafe", tagText:"#0e7490", accentText:"#0891b2", btnBg:"linear-gradient(135deg,#0891b2,#0e7490)" },
      { topBar:"#3b82f6", bg:"#dbeafe", numBg:"#3b82f6", tagBg:"#bfdbfe", tagText:"#1e40af", accentText:"#1d4ed8", btnBg:"linear-gradient(135deg,#3b82f6,#2563eb)" },
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
    name: "County Bursaries", icon: "📍",
    color: "#16a34a", light: "#f0fdf4", mid: "#bbf7d0",
    heroGradient: "linear-gradient(135deg,#14532d 0%,#16a34a 55%,#4ade80 100%)",
    desc: "All 47 county governments allocate bursary funds through their education departments for residents from financially disadvantaged backgrounds.",
    cardPalette: [
      { topBar:"#16a34a", bg:"#f0fdf4", numBg:"#16a34a", tagBg:"#dcfce7", tagText:"#166534", accentText:"#15803d", btnBg:"linear-gradient(135deg,#16a34a,#15803d)" },
      { topBar:"#059669", bg:"#ecfdf5", numBg:"#059669", tagBg:"#d1fae5", tagText:"#065f46", accentText:"#059669", btnBg:"linear-gradient(135deg,#059669,#047857)" },
      { topBar:"#0d9488", bg:"#f0fdfa", numBg:"#0d9488", tagBg:"#ccfbf1", tagText:"#0f766e", accentText:"#0d9488", btnBg:"linear-gradient(135deg,#0d9488,#0f766e)" },
      { topBar:"#65a30d", bg:"#f7fee7", numBg:"#65a30d", tagBg:"#ecfccb", tagText:"#365314", accentText:"#4d7c0f", btnBg:"linear-gradient(135deg,#65a30d,#4d7c0f)" },
      { topBar:"#16a34a", bg:"#dcfce7", numBg:"#16a34a", tagBg:"#bbf7d0", tagText:"#14532d", accentText:"#15803d", btnBg:"linear-gradient(135deg,#16a34a,#14532d)" },
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
    name: "NGO Sponsorships", icon: "🤝",
    color: "#7c3aed", light: "#f5f3ff", mid: "#ddd6fe",
    heroGradient: "linear-gradient(135deg,#4c1d95 0%,#7c3aed 55%,#a78bfa 100%)",
    desc: "Non-governmental organisations and foundations providing comprehensive sponsorships for Kenyan students at all education levels.",
    cardPalette: [
      { topBar:"#7c3aed", bg:"#f5f3ff", numBg:"#7c3aed", tagBg:"#ede9fe", tagText:"#5b21b6", accentText:"#6d28d9", btnBg:"linear-gradient(135deg,#7c3aed,#6d28d9)" },
      { topBar:"#9333ea", bg:"#faf5ff", numBg:"#9333ea", tagBg:"#f3e8ff", tagText:"#7e22ce", accentText:"#9333ea", btnBg:"linear-gradient(135deg,#9333ea,#7e22ce)" },
      { topBar:"#a855f7", bg:"#fdf4ff", numBg:"#a855f7", tagBg:"#fae8ff", tagText:"#86198f", accentText:"#9333ea", btnBg:"linear-gradient(135deg,#a855f7,#9333ea)" },
      { topBar:"#6d28d9", bg:"#ede9fe", numBg:"#6d28d9", tagBg:"#ddd6fe", tagText:"#4c1d95", accentText:"#5b21b6", btnBg:"linear-gradient(135deg,#6d28d9,#5b21b6)" },
      { topBar:"#7c3aed", bg:"#f5f3ff", numBg:"#7c3aed", tagBg:"#ede9fe", tagText:"#5b21b6", accentText:"#6d28d9", btnBg:"linear-gradient(135deg,#7c3aed,#4c1d95)" },
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
    name: "Girls' Scholarships", icon: "⭐",
    color: "#db2777", light: "#fdf2f8", mid: "#fbcfe8",
    heroGradient: "linear-gradient(135deg,#831843 0%,#db2777 55%,#f472b6 100%)",
    desc: "Dedicated scholarships empowering girls and young women in Kenya to access and excel in education at all levels.",
    cardPalette: [
      { topBar:"#db2777", bg:"#fdf2f8", numBg:"#db2777", tagBg:"#fce7f3", tagText:"#9d174d", accentText:"#be185d", btnBg:"linear-gradient(135deg,#db2777,#be185d)" },
      { topBar:"#e11d48", bg:"#fff1f2", numBg:"#e11d48", tagBg:"#ffe4e6", tagText:"#9f1239", accentText:"#e11d48", btnBg:"linear-gradient(135deg,#e11d48,#be123c)" },
      { topBar:"#c026d3", bg:"#fdf4ff", numBg:"#c026d3", tagBg:"#fae8ff", tagText:"#86198f", accentText:"#c026d3", btnBg:"linear-gradient(135deg,#c026d3,#a21caf)" },
      { topBar:"#be185d", bg:"#fce7f3", numBg:"#be185d", tagBg:"#fbcfe8", tagText:"#831843", accentText:"#9d174d", btnBg:"linear-gradient(135deg,#be185d,#9d174d)" },
      { topBar:"#db2777", bg:"#fdf2f8", numBg:"#db2777", tagBg:"#fce7f3", tagText:"#9d174d", accentText:"#be185d", btnBg:"linear-gradient(135deg,#db2777,#831843)" },
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
    name: "STEM Scholarships", icon: "🔬",
    color: "#d97706", light: "#fffbeb", mid: "#fde68a",
    heroGradient: "linear-gradient(135deg,#78350f 0%,#d97706 55%,#fbbf24 100%)",
    desc: "Scholarships targeting science, technology, engineering and mathematics students pursuing innovation-driven careers aligned with Kenya Vision 2030.",
    cardPalette: [
      { topBar:"#d97706", bg:"#fffbeb", numBg:"#d97706", tagBg:"#fef3c7", tagText:"#92400e", accentText:"#b45309", btnBg:"linear-gradient(135deg,#d97706,#b45309)" },
      { topBar:"#ea580c", bg:"#fff7ed", numBg:"#ea580c", tagBg:"#ffedd5", tagText:"#9a3412", accentText:"#c2410c", btnBg:"linear-gradient(135deg,#ea580c,#c2410c)" },
      { topBar:"#ca8a04", bg:"#fefce8", numBg:"#ca8a04", tagBg:"#fef9c3", tagText:"#854d0e", accentText:"#a16207", btnBg:"linear-gradient(135deg,#ca8a04,#a16207)" },
      { topBar:"#b45309", bg:"#fffbeb", numBg:"#b45309", tagBg:"#fde68a", tagText:"#78350f", accentText:"#92400e", btnBg:"linear-gradient(135deg,#b45309,#78350f)" },
      { topBar:"#d97706", bg:"#fef3c7", numBg:"#d97706", tagBg:"#fde68a", tagText:"#92400e", accentText:"#b45309", btnBg:"linear-gradient(135deg,#d97706,#92400e)" },
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
    name: "Other Opportunities", icon: "📚",
    color: "#475569", light: "#f8fafc", mid: "#e2e8f0",
    heroGradient: "linear-gradient(135deg,#1e293b 0%,#475569 55%,#94a3b8 100%)",
    desc: "Additional scholarships, fellowships and bursaries from banks, international bodies, and professional organisations open to Kenyan students.",
    cardPalette: [
      { topBar:"#475569", bg:"#f8fafc", numBg:"#475569", tagBg:"#f1f5f9", tagText:"#334155", accentText:"#334155", btnBg:"linear-gradient(135deg,#475569,#334155)" },
      { topBar:"#1e40af", bg:"#eff6ff", numBg:"#1e40af", tagBg:"#dbeafe", tagText:"#1e3a8a", accentText:"#1d4ed8", btnBg:"linear-gradient(135deg,#1e40af,#1e3a8a)" },
      { topBar:"#334155", bg:"#f1f5f9", numBg:"#334155", tagBg:"#e2e8f0", tagText:"#1e293b", accentText:"#1e293b", btnBg:"linear-gradient(135deg,#334155,#1e293b)" },
      { topBar:"#0f766e", bg:"#f0fdfa", numBg:"#0f766e", tagBg:"#ccfbf1", tagText:"#134e4a", accentText:"#0f766e", btnBg:"linear-gradient(135deg,#0f766e,#134e4a)" },
      { topBar:"#6d28d9", bg:"#f5f3ff", numBg:"#6d28d9", tagBg:"#ede9fe", tagText:"#4c1d95", accentText:"#5b21b6", btnBg:"linear-gradient(135deg,#6d28d9,#4c1d95)" },
    ],
    scholarships: [
      { title:"Standard Chartered Bank Scholarship", tag:"University", amount:"Partial – Full", level:"University", desc:"Standard Chartered's community scholarship programmes support Kenyan students in higher education, particularly in business, finance, and STEM fields. Apply through the Standard Chartered Kenya website.", url:"https://www.sc.com/ke" },
      { title:"Schwarzman Scholars – Tsinghua University", tag:"International Masters", amount:"Fully funded", level:"Master's", desc:"Fully funded one-year master's in global affairs at Tsinghua University, China. Open to Kenyan applicants under 29. Covers tuition, accommodation, living stipend, international travel, and health insurance.", url:"https://www.schwarzmanscholars.org" },
      { title:"Beacon Scholarship (UK)", tag:"International", amount:"Fully funded", level:"Undergraduate", desc:"Change-maker programme offering financially disadvantaged students from Kenya, Tanzania, and Uganda access to undergraduate programmes at world-class UK schools and universities.", url:"https://www.beaconscholarship.org" },
      { title:"Ritchie-Jennings Memorial Scholarship (ACFE)", tag:"Undergraduate", amount:"Cash award + membership", level:"Undergraduate", desc:"Supports students advancing anti-fraud education and career paths. Provides a full year of ACFE membership alongside a financial award for qualifying students.", url:"https://www.acfe.com" },
      { title:"Swedish Institute Scholarship for Women (Africa)", tag:"International Masters", amount:"Fully funded", level:"Master's", desc:"Awards academic scholarships for master's studies in Sweden to women from Africa and Asia. Focuses on pioneering women in STEM, leadership, and sustainable development fields.", url:"https://si.se/en" },
    ],
  },
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const c = CATS[slug];
  const logo = LOGOS[slug];

  if (!c) {
    return (
      <div style={{ padding:40, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
        <p style={{ color:"#64748b", marginBottom:16 }}>Category not found.</p>
        <button onClick={() => navigate(-1)} style={{ fontSize:13, color:"#1a56db", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:600, fontFamily:"inherit" }}>← Back</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #f1f5f9; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cp-hero { animation: slideUp 0.4s ease both; }
        .cp-card { animation: slideUp 0.35s ease both; }
        .cp-card:nth-child(1) { animation-delay: 0.04s; }
        .cp-card:nth-child(2) { animation-delay: 0.09s; }
        .cp-card:nth-child(3) { animation-delay: 0.14s; }
        .cp-card:nth-child(4) { animation-delay: 0.19s; }
        .cp-card:nth-child(5) { animation-delay: 0.24s; }
        .cp-card:nth-child(6) { animation-delay: 0.29s; }
        .cp-card:nth-child(7) { animation-delay: 0.34s; }
        .cp-card:nth-child(8) { animation-delay: 0.39s; }
        .cp-card:nth-child(9) { animation-delay: 0.44s; }
        .cp-card:nth-child(10) { animation-delay: 0.49s; }

        .cp-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.10) !important;
        }
        .cp-apply:hover {
          opacity: 0.85 !important;
          transform: translateY(-1px) !important;
        }
        .cp-back:hover { background: rgba(255,255,255,0.28) !important; }

        @media (max-width: 600px) {
          .cp-hero-inner { padding: 24px 16px 28px !important; }
          .cp-list { padding: 20px 16px 56px !important; }
          .cp-card-bottom { flex-direction: column !important; gap: 10px !important; }
          .cp-apply { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#f1f5f9", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>

        {/* ── Hero ── */}
        <div style={{ background:c.heroGradient, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-80, top:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", left:-50, bottom:-50, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />

          <div className="cp-hero-inner cp-hero" style={{ maxWidth:900, margin:"0 auto", padding:"30px 24px 34px", position:"relative", zIndex:1 }}>
            <button className="cp-back" onClick={() => navigate(-1)} style={{ fontSize:13, color:"rgba(255,255,255,0.92)", background:"rgba(255,255,255,0.16)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:500, fontFamily:"inherit", transition:"background 0.15s", marginBottom:22, display:"inline-block" }}>
              ← Back to categories
            </button>

            <div style={{ display:"flex", alignItems:"flex-start", gap:18 }}>
              <div style={{ width:68, height:68, borderRadius:16, background:"rgba(255,255,255,0.95)", border:"2px solid rgba(255,255,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", boxShadow:"0 6px 20px rgba(0,0,0,0.18)" }}>
                {logo ? <img src={logo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <span style={{ fontSize:30 }}>{c.icon}</span>}
              </div>
              <div>
                <h1 style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:7, letterSpacing:"-0.4px" }}>{c.name}</h1>
                <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.85)", lineHeight:1.7, maxWidth:560 }}>{c.desc}</p>
                <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11.5, padding:"4px 12px", borderRadius:20, fontWeight:700, background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)" }}>
                    {c.scholarships.length} scholarships listed
                  </span>
                  <span style={{ fontSize:11.5, padding:"4px 12px", borderRadius:20, fontWeight:600, background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.82)", border:"1px solid rgba(255,255,255,0.18)" }}>
                    ↻ Updated 2025/26
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colour strip */}
        <div style={{ height:5, background:`linear-gradient(90deg, ${c.color}66, ${c.mid}, ${c.color}66)` }} />

        {/* ── VERTICAL CARD LIST ── */}
        <div className="cp-list" style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "28px 20px 72px",
          display: "flex",        /* ← flex column = vertical stack */
          flexDirection: "column",
          gap: 20,
        }}>

          {c.scholarships.map((s, i) => {
            const p = c.cardPalette[i % c.cardPalette.length];
            return (
              <div
                key={i}
                className="cp-card"
                style={{
                  background: p.bg,
                  border: `1.5px solid ${p.topBar}44`,
                  borderRadius: 18,
                  overflow: "hidden",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  boxShadow: `0 2px 10px ${p.topBar}15`,
                }}
              >
                {/* ── Coloured top stripe ── */}
                <div style={{
                  height: 6,
                  background: `linear-gradient(90deg, ${p.topBar} 0%, ${p.topBar}77 100%)`,
                }} />

                <div style={{ padding:"20px 22px 18px" }}>

                  {/* Row 1: number + tag + amount */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:13, flexWrap:"wrap", gap:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      {/* Circle number */}
                      <div style={{
                        width:30, height:30, borderRadius:"50%",
                        background: p.numBg,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:12, fontWeight:800, color:"#fff",
                        flexShrink:0, boxShadow:`0 2px 8px ${p.topBar}50`,
                      }}>
                        {i + 1}
                      </div>
                      {/* Tag pill */}
                      <span style={{
                        fontSize:11, padding:"3px 11px", borderRadius:20,
                        fontWeight:700, background:p.tagBg, color:p.tagText,
                        border:`1px solid ${p.topBar}25`,
                        letterSpacing:0.2,
                      }}>
                        {s.tag}
                      </span>
                    </div>
                    {/* Amount chip */}
                    <span style={{
                      fontSize:12, padding:"4px 12px", borderRadius:9,
                      fontWeight:700, background: p.bg,
                      color: p.accentText,
                      border:`1.5px solid ${p.topBar}40`,
                    }}>
                      💰 {s.amount}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize:15.5, fontWeight:800, color: p.accentText, marginBottom:9, letterSpacing:"-0.25px", lineHeight:1.4 }}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize:13.5, color: p.accentText, lineHeight:1.72, marginBottom:16, opacity: 0.85 }}>
                    {s.desc}
                  </p>

                  {/* Divider */}
                  <div style={{ height:1.5, background:`linear-gradient(90deg, ${p.topBar}80, ${p.topBar}20, transparent)`, marginBottom:14 }} />

                  {/* Row 2: level chip + apply button */}
                  <div className="cp-card-bottom" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                    <span style={{
                      fontSize:12.5, fontWeight:700,
                      background: p.bg, color:p.accentText,
                      padding:"5px 13px", borderRadius:9,
                      border:`1.5px solid ${p.topBar}35`,
                    }}>
                      🎓 {s.level}
                    </span>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-apply"
                      style={{
                        fontSize:13, textDecoration:"none",
                        padding:"9px 22px", borderRadius:11,
                        fontWeight:700, color:"#fff",
                        background: p.btnBg,
                        boxShadow:`0 3px 12px ${p.topBar}40`,
                        transition:"opacity 0.15s, transform 0.15s",
                        display:"inline-flex", alignItems:"center", gap:6,
                        fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
                      }}
                    >
                      Apply / Learn more ↗
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
