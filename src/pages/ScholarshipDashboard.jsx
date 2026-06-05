import { useState, useEffect } from "react";
import { GraduationCap, Search, Bookmark, BookmarkCheck, ExternalLink, ChevronDown, Star, Users } from "lucide-react";

/* ─── Scholarship Data ────────────────────────────────────────── */
const SCHOLARSHIPS = [
  // NATIONAL
  { id:1,  category:"National", org:"Equity Group Foundation",              title:"Wings to Fly Secondary Scholarship",                desc:"Full secondary school sponsorship for top KCPE performers from financially disadvantaged backgrounds across all 47 counties.",                                                                                  coverage:"Tuition, boarding, uniform, books, pocket money",  level:"Secondary",            url:"https://equitygroupfoundation.com/wings-to-fly/",                                                                                    accent:"#0f6e56", bg:"#e1f5ee", tag:"Fully Funded"  },
  { id:2,  category:"National", org:"HELB",                                 title:"Higher Education Fund (HEF)",                       desc:"Government loans and bursaries for students in universities and TVET institutions — the primary national higher education funding body.",                                                                     coverage:"Tuition + upkeep allowance",                       level:"University / TVET",    url:"https://www.helb.co.ke/",                                                                                                             accent:"#185fa5", bg:"#e6f1fb", tag:"Government"    },
  { id:3,  category:"National", org:"NG-CDF",                               title:"National Government Bursary Fund",                  desc:"Constituency-level bursaries for primary, secondary, TVET and university students. Available via your local MP's office in all 290 constituencies.",                                                             coverage:"Partial – varies by constituency",                 level:"All levels",            url:"https://ngcdf.go.ke/",                                                                                                                accent:"#854f0b", bg:"#faeeda", tag:"Government"    },
  { id:4,  category:"National", org:"KCB Foundation",                       title:"KCB Scholars Programme",                            desc:"Full secondary school scholarships to academically gifted students from economically disadvantaged backgrounds, including special needs students.",                                                              coverage:"Full 4-year secondary sponsorship",                level:"Secondary",            url:"https://foundation.kcbgroup.com/programs/scholarships/",                                                                              accent:"#993556", bg:"#fbeaf0", tag:"Fully Funded"  },
  { id:5,  category:"National", org:"Mpesa Foundation",                     title:"Mpesa Foundation Academy Scholarship",              desc:"Scholarships to the prestigious Mpesa Foundation Academy for academically outstanding yet financially needy students from across Kenya.",                                                                       coverage:"Full boarding school education",                   level:"Secondary",            url:"https://mpesafoundationacademy.ac.ke/our-admissions/",                                                                                accent:"#3b6d11", bg:"#eaf3de", tag:"Fully Funded"  },
  { id:6,  category:"National", org:"Vision 2030 / Government",             title:"Presidential Scholarship (Kenya)",                  desc:"State House-administered scholarships for top KCSE performers to study at universities both locally and internationally.",                                                                                      coverage:"Tuition + living expenses",                        level:"University",            url:"https://www.education.go.ke/",                                                                                                        accent:"#533147", bg:"#fbeaf0", tag:"Merit-Based"   },
  { id:22, category:"National", org:"Uwezo Fund",                           title:"Uwezo Fund Youth Education Grant",                  desc:"Government fund supporting youth and women groups including secondary and tertiary education expenses for deserving students across Kenya.",                                                                    coverage:"Partial education grant",                          level:"Secondary / University",url:"https://uwezo.go.ke/",                                                                                                                accent:"#0f6e56", bg:"#e1f5ee", tag:"Government"    },
  { id:23, category:"National", org:"CDF Bursary Committees",               title:"County Assembly Ward Bursary",                      desc:"Ward-level bursaries disbursed through County Assembly members to support students from financially needy households in all 47 counties.",                                                                     coverage:"Partial fees support",                             level:"All levels",            url:"https://www.cra.go.ke/",                                                                                                              accent:"#185fa5", bg:"#e6f1fb", tag:"Government"    },
  { id:24, category:"National", org:"Jomo Kenyatta University (JKUAT)",     title:"JKUAT Academic Excellence Scholarship",             desc:"Merit scholarships awarded to top-performing students admitted to JKUAT for undergraduate programmes in science, technology and engineering.",                                                                   coverage:"50–100% tuition waiver",                           level:"University",            url:"https://www.jkuat.ac.ke/",                                                                                                            accent:"#854f0b", bg:"#faeeda", tag:"Merit-Based"   },
  { id:25, category:"National", org:"University of Nairobi",                title:"UoN Vice-Chancellor's Scholarship",                 desc:"Highly competitive scholarship granted by the University of Nairobi to academically excellent students from disadvantaged socio-economic backgrounds.",                                                                coverage:"Full tuition for undergraduate study",             level:"University",            url:"https://www.uonbi.ac.ke/",                                                                                                            accent:"#993556", bg:"#fbeaf0", tag:"Fully Funded"  },
  { id:26, category:"National", org:"Kenya Airways / KQ Foundation",        title:"KQ Aviation Scholarship",                           desc:"Kenya Airways Foundation sponsors talented Kenyan students for aviation, aerospace engineering and hospitality management at accredited institutions.",                                                               coverage:"Tuition + stipend",                                level:"University / TVET",    url:"https://www.kenya-airways.com/en-ke/about-us/corporate-social-responsibility/",                                                       accent:"#3b6d11", bg:"#eaf3de", tag:"Corporate"     },
  { id:27, category:"National", org:"Stanbic Bank Kenya Foundation",        title:"Stanbic Foundation University Scholarship",         desc:"Annual scholarships for financially disadvantaged students with strong academic records, pursuing business, finance or STEM degrees at Kenyan universities.",                                                        coverage:"Full tuition + mentorship",                        level:"University",            url:"https://www.stanbicbank.co.ke/kenya/Personal/ways-to-bank/stanbic-foundation",                                                        accent:"#533147", bg:"#fbeaf0", tag:"Corporate"     },

  // GIRLS
  { id:7,  category:"Girls",    org:"Zawadi Africa",                        title:"Zawadi Africa Girls Scholarship",                   desc:"Scholarships for high-achieving Kenyan girls from low-income backgrounds, including mentorship and leadership development programmes.",                                                                          coverage:"Full secondary sponsorship",                       level:"Secondary",            url:"https://www.zawadiafrica.org/apply-now/",                                                                                             accent:"#d4537e", bg:"#fbeaf0", tag:"Girls Only"    },
  { id:8,  category:"Girls",    org:"FAWE Kenya",                           title:"FAWE Girls Scholarship",                            desc:"FAWE Kenya supports girls' access to quality education through bursaries, mentorship and girls-friendly school programmes across the country.",                                                                    coverage:"Bursary + mentorship",                             level:"Secondary / University",url:"https://fawe.or.ke/",                                                                                                                 accent:"#7c3aed", bg:"#faf5ff", tag:"Girls Only"    },
  { id:9,  category:"Girls",    org:"African Women in Technology (AWIT)",   title:"AWIT STEM Scholarship for Girls",                   desc:"Targets girls pursuing STEM courses at university level in Kenya, aiming to bridge the gender gap in technology and engineering fields.",                                                                       coverage:"Partial tuition support",                          level:"University (STEM)",    url:"https://www.awitkenya.org/",                                                                                                          accent:"#0f6e56", bg:"#e1f5ee", tag:"Girls Only"    },
  { id:10, category:"Girls",    org:"Google.org / Andela",                  title:"Generation Google Scholarship (Africa)",            desc:"For women pursuing computer science or related technical degrees at African universities. Includes a summit and mentorship.",                                                                                    coverage:"USD 1,000 award + summit",                         level:"University",            url:"https://buildyourfuture.withgoogle.com/scholarships",                                                                                 accent:"#185fa5", bg:"#e6f1fb", tag:"Girls / STEM" },
  { id:11, category:"Girls",    org:"Mastercard Foundation (via USIU-Africa)",title:"Mastercard Foundation Scholars – Girls in Tech", desc:"Full scholarship for academically gifted but economically disadvantaged young women at USIU-Africa to study technology-related degrees.",                                                                      coverage:"Fully funded university education",                level:"University",            url:"https://www.usiu.ac.ke/mastercard-foundation-scholars-program/",                                                                      accent:"#c2410c", bg:"#fff7ed", tag:"Fully Funded"  },
  { id:28, category:"Girls",    org:"Ufadhili Trust Kenya",                 title:"Ufadhili Girls Education Scholarship",              desc:"Ufadhili Trust mobilises funds to support girls from marginalised communities in completing secondary education and transitioning to tertiary.",                                                               coverage:"Secondary fees + mentorship",                      level:"Secondary",            url:"https://www.ufadhilitrust.org/",                                                                                                      accent:"#d4537e", bg:"#fbeaf0", tag:"Girls Only"    },
  { id:29, category:"Girls",    org:"Elimu Scholarship Fund",               title:"Elimu Girls Science Bursary",                       desc:"Targets girls showing exceptional aptitude in sciences and mathematics at secondary level, with a pathway to STEM university enrolment.",                                                                         coverage:"Partial tuition + science materials",              level:"Secondary",            url:"https://elimufund.org/",                                                                                                              accent:"#7c3aed", bg:"#faf5ff", tag:"Girls / STEM" },
  { id:30, category:"Girls",    org:"African Development Bank (AfDB)",      title:"AfDB Women in STEM Higher Education Award",         desc:"Competitive award for female African students pursuing postgraduate STEM education, with priority for applicants from Kenya and East Africa.",                                                                  coverage:"USD 5,000–10,000 grant",                           level:"Postgraduate",          url:"https://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/african-development-fund/scholarships",                           accent:"#185fa5", bg:"#e6f1fb", tag:"Girls / STEM" },
  { id:31, category:"Girls",    org:"Plan International Kenya",             title:"Plan International Girls' Scholarship",             desc:"Plan International Kenya offers education grants to girls facing barriers such as early marriage, poverty, and geographic remoteness from school.",                                                               coverage:"Full secondary fees + sanitary support",           level:"Secondary",            url:"https://plan-international.org/kenya/",                                                                                               accent:"#c2410c", bg:"#fff7ed", tag:"Girls Only"    },
  { id:32, category:"Girls",    org:"Equity Bank / Equity Wings",           title:"Equity Wings to Fly — Girls Track",                 desc:"A dedicated track within the Wings to Fly programme prioritising girls from arid and semi-arid lands (ASALs) and historically marginalised communities.",                                                        coverage:"Full secondary sponsorship",                       level:"Secondary",            url:"https://equitygroupfoundation.com/wings-to-fly/",                                                                                    accent:"#0f6e56", bg:"#e1f5ee", tag:"Fully Funded"  },

  // NGO
  { id:12, category:"NGO",      org:"Aga Khan Foundation",                  title:"Aga Khan Foundation International Scholarship",     desc:"Postgraduate scholarships for outstanding students from developing countries, including Kenya, who have no other means of funding.",                                                                          coverage:"50% grant + 50% loan",                             level:"Postgraduate",          url:"https://the.akdn/en/what-we-do/developing-human-capacity/education/international-scholarships",                                       accent:"#854f0b", bg:"#faeeda", tag:"Postgraduate"  },
  { id:13, category:"NGO",      org:"ActionAid Kenya",                      title:"ActionAid Kenya Education Grant",                   desc:"ActionAid supports marginalised communities in Kenya with education grants, particularly targeting girls and youth from slum areas.",                                                                       coverage:"Partial grants",                                   level:"Secondary / University",url:"https://www.actionaid.org/kenya/",                                                                                                    accent:"#993556", bg:"#fbeaf0", tag:"NGO"           },
  { id:14, category:"NGO",      org:"Omondi Educational Foundation",        title:"OEF Community Scholarship",                         desc:"Grassroots NGO offering scholarships to bright students from Kibera, Mathare and other Nairobi informal settlements.",                                                                                       coverage:"Full secondary sponsorship",                       level:"Secondary",            url:"https://www.oef.or.ke/",                                                                                                              accent:"#0f6e56", bg:"#e1f5ee", tag:"NGO"           },
  { id:15, category:"NGO",      org:"GreenLight Project Kenya",             title:"GreenLight Bursary",                                desc:"Supports students from marginalised communities in Rift Valley and Western Kenya through full secondary school bursaries.",                                                                                coverage:"Full bursary",                                     level:"Secondary",            url:"https://greenlightproject.org/",                                                                                                      accent:"#3b6d11", bg:"#eaf3de", tag:"NGO"           },
  { id:16, category:"NGO",      org:"Segal Family Foundation",              title:"Segal Family Foundation Scholarship",               desc:"Funds higher education for exceptional young Africans from low-income families who demonstrate leadership and community service.",                                                                          coverage:"University tuition",                               level:"University",            url:"https://www.segalfamilyfoundation.org/",                                                                                              accent:"#185fa5", bg:"#e6f1fb", tag:"NGO"           },
  { id:33, category:"NGO",      org:"Rockefeller Foundation (via APHRC)",   title:"APHRC Research Scholarship",                        desc:"The African Population and Health Research Center offers scholarships for postgraduate students pursuing public health and population research in Kenya.",                                                        coverage:"Full postgraduate funding",                        level:"Postgraduate",          url:"https://aphrc.org/",                                                                                                                  accent:"#854f0b", bg:"#faeeda", tag:"Postgraduate"  },
  { id:34, category:"NGO",      org:"Ford Foundation (Africa Office)",      title:"Ford Foundation International Fellowships",         desc:"Fellowships for exceptional individuals from marginalised communities in Kenya to pursue postgraduate study that addresses social justice.",                                                                    coverage:"Full funding including travel",                    level:"Postgraduate",          url:"https://www.fordfoundation.org/work/investing-in-individuals/",                                                                       accent:"#993556", bg:"#fbeaf0", tag:"Postgraduate"  },
  { id:35, category:"NGO",      org:"One Acre Fund",                        title:"One Acre Fund Scholarship for Rural Youth",         desc:"One Acre Fund supports rural Kenyan youth in agricultural counties with scholarships for secondary and vocational education linked to agri-enterprise.",                                                       coverage:"Secondary fees + livelihood support",              level:"Secondary / TVET",     url:"https://oneacrefund.org/",                                                                                                            accent:"#3b6d11", bg:"#eaf3de", tag:"NGO"           },
  { id:36, category:"NGO",      org:"Dignitas Project Kenya",               title:"Dignitas Education Scholarship",                    desc:"Dignitas Project works in Mathare and informal settlements to provide scholarships and school improvement grants to students in urban poverty.",                                                              coverage:"Full secondary tuition",                           level:"Secondary",            url:"https://dignitas-project.org/",                                                                                                       accent:"#185fa5", bg:"#e6f1fb", tag:"NGO"           },
  { id:37, category:"NGO",      org:"Sponsor A Child Kenya (SAC)",          title:"SAC Child Sponsorship Programme",                   desc:"SAC connects Kenyan children from poor backgrounds with international sponsors to fund their education from primary through secondary school.",                                                                coverage:"Primary and secondary school fees",                level:"Secondary",            url:"https://www.sponsorachild.co.ke/",                                                                                                    accent:"#d4537e", bg:"#fbeaf0", tag:"NGO"           },
  { id:38, category:"NGO",      org:"Centurion Foundation Kenya",           title:"Centurion Community Education Grant",               desc:"Provides education bursaries to orphans and vulnerable children in Nakuru, Kisumu and Mombasa counties who demonstrate academic potential.",                                                                   coverage:"Partial–full secondary fees",                      level:"Secondary",            url:"https://centurionfoundation.or.ke/",                                                                                                  accent:"#854f0b", bg:"#faeeda", tag:"NGO"           },
  { id:39, category:"NGO",      org:"Amref Health Africa",                  title:"Amref Health Scholars Programme",                   desc:"Amref offers scholarships for Kenyan students pursuing health sciences degrees, with preference for candidates from underserved rural communities.",                                                          coverage:"Tuition + placement support",                      level:"University",            url:"https://amref.org/",                                                                                                                  accent:"#0f6e56", bg:"#e1f5ee", tag:"NGO"           },
  { id:40, category:"NGO",      org:"Kenya Community Development Foundation (KCDF)", title:"KCDF Youth Education Bursary",             desc:"KCDF disburses bursaries to youth from low-income communities across Kenya, supporting both secondary and tertiary education.",                                                                               coverage:"Partial bursary",                                  level:"Secondary / University",url:"https://www.kcdf.or.ke/",                                                                                                             accent:"#7c3aed", bg:"#faf5ff", tag:"NGO"           },

  // STEP
  { id:17, category:"STEP",     org:"KCB Foundation / Mastercard Foundation",title:"2Jiajiri Vocational Scholarship",                 desc:"Skills and enterprise development scholarships for Kenyan youth at TVET institutions nationwide. Covers hospitality, construction, ICT and more.",                                                              coverage:"Full TVET training costs",                         level:"TVET / Vocational",    url:"https://foundation.kcbgroup.com/programs/",                                                                                           accent:"#854f0b", bg:"#faeeda", tag:"Vocational"    },
  { id:18, category:"STEP",     org:"NITA Kenya",                           title:"NITA Apprenticeship Programme",                     desc:"National Industrial Training Authority partners with industries to offer fully-funded apprenticeships and skills training for Kenyan youth.",                                                                  coverage:"Stipend + training",                               level:"TVET / Apprenticeship",url:"https://www.nita.go.ke/",                                                                                                             accent:"#0f6e56", bg:"#e1f5ee", tag:"Government"    },
  { id:19, category:"STEP",     org:"Strathmore University",                title:"Strathmore @ School Programme",                     desc:"Supports disadvantaged secondary students in Nairobi with scholarships to quality secondary education, preparing them for university.",                                                                    coverage:"Partial – secondary fees",                         level:"Secondary",            url:"https://www.strathmore.edu/admissions/scholarships/",                                                                                 accent:"#d4537e", bg:"#fbeaf0", tag:"Merit + Need"  },
  { id:20, category:"STEP",     org:"Technical University of Kenya (TUK)",  title:"TUK Needy Student Bursary",                         desc:"Government-sponsored bursaries for financially needy students at the Technical University of Kenya pursuing technical and applied science degrees.",                                                          coverage:"Partial tuition",                                  level:"University (Technical)",url:"https://www.tuk.ac.ke/",                                                                                                              accent:"#185fa5", bg:"#e6f1fb", tag:"Government"    },
  { id:21, category:"STEP",     org:"Safaricom / Mastercard Foundation",    title:"Safaricom Scholarship Programme",                   desc:"Safaricom and Mastercard Foundation partner to offer scholarships to economically disadvantaged students at Kenyan universities, with mentorship.",                                                              coverage:"Full university education",                        level:"University",            url:"https://www.safaricomfoundation.org/",                                                                                                accent:"#3b6d11", bg:"#eaf3de", tag:"Corporate"     },
  { id:41, category:"STEP",     org:"Kenya Power Foundation",               title:"Kenya Power STEM Bursary",                          desc:"Kenya Power offers bursaries for students enrolled in electrical engineering, power systems and related TVET and university programmes.",                                                                       coverage:"Tuition + internship placement",                   level:"University / TVET",    url:"https://www.kplc.co.ke/",                                                                                                             accent:"#854f0b", bg:"#faeeda", tag:"Corporate"     },
  { id:42, category:"STEP",     org:"Chandaria Foundation",                 title:"Chandaria Foundation Merit Scholarship",            desc:"The Chandaria Foundation awards merit-based scholarships to high-achieving Kenyan students at leading local universities, especially in business and ICT.",                                                    coverage:"Partial–full tuition",                             level:"University",            url:"https://chandariafoundation.org/",                                                                                                    accent:"#993556", bg:"#fbeaf0", tag:"Merit-Based"   },
  { id:43, category:"STEP",     org:"Equity Afia / Equity Bank",            title:"Equity Bank Health Sciences Bursary",               desc:"Targeting students in nursing, clinical medicine, pharmacy and public health at Kenyan universities and colleges.",                                                                                          coverage:"Tuition + uniform allowance",                      level:"University / TVET",    url:"https://equitygroupfoundation.com/",                                                                                                  accent:"#0f6e56", bg:"#e1f5ee", tag:"Corporate"     },
  { id:44, category:"STEP",     org:"Cooperative University of Kenya",      title:"Co-operative University Bursary Fund",              desc:"Need-based bursaries for students at the Cooperative University of Kenya, targeting students from cooperative movement families and rural areas.",                                                            coverage:"Partial tuition bursary",                          level:"University",            url:"https://www.cuk.ac.ke/",                                                                                                              accent:"#185fa5", bg:"#e6f1fb", tag:"Government"    },
  { id:45, category:"STEP",     org:"Youth Enterprise Development Fund",    title:"YEDF Skills & Education Grant",                     desc:"Youth Enterprise Development Fund supports skills training and technical education for unemployed youth to boost employability and self-reliance.",                                                           coverage:"TVET training grant",                              level:"TVET / Vocational",    url:"https://www.youthfund.go.ke/",                                                                                                        accent:"#3b6d11", bg:"#eaf3de", tag:"Government"    },
  { id:46, category:"STEP",     org:"Absa Bank Kenya Foundation",           title:"Absa Kenya University Scholarship",                 desc:"Absa Foundation provides scholarships to economically disadvantaged students at Kenyan universities, focusing on finance, banking and business programmes.",                                                   coverage:"Full tuition support",                             level:"University",            url:"https://www.absa.co.ke/",                                                                                                             accent:"#d4537e", bg:"#fbeaf0", tag:"Corporate"     },
  { id:47, category:"STEP",     org:"KEPSA Foundation",                     title:"KEPSA Private Sector Scholarship",                  desc:"Kenya Private Sector Alliance channels corporate CSR into scholarships for university students pursuing industry-relevant degrees in 47 counties.",                                                            coverage:"Partial–full tuition",                             level:"University",            url:"https://kepsa.or.ke/",                                                                                                                accent:"#854f0b", bg:"#faeeda", tag:"Corporate"     },
  { id:48, category:"STEP",     org:"Moi University",                       title:"Moi University Need-Based Scholarship",             desc:"Moi University's internal bursary programme targets students who score highly at KCSE but cannot afford fees, especially from North Rift counties.",                                                          coverage:"Partial tuition waiver",                           level:"University",            url:"https://www.mu.ac.ke/",                                                                                                               accent:"#7c3aed", bg:"#faf5ff", tag:"Merit + Need"  },
  { id:49, category:"STEP",     org:"ICT Authority Kenya",                  title:"Digital Skills Scholarship (ICT Authority)",        desc:"Kenya's ICT Authority funds short TVET and university programmes in software development, data science and cybersecurity for Kenyan youth.",                                                                  coverage:"Full course fees",                                 level:"TVET / Vocational",    url:"https://www.icta.go.ke/",                                                                                                             accent:"#185fa5", bg:"#e6f1fb", tag:"Government"    },
  { id:50, category:"STEP",     org:"East African Portland Cement",         title:"EAPC Technical Scholarship",                        desc:"East African Portland Cement sponsors students in civil engineering, construction management and related technical programmes at Kenyan institutions.",                                                         coverage:"Tuition + industrial attachment",                  level:"University / TVET",    url:"https://www.eapcc.co.ke/",                                                                                                            accent:"#993556", bg:"#fbeaf0", tag:"Corporate"     },
  { id:51, category:"STEP",     org:"Mastercard Foundation Scholars (Kenyatta University)", title:"Mastercard Foundation Scholars – KU", desc:"Full scholarships for academically talented but economically disadvantaged students at Kenyatta University, including leadership and career development.", coverage:"Fully funded degree + mentorship",                 level:"University",            url:"https://kufoundation.ku.ac.ke/scholarships/",                                                                                         accent:"#3b6d11", bg:"#eaf3de", tag:"Fully Funded"  },
];

const CATEGORIES = ["All", "National", "Girls", "NGO", "STEP"];
const LEVELS = ["All Levels", "Secondary", "University", "TVET / Vocational", "Postgraduate"];

function ScholarCard({ s, saved, onSave }) {
  return (
    <div style={{
      background: "#fff",
      border: `1.5px solid ${s.accent}22`,
      borderRadius: 18,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.18s, box-shadow 0.18s",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${s.accent}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ background: s.bg, padding: "18px 18px 14px", borderBottom: `1px solid ${s.accent}18` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
          <span style={{
            background: s.accent, color: "#fff",
            fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6,
            padding: "3px 10px", borderRadius: 20, textTransform: "uppercase",
            flexShrink: 0,
          }}>{s.tag}</span>
          <button onClick={() => onSave(s.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: saved ? s.accent : "#cbd5e1", padding: 0, lineHeight: 1,
            transition: "color 0.15s, transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
            aria-label={saved ? "Remove bookmark" : "Bookmark scholarship"}
          >
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, color: s.accent, letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 4 }}>{s.org}</p>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px", lineHeight: 1.3 }}>{s.title}</h3>
      </div>

      <div style={{ padding: "14px 18px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Star size={12} color={s.accent} />
            <span style={{ fontSize: 12, color: "#64748b" }}><b style={{ color: "#1e293b" }}>Coverage:</b> {s.coverage}</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Users size={12} color={s.accent} />
            <span style={{ fontSize: 12, color: "#64748b" }}><b style={{ color: "#1e293b" }}>Level:</b> {s.level}</span>
          </div>
        </div>
        <a href={s.url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          height: 38, borderRadius: 10,
          background: `${s.accent}14`,
          color: s.accent, fontWeight: 700, fontSize: 13,
          textDecoration: "none", marginTop: 4,
          border: `1.5px solid ${s.accent}30`,
          transition: "background 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = `${s.accent}24`}
          onMouseLeave={e => e.currentTarget.style.background = `${s.accent}14`}
        >
          Apply Now <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

export default function ScholarshipDashboard() {
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(new Set());
  const [showSaved, setShowSaved] = useState(false);



  const toggleSave = (id) => setSaved(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchCat = cat === "All" || s.category === cat;
    const matchLevel = level === "All Levels" || s.level.includes(level.replace(" / Vocational","").replace(" / Apprenticeship",""));
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    const matchSaved = !showSaved || saved.has(s.id);
    return matchCat && matchLevel && matchSearch && matchSaved;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#0f172a;min-height:100vh}
        .sd-nav{background:#fff;border-bottom:1px solid #e8edf5;padding:0 24px;height:64px;display:flex;align-items:center;position:sticky;top:0;z-index:99;box-shadow:0 2px 12px rgba(15,23,42,0.06)}
        .sd-nav-inner{max-width:1200px;margin:0 auto;width:100%;display:flex;align-items:center;gap:0}
        .sd-logo{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;margin-right:auto}
        .sd-logo-icon{width:34px;height:34px;background:linear-gradient(135deg,#1a56db,#1244b8);border-radius:9px;display:flex;align-items:center;justify-content:center}
        .sd-logo-text{font-size:18px;font-weight:800;color:#0f172a}
        .sd-logo-text span{color:#1a56db}
        .sd-nav-right{display:flex;align-items:center;gap:10px}
        .sd-icon-btn{width:38px;height:38px;border-radius:9px;border:1px solid #e2e8f0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#475569;position:relative;transition:background 0.13s}
        .sd-icon-btn:hover{background:#f1f5f9}
        .sd-badge{position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;background:#ef4444;border:2px solid #fff}
        .sd-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#1a56db,#7c3aed);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;font-weight:700;color:#fff}
        .sd-hero{background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);padding:48px 24px 60px;text-align:center;position:relative;overflow:hidden}
        .sd-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(26,86,219,0.3) 0%,transparent 70%);}
        .sd-hero-inner{position:relative;max-width:700px;margin:0 auto}
        .sd-hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.9);font-size:12px;font-weight:600;padding:5px 14px;border-radius:20px;margin-bottom:16px;border:1px solid rgba(255,255,255,0.2)}
        .sd-hero h1{font-size:clamp(26px,4vw,42px);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:12px;line-height:1.15}
        .sd-hero h1 span{color:#60a5fa}
        .sd-hero p{font-size:16px;color:rgba(255,255,255,0.75);line-height:1.65;margin-bottom:28px}
        .sd-stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap}
        .sd-stat{text-align:center}
        .sd-stat-num{font-size:28px;font-weight:800;color:#fff}
        .sd-stat-label{font-size:12px;color:rgba(255,255,255,0.6);font-weight:500}
        .sd-body{max-width:1200px;margin:0 auto;padding:32px 24px 80px}
        .sd-search-bar{background:#fff;border-radius:16px;padding:20px;border:1px solid #e8edf5;margin-bottom:20px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;box-shadow:0 2px 12px rgba(15,23,42,0.05)}
        .sd-search-wrap{flex:1;min-width:200px;position:relative}
        .sd-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#94a3b8}
        .sd-search-input{width:100%;height:42px;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 14px 0 38px;font-size:14px;color:#0f172a;font-family:inherit;background:#fafafa;outline:none;transition:border-color 0.15s}
        .sd-search-input:focus{border-color:#1a56db;background:#fff}
        .sd-select{height:42px;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 32px 0 12px;font-size:13.5px;color:#374151;font-family:inherit;background:#fafafa;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;min-width:140px;transition:border-color 0.15s}
        .sd-select:focus{border-color:#1a56db}
        .sd-cats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
        .sd-cat{height:36px;padding:0 16px;border-radius:20px;border:1.5px solid #e2e8f0;background:#fff;font-size:13px;font-weight:600;color:#475569;cursor:pointer;transition:all 0.13s;font-family:inherit;white-space:nowrap}
        .sd-cat:hover{border-color:#93c5fd;color:#1a56db}
        .sd-cat.active{background:#1a56db;border-color:#1a56db;color:#fff}
        .sd-results-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}
        .sd-results-count{font-size:14px;color:#64748b;font-weight:500}
        .sd-saved-toggle{display:flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-radius:8px;border:1.5px solid #e2e8f0;background:#fff;font-size:13px;font-weight:600;color:#475569;cursor:pointer;transition:all 0.13s;font-family:inherit}
        .sd-saved-toggle:hover{border-color:#93c5fd;color:#1a56db}
        .sd-saved-toggle.active{background:#eff6ff;border-color:#93c5fd;color:#1a56db}
        .sd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
        .sd-empty{text-align:center;padding:60px 20px;color:#94a3b8;font-size:15px}
        .sd-empty-icon{font-size:48px;margin-bottom:12px}
        @media(max-width:640px){.sd-body{padding:24px 16px 60px}.sd-stats{gap:20px}.sd-stat-num{font-size:22px}}
      `}</style>

      <nav className="sd-nav">
        <div className="sd-nav-inner">
          <a className="sd-logo" href="#">
            <div className="sd-logo-icon"><GraduationCap size={18} color="#fff" strokeWidth={2.5} /></div>
            <span className="sd-logo-text">Kenya<span>Scholar</span></span>
          </a>
          <div className="sd-nav-right">
          </div>
        </div>
      </nav>

      <div className="sd-hero">
        <div className="sd-hero-inner">
          <div className="sd-hero-badge">
            <GraduationCap size={13} /> Welcome
          </div>
          <h1>Your <span>Scholarship</span><br />Dashboard</h1>
          <p>Browse {SCHOLARSHIPS.length}+ curated opportunities for Kenyan students — organised by category, bookmarkable, and always up to date.</p>
          <div className="sd-stats">
            <div className="sd-stat"><div className="sd-stat-num">{SCHOLARSHIPS.length}+</div><div className="sd-stat-label">Active Scholarships</div></div>
            <div className="sd-stat"><div className="sd-stat-num">5</div><div className="sd-stat-label">Categories</div></div>
            <div className="sd-stat"><div className="sd-stat-num">{saved.size}</div><div className="sd-stat-label">Bookmarked</div></div>
          </div>
        </div>
      </div>

      <div className="sd-body">
        <div className="sd-search-bar">
          <div className="sd-search-wrap">
            <span className="sd-search-icon"><Search size={15} /></span>
            <input className="sd-search-input" type="text" placeholder="Search scholarships, organisations…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ position: "relative" }}>
            <select className="sd-select" value={level} onChange={e => setLevel(e.target.value)}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#94a3b8" }} />
          </div>
        </div>

        <div className="sd-cats">
          {CATEGORIES.map(c => (
            <button key={c} className={`sd-cat${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>
              {c === "All" ? "All Scholarships" : c === "Girls" ? "👩 Girls" : c === "NGO" ? "🤝 NGO" : c === "STEP" ? "🎓 TVET / STEP" : "🇰🇪 National"}
            </button>
          ))}
        </div>

        <div className="sd-results-bar">
          <p className="sd-results-count">{filtered.length} scholarship{filtered.length !== 1 ? "s" : ""} found</p>
          <button className={`sd-saved-toggle${showSaved ? " active" : ""}`} onClick={() => setShowSaved(!showSaved)}>
            <Bookmark size={13} /> {showSaved ? "Showing saved" : "Show saved only"} {saved.size > 0 && `(${saved.size})`}
          </button>
        </div>

        {filtered.length > 0 ? (
          <div className="sd-grid">
            {filtered.map(s => <ScholarCard key={s.id} s={s} saved={saved.has(s.id)} onSave={toggleSave} />)}
          </div>
        ) : (
          <div className="sd-empty">
            <div className="sd-empty-icon">🔍</div>
            <p>No scholarships match your filters.<br />Try adjusting the category or search term.</p>
          </div>
        )}
      </div>

      <footer style={{ background:"#0f172a", padding:"40px 24px", textAlign:"center" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:12 }}>
          <div style={{ width:30, height:30, background:"linear-gradient(135deg,#1a56db,#1244b8)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <GraduationCap size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize:16, fontWeight:800, color:"#fff", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>Kenya<span style={{ color:"#60a5fa" }}>Scholar</span></span>
        </div>
        <p style={{ fontSize:13, color:"#64748b", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>Empowering Kenyan students to find and secure scholarship funding. © {new Date().getFullYear()} KenyaScholar. All rights reserved.</p>
      </footer>
    </>
  );
}
