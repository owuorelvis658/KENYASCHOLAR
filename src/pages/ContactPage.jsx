import { useState } from "react";
import { GraduationCap, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, BookOpen, CheckCircle } from "lucide-react";

const FAQS = [
  { q: "Who is eligible for scholarships listed on KenyaScholar?", a: "Eligibility varies by scholarship. Most are open to Kenyan citizens enrolled in or planning to enroll in accredited institutions. Each listing specifies its own criteria including academic performance, financial need, and field of study." },
  { q: "Is KenyaScholar free to use?", a: "Yes — creating an account and browsing all scholarship listings is completely free. We believe every Kenyan student deserves access to information about funding opportunities." },
  { q: "How do I apply for a scholarship?", a: "Click on any scholarship card to be directed to the official application page of that organisation. KenyaScholar is a discovery platform; actual applications are submitted directly to the awarding body." },
  { q: "How often are new scholarships added?", a: "We update listings regularly, typically every week. Enable notifications in your profile to get alerted when new scholarships matching your criteria are posted." },
  { q: "Can I save scholarships to apply later?", a: "Yes — once logged in you can bookmark any scholarship to your personal dashboard and set a deadline reminder before the closing date." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;background:#f8fafc;color:#0f172a}
        .cp-nav{background:#fff;border-bottom:1px solid #e8edf5;padding:0 24px;height:64px;display:flex;align-items:center;position:sticky;top:0;z-index:99}
        .cp-nav-inner{max-width:1100px;margin:0 auto;width:100%;display:flex;align-items:center;gap:10px}
        .cp-logo-icon{width:34px;height:34px;background:linear-gradient(135deg,#1a56db,#1244b8);border-radius:9px;display:flex;align-items:center;justify-content:center}
        .cp-logo-text{font-size:18px;font-weight:800;color:#0f172a}
        .cp-logo-text span{color:#1a56db}
        .cp-hero{background:linear-gradient(135deg,#1a56db 0%,#0f3fa8 100%);padding:72px 24px 80px;text-align:center}
        .cp-hero h1{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:14px}
        .cp-hero p{font-size:17px;color:rgba(255,255,255,0.82);max-width:520px;margin:0 auto;line-height:1.65}
        .cp-body{max-width:1100px;margin:0 auto;padding:56px 24px 80px}
        .cp-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:40px;align-items:start;margin-bottom:72px}
        @media(max-width:768px){.cp-grid{grid-template-columns:1fr}}
        .cp-info h2{font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.4px;margin-bottom:8px}
        .cp-info-sub{font-size:14px;color:#64748b;margin-bottom:28px;line-height:1.6}
        .cp-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px}
        .cp-contact-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .cp-contact-label{font-size:11.5px;font-weight:700;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:3px}
        .cp-contact-value{font-size:14.5px;color:#1e293b;font-weight:500}
        .cp-contact-note{font-size:12px;color:#94a3b8;margin-top:2px}
        .cp-social{display:flex;gap:10px;margin-top:28px}
        .cp-social-btn{width:40px;height:40px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#475569;transition:background 0.13s,border-color 0.13s,color 0.13s}
        .cp-social-btn:hover{background:#eff6ff;border-color:#93c5fd;color:#1a56db}
        .cp-form-card{background:#fff;border-radius:20px;border:1px solid #e8edf5;padding:32px;box-shadow:0 4px 24px rgba(15,23,42,0.06)}
        .cp-form-title{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:4px}
        .cp-form-sub{font-size:13px;color:#64748b;margin-bottom:24px}
        .cp-field{margin-bottom:16px}
        .cp-field label{display:block;font-size:12.5px;font-weight:600;color:#374151;margin-bottom:6px}
        .cp-input{width:100%;height:42px;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 14px;font-size:14px;color:#0f172a;font-family:inherit;background:#fafafa;outline:none;transition:border-color 0.15s,background 0.15s}
        .cp-input:focus{border-color:#1a56db;background:#fff}
        .cp-textarea{width:100%;height:120px;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 14px;font-size:14px;color:#0f172a;font-family:inherit;background:#fafafa;outline:none;resize:vertical;transition:border-color 0.15s;line-height:1.6}
        .cp-textarea:focus{border-color:#1a56db;background:#fff}
        .cp-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:480px){.cp-row{grid-template-columns:1fr}}
        .cp-btn{width:100%;height:46px;background:linear-gradient(135deg,#1a56db,#1244b8);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity 0.13s,transform 0.1s;font-family:inherit}
        .cp-btn:hover{opacity:0.9}
        .cp-btn:active{transform:scale(0.98)}
        .cp-success{background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center}
        .cp-success-icon{width:48px;height:48px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
        .cp-success h3{font-size:16px;font-weight:700;color:#166534;margin-bottom:6px}
        .cp-success p{font-size:13.5px;color:#15803d}
        .cp-faq{margin-bottom:72px}
        .cp-section-label{font-size:12px;font-weight:700;color:#1a56db;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
        .cp-section-title{font-size:clamp(22px,3vw,30px);font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:6px}
        .cp-section-sub{font-size:15px;color:#64748b;margin-bottom:32px;max-width:520px}
        .cp-faq-item{border:1px solid #e8edf5;border-radius:14px;background:#fff;margin-bottom:10px;overflow:hidden;transition:box-shadow 0.15s}
        .cp-faq-item:hover{box-shadow:0 2px 12px rgba(15,23,42,0.06)}
        .cp-faq-q{width:100%;padding:18px 20px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;font-size:14.5px;font-weight:600;color:#1e293b;text-align:left;font-family:inherit}
        .cp-faq-q svg{flex-shrink:0;color:#94a3b8;transition:transform 0.2s}
        .cp-faq-q.open svg{transform:rotate(45deg);color:#1a56db}
        .cp-faq-a{padding:0 20px 18px;font-size:14px;color:#475569;line-height:1.7}
        .cp-channels{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:72px}
        .cp-channel{background:#fff;border:1px solid #e8edf5;border-radius:16px;padding:24px 20px}
        .cp-channel-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
        .cp-channel h3{font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px}
        .cp-channel p{font-size:13px;color:#64748b;line-height:1.55}
        .cp-channel-badge{display:inline-block;margin-top:10px;font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:20px}
      `}</style>

      <nav className="cp-nav">
        <div className="cp-nav-inner">
          <div className="cp-logo-icon"><GraduationCap size={18} color="#fff" strokeWidth={2.5} /></div>
          <span className="cp-logo-text">Kenya<span>Scholar</span></span>
        </div>
      </nav>

      <div className="cp-hero">
        <h1>Get in Touch</h1>
        <p>Have a question about scholarships, your account, or a new listing? Our team is here to help Kenyan students every step of the way.</p>
      </div>

      <div className="cp-body">
        <div className="cp-channels">
          {[
            { Icon: MessageCircle, bg:"#eff6ff", color:"#1a56db", title:"Live Chat", desc:"Chat with our support team directly from your dashboard.", badge:"Mon–Fri, 8am–6pm", bbg:"#eff6ff", bc:"#1a56db" },
            { Icon: Mail, bg:"#f0fdf4", color:"#16a34a", title:"Email Support", desc:"Send us a message and we'll respond within 24 hours.", badge:"marshunter23@gmail.com", bbg:"#f0fdf4", bc:"#166534" },
            { Icon: HelpCircle, bg:"#faf5ff", color:"#7c3aed", title:"Help Centre", desc:"Browse articles and guides on finding and applying for scholarships.", badge:"Self-service 24/7", bbg:"#faf5ff", bc:"#6d28d9" },
            { Icon: BookOpen, bg:"#fff7ed", color:"#ea580c", title:"Scholarship Guide", desc:"Download our free PDF guide on applying for scholarships in Kenya.", badge:"Free download", bbg:"#fff7ed", bc:"#c2410c" },
          ].map(({ Icon, bg, color, title, desc, badge, bbg, bc }) => (
            <div className="cp-channel" key={title}>
              <div className="cp-channel-icon" style={{ background: bg, color }}><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="cp-channel-badge" style={{ background: bbg, color: bc }}>{badge}</span>
            </div>
          ))}
        </div>

        <div className="cp-grid">
          <div className="cp-info">
            <h2>Contact Information</h2>
            <p className="cp-info-sub">Reach out through any of the channels below. We're committed to supporting every Kenyan student on their scholarship journey.</p>
            {[
              { Icon: Mail, bg:"#eff6ff", color:"#1a56db", label:"Email", value:"marshunter23@gmail.com", note:"Response within 24 hours" },
              { Icon: Phone, bg:"#f0fdf4", color:"#16a34a", label:"Phone / WhatsApp", value:"+254 794 641 793", note:"Mon–Fri, 8:00 AM – 6:00 PM EAT" },
              { Icon: MapPin, bg:"#fff7ed", color:"#ea580c", label:"Location", value:"Westlands, Nairobi, Kenya", note:"Visits by appointment only" },
              { Icon: Clock, bg:"#faf5ff", color:"#7c3aed", label:"Office Hours", value:"Monday – Friday", note:"8:00 AM – 6:00 PM East Africa Time" },
            ].map(({ Icon, bg, color, label, value, note }) => (
              <div className="cp-contact-item" key={label}>
                <div className="cp-contact-icon" style={{ background: bg, color }}><Icon size={18} /></div>
                <div>
                  <p className="cp-contact-label">{label}</p>
                  <p className="cp-contact-value">{value}</p>
                  <p className="cp-contact-note">{note}</p>
                </div>
              </div>
            ))}
            <div className="cp-social">
              <button className="cp-social-btn" aria-label="Twitter/X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
              <button className="cp-social-btn" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
              <button className="cp-social-btn" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></button>
            </div>
          </div>

          <div className="cp-form-card">
            {sent ? (
              <div className="cp-success">
                <div className="cp-success-icon"><CheckCircle size={24} color="#16a34a" /></div>
                <h3>Message sent successfully!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <p className="cp-form-title">Send us a message</p>
                <p className="cp-form-sub">Fill in the form and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit}>
                  <div className="cp-row">
                    <div className="cp-field"><label>Full name *</label><input className="cp-input" type="text" placeholder="Jane Wanjiku" value={form.name} onChange={set("name")} required /></div>
                    <div className="cp-field"><label>Email address *</label><input className="cp-input" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required /></div>
                  </div>
                  <div className="cp-field"><label>Subject</label><input className="cp-input" type="text" placeholder="e.g. Question about Wings to Fly" value={form.subject} onChange={set("subject")} /></div>
                  <div className="cp-field"><label>Message *</label><textarea className="cp-textarea" placeholder="Tell us how we can help you…" value={form.message} onChange={set("message")} required /></div>
                  <button className="cp-btn" type="submit"><Send size={16} /> Send Message</button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="cp-faq">
          <p className="cp-section-label">Common Questions</p>
          <h2 className="cp-section-title">Frequently Asked Questions</h2>
          <p className="cp-section-sub">Can't find what you're looking for? Send us a message using the form above.</p>
          {FAQS.map(({ q, a }, i) => (
            <div className="cp-faq-item" key={i}>
              <button className={`cp-faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              {openFaq === i && <p className="cp-faq-a">{a}</p>}
            </div>
          ))}
        </div>
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
