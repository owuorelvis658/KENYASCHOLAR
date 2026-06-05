import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

// ─── Page HTML generators ──────────────────────────────────────────────────

const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background: #060f1e;
    color: #e8eef7;
    min-height: 100vh;
    line-height: 1.7;
  }
  a { color: #4da3ff; text-decoration: none; }
  a:hover { text-decoration: underline; }

  .page-header {
    background: linear-gradient(135deg, #0d1f3c 0%, #0a1628 60%, #060f1e 100%);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 56px 24px 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .page-header::before {
    content: '';
    position: absolute;
    top: -100px; left: 50%;
    transform: translateX(-50%);
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 65%);
    pointer-events: none;
  }
  .page-header .logo {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 28px;
    text-decoration: none;
  }
  .page-header .logo-icon {
    width: 44px; height: 44px; border-radius: 11px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .page-header .logo-name {
    font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.3px;
  }
  .page-header h1 {
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 900; color: #fff; letter-spacing: -0.8px;
    line-height: 1.15; margin-bottom: 14px;
  }
  .page-header p {
    font-size: 16px; color: rgba(255,255,255,0.55);
    max-width: 560px; margin: 0 auto;
  }

  .back-button {
    position: absolute;
    top: 24px;
    left: 24px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: #e8eef7;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  .back-button:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
  }

  .page-body {
    max-width: 820px; margin: 0 auto;
    padding: 56px 24px 80px;
  }

  .section { margin-bottom: 48px; }
  .section h2 {
    font-size: 20px; font-weight: 800; color: #fff;
    letter-spacing: -0.3px; margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .section p {
    font-size: 15px; color: rgba(255,255,255,0.65);
    margin-bottom: 12px; line-height: 1.8;
  }
  .section ul {
    list-style: none; padding: 0;
    display: flex; flex-direction: column; gap: 10px;
  }
  .section ul li {
    font-size: 15px; color: rgba(255,255,255,0.65);
    padding-left: 20px; position: relative; line-height: 1.75;
  }
  .section ul li::before {
    content: '→'; position: absolute; left: 0;
    color: #3b82f6; font-size: 13px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px; margin-top: 8px;
  }
  .stat-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 22px 20px;
    text-align: center;
  }
  .stat-card .num {
    font-size: 32px; font-weight: 900; color: #4da3ff;
    letter-spacing: -1px; display: block; margin-bottom: 4px;
  }
  .stat-card .label {
    font-size: 13px; color: rgba(255,255,255,0.45); font-weight: 500;
  }

  .team-card {
    display: flex; gap: 16px; align-items: flex-start;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 20px;
  }
  .team-avatar {
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #1a56db, #3b82f6);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 800; color: #fff;
    flex-shrink: 0;
  }

  .highlight-box {
    background: rgba(26,86,219,0.12);
    border: 1px solid rgba(26,86,219,0.25);
    border-radius: 12px; padding: 20px 22px; margin-top: 16px;
  }
  .highlight-box p { color: rgba(255,255,255,0.75); margin: 0; }

  .badge {
    display: inline-block;
    background: rgba(26,86,219,0.18);
    color: #4da3ff; font-size: 12px; font-weight: 700;
    padding: 4px 10px; border-radius: 6px;
    letter-spacing: 0.3px; text-transform: uppercase;
    margin-bottom: 8px;
  }

  .page-footer {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 20px 24px; text-align: center;
    font-size: 12.5px; color: rgba(255,255,255,0.25);
  }
`;

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────
function getAboutPage() {
  return `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>About Us — KenyaScholar</title>
  <style>${BASE_STYLES}
    .mission-pill {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(26,86,219,0.15); border: 1px solid rgba(26,86,219,0.3);
      color: #7ab8ff; font-size: 13px; font-weight: 600;
      padding: 6px 14px; border-radius: 100px; margin-bottom: 20px;
    }
    .pillar-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px; margin-top: 8px;
    }
    .pillar {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 14px; padding: 22px 20px;
    }
    .pillar-icon { font-size: 26px; margin-bottom: 10px; display: block; }
    .pillar h3 { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 8px; }
    .pillar p { font-size: 13.5px; color: rgba(255,255,255,0.55); line-height: 1.7; }
  </style>
</head><body>
  <header class="page-header">
    <button class="back-button" onclick="window.close()">← Back</button>
    <div class="logo"><div class="logo-icon">🎓</div><span class="logo-name">KenyaScholar</span></div>
    <span class="mission-pill">🌍 Our Story</span>
    <h1>Bridging the Gap Between<br>Talent & Opportunity</h1>
    <p>Kenya has thousands of brilliant students who lack the knowledge to access scholarships that can change their lives. We're here to fix that.</p>
  </header>

  <main class="page-body">
    <section class="section">
      <div class="card-grid">
        <div class="stat-card"><span class="num">500+</span><span class="label">Scholarships Listed</span></div>
        <div class="stat-card"><span class="num">47</span><span class="label">Counties Covered</span></div>
        <div class="stat-card"><span class="num">10K+</span><span class="label">Students Helped</span></div>
        <div class="stat-card"><span class="num">Free</span><span class="label">Always & Forever</span></div>
      </div>
    </section>

    <section class="section">
      <h2>Why KenyaScholar Exists</h2>
      <p>Every year, billions of shillings in scholarship funding go unclaimed — not because Kenyan students aren't qualified, but because information is scattered, hard to find, or locked behind expensive counsellors and agents.</p>
      <p>KenyaScholar was founded to democratise access. We aggregate secondary school scholarships from government bodies, NGOs, private foundations, and international organisations into one trusted, freely accessible platform — so that a Form Two student in Turkana has the same shot as one in Nairobi.</p>
      <div class="highlight-box">
        <p>💡 <strong style="color:#fff;">Our belief:</strong> No Kenyan student should miss a life-changing opportunity simply because they didn't know it existed.</p>
      </div>
    </section>

    <section class="section">
      <h2>What We Do</h2>
      <div class="pillar-grid">
        <div class="pillar"><span class="pillar-icon">🔍</span><h3>Aggregate</h3><p>We gather scholarship listings from dozens of sources so you don't have to search the entire internet.</p></div>
        <div class="pillar"><span class="pillar-icon">✅</span><h3>Verify</h3><p>Every listing is checked for legitimacy. No scams, no ghost scholarships — only real, active opportunities.</p></div>
        <div class="pillar"><span class="pillar-icon">📢</span><h3>Notify</h3><p>Deadline alerts and new scholarship announcements so students never miss an application window.</p></div>
        <div class="pillar"><span class="pillar-icon">📝</span><h3>Guide</h3><p>Resources on writing personal statements, gathering documents, and acing scholarship interviews.</p></div>
      </div>
    </section>

    <section class="section">
      <h2>Who We Serve</h2>
      <ul>
        <li>Secondary school students across all 47 counties of Kenya</li>
        <li>Parents and guardians researching funding options for their children</li>
        <li>Teachers and career counsellors supporting students with applications</li>
        <li>NGOs and foundations looking to publicise their scholarship programmes</li>
      </ul>
    </section>

    <section class="section">
      <h2>The Team Behind KenyaScholar</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px;">
        <div class="team-card">
          <div class="team-avatar">M</div>
          <div>
            <p style="font-weight:800;color:#fff;font-size:15px;margin-bottom:4px;">The Founder</p>
            <p style="font-size:13.5px;color:rgba(255,255,255,0.55);">A passionate Kenyan developer and education advocate who built KenyaScholar after watching talented classmates miss opportunities due to lack of information. Reachable at <a href="mailto:marshunter23@gmail.com">marshunter23@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Support Our Mission</h2>
      <p>KenyaScholar is a free platform kept alive by passion and community support. If this platform has helped you or someone you know, consider <a href="#" onclick="window.close()">buying us a coffee</a> — even KES 50 keeps the servers running and the scholarships updating.</p>
    </section>
  </main>

  <footer class="page-footer">© ${new Date().getFullYear()} KenyaScholar · Empowering students. Transforming futures.</footer>
</body></html>`;
}

// ─── TERMS OF USE PAGE ────────────────────────────────────────────────────
function getTermsPage() {
  return `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Terms of Use — KenyaScholar</title>
  <style>${BASE_STYLES}
    .toc { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 20px 24px; margin-bottom: 40px; }
    .toc h3 { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }
    .toc ol { padding-left: 18px; display:flex; flex-direction:column; gap:6px; }
    .toc ol li a { font-size: 14px; color: #4da3ff; }
    .updated { font-size: 12.5px; color: rgba(255,255,255,0.3); margin-top: 8px; }
  </style>
</head><body>
  <header class="page-header">
    <button class="back-button" onclick="window.close()">← Back</button>
    <div class="logo"><div class="logo-icon">🎓</div><span class="logo-name">KenyaScholar</span></div>
    <h1>Terms of Use</h1>
    <p>Please read these terms carefully before using the KenyaScholar platform.</p>
    <p class="updated">Last updated: ${new Date().toLocaleDateString('en-KE', {year:'numeric',month:'long',day:'numeric'})}</p>
  </header>

  <main class="page-body">
    <div class="toc">
      <h3>Contents</h3>
      <ol>
        <li><a href="#acceptance">Acceptance of Terms</a></li>
        <li><a href="#platform">About the Platform</a></li>
        <li><a href="#use">Permitted Use</a></li>
        <li><a href="#accuracy">Accuracy of Information</a></li>
        <li><a href="#intellectual">Intellectual Property</a></li>
        <li><a href="#links">Third-Party Links</a></li>
        <li><a href="#liability">Limitation of Liability</a></li>
        <li><a href="#privacy">Privacy</a></li>
        <li><a href="#changes">Changes to These Terms</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ol>
    </div>

    <section class="section" id="acceptance">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using KenyaScholar ("the Platform", "we", "our", "us"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our platform.</p>
      <p>These terms apply to all visitors, users, and others who access or use the Platform — including students, parents, guardians, teachers, and partner organisations.</p>
    </section>

    <section class="section" id="platform">
      <h2>2. About the Platform</h2>
      <p>KenyaScholar is a free, non-commercial information aggregation platform that collects and presents scholarship opportunities for secondary school students in Kenya. We do not administer, fund, or guarantee any of the scholarships listed on the Platform.</p>
      <div class="highlight-box"><p>⚠️ KenyaScholar is an information resource only. We are not a scholarship body, and listing on our platform does not constitute endorsement or guarantee of any funding.</p></div>
    </section>

    <section class="section" id="use">
      <h2>3. Permitted Use</h2>
      <p>You may use the Platform for lawful, personal, and non-commercial purposes. Specifically, you may:</p>
      <ul>
        <li>Browse and search scholarship listings for personal educational use</li>
        <li>Share links to listings with students, parents, or educators</li>
        <li>Print or save information for offline personal reference</li>
      </ul>
      <p style="margin-top:14px;">You may <strong style="color:#fff;">not</strong>:</p>
      <ul>
        <li>Reproduce or resell our content for commercial gain</li>
        <li>Scrape or systematically download listings without permission</li>
        <li>Impersonate KenyaScholar or misrepresent our platform</li>
        <li>Use the platform to distribute fraudulent scholarship information</li>
      </ul>
    </section>

    <section class="section" id="accuracy">
      <h2>4. Accuracy of Information</h2>
      <p>We strive to keep all scholarship listings accurate and up to date. However, scholarship details — including deadlines, eligibility criteria, award amounts, and availability — can change without notice. KenyaScholar cannot guarantee the completeness, accuracy, or timeliness of any listing.</p>
      <p>Always verify scholarship details directly with the awarding organisation before submitting an application. We are not responsible for any losses arising from reliance on inaccurate information.</p>
    </section>

    <section class="section" id="intellectual">
      <h2>5. Intellectual Property</h2>
      <p>The KenyaScholar name, logo, branding, and original written content are the intellectual property of KenyaScholar and may not be used without express written permission. Scholarship information sourced from third parties remains the property of those respective organisations.</p>
    </section>

    <section class="section" id="links">
      <h2>6. Third-Party Links</h2>
      <p>Our platform contains links to external websites operated by scholarship providers, government bodies, and NGOs. These links are provided for convenience only. KenyaScholar has no control over those sites and is not responsible for their content, privacy policies, or practices.</p>
    </section>

    <section class="section" id="liability">
      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by Kenyan law, KenyaScholar and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of — or inability to use — this platform, including missed application deadlines, failed scholarship applications, or reliance on inaccurate listings.</p>
    </section>

    <section class="section" id="privacy">
      <h2>8. Privacy</h2>
      <p>Your use of the Platform is also governed by our Privacy Policy. We do not sell personal data and collect only the minimum information necessary to operate the service. For questions about data handling, contact <a href="mailto:marshunter23@gmail.com">marshunter23@gmail.com</a>.</p>
    </section>

    <section class="section" id="changes">
      <h2>9. Changes to These Terms</h2>
      <p>We reserve the right to update these Terms at any time. Continued use of the Platform after changes are posted constitutes acceptance of the revised terms. We encourage you to review this page periodically.</p>
    </section>

    <section class="section" id="contact">
      <h2>10. Contact Us</h2>
      <p>If you have any questions about these Terms, please reach out to us at <a href="mailto:marshunter23@gmail.com">marshunter23@gmail.com</a> or call/WhatsApp <a href="tel:+254794641793">+254 794 641 793</a>.</p>
    </section>
  </main>

  <footer class="page-footer">© ${new Date().getFullYear()} KenyaScholar · Terms of Use</footer>
</body></html>`;
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────
function getContactPage() {
  return `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Contact Us — KenyaScholar</title>
  <style>${BASE_STYLES}
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px; margin-top: 8px;
    }
    .contact-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 26px 22px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .contact-card .c-icon {
      width: 46px; height: 46px; border-radius: 12px;
      background: rgba(26,86,219,0.2); border: 1px solid rgba(26,86,219,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; margin-bottom: 4px;
    }
    .contact-card h3 { font-size: 15px; font-weight: 800; color: #fff; }
    .contact-card p { font-size: 13.5px; color: rgba(255,255,255,0.5); line-height: 1.6; }
    .contact-card a { font-size: 14px; color: #4da3ff; font-weight: 600; word-break: break-all; }

    .form-wrap {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 18px; padding: 32px;
    }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.6); margin-bottom: 8px; letter-spacing: 0.2px; }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
      padding: 12px 14px; font-size: 14px; color: #e8eef7;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      outline: none; transition: border-color 0.15s;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      border-color: rgba(26,86,219,0.6);
      background: rgba(26,86,219,0.07);
    }
    .form-group textarea { resize: vertical; min-height: 120px; }
    .form-group select option { background: #0d1f3c; }
    .submit-btn {
      width: 100%; padding: 14px;
      background: #1a56db; color: #fff;
      border: none; border-radius: 10px;
      font-size: 15px; font-weight: 800;
      cursor: pointer; font-family: inherit;
      letter-spacing: -0.1px;
      transition: background 0.15s, transform 0.1s;
    }
    .submit-btn:hover { background: #1648c0; }
    .submit-btn:active { transform: scale(0.99); }
    .success-msg {
      display: none; background: rgba(16,185,129,0.12);
      border: 1px solid rgba(16,185,129,0.3);
      border-radius: 10px; padding: 16px 20px;
      color: #6ee7b7; font-size: 14px; margin-top: 16px; text-align: center;
    }
  </style>
</head><body>
  <header class="page-header">
    <button class="back-button" onclick="window.close()">← Back</button>
    <div class="logo"><div class="logo-icon">🎓</div><span class="logo-name">KenyaScholar</span></div>
    <h1>Get in Touch</h1>
    <p>Have a question, want to report a listing, or partner with us? We'd love to hear from you.</p>
  </header>

  <main class="page-body">
    <section class="section">
      <h2>Contact Channels</h2>
      <div class="contact-grid">
        <div class="contact-card">
          <div class="c-icon">📧</div>
          <h3>Email</h3>
          <p>For general enquiries, partnership proposals, and listing submissions.</p>
          <a href="mailto:marshunter23@gmail.com">marshunter23@gmail.com</a>
        </div>
        <div class="contact-card">
          <div class="c-icon">📱</div>
          <h3>WhatsApp / Call</h3>
          <p>For urgent queries or if you prefer a direct conversation. Available Mon–Sat, 8am–7pm EAT.</p>
          <a href="https://wa.me/254794641793">+254 794 641 793</a>
        </div>
        <div class="contact-card">
          <div class="c-icon">🏫</div>
          <h3>Schools & Partners</h3>
          <p>Schools, NGOs, and foundations wishing to list a scholarship or collaborate.</p>
          <a href="mailto:marshunter23@gmail.com">marshunter23@gmail.com</a>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Send a Message</h2>
      <div class="form-wrap">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" placeholder="e.g. Amina Wanjiku" />
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <select id="subject">
            <option value="" disabled selected>Select a topic…</option>
            <option>Scholarship enquiry</option>
            <option>Report inaccurate listing</option>
            <option>Submit a new scholarship</option>
            <option>Partnership proposal</option>
            <option>Technical issue</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" placeholder="Tell us how we can help…"></textarea>
        </div>
        <button class="submit-btn" onclick="handleSubmit()">Send Message →</button>
        <div class="success-msg" id="success">
          ✅ Thank you! Your message has been received. We'll get back to you within 24–48 hours.
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>All scholarships on KenyaScholar are free to apply for — we never charge students</li>
        <li>To submit a scholarship for listing, email us with the full details and official source link</li>
        <li>Response time for email enquiries is typically 24–48 hours on business days</li>
        <li>For urgent scholarship deadline queries, WhatsApp is the fastest channel</li>
      </ul>
    </section>
  </main>

  <footer class="page-footer">© ${new Date().getFullYear()} KenyaScholar · Contact Us</footer>
  <script>
    function handleSubmit() {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }
      document.getElementById('success').style.display = 'block';
      document.querySelector('.submit-btn').disabled = true;
      document.querySelector('.submit-btn').textContent = 'Message Sent ✓';
    }
  </script>
</body></html>`;
}

// ─── BUY ME COFFEE PAGE ───────────────────────────────────────────────────
function getCoffeePage() {
  return `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Support KenyaScholar ☕</title>
  <style>${BASE_STYLES}
    .hero-emoji { font-size: 64px; display: block; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

    .mpesa-card {
      background: rgba(0,163,68,0.08);
      border: 1.5px solid rgba(0,163,68,0.3);
      border-radius: 20px; padding: 32px 28px;
      text-align: center; max-width: 420px; margin: 0 auto;
      position: relative; overflow: hidden;
    }
    .mpesa-card::before {
      content: '';
      position: absolute; top: -40px; right: -40px;
      width: 120px; height: 120px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,163,68,0.15) 0%, transparent 70%);
    }
    .mpesa-logo {
      display: inline-flex; align-items: center; gap: 10px;
      margin-bottom: 20px;
    }
    .mpesa-m {
      width: 52px; height: 52px; border-radius: 50%;
      background: #00A344; display: flex; align-items: center;
      justify-content: center; font-size: 24px; font-weight: 900; color: #fff;
    }
    .mpesa-wordmark { font-size: 26px; font-weight: 900; color: #00C853; letter-spacing: -0.5px; }
    .phone-number {
      font-size: 36px; font-weight: 900; color: #fff;
      letter-spacing: 1px; display: block; margin: 12px 0 6px;
    }
    .phone-name { font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 20px; }
    .copy-btn {
      background: rgba(0,163,68,0.2); border: 1px solid rgba(0,163,68,0.4);
      color: #4ade80; padding: 10px 24px; border-radius: 8px;
      font-size: 13.5px; font-weight: 700; cursor: pointer;
      font-family: 'Plus Jakarta Sans', system-ui; transition: background 0.15s;
      letter-spacing: 0.1px;
    }
    .copy-btn:hover { background: rgba(0,163,68,0.32); }

    .steps {
      display: flex; flex-direction: column; gap: 0;
      counter-reset: step; max-width: 420px; margin: 0 auto;
    }
    .step {
      display: flex; gap: 16px; align-items: flex-start;
      padding: 16px 0; position: relative;
    }
    .step:not(:last-child)::after {
      content: ''; position: absolute;
      left: 19px; top: 52px; bottom: 0;
      width: 1px; background: rgba(255,255,255,0.1);
    }
    .step-num {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(26,86,219,0.2); border: 1px solid rgba(26,86,219,0.35);
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; font-weight: 800; color: #4da3ff;
      flex-shrink: 0;
    }
    .step-text h4 { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .step-text p { font-size: 13.5px; color: rgba(255,255,255,0.5); line-height: 1.6; }

    .tiers {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px; margin-top: 8px;
    }
    .tier {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px; padding: 20px 16px; text-align: center;
      cursor: pointer; transition: border-color 0.15s, background 0.15s;
    }
    .tier:hover { border-color: rgba(26,86,219,0.4); background: rgba(26,86,219,0.08); }
    .tier .t-emoji { font-size: 28px; display: block; margin-bottom: 8px; }
    .tier .t-amount { font-size: 22px; font-weight: 900; color: #fff; display: block; margin-bottom: 4px; }
    .tier .t-label { font-size: 12px; color: rgba(255,255,255,0.4); }

    .impact-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
    .impact-item {
      display: flex; gap: 12px; align-items: center;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px; padding: 14px 16px;
    }
    .impact-item .i-emoji { font-size: 22px; flex-shrink: 0; }
    .impact-item p { font-size: 13.5px; color: rgba(255,255,255,0.6); line-height: 1.6; }
    .impact-item strong { color: #fff; }
  </style>
</head><body>
  <header class="page-header">
    <button class="back-button" onclick="window.close()">← Back</button>
    <div class="logo"><div class="logo-icon">🎓</div><span class="logo-name">KenyaScholar</span></div>
    <span class="hero-emoji">☕</span>
    <h1>Support KenyaScholar</h1>
    <p>This platform is free and will always stay free. If it's helped you or a student you care about, consider buying us a coffee via M-Pesa.</p>
  </header>

  <main class="page-body">
    <section class="section">
      <h2>Send via M-Pesa</h2>
      <div class="mpesa-card">
        <div class="mpesa-logo">
          <div class="mpesa-m">M</div>
          <span class="mpesa-wordmark">M-PESA</span>
        </div>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:4px;">Send to number</p>
        <span class="phone-number">+254 794 641 793</span>
        <p class="phone-name">KenyaScholar Support</p>
        <button class="copy-btn" onclick="navigator.clipboard.writeText('0794641793').then(()=>{ this.textContent='Copied! ✓'; setTimeout(()=>this.textContent='Copy Number',2000) })">Copy Number</button>
      </div>
    </section>

    <section class="section">
      <h2>How to Send M-Pesa</h2>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div class="step-text"><h4>Open M-Pesa</h4><p>Go to the M-Pesa menu on your Safaricom line or open the M-Pesa app.</p></div></div>
        <div class="step"><div class="step-num">2</div><div class="step-text"><h4>Select "Send Money"</h4><p>Choose "Send Money" from the main menu.</p></div></div>
        <div class="step"><div class="step-num">3</div><div class="step-text"><h4>Enter the number</h4><p>Type <strong style="color:#4ade80;">0794641793</strong> as the recipient number.</p></div></div>
        <div class="step"><div class="step-num">4</div><div class="step-text"><h4>Enter any amount</h4><p>Even KES 50 makes a real difference. No amount is too small.</p></div></div>
        <div class="step"><div class="step-num">5</div><div class="step-text"><h4>Confirm with PIN</h4><p>Enter your M-Pesa PIN to complete the transaction. Done! 🎉</p></div></div>
      </div>
    </section>

    <section class="section">
      <h2>Choose Your Coffee Size</h2>
      <div class="tiers">
        <div class="tier"><span class="t-emoji">☕</span><span class="t-amount">KES 50</span><span class="t-label">A small cup</span></div>
        <div class="tier"><span class="t-emoji">☕☕</span><span class="t-amount">KES 100</span><span class="t-label">A full mug</span></div>
        <div class="tier"><span class="t-emoji">🍵</span><span class="t-amount">KES 250</span><span class="t-label">A thermos</span></div>
        <div class="tier"><span class="t-emoji">🏆</span><span class="t-amount">KES 500+</span><span class="t-label">Supporter</span></div>
      </div>
    </section>

    <section class="section">
      <h2>Where Your Support Goes</h2>
      <div class="impact-list">
        <div class="impact-item"><span class="i-emoji">🖥️</span><p><strong>KES 50–100</strong> covers hosting costs for one day, keeping the site fast and accessible nationwide.</p></div>
        <div class="impact-item"><span class="i-emoji">🔍</span><p><strong>KES 250</strong> funds research time to find and verify new scholarship listings across Kenya.</p></div>
        <div class="impact-item"><span class="i-emoji">📲</span><p><strong>KES 500+</strong> goes toward SMS / notification infrastructure to alert students of new opportunities.</p></div>
        <div class="impact-item"><span class="i-emoji">💙</span><p>Every shilling directly supports a platform that helps thousands of Kenyan students each year — at zero cost to them.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="highlight-box">
        <p>💌 <strong style="color:#fff;">A note from the founder:</strong> KenyaScholar was built because I believe every Kenyan student deserves a fair shot. Your support — no matter the amount — means I can keep the lights on and the listings updated. Thank you from the bottom of my heart. — The KenyaScholar Team</p>
      </div>
    </section>
  </main>

  <footer class="page-footer">© ${new Date().getFullYear()} KenyaScholar · Thank you for your support ☕</footer>
</body></html>`;
}

// ─── Helper: open page in new tab ─────────────────────────────────────────
function openPage(htmlString) {
  const blob = new Blob([htmlString], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// ─── FOOTER COMPONENT ─────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .ks-footer * { box-sizing: border-box; margin: 0; padding: 0; }

        .ks-footer {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
          background: #0d1f3c;
          position: relative;
          overflow: hidden;
        }

        .ks-footer::before {
          content: '';
          position: absolute;
          top: -70px; left: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,86,219,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .ks-footer::after {
          content: '';
          position: absolute;
          bottom: -50px; right: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,86,219,0.09) 0%, transparent 70%);
          pointer-events: none;
        }

        .ks-footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 26px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .ks-footer-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .ks-footer-icon {
          width: 44px;
          height: 44px;
          border-radius: 11px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ks-footer-text { display: flex; flex-direction: column; gap: 4px; min-width: 0; }

        .ks-footer-tagline {
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.2px;
          line-height: 1.2;
          white-space: nowrap;
        }

        .ks-footer-sub {
          font-size: 12.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.45;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ks-footer-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .ks-footer-btn {
          padding: 10px 22px;
          background: transparent;
          color: #ffffff;
          border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: -0.1px;
          white-space: nowrap;
          transition: background 0.16s, border-color 0.16s, box-shadow 0.16s, transform 0.12s;
        }

        .ks-footer-btn:hover {
          background: rgba(26,86,219,0.5);
          border-color: rgba(26,86,219,0.65);
          box-shadow: 0 4px 16px rgba(26,86,219,0.28);
          transform: translateY(-1px);
        }

        .ks-footer-btn:active { transform: scale(0.98); }

        .ks-footer-coffee-btn {
          padding: 10px 18px;
          background: rgba(0,163,68,0.15);
          color: #4ade80;
          border: 1.5px solid rgba(0,163,68,0.35);
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.16s, border-color 0.16s, transform 0.12s;
        }

        .ks-footer-coffee-btn:hover {
          background: rgba(0,163,68,0.28);
          border-color: rgba(0,163,68,0.55);
          transform: translateY(-1px);
        }

        .ks-footer-coffee-btn:active { transform: scale(0.98); }

        .ks-mpesa-dot {
          width: 16px; height: 16px; border-radius: 50%;
          background: #00A344;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 900; color: #fff;
          flex-shrink: 0;
        }

        .ks-footer-bar {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .ks-footer-bar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ks-footer-copy {
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          font-weight: 400;
        }

        .ks-footer-links { display: flex; align-items: center; gap: 18px; list-style: none; }

        .ks-footer-links button {
          background: none;
          border: none;
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          font-weight: 400;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
          transition: color 0.14s;
        }

        .ks-footer-links button:hover { color: rgba(255,255,255,0.65); }

        @media (max-width: 768px) {
          .ks-footer-actions { flex-wrap: wrap; }
          .ks-footer-coffee-btn span.coffee-text { display: none; }
        }

        @media (max-width: 640px) {
          .ks-footer-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px 20px;
            gap: 16px;
          }
          .ks-footer-tagline { white-space: normal; font-size: 13.5px; }
          .ks-footer-sub { white-space: normal; font-size: 12px; }
          .ks-footer-actions { width: 100%; }
          .ks-footer-btn { flex: 1; text-align: center; }
          .ks-footer-coffee-btn { flex: 1; justify-content: center; }
          .ks-footer-bar-inner { flex-direction: column; align-items: flex-start; gap: 6px; padding: 12px 20px; }
        }

        @media (max-width: 380px) {
          .ks-footer-inner { padding: 18px 16px; }
          .ks-footer-icon { width: 38px; height: 38px; border-radius: 9px; }
          .ks-footer-tagline { font-size: 13px; }
        }
      `}</style>

      <footer className="ks-footer" aria-label="Site footer">

        {/* ── Main row ── */}
        <motion.div
          className="ks-footer-inner"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ks-footer-left">
            <div className="ks-footer-icon" aria-hidden="true">
              <GraduationCap size={20} color="rgba(255,255,255,0.82)" strokeWidth={2} />
            </div>
            <div className="ks-footer-text">
              <p className="ks-footer-tagline">Empowering students. Transforming futures.</p>
              <p className="ks-footer-sub">
                KenyaScholar is your trusted platform for secondary school scholarships in Kenya.
              </p>
            </div>
          </div>

          <div className="ks-footer-actions">
            <motion.button
              className="ks-footer-btn"
              whileTap={{ scale: 0.97 }}
              onClick={() => openPage(getAboutPage())}
              aria-label="About KenyaScholar"
            >
              About Us
            </motion.button>

            <motion.button
              className="ks-footer-coffee-btn"
              whileTap={{ scale: 0.97 }}
              onClick={() => openPage(getCoffeePage())}
              aria-label="Support KenyaScholar via M-Pesa"
            >
              <span className="ks-mpesa-dot">M</span>
              <span className="coffee-text">Buy Me a Coffee</span>
              <span>☕</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="ks-footer-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <div className="ks-footer-bar-inner">
            <p className="ks-footer-copy">© {new Date().getFullYear()} KenyaScholar. All rights reserved.</p>
            <ul className="ks-footer-links">
              <li>
                <button onClick={() => openPage(getAboutPage())} aria-label="Privacy Policy">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openPage(getTermsPage())} aria-label="Terms of Use">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => openPage(getContactPage())} aria-label="Contact">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </motion.div>

      </footer>
    </>
  );
}
