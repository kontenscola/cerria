/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Report screen (reads, time, missions)
// ─────────────────────────────────────────────────────────────

const { useEffect: uEReport, useState: uStReport } = React;

const fmtDur = (secs) => {
  const m = Math.floor(secs / 60);
  return m >= 60 ? `${Math.floor(m/60)}j ${m%60}m` : `${m} mnt`;
};

const Report = ({ go, child }) => {
  const days = ['Sn','Sl','Rb','Km','Jm','Sb','Mg'];
  const [logs, setLogs] = uStReport([]);
  const [missions, setMissions] = uStReport([]);
  const [readingProgress, setReadingProgress] = uStReport([]);
  const [loading, setLoading] = uStReport(true);

  uEReport(() => {
    if (!child) { setLoading(false); return; }
    Promise.all([
      window.CerriaDB.getActivityLog(child.id, 50),
      window.CerriaDB.getMissionProgress(child.id),
      window.CerriaDB.getReadingProgress(child.id),
    ]).then(([l, m, r]) => {
      setLogs(l); setMissions(m); setReadingProgress(r);
      setLoading(false);
    });
  }, [child && child.id]);

  const totalSecs = logs.reduce((s, l) => s + (l.duration || 0), 0);
  const booksRead = readingProgress.length;
  const missionsCompleted = missions.filter(m => m.stars > 0).length;

  const bookLogs = logs.filter(l => l.type === 'book').slice(0, 5);
  const missionLogs = missions.filter(m => m.stars > 0).slice(0, 6);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <button onClick={()=>go('parent-dash')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div className="h3">Laporan</div>
        <button className="btn-icon-round"><Icon name="menu-dots" size={18}/></button>
      </div>

      <div className="wrap" style={{ marginTop: 6 }}>
        <div className="card-warm" style={{ padding: 16 }}>
          <div className="h3" style={{ fontFamily: 'var(--font-display)', textTransform: 'capitalize' }}>{today}</div>
          <div className="small" style={{ color: 'var(--ink-2)', marginTop: 4 }}>
            {child ? child.name : 'Anak'} · {loading ? '...' : `${fmtDur(totalSecs)} total belajar`}
          </div>
        </div>

        {/* Three big stats */}
        <div className="row" style={{ marginTop: 14, gap: 10 }}>
          <div className="card" style={{ flex: 1, padding: 16, background: '#FFE3CD', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#C44A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="book" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>{loading ? '…' : booksRead}</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Buku dibaca</div>
          </div>
          <div className="card" style={{ flex: 1, padding: 16, background: '#E0D6F4', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#5B3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="flame" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>{loading ? '…' : fmtDur(totalSecs)}</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Total waktu</div>
          </div>
          <div className="card" style={{ flex: 1, padding: 16, background: '#D6EBC9', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#2F6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="badge" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>{loading ? '…' : missionsCompleted}</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Misi selesai</div>
          </div>
        </div>

        {/* Recent book activity */}
        {!loading && bookLogs.length > 0 && (
          <>
            <div className="h3" style={{ marginTop: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Aktivitas Buku Terbaru</div>
            <div className="card" style={{ padding: 4 }}>
              {bookLogs.map((r, i) => {
                const dt = new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                return (
                  <div key={r.id} className="row" style={{ padding: '12px', justifyContent: 'space-between', borderBottom: i < bookLogs.length-1 ? '1px solid var(--ink-line)' : 'none' }}>
                    <div className="row" style={{ gap: 12, flex: 1, minWidth: 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FF8C4222', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name="book" size={18} color="#FF8C42"/>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.content_title}</div>
                        <div className="small">{dt}</div>
                      </div>
                    </div>
                    <div className="small" style={{ fontWeight: 700, color: 'var(--c-orange)', flexShrink: 0, marginLeft: 8 }}>{fmtDur(r.duration || 0)}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Missions completed */}
        {!loading && missionLogs.length > 0 && (
          <>
            <div className="h3" style={{ marginTop: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Misi Selesai</div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {missionLogs.map((m, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: '#4EA8DE', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10 }}>
                      {m.subject_id ? m.subject_id.toUpperCase().slice(0,3) : '?'} {m.level_id}
                    </div>
                    <div className="row" style={{ justifyContent: 'center', gap: 1, marginTop: 4 }}>
                      {[0,1,2].map(s => <Icon key={s} name="star" size={10} color={s < m.stars ? '#FFC857' : 'rgba(42,31,24,.15)'}/>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && logs.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Mascot size={80} mood="wink"/>
            <div className="h3" style={{ marginTop: 8 }}>Belum ada aktivitas</div>
            <div className="small">Ajak {child ? child.name : 'anak'} mulai belajar hari ini!</div>
          </div>
        )}
      </div>
      <div style={{ height: 30 }}/>
    </div>
  );
};

window.Report = Report;
