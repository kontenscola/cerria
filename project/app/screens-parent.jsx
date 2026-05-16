/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Parent Mode (PIN gate + dashboard)
// ─────────────────────────────────────────────────────────────

const { useState: uS4 } = React;
const PIN = '1234';

const ParentPin = ({ go }) => {
  const [pin, setPin] = uS4('');
  const [err, setErr] = uS4(false);

  const press = (n) => {
    if (err) setErr(false);
    const next = (pin + n).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === PIN) go('parent-dash');
        else { setErr(true); setTimeout(() => { setPin(''); setErr(false); }, 700); }
      }, 200);
    }
  };
  const back = () => setPin(p => p.slice(0, -1));

  return (
    <div className="app" style={{ background: 'linear-gradient(180deg,#5B3A8A 0%,#9B59B6 100%)' }}>
      <div className="topbar">
        <button onClick={()=>go('home')} className="btn-icon-round" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}><Icon name="arrow-left" size={20}/></button>
        <div className="h3" style={{ color: '#fff' }}>Mode Orang Tua</div>
        <div style={{ width: 44 }}/>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Icon name="shield" size={40} color="#fff"/>
        </div>
        <div className="display" style={{ color: '#fff', fontSize: 24, textAlign: 'center' }}>Masukkan PIN Orang Tua</div>
        <div className="body" style={{ color: 'rgba(255,255,255,.8)', marginTop: 4, textAlign: 'center' }}>Untuk lihat aktivitas & atur batas waktu.</div>

        <div className="pin-dots" style={{ marginTop: 26 }}>
          {[0,1,2,3].map(i => (
            <div key={i} className={`pin-dot ${pin.length > i ? 'filled' : ''} ${err ? 'error' : ''}`} style={err ? { background: '#FF7A93' } : pin.length > i ? { background: '#FFC857', boxShadow: '0 0 0 4px rgba(255,200,87,.25)' } : { background: 'rgba(255,255,255,.25)' }}/>
          ))}
        </div>
        <div className="small" style={{ color: '#FFB0B0', marginTop: 10, height: 16 }}>{err ? 'PIN salah, coba lagi' : ''}</div>

        <div style={{ marginTop: 20, width: '100%', maxWidth: 280 }}>
          <div className="kbd-pin">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button key={n} onClick={()=>press(n)}>{n}</button>
            ))}
            <button style={{ visibility: 'hidden' }}/>
            <button onClick={()=>press(0)}>0</button>
            <button onClick={back} style={{ background: 'rgba(255,255,255,.18)', color: '#fff', boxShadow: 'none' }}><Icon name="arrow-left" size={20} color="#fff"/></button>
          </div>
        </div>
        <div className="small" style={{ color: 'rgba(255,255,255,.6)', marginTop: 16 }}>Tip: gunakan <b>1234</b> untuk demo</div>
      </div>
    </div>
  );
};

const TYPE_META = {
  book:      { l: 'Buku',          c: '#FF8C42', i: 'book'     },
  mission:   { l: 'Modul Belajar', c: '#3BB273', i: 'map'      },
  video:     { l: 'Video Book',    c: '#4EA8DE', i: 'play'     },
  lagu:      { l: 'Lagu',          c: '#FF7A93', i: 'volume'   },
  worksheet: { l: 'Worksheet',     c: '#9B59B6', i: 'subtitle' },
  majalah:   { l: 'Majalah',       c: '#FFC857', i: 'magazine' },
};

const fmtMins = (m) => m >= 60 ? `${Math.floor(m/60)}j ${m%60}m` : `${m} mnt`;

const CHILD_COLORS = [['#FFD17A','#FF8C42'],['#6FD296','#3BB273'],['#7BC8E8','#4EA8DE'],['#C28BD9','#9B59B6'],['#FF8C9A','#E84A6A']];

const ParentDash = ({ go, child, childProfiles = [], setActiveChild }) => {
  const [stats, setStats] = uS4(null);
  const [logs, setLogs] = uS4([]);
  const [loading, setLoading] = uS4(true);

  React.useEffect(() => {
    if (!child) { setLoading(false); return; }
    Promise.all([
      window.CerriaDB.getTodayStats(child.id),
      window.CerriaDB.getActivityLog(child.id, 10),
    ]).then(([s, l]) => { setStats(s); setLogs(l); setLoading(false); });
  }, [child && child.id]);

  const todayMins = stats ? stats.totalMinutes : 0;
  const limitMins = 120;
  const pct = Math.min(1, todayMins / limitMins);

  const byType = {};
  (stats ? stats.logs : []).forEach(r => {
    byType[r.type] = (byType[r.type] || 0) + (r.duration || 0);
  });
  const maxSecs = Math.max(...Object.values(byType), 1);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();

  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <button onClick={()=>go('home')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div className="h3">Dashboard Orang Tua</div>
        <button onClick={()=>go('report')} className="btn-icon-round" style={{ background: '#FF7A3A', color: '#fff' }}><Icon name="badge" size={18} color="#fff"/></button>
      </div>

      {/* Child switcher */}
      {childProfiles.length > 0 && (
        <div className="wrap" style={{ marginTop: 10 }}>
          <div className="small" style={{ fontWeight: 700, color: 'var(--ink-2)', marginBottom: 8 }}>PROFIL ANAK</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {childProfiles.map(c => {
              const isActive = child && child.id === c.id;
              const [c1, c2] = CHILD_COLORS[c.avatar_idx % CHILD_COLORS.length] || CHILD_COLORS[0];
              return (
                <button key={c.id} onClick={() => setActiveChild && setActiveChild(c)} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:999, background: isActive ? '#fff' : 'rgba(255,255,255,.5)', border:`2px solid ${isActive ? '#FF7A3A' : 'transparent'}`, boxShadow: isActive ? '0 4px 12px rgba(255,122,58,.2)' : 'none', cursor:'pointer', transition:'all .15s' }}>
                  <div style={{ width:30, height:30, borderRadius:999, background:`linear-gradient(135deg,${c1},${c2})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ color:'#fff', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13 }}>{c.name[0]}</span>
                  </div>
                  <div style={{ textAlign:'left' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:13, color:'var(--ink-1)' }}>{c.name}</div>
                    <div className="small" style={{ fontSize:10 }}>{c.age_group} thn</div>
                  </div>
                  {isActive && <Icon name="check" size={13} color="#FF7A3A"/>}
                </button>
              );
            })}
            <button onClick={() => go('add-child')} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:999, background:'#FFE3CD', border:'2px solid #FF7A3A', cursor:'pointer' }}>
              <div style={{ width:30, height:30, borderRadius:999, background:'#FF7A3A', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="plus" size={15} color="#fff"/>
              </div>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:13, color:'#C44A1E' }}>Tambah</span>
            </button>
          </div>
        </div>
      )}

      <div className="wrap" style={{ marginTop: 6 }}>
        <div className="card-warm" style={{ padding: 16 }}>
          <div className="small" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>HARI INI — {today}</div>
          {loading ? (
            <div className="small" style={{ marginTop: 12, color: 'var(--ink-2)' }}>Memuat data...</div>
          ) : (
            <>
              <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
                <div>
                  <div className="display" style={{ fontSize: 26 }}>{fmtMins(todayMins)}</div>
                  <div className="small">Total waktu {child ? child.name : 'anak'}</div>
                </div>
                <div style={{ width: 80, height: 80, position: 'relative' }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" stroke="rgba(42,31,24,.10)" strokeWidth="8" fill="none"/>
                    <circle cx="40" cy="40" r="32" stroke="#FF8C42" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${pct*201} 201`} transform="rotate(-90 40 40)"/>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{Math.round(pct*100)}%</div>
                </div>
              </div>
              <div className="small" style={{ marginTop: 8 }}>Batas harian: {fmtMins(limitMins)}</div>
            </>
          )}
        </div>
      </div>

      {!loading && Object.keys(byType).length > 0 && (
        <div className="wrap" style={{ marginTop: 14 }}>
          <div className="h3" style={{ marginBottom: 8, fontFamily: 'var(--font-display)' }}>Aktivitas per Fitur</div>
          <div className="card" style={{ padding: 16 }}>
            {Object.entries(byType).map(([type, secs]) => {
              const m = TYPE_META[type] || { l: type, c: '#8C7A6B', i: 'star' };
              const mins = Math.floor(secs / 60);
              return (
                <div key={type} style={{ marginBottom: 12 }}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{m.l}</span>
                    <span className="small" style={{ fontWeight: 700 }}>{fmtMins(mins)}</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${(secs/maxSecs)*100}%`, background: m.c }}/></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <div className="wrap" style={{ marginTop: 14 }}>
          <div className="h3" style={{ marginBottom: 8, fontFamily: 'var(--font-display)' }}>Aktivitas Terbaru</div>
          <div className="card" style={{ padding: 4 }}>
            {logs.map((l, i) => {
              const m = TYPE_META[l.type] || { l: l.type, c: '#8C7A6B', i: 'star' };
              const mins = Math.floor((l.duration || 0) / 60);
              const dt = new Date(l.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
              return (
                <div key={l.id} className="row" style={{ padding: '12px 14px', borderBottom: i < logs.length-1 ? '1px solid var(--ink-line)' : 'none', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: m.c+'22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={m.i} size={18} color={m.c}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.content_title}</div>
                    <div className="small">{dt} · {mins > 0 ? fmtMins(mins) : '<1 mnt'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && logs.length === 0 && (
        <div className="wrap" style={{ marginTop: 24, textAlign: 'center' }}>
          <Mascot size={70} mood="wink"/>
          <div className="h3" style={{ marginTop: 8 }}>Belum ada aktivitas</div>
          <div className="small">Ajak {child ? child.name : 'anak'} mulai membaca hari ini!</div>
        </div>
      )}

      <div className="wrap" style={{ marginTop: 14 }}>
        <div className="h3" style={{ marginBottom: 8, fontFamily: 'var(--font-display)' }}>Kontrol</div>
        <div className="card" style={{ padding: 4 }}>
          {[
            { l: 'Batas waktu harian', v: '2 jam', i: 'flame' },
            { l: 'Konten yang diizinkan', v: child ? `Usia ${child.age_group}` : '—', i: 'shield' },
            { l: 'Mode tidur', v: 'Auto-stop 2 ep', i: 'moon' },
            { l: 'Ubah PIN', v: '••••', i: 'settings' },
          ].map((r, i, arr) => (
            <div key={r.l} className="row" style={{ padding: '14px 14px', justifyContent: 'space-between', borderBottom: i < arr.length-1 ? '1px solid var(--ink-line)' : 'none' }}>
              <div className="row" style={{ gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: '#FFE3CD', color: '#C44A1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={r.i} size={18}/></div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{r.l}</span>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <span className="small" style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{r.v}</span>
                <Icon name="arrow-right" size={16} color="#8C7A6B"/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 40 }}/>
    </div>
  );
};

window.ParentPin = ParentPin;
window.ParentDash = ParentDash;
