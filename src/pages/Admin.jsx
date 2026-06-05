import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Plus, Pencil, Trash2, LogOut, Save, X, Shield, Eye, EyeOff } from 'lucide-react'

const CATEGORIES = ['national', 'county', 'ngo', 'girls', 'stem', 'other']
const LEVELS = ['Secondary', 'TVET', 'University', 'Undergraduate', 'Masters', 'Masters/PhD', 'PhD', 'Fellowship', 'Professional']

const EMPTY_FORM = {
  name: '', organization: '', category: 'national', location: '',
  description: '', deadline: '', value: '', level: 'Secondary',
  is_featured: false, is_new: false, is_popular: false,
  logo_url: '', apply_link: '',
}

/* ─── Login Screen ─── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

async function handleLogin(e) {
  e.preventDefault()
  setLoading(true)
  setError('')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  if (data.user) {
    setUser(data.user)
  }

  setLoading(false)
}

  return (
    <div className="ad-login-wrap">
      <div className="ad-login-card">
        <div className="ad-login-icon"><Shield size={28} strokeWidth={1.5} /></div>
        <h1 className="ad-login-title">Admin Login</h1>
        <p className="ad-login-sub">KenyaScholar dashboard</p>
        {error && <div className="ad-error">{error}</div>}
        <form onSubmit={handleLogin} className="ad-login-form">
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} className="ad-input" required />
          <div style={{ position: 'relative' }}>
            <input type={show ? 'text' : 'password'} placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)} className="ad-input" required
              style={{ paddingRight: 40 }} />
            <button type="button" onClick={() => setShow(!show)} className="ad-eye">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button type="submit" className="ad-submit-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── Scholarship Form Modal ─── */
function ScholarshipForm({ initial, onSave, onClose, saving }) {
  const [form, setForm] = useState(initial || EMPTY_FORM)

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <div className="ad-modal-header">
          <h2 className="ad-modal-title">{initial ? 'Edit Scholarship' : 'Add New Scholarship'}</h2>
          <button className="ad-icon-btn" onClick={onClose}><X size={18} strokeWidth={2} /></button>
        </div>
        <div className="ad-modal-body">
          <div className="ad-form-grid">
            <div className="ad-field ad-field-full">
              <label>Scholarship Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g. Equity Wings to Fly Scholarship" className="ad-input" />
            </div>
            <div className="ad-field">
              <label>Organisation / Funder *</label>
              <input value={form.organization} onChange={e => set('organization', e.target.value)}
                placeholder="e.g. Equity Group Foundation" className="ad-input" />
            </div>
            <div className="ad-field">
              <label>Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)}
                placeholder="e.g. Nairobi, Kenya" className="ad-input" />
            </div>
            <div className="ad-field">
              <label>Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="ad-input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="ad-field">
              <label>Education Level *</label>
              <select value={form.level} onChange={e => set('level', e.target.value)} className="ad-input">
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="ad-field">
              <label>Deadline</label>
              <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} className="ad-input" />
            </div>
            <div className="ad-field">
              <label>Value / Award</label>
              <input value={form.value} onChange={e => set('value', e.target.value)}
                placeholder="e.g. Fully Funded or KES 50,000" className="ad-input" />
            </div>
            <div className="ad-field ad-field-full">
              <label>Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Describe the scholarship, eligibility, and how to apply…"
                className="ad-input ad-textarea" rows={4} />
            </div>
            <div className="ad-field">
              <label>Apply Link</label>
              <input value={form.apply_link} onChange={e => set('apply_link', e.target.value)}
                placeholder="https://..." className="ad-input" />
            </div>
            <div className="ad-field">
              <label>Logo URL</label>
              <input value={form.logo_url} onChange={e => set('logo_url', e.target.value)}
                placeholder="https://..." className="ad-input" />
            </div>
          </div>

          {/* Badges */}
          <div className="ad-badges-row">
            {['is_new', 'is_featured', 'is_popular'].map(key => (
              <label key={key} className="ad-checkbox-label">
                <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
                {key === 'is_new' ? '🆕 New' : key === 'is_featured' ? '⭐ Featured' : '🔥 Popular'}
              </label>
            ))}
          </div>
        </div>
        <div className="ad-modal-footer">
          <button className="ad-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="ad-save-btn" onClick={() => onSave(form)} disabled={saving || !form.name || !form.organization}>
            <Save size={15} strokeWidth={2} />
            {saving ? 'Saving…' : 'Save Scholarship'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Admin Dashboard ─── */
export default function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filterCat, setFilterCat] = useState('all')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  // Check auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setCheckingAuth(false)
    })
  }, [])

  // Load scholarships
  useEffect(() => {
    if (user) loadScholarships()
  }, [user])

  async function loadScholarships() {
    setLoading(true)
    const { data } = await supabase.from('scholarships').select('*').order('created_at', { ascending: false })
    setScholarships(data || [])
    setLoading(false)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function handleSave(form) {
    setSaving(true)
    if (editItem) {
      const { error } = await supabase.from('scholarships').update(form).eq('id', editItem.id)
      if (!error) { showToast('✅ Scholarship updated!'); loadScholarships() }
      else showToast('❌ Error: ' + error.message)
    } else {
      const { error } = await supabase.from('scholarships').insert(form)
      if (!error) { showToast('✅ Scholarship added!'); loadScholarships() }
      else showToast('❌ Error: ' + error.message)
    }
    setSaving(false)
    setShowForm(false)
    setEditItem(null)
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    const { error } = await supabase.from('scholarships').delete().eq('id', id)
    if (!error) { showToast('🗑️ Scholarship deleted'); loadScholarships() }
    else showToast('❌ Error: ' + error.message)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  const filtered = scholarships.filter(s => {
    const matchCat = filterCat === 'all' || s.category === filterCat
    const q = search.toLowerCase()
    const matchSearch = !q || (s.name || '').toLowerCase().includes(q) || (s.organization || '').toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  if (checkingAuth) return <div className="ad-center"><div className="ad-spinner" /></div>
  if (!user) return <LoginScreen onLogin={() => supabase.auth.getUser().then(({ data: { user } }) => setUser(user))} />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ad-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .ad-wrap { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

        /* Topbar */
        .ad-topbar { background: #0f172a; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .ad-topbar-left { display: flex; align-items: center; gap: 12px; }
        .ad-topbar-title { font-size: 16px; font-weight: 800; color: #fff; letter-spacing: -0.3px; }
        .ad-topbar-badge { font-size: 11px; font-weight: 700; background: #1a56db; color: #fff; padding: 2px 8px; border-radius: 20px; }
        .ad-logout { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #94a3b8; background: transparent; border: 1px solid #334155; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .ad-logout:hover { color: #fff; border-color: #475569; }

        /* Main */
        .ad-main { max-width: 1100px; margin: 0 auto; padding: 32px 24px; }
        .ad-page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; gap: 12px; flex-wrap: wrap; }
        .ad-page-title { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; }
        .ad-page-sub { font-size: 13px; color: #64748b; margin-top: 2px; }
        .ad-add-btn { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: #fff; background: #1a56db; border: none; border-radius: 10px; padding: 10px 18px; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .ad-add-btn:hover { background: #1e40af; }

        /* Stats */
        .ad-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
        .ad-stat { background: #fff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px; }
        .ad-stat-num { font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
        .ad-stat-label { font-size: 12px; color: #64748b; margin-top: 2px; }

        /* Controls */
        .ad-controls { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .ad-search { flex: 1; min-width: 200px; padding: 9px 14px; font-size: 13.5px; font-family: inherit; color: #0f172a; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; outline: none; transition: border-color 0.15s; }
        .ad-search:focus { border-color: #93c5fd; }
        .ad-search::placeholder { color: #94a3b8; }
        .ad-cat-filter { padding: 9px 14px; font-size: 13px; font-family: inherit; color: #0f172a; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; outline: none; cursor: pointer; }

        /* Table */
        .ad-table-wrap { background: #fff; border: 1px solid #f1f5f9; border-radius: 14px; overflow: hidden; }
        .ad-table { width: 100%; border-collapse: collapse; }
        .ad-table th { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 16px; text-align: left; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
        .ad-table td { font-size: 13px; color: #374151; padding: 14px 16px; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
        .ad-table tr:last-child td { border-bottom: none; }
        .ad-table tr:hover td { background: #f8fafc; }
        .ad-name-cell { font-weight: 600; color: #0f172a; max-width: 260px; }
        .ad-cat-pill { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; background: #eff6ff; color: #1d4ed8; }
        .ad-tag { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; margin-right: 3px; }
        .ad-tag-new { background: #dcfce7; color: #15803d; }
        .ad-tag-feat { background: #fef3c7; color: #b45309; }
        .ad-tag-pop { background: #fee2e2; color: #b91c1c; }
        .ad-actions { display: flex; gap: 6px; }
        .ad-edit-btn { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #1a56db; background: #eff6ff; border: none; border-radius: 7px; padding: 6px 10px; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .ad-edit-btn:hover { background: #dbeafe; }
        .ad-del-btn { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #dc2626; background: #fef2f2; border: none; border-radius: 7px; padding: 6px 10px; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .ad-del-btn:hover { background: #fee2e2; }
        .ad-empty { text-align: center; padding: 48px 20px; color: #94a3b8; font-size: 13.5px; }

        /* Modal */
        .ad-modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .ad-modal { background: #fff; border-radius: 16px; width: 100%; max-width: 680px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; }
        .ad-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 16px; border-bottom: 1px solid #f1f5f9; }
        .ad-modal-title { font-size: 17px; font-weight: 800; color: #0f172a; }
        .ad-modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
        .ad-modal-footer { padding: 16px 24px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 10px; }
        .ad-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ad-field { display: flex; flex-direction: column; gap: 5px; }
        .ad-field-full { grid-column: 1 / -1; }
        .ad-field label { font-size: 12px; font-weight: 700; color: #374151; }
        .ad-input { width: 100%; padding: 9px 12px; font-size: 13.5px; font-family: inherit; color: #0f172a; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 9px; outline: none; transition: border-color 0.15s; }
        .ad-input:focus { border-color: #93c5fd; background: #fff; }
        .ad-textarea { resize: vertical; min-height: 90px; }
        .ad-badges-row { display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
        .ad-checkbox-label { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: #374151; cursor: pointer; }
        .ad-cancel-btn { font-size: 13px; font-weight: 600; color: #64748b; background: transparent; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 9px 18px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .ad-cancel-btn:hover { background: #f8fafc; }
        .ad-save-btn { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: #fff; background: #1a56db; border: none; border-radius: 9px; padding: 9px 20px; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .ad-save-btn:hover:not(:disabled) { background: #1e40af; }
        .ad-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .ad-icon-btn { background: transparent; border: none; cursor: pointer; color: #94a3b8; display: flex; align-items: center; padding: 4px; border-radius: 6px; transition: color 0.15s; }
        .ad-icon-btn:hover { color: #0f172a; }

        /* Login */
        .ad-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; padding: 20px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .ad-login-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px 36px; width: 100%; max-width: 380px; text-align: center; }
        .ad-login-icon { width: 56px; height: 56px; background: #eff6ff; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #1a56db; margin: 0 auto 16px; }
        .ad-login-title { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .ad-login-sub { font-size: 13px; color: #64748b; margin-bottom: 24px; }
        .ad-login-form { display: flex; flex-direction: column; gap: 12px; }
        .ad-submit-btn { font-size: 14px; font-weight: 700; color: #fff; background: #1a56db; border: none; border-radius: 10px; padding: 12px; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .ad-submit-btn:hover:not(:disabled) { background: #1e40af; }
        .ad-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .ad-eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; }
        .ad-error { background: #fef2f2; color: #dc2626; font-size: 13px; padding: 10px 14px; border-radius: 9px; margin-bottom: 12px; text-align: left; font-weight: 500; }

        /* Toast */
        .ad-toast { position: fixed; bottom: 24px; right: 24px; background: #0f172a; color: #fff; font-size: 13.5px; font-weight: 600; padding: 12px 20px; border-radius: 10px; z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.18); animation: slideUp 0.25s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        /* Misc */
        .ad-center { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .ad-spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #1a56db; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .ad-stats { grid-template-columns: repeat(2, 1fr); }
          .ad-form-grid { grid-template-columns: 1fr; }
          .ad-field-full { grid-column: 1; }
          .ad-table th:nth-child(3), .ad-table td:nth-child(3),
          .ad-table th:nth-child(4), .ad-table td:nth-child(4) { display: none; }
        }
      `}</style>

      <div className="ad-wrap">
        {/* Topbar */}
        <div className="ad-topbar">
          <div className="ad-topbar-left">
            <span className="ad-topbar-title">KenyaScholar</span>
            <span className="ad-topbar-badge">Admin</span>
          </div>
          <button className="ad-logout" onClick={handleLogout}>
            <LogOut size={14} strokeWidth={2} /> Sign Out
          </button>
        </div>

        <div className="ad-main">
          {/* Page Header */}
          <div className="ad-page-header">
            <div>
              <h1 className="ad-page-title">Scholarships</h1>
              <p className="ad-page-sub">Manage all scholarship listings on KenyaScholar</p>
            </div>
            <button className="ad-add-btn" onClick={() => { setEditItem(null); setShowForm(true) }}>
              <Plus size={16} strokeWidth={2.5} /> Add Scholarship
            </button>
          </div>

          {/* Stats */}
          <div className="ad-stats">
            <div className="ad-stat">
              <div className="ad-stat-num">{scholarships.length}</div>
              <div className="ad-stat-label">Total Scholarships</div>
            </div>
            <div className="ad-stat">
              <div className="ad-stat-num">{scholarships.filter(s => s.is_new).length}</div>
              <div className="ad-stat-label">Newly Added</div>
            </div>
            <div className="ad-stat">
              <div className="ad-stat-num">{scholarships.filter(s => s.is_featured).length}</div>
              <div className="ad-stat-label">Featured</div>
            </div>
            <div className="ad-stat">
              <div className="ad-stat-num">{[...new Set(scholarships.map(s => s.organization).filter(Boolean))].length}</div>
              <div className="ad-stat-label">Organisations</div>
            </div>
          </div>

          {/* Controls */}
          <div className="ad-controls">
            <input type="text" placeholder="Search scholarships…" value={search}
              onChange={e => setSearch(e.target.value)} className="ad-search" />
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="ad-cat-filter">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="ad-table-wrap">
            {loading ? (
              <div className="ad-empty"><div className="ad-spinner" style={{ margin: '0 auto' }} /></div>
            ) : filtered.length === 0 ? (
              <div className="ad-empty">No scholarships found. Click "Add Scholarship" to get started.</div>
            ) : (
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Organisation</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id}>
                      <td><div className="ad-name-cell">{s.name}</div></td>
                      <td>{s.organization}</td>
                      <td><span className="ad-cat-pill">{s.category}</span></td>
                      <td>{s.deadline ? new Date(s.deadline).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                      <td>
                        {s.is_new && <span className="ad-tag ad-tag-new">NEW</span>}
                        {s.is_featured && <span className="ad-tag ad-tag-feat">FEATURED</span>}
                        {s.is_popular && <span className="ad-tag ad-tag-pop">POPULAR</span>}
                      </td>
                      <td>
                        <div className="ad-actions">
                          <button className="ad-edit-btn" onClick={() => { setEditItem(s); setShowForm(true) }}>
                            <Pencil size={13} strokeWidth={2} /> Edit
                          </button>
                          <button className="ad-del-btn" onClick={() => handleDelete(s.id, s.name)}>
                            <Trash2 size={13} strokeWidth={2} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <ScholarshipForm
            initial={editItem}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditItem(null) }}
            saving={saving}
          />
        )}

        {/* Toast */}
        {toast && <div className="ad-toast">{toast}</div>}
      </div>
    </>
  )
}
