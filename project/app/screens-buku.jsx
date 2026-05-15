/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Buku: Library, Detail, Reader (with audio narration)
// ─────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo } = React;

const BukuLibrary = ({ go }) => {
  const { BOOKS } = window.CERRIA_DATA;
  const [age, setAge] = useState('semua');
  const [genre, setGenre] = useState('semua');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => BOOKS.filter(b =>
    (age === 'semua' || b.age === age) &&
    (genre === 'semua' || b.genre === genre) &&
    (q === '' || b.title.toLowerCase().includes(q.toLowerCase()))
  ), [age, genre, q]);

  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <div>
          <div className="display" style={{ fontSize: 26 }}>Perpustakaan</div>
          <div className="greet-sub">Pilih buku favoritmu hari ini.</div>
        </div>
        <div className="avatar"><Mascot size={40}/></div>
      </div>

      <div className="wrap" style={{ marginTop: 12 }}>
        <div className="card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 999 }}>
          <Icon name="search" size={18} color="#8C7A6B"/>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cari buku..." style={{ border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 15, flex: 1, background: 'transparent' }}/>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 14 }}>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', margin: '0 -18px', padding: '0 18px' }}>
          <div className="seg" style={{ marginRight: 8 }}>
            {[['semua','Semua'],['3-5','3–5'],['6-8','6–8'],['9-12','9–12']].map(([id,l]) => (
              <button key={id} onClick={()=>setAge(id)} className={age===id?'active':''}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['semua','Semua'],['petualangan','🗺️ Petualangan'],['fabel','🦊 Fabel'],['edukasi','💡 Edukasi'],['humor','😄 Humor']].map(([id,l]) => (
            <button key={id} onClick={()=>setGenre(id)} className="chip" style={genre===id?{background:'var(--ink-1)',color:'#fff'}:{}}>{l}</button>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {filtered.map(b => (
          <button key={b.id} onClick={()=>go('detail',{ bookId: b.id })} className="card" style={{ padding: 10, textAlign: 'left', display: 'block' }}>
            <BookCover theme={b.theme} title={b.title} w={'100%'} h={170} rounded={14}/>
            <div className="h3" style={{ marginTop: 10, fontSize: 15, fontFamily: 'var(--font-display)' }}>{b.title}</div>
            <div className="small">{b.author}</div>
            <div className="row" style={{ marginTop: 8, justifyContent: 'space-between' }}>
              <span className="tag" style={{ background: '#FFE3CD', color: '#C44A1E' }}>{b.age} thn</span>
              {b.progress > 0 && <span className="small" style={{ color: 'var(--c-orange)', fontWeight: 800 }}>{Math.round(b.progress*100)}%</span>}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 30, textAlign: 'center' }}>
            <Mascot size={80} mood="wink"/>
            <div className="h3" style={{ marginTop: 8 }}>Belum ada buku yang cocok</div>
            <div className="small">Coba ubah filter atau kata kunci.</div>
          </div>
        )}
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

const BukuDetail = ({ bookId, go }) => {
  const { BOOKS } = window.CERRIA_DATA;
  const book = BOOKS.find(b => b.id === bookId) || BOOKS[0];
  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <button onClick={()=>go('buku')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div className="h3">Detail Buku</div>
        <button className="btn-icon-round"><Icon name="heart" size={18} color="#FF7A93"/></button>
      </div>

      <div className="wrap" style={{ marginTop: 6 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: -4 }}>
            <BookCover theme={book.theme} title={book.title} w={170} h={228} rounded={16}/>
          </div>
          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <div className="display" style={{ fontSize: 24 }}>{book.title}</div>
            <div className="small" style={{ marginTop: 4 }}>oleh {book.author}</div>
          </div>

          <div className="row" style={{ justifyContent: 'space-around', marginTop: 16, padding: '12px 0', borderTop: '1px dashed var(--ink-line)', borderBottom: '1px dashed var(--ink-line)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{book.reads.toLocaleString('id-ID')}</div>
              <div className="small">Pembaca</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{book.likes.toLocaleString('id-ID')}</div>
              <div className="small">Suka</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{book.chapters}</div>
              <div className="small">Bab</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--c-orange)' }}>{Math.round(book.progress*100)}%</div>
              <div className="small">Selesai</div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>Pengantar</div>
            <p className="body" style={{ marginTop: 4 }}>{book.summary}</p>
          </div>

          <div className="row" style={{ marginTop: 16, gap: 10 }}>
            <button onClick={()=>go('reader',{ bookId: book.id })} className="btn btn-primary" style={{ flex: 1 }}>
              <Icon name="book" size={18}/> Baca
            </button>
            <button onClick={()=>go('reader',{ bookId: book.id, mode: 'listen' })} className="btn btn-secondary" style={{ flex: 1 }}>
              <Icon name="volume" size={18} color="#FF7A3A"/> Dengar
            </button>
          </div>
        </div>

        <div className="card" style={{ marginTop: 14, padding: 16 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>Lencana</div>
            <span className="small">2 dari 5</span>
          </div>
          <div className="row" style={{ gap: 10, justifyContent: 'space-between' }}>
            {[true,true,false,false,false].map((earned, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 14, background: earned ? 'linear-gradient(180deg,#FFD17A,#FF8C42)' : '#F2E6D3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: earned ? '0 4px 0 #C45A23' : 'none' }}>
                <Icon name={earned ? 'badge' : 'lock'} size={22} color={earned ? '#fff' : '#BFA98F'}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

// Reader — with word-level audio highlight
const Reader = ({ bookId, mode = 'read', go, child }) => {
  const { BOOKS, READER_TEXT } = window.CERRIA_DATA;
  const book = BOOKS.find(b => b.id === bookId) || BOOKS[0];
  const [tab, setTab] = useState(mode);            // 'read' | 'listen'
  const [playing, setPlaying] = useState(mode === 'listen');
  const [time, setTime] = useState(0);             // ms
  const [showHelp, setShowHelp] = useState(false);
  const rafRef = useRef(0);
  const startedRef = useRef(0);
  const sessionStartRef = useRef(Date.now());
  const total = 12000;

  const saveAndExit = async (dest, params) => {
    if (child) {
      const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      const progress = Math.min(1, time / total);
      await window.CerriaDB.saveReadingProgress({
        childId: child.id, bookId: book.id,
        currentChapter: book.currentChapter || 1, progress, timeSpent: elapsed,
      });
      if (elapsed > 5) {
        await window.CerriaDB.logActivity({
          childId: child.id, type: 'book',
          contentId: book.id, contentTitle: book.title, duration: elapsed,
        });
      }
    }
    go(dest, params);
  };

  useEffect(() => {
    if (!playing) return;
    startedRef.current = performance.now() - time;
    const tick = (now) => {
      const t = now - startedRef.current;
      if (t >= total) { setTime(total); setPlaying(false); return; }
      setTime(t);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const activeIdx = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < READER_TEXT.length; i++) if (READER_TEXT[i].t <= time) idx = i;
    return idx;
  }, [time]);

  const fmt = (ms) => {
    const s = Math.floor(ms/1000);
    const m = Math.floor(s/60);
    const ss = (s%60).toString().padStart(2,'0');
    return `${m}:${ss}`;
  };

  return (
    <div className="app" style={{ background: tab === 'listen' ? '#1B2A4E' : 'var(--bg-app)', color: tab === 'listen' ? '#fff' : 'var(--ink-1)' }}>
      {/* Background — listen mode */}
      {tab === 'listen' && (
        <div style={{ position: 'absolute', inset: 0, opacity: .35 }}>
          <Scene kind="island" w="100%" h="100%" rounded={0}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(27,42,78,.5), rgba(27,42,78,.85))' }}/>
        </div>
      )}

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="topbar">
          <button onClick={()=>saveAndExit('detail',{ bookId: book.id })} className="btn-icon-round" style={tab==='listen'?{background:'rgba(255,255,255,.18)',color:'#fff',backdropFilter:'blur(8px)'}:{}}>
            <Icon name="arrow-left" size={20}/>
          </button>
          <div className="h3" style={{ color: 'inherit' }}>{book.title}</div>
          <button className="btn-icon-round" style={tab==='listen'?{background:'rgba(255,255,255,.18)',color:'#fff'}:{}}>
            <Icon name="menu-dots" size={20}/>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <div className="seg" style={tab==='listen'?{background:'rgba(255,255,255,.16)',backdropFilter:'blur(8px)'}:{}}>
            <button onClick={()=>setTab('read')} className={tab==='read'?'active':''}>
              <Icon name="book" size={16} color={tab==='read'?'#2A1F18':(tab==='listen'?'#fff':'#8C7A6B')}/> Baca
            </button>
            <button onClick={()=>setTab('listen')} className={tab==='listen'?'active':''}>
              <Icon name="volume" size={16} color={tab==='listen'?'#2A1F18':'#8C7A6B'}/> Dengar
            </button>
          </div>
        </div>

        <div className="scroll" style={{ padding: '14px 18px', position: 'relative' }}>
          {tab === 'read' && (
            <div className="reader-page fade-in">
              <p className="reader-text">
                {READER_TEXT.map((w, i) => {
                  const cls = i === activeIdx && playing ? 'word active' : i < activeIdx ? 'word spoken' : 'word';
                  return <span key={i} className={cls} onClick={()=>{ if (w.w.toLowerCase().includes('camar')) setShowHelp(true); }}>{w.w} </span>;
                })}
              </p>

              <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px dashed rgba(180,90,40,.25)' }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="small" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>Bab {book.currentChapter} dari {book.chapters}</span>
                  <div className="row" style={{ gap: 8 }}>
                    <button className="btn-icon-round" style={{ width: 36, height: 36 }}><Icon name="arrow-left" size={16}/></button>
                    <button className="btn-icon-round" style={{ width: 36, height: 36 }}><Icon name="arrow-right" size={16}/></button>
                  </div>
                </div>
                <div className="progress-track" style={{ marginTop: 8 }}>
                  <div className="progress-fill" style={{ width: `${(time/total)*100}%` }}/>
                </div>
              </div>

              {showHelp && (
                <div className="card fade-in" style={{ position: 'absolute', left: '50%', top: 200, transform: 'translateX(-50%)', width: 220, padding: 14, zIndex: 5 }}>
                  <div style={{ height: 80, borderRadius: 10, background: 'linear-gradient(135deg,#5BB6E1,#FFD17A)', position: 'relative', overflow: 'hidden' }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 80">
                      <ellipse cx="100" cy="70" rx="120" ry="14" fill="#FFE0B0"/>
                      <ellipse cx="80" cy="50" rx="14" ry="10" fill="#fff"/>
                      <ellipse cx="78" cy="46" rx="6" ry="5" fill="#fff"/>
                      <circle cx="76" cy="46" r="1.5" fill="#000"/>
                      <polygon points="84,49 96,49 88,53" fill="#FFC857"/>
                    </svg>
                    <button onClick={()=>setShowHelp(false)} className="btn-icon-round" style={{ position: 'absolute', right: 8, top: 8, width: 30, height: 30, background: '#FF7A3A', color: '#fff' }}>
                      <Icon name="volume" size={14} color="#fff"/>
                    </button>
                  </div>
                  <div className="h3" style={{ marginTop: 8, fontFamily: 'var(--font-display)' }}>Camar</div>
                  <div className="small" style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Burung putih yang hidup dekat air, seperti laut, sungai, atau danau.</div>
                </div>
              )}
            </div>
          )}

          {tab === 'listen' && (
            <div className="fade-in" style={{ paddingTop: 6 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1.5, color: '#fff', fontWeight: 500 }}>
                {READER_TEXT.map((w, i) => {
                  const isActive = i === activeIdx;
                  const isSpoken = i < activeIdx;
                  return (
                    <span key={i} style={{
                      color: isActive ? '#FFD17A' : isSpoken ? '#fff' : 'rgba(255,255,255,.45)',
                      fontWeight: isActive ? 800 : 500,
                      transition: 'color .25s ease',
                    }}>{w.w} </span>
                  );
                })}
              </p>
            </div>
          )}
        </div>

        {/* Audio control bar */}
        <div style={{ padding: '10px 18px 24px', position: 'relative' }}>
          <div className="card" style={{
            padding: 14,
            background: tab==='listen' ? 'rgba(255,255,255,.10)' : '#fff',
            backdropFilter: tab==='listen' ? 'blur(12px)' : 'none',
            border: tab==='listen' ? '1px solid rgba(255,255,255,.2)' : 'none',
          }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="small" style={{ color: tab==='listen' ? 'rgba(255,255,255,.8)' : 'var(--ink-2)', fontWeight: 700 }}>{fmt(time)}</span>
              <span className="small" style={{ color: tab==='listen' ? 'rgba(255,255,255,.8)' : 'var(--ink-2)', fontWeight: 700 }}>{fmt(total)}</span>
            </div>
            <div style={{ height: 4, background: tab==='listen'?'rgba(255,255,255,.2)':'rgba(42,31,24,.10)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(time/total)*100}%`, background: 'linear-gradient(90deg,#FFC857,#FF7A3A)' }}/>
            </div>
            <div className="row" style={{ justifyContent: 'center', gap: 22, marginTop: 12 }}>
              <button onClick={()=>setTime(Math.max(0,time-3000))} className="btn-icon-round" style={tab==='listen'?{background:'rgba(255,255,255,.16)',color:'#fff'}:{}}><Icon name="rewind" size={18}/></button>
              <button onClick={()=>setPlaying(p=>!p)} style={{ width: 64, height: 64, borderRadius: 999, background: 'linear-gradient(180deg,#FF9D5C,#FF7A3A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 0 #C45A23' }}>
                <Icon name={playing ? 'pause' : 'play'} size={26} color="#fff"/>
              </button>
              <button onClick={()=>setTime(Math.min(total,time+3000))} className="btn-icon-round" style={tab==='listen'?{background:'rgba(255,255,255,.16)',color:'#fff'}:{}}><Icon name="forward" size={18}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.BukuLibrary = BukuLibrary;
window.BukuDetail = BukuDetail;
window.Reader = Reader;
