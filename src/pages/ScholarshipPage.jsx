import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Building2, Coins, Search, X, Info } from 'lucide-react'
import { useScholarships } from '../hooks/useScholarships'

const CATEGORY_META = {
  national: { label: 'National Scholarships',  accent: '#1a56db', bg: '#eff6ff', light: '#dbeafe', tagText: '#1e40af', btnGrad: 'linear-gradient(135deg,#1a56db,#1244b8)', topBar: '#1a56db' },
  county:   { label: 'County Bursaries',        accent: '#16a34a', bg: '#f0fdf4', light: '#dcfce7', tagText: '#166534', btnGrad: 'linear-gradient(135deg,#16a34a,#15803d)', topBar: '#16a34a' },
  ngo:      { label: 'NGO Sponsorships',        accent: '#7c3aed', bg: '#f5f3ff', light: '#ede9fe', tagText: '#5b21b6', btnGrad: 'linear-gradient(135deg,#7c3aed,#6d28d9)', topBar: '#7c3aed' },
  girls:    { label: "Girls' Scholarships",     accent: '#db2777', bg: '#fdf2f8', light: '#fce7f3', tagText: '#9d174d', btnGrad: 'linear-gradient(135deg,#db2777,#be185d)', topBar: '#db2777' },
  stem:     { label: 'STEM Scholarships',       accent: '#d97706', bg: '#fffbeb', light: '#fef3c7', tagText: '#92400e', btnGrad: 'linear-gradient(135deg,#d97706,#b45309)', topBar: '#d97706' },
  other:    { label: 'Other Opportunities',     accent: '#475569', bg: '#f8fafc', light: '#f1f5f9', tagText: '#334155', btnGrad: 'linear-gradient(135deg,#475569,#334155)', topBar: '#475569' },
}

const LEVEL_COLORS = {
  Secondary:    { bg: '#dcfce7', color: '#15803d' },
  TVET:         { bg: '#d1fae5', color: '#047857' },
  University:   { bg: '#dbeafe', color: '#1d4ed8' },
  Undergraduate:{ bg: '#dbeafe', color: '#1d4ed8' },
  Masters:      { bg: '#fef3c7', color: '#b45309' },
  PhD:          { bg: '#fee2e2', color: '#b91c1c' },
  Fellowship:   { bg: '#f3e8ff', color: '#7c3aed' },
  Professional: { bg: '#f1f5f9', color: '#475569' },
}

function getLevelStyle(level = '') {
  for (const [key, style] of Object.entries(LEVEL_COLORS)) {
    if (level.includes(key)) return style
  }
  return { bg: '#f1f5f9', color: '#475569' }
}

function ScholarshipCard({ scholarship, index, meta }) {
  const lvl = getLevelStyle(scholarship.level)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="sp-card"
      style={{
        background: meta.bg,
        border: `1.5px solid ${meta.accent}44`,
        borderRadius: 14,
        overflow: 'hidden',
        width: '100%',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        boxShadow: `0 2px 8px ${meta.accent}15`,
      }}
    >
      {/* Coloured top bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${meta.topBar}, ${meta.topBar}88)` }} />

      <div style={{ padding: '16px 18px 14px' }}>
        <div className="sp-card-top">
          <div className="sp-card-name" style={{ color: meta.accent }}>{scholarship.name}</div>
          <span className="sp-badge" style={{ background: lvl.bg, color: lvl.color }}>
            {(scholarship.level || '').split('/')[0]}
          </span>
        </div>
        <p className="sp-card-body" style={{ color: `${meta.accent}cc` }}>{scholarship.description}</p>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${meta.accent}50, transparent)`, margin: '10px 0 12px' }} />
        <div className="sp-card-meta">
          <span className="sp-meta-item" style={{ color: `${meta.accent}99` }}>
            <Building2 size={13} strokeWidth={1.8} />{scholarship.organization}
          </span>
          <span className="sp-meta-item" style={{ color: `${meta.accent}99` }}>
            <Calendar size={13} strokeWidth={1.8} />
            {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Check website'}
          </span>
          <span className="sp-meta-item" style={{ color: `${meta.accent}99` }}>
            <Coins size={13} strokeWidth={1.8} />{scholarship.value}
          </span>
          {scholarship.apply_link && (
            <a
              href={scholarship.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-apply-link"
              style={{
                color: '#fff',
                background: meta.btnGrad,
                padding: '6px 16px',
                borderRadius: 8,
                boxShadow: `0 2px 8px ${meta.accent}44`,
              }}
            >
              Apply <ExternalLink size={11} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ScholarshipPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const meta = CATEGORY_META[category]
  const { scholarships, loading, error } = useScholarships(category)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const levels = ['All', ...Array.from(new Set(scholarships.map(s => (s.level || '').split('/')[0]).filter(Boolean)))]

  const filtered = scholarships.filter(s => {
    const matchFilter = filter === 'All' || (s.level || '').startsWith(filter)
    const q = search.toLowerCase()
    const matchSearch = !q || (s.name || '').toLowerCase().includes(q) ||
      (s.organization || '').toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  if (!meta) return (
    <div style={{ padding: '60px 24px', textAlign: 'center', color: '#64748b' }}>
      Category not found. <button onClick={() => navigate('/')} style={{ color: '#1a56db', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Go home</button>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .sp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .sp-wrap { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #fff; padding: 36px 24px 64px; overflow-x: hidden; }
        .sp-inner { max-width: 900px; margin: 0 auto; display: block; width: 100%; }
        .sp-nav { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
        .sp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #475569; background: transparent; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .sp-back:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }
        .sp-crumb { font-size: 13px; color: #94a3b8; }
        .sp-crumb-current { font-size: 13px; font-weight: 700; color: #0f172a; }
        .sp-header { margin-bottom: 20px; }
        .sp-title { font-size: 22px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 6px; }
        .sp-notice { display: flex; align-items: flex-start; gap: 8px; font-size: 12.5px; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; margin-bottom: 16px; line-height: 1.5; }
        .sp-notice strong { color: #0f172a; }
        .sp-search-wrap { position: relative; margin-bottom: 14px; }
        .sp-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .sp-search { width: 100%; padding: 10px 36px; font-size: 13.5px; font-family: inherit; color: #0f172a; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; outline: none; transition: border-color 0.15s, background 0.15s; }
        .sp-search::placeholder { color: #94a3b8; }
        .sp-search:focus { border-color: #93c5fd; background: #fff; }
        .sp-search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #e2e8f0; border: none; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: background 0.15s; }
        .sp-search-clear:hover { background: #cbd5e1; }
        .sp-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
        .sp-filter { font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: transparent; color: #64748b; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .sp-filter:hover { border-color: #cbd5e1; color: #0f172a; }
        .sp-filter-active { font-weight: 700; }
        .sp-list { display: flex; flex-direction: column; gap: 14px; overflow-x: hidden; width: 100%; }
        .sp-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(129, 131, 15, 0.1) !important; }
        .sp-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
        .sp-card-name { font-size: 14.5px; font-weight: 800;line-height: 1.4; }
        .sp-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
        .sp-card-body { font-size: 13px; line-height: 1.65; margin-bottom: 0; }
        .sp-card-meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .sp-meta-item { display: flex; align-items: center; gap: 5px; font-size: 11.5px; }
        .sp-apply-link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; text-decoration: none; margin-left: auto; transition: opacity 0.15s; }
        .sp-apply-link:hover { opacity: 0.8; }
        .sp-empty { text-align: center; padding: 48px 20px; font-size: 13.5px; color: #94a3b8; }
        .sp-loading { display: flex; justify-content: center; padding: 48px 20px; }
        .sp-spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1a56db; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .sp-wrap { padding: 24px 16px 48px; }
          .sp-card-top { flex-direction: column; }
          .sp-apply-link { margin-left: 0; }
        }
      `}</style>

      <div className="sp-wrap" style={{ display: 'block', width: '100%', overflowX: 'hidden' }}>
        <div className="sp-inner" style={{ display: 'block', width: '100%' }}>
          <div className="sp-nav">
            <button className="sp-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={15} strokeWidth={2} /> Categories
            </button>
            <span className="sp-crumb">›</span>
            <span className="sp-crumb-current">{meta.label}</span>
          </div>

          <div className="sp-header">
            <h1 className="sp-title" style={{ color: meta.accent }}>{meta.label}</h1>
          </div>

          <div className="sp-notice">
            <Info size={13} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
            Showing <strong>{filtered.length}</strong> of {scholarships.length} opportunities. Always verify deadlines directly with the funder.
          </div>

          <div className="sp-search-wrap">
            <Search size={14} strokeWidth={2} className="sp-search-icon" />
            <input type="text" placeholder="Search scholarships, organisations…" value={search}
              onChange={e => setSearch(e.target.value)} className="sp-search" />
            {search && (
              <button className="sp-search-clear" onClick={() => setSearch('')} aria-label="Clear">
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>

          {levels.length > 1 && (
            <div className="sp-filters">
              {levels.map(lvl => (
                <button key={lvl}
                  className={`sp-filter ${filter === lvl ? 'sp-filter-active' : ''}`}
                  style={filter === lvl ? { borderColor: meta.accent, color: meta.accent, background: meta.bg } : {}}
                  onClick={() => setFilter(lvl)}>
                  {lvl}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="sp-loading"><div className="sp-spinner" /></div>
          ) : error ? (
            <div className="sp-empty">Failed to load scholarships. Please try again.</div>
          ) : filtered.length === 0 ? (
            <div className="sp-empty">No scholarships match your search. Try clearing the filters.</div>
          ) : (
            <div className="sp-list" style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
              <AnimatePresence>
                {filtered.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i} meta={meta} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  )
}