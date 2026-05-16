/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Video Book player
// ─────────────────────────────────────────────────────────────

const { useState: uS3, useEffect: uE3 } = React;

const VideoHome = ({ go }) => {
  const { EPISODES } = window.CERRIA_DATA;
  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <div>
          <div className="display" style={{ fontSize: 26 }}>Video Book</div>
          <div className="greet-sub">Cerita yang dihidupkan jadi animasi.</div>
        </div>
        <div className="avatar"><Mascot size={40}/></div>
      </div>

      <div className="wrap" style={{ marginTop: 14 }}>
        <button onClick={()=>go('player',{ epId: EPISODES[0].id })} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', display: 'block', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <Scene kind="forest" w="100%" h={200} rounded={0}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.55) 100%)' }}/>
            <div style={{ position: 'absolute', left: 16, bottom: 14, color: '#fff' }}>
              <span className="lbl" style={{ background: '#FF7A3A', color: '#fff', padding: '4px 10px', borderRadius: 999 }}>EPISODE BARU</span>
              <div className="h2" style={{ color: '#fff', marginTop: 8, fontFamily: 'var(--font-display)' }}>{EPISODES[0].title}</div>
              <div className="small" style={{ color: 'rgba(255,255,255,.85)' }}>{EPISODES[0].duration} • Bahasa Indonesia</div>
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 14, width: 56, height: 56, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,.3)' }}>
              <Icon name="play" size={26} color="#FF7A3A"/>
            </div>
          </div>
        </button>
      </div>

      <div className="wrap" style={{ marginTop: 18 }}>
        <div className="h2" style={{ marginBottom: 10 }}>Episode Lainnya</div>
        <div className="col">
          {EPISODES.slice(1).map(ep => (
            <button key={ep.id} onClick={()=>go('player',{ epId: ep.id })} className="card" style={{ padding: 10, display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left' }}>
              <div style={{ width: 100, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <Scene kind={ep.thumb} w={100} h={64} rounded={12}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="h3" style={{ fontSize: 14, fontFamily: 'var(--font-display)' }}>{ep.title}</div>
                <div className="small">{ep.duration} • Subtitle tersedia</div>
              </div>
              <div className="btn-icon-round" style={{ width: 36, height: 36, background: '#FFE3CD', color: '#C44A1E' }}><Icon name="play" size={16}/></div>
            </button>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 18 }}>
        <div className="card" style={{ padding: 14, background: '#E0D6F4', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: '#9B59B6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="moon" size={22}/></div>
          <div style={{ flex: 1 }}>
            <div className="h3" style={{ fontFamily: 'var(--font-display)', color: '#5B3A8A' }}>Mode Tidur</div>
            <div className="small" style={{ color: '#5B3A8A' }}>Auto-stop setelah 2 episode.</div>
          </div>
          <div style={{ width: 44, height: 26, borderRadius: 999, background: '#9B59B6', position: 'relative' }}>
            <div style={{ position: 'absolute', right: 2, top: 2, width: 22, height: 22, borderRadius: 999, background: '#fff' }}/>
          </div>
        </div>
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

const VideoPlayer = ({ epId, go, child }) => {
  const { EPISODES } = window.CERRIA_DATA;
  const ep = EPISODES.find(e => e.id === epId) || EPISODES[0];
  const next = EPISODES[(EPISODES.indexOf(ep) + 1) % EPISODES.length];
  const [playing, setPlaying] = uS3(true);
  const [time, setTime] = uS3(0);
  const total = 60;
  const [showNext, setShowNext] = uS3(false);
  const [countdown, setCountdown] = uS3(5);
  const startRef = React.useRef(Date.now());

  const logAndExit = async (dest, params) => {
    if (child) {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      if (elapsed > 5) await window.CerriaDB.logActivity({ childId: child.id, type: 'video', contentId: ep.id, contentTitle: ep.title, duration: elapsed });
    }
    go(dest, params || {});
  };

  uE3(() => {
    if (!playing) return;
    const t = setInterval(() => setTime(s => Math.min(total, s + 1)), 200);
    return () => clearInterval(t);
  }, [playing]);

  uE3(() => {
    if (time >= total && !showNext) { setShowNext(true); setPlaying(false); }
  }, [time]);

  uE3(() => {
    if (!showNext) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showNext, countdown]);

  return (
    <div className="app" style={{ background: '#0F1B2E' }}>
      {/* video stage */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene kind={ep.theme === 'forest' ? 'forest' : 'island'} w="100%" h="100%" rounded={0}/>
        {/* characters */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)' }}>
          <Mascot size={120}/>
        </div>
      </div>

      {/* top bar */}
      <div className="topbar" style={{ position: 'relative', zIndex: 2 }}>
        <button onClick={()=>logAndExit('video')} className="btn-icon-round" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', backdropFilter: 'blur(8px)' }}>
          <Icon name="arrow-left" size={20}/>
        </button>
        <div style={{ color: '#fff', textAlign: 'center' }}>
          <div className="h3" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{ep.title}</div>
        </div>
        <button className="btn-icon-round" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', backdropFilter: 'blur(8px)' }}>
          <Icon name="subtitle" size={20}/>
        </button>
      </div>

      {/* subtitle */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 200, textAlign: 'center', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)', padding: '8px 14px', borderRadius: 14 }}>
          <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>"Halo teman-teman, ayo ikut petualangan!"</span>
        </div>
      </div>

      {/* big controls */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, padding: '0 18px', zIndex: 3 }}>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.2)' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="small" style={{ color: '#fff', fontWeight: 700 }}>{Math.floor(time/60)}:{(time%60).toString().padStart(2,'0')}</span>
            <span className="small" style={{ color: 'rgba(255,255,255,.75)' }}>1:00</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,.2)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(time/total)*100}%`, background: 'linear-gradient(90deg,#FFC857,#FF7A3A)' }}/>
          </div>
          <div className="row" style={{ justifyContent: 'space-around', marginTop: 14 }}>
            <button className="btn-icon-round" style={{ width: 56, height: 56, background: 'rgba(255,255,255,.18)', color: '#fff' }}><Icon name="rewind" size={24}/></button>
            <button onClick={()=>setPlaying(p=>!p)} style={{ width: 78, height: 78, borderRadius: 999, background: 'linear-gradient(180deg,#FF9D5C,#FF7A3A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 0 #C45A23' }}>
              <Icon name={playing?'pause':'play'} size={32} color="#fff"/>
            </button>
            <button className="btn-icon-round" style={{ width: 56, height: 56, background: 'rgba(255,255,255,.18)', color: '#fff' }}><Icon name="forward" size={24}/></button>
          </div>
        </div>
      </div>

      {/* up-next overlay */}
      {showNext && (
        <div className="fade-in" style={{ position: 'absolute', inset: 0, background: 'rgba(15,27,46,.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 10 }}>
          <div className="card" style={{ padding: 16, width: '100%', maxWidth: 320 }}>
            <div className="lbl" style={{ color: 'var(--c-orange)' }}>SELANJUTNYA DALAM {Math.max(0,countdown)}s</div>
            <div className="h2" style={{ marginTop: 6, fontFamily: 'var(--font-display)' }}>{next.title}</div>
            <div style={{ marginTop: 10, borderRadius: 12, overflow: 'hidden' }}>
              <Scene kind={next.thumb} w="100%" h={120} rounded={12}/>
            </div>
            <div className="row" style={{ marginTop: 12, gap: 10 }}>
              <button onClick={()=>{ setShowNext(false); setTime(0); setCountdown(5); setPlaying(true); }} className="btn btn-secondary" style={{ flex: 1 }}>Tonton Ulang</button>
              <button onClick={()=>logAndExit('player',{ epId: next.id })} className="btn btn-primary" style={{ flex: 1 }}>Lanjut</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.VideoHome = VideoHome;
window.VideoPlayer = VideoPlayer;
