/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Report screen (reads, time, missions)
// ─────────────────────────────────────────────────────────────

const Report = ({ go }) => {
  const days = ['Sn','Sl','Rb','Km','Jm','Sb','Mg'];
  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <button onClick={()=>go('parent-dash')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div className="h3">Laporan</div>
        <button className="btn-icon-round"><Icon name="menu-dots" size={18}/></button>
      </div>

      <div className="wrap" style={{ marginTop: 6 }}>
        {/* Streak */}
        <div className="card-warm" style={{ padding: 16 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>Jumat, 2 Mei</div>
            <div className="row" style={{ gap: 6 }}>
              <Icon name="flame" size={18} color="#FF8C42"/>
              <span style={{ fontWeight: 800, fontFamily: 'var(--font-display)' }}>47 hari</span>
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            {days.map((d, i) => {
              const cls = i < 4 ? 'done' : i === 4 ? 'today' : '';
              return (
                <div key={d} className={`day-pill ${cls}`}>
                  <span style={{ fontSize: 11, opacity: .9 }}>{d}</span>
                  {i < 4 ? <Icon name="flame" size={14} color="#fff"/> : i === 4 ? <Icon name="star" size={14} color="#FF8C42"/> : <span style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(42,31,24,.12)' }}/>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Three big stats */}
        <div className="row" style={{ marginTop: 14, gap: 10 }}>
          <div className="card" style={{ flex: 1, padding: 16, background: '#FFE3CD', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#C44A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="book" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>12</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Buku dibaca</div>
          </div>
          <div className="card" style={{ flex: 1, padding: 16, background: '#E0D6F4', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#5B3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="flame" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>2j 48m</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Waktu baca</div>
          </div>
          <div className="card" style={{ flex: 1, padding: 16, background: '#D6EBC9', boxShadow: 'none', textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff', color: '#2F6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><Icon name="badge" size={20}/></div>
            <div className="display" style={{ fontSize: 22 }}>7</div>
            <div className="small" style={{ color: 'var(--ink-2)' }}>Misi selesai</div>
          </div>
        </div>

        {/* Weekly chart */}
        <div className="h3" style={{ marginTop: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Pekan Ini</div>
        <div className="card" style={{ padding: 16 }}>
          <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: 110 }}>
            {[40, 70, 55, 85, 60, 30, 0].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 22, height: `${v}%`, borderRadius: 8, background: i === 3 ? 'linear-gradient(180deg,#FFC857,#FF8C42)' : '#FFE3CD' }}/>
                <span className="small" style={{ fontSize: 11 }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent books read */}
        <div className="h3" style={{ marginTop: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Buku Terbaru Dibaca</div>
        <div className="card" style={{ padding: 4 }}>
          {[
            { t: 'Pulau Misterius',  ch: 'Bab 8 dari 12', d: '38 mnt', theme: 'sunset' },
            { t: 'Hutan Bercerita',  ch: 'Bab 3 dari 8',  d: '22 mnt', theme: 'forest' },
            { t: 'Negeri Awan Ungu', ch: 'Bab 4 dari 9',  d: '14 mnt', theme: 'purple' },
          ].map((r, i, arr) => (
            <div key={r.t} className="row" style={{ padding: '12px', justifyContent: 'space-between', borderBottom: i < arr.length-1 ? '1px solid var(--ink-line)' : 'none' }}>
              <div className="row" style={{ gap: 12 }}>
                <BookCover theme={r.theme} title={r.t} w={40} h={54} rounded={8}/>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{r.t}</div>
                  <div className="small">{r.ch}</div>
                </div>
              </div>
              <div className="small" style={{ fontWeight: 700, color: 'var(--c-orange)' }}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* Missions */}
        <div className="h3" style={{ marginTop: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Misi Selesai</div>
        <div className="card" style={{ padding: 16 }}>
          <div className="row" style={{ gap: 10, justifyContent: 'space-between' }}>
            {[
              { c: '#4EA8DE', l: 'Mat 1', stars: 3 },
              { c: '#4EA8DE', l: 'Mat 2', stars: 3 },
              { c: '#4EA8DE', l: 'Mat 3', stars: 2 },
              { c: '#FF8C42', l: 'BIN 1', stars: 3 },
              { c: '#FF8C42', l: 'BIN 2', stars: 2 },
            ].map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, margin: '0 auto', borderRadius: 14, background: m.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11 }}>{m.l}</div>
                <div className="row" style={{ justifyContent: 'center', gap: 1, marginTop: 4 }}>
                  {[0,1,2].map(s => <Icon key={s} name="star" size={11} color={s < m.stars ? '#FFC857' : 'rgba(42,31,24,.15)'}/>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 30 }}/>
    </div>
  );
};

window.Report = Report;
