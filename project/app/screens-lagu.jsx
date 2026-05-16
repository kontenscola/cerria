/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Lagu Anak: Library + Player dengan lirik highlight
// ─────────────────────────────────────────────────────────────

const { useState: uSL, useEffect: uEL, useRef: uRL, useMemo: uML } = React;

const SONGS = [
  {
    id: 's1', title: 'Bintang Kecil', artist: 'Lagu Tradisional',
    duration: 90, color: '#FFD17A', color2: '#FF8C42',
    lyrics: [
      { t: 0,    text: 'Bintang kecil di langit yang biru...' },
      { t: 5000, text: 'Amat banyak menghias angkasa...' },
      { t: 10000,text: 'Aku ingin terbang dan menari...' },
      { t: 15000,text: 'Melayang jauh di atas sana...' },
      { t: 20000,text: 'Bintang kecil di langit yang biru...' },
      { t: 25000,text: 'Amat banyak menghias angkasa...' },
    ],
  },
  {
    id: 's2', title: 'Burung Kakaktua', artist: 'Lagu Tradisional',
    duration: 75, color: '#6FD296', color2: '#3BB273',
    lyrics: [
      { t: 0,    text: 'Burung kakaktua, hinggap di jendela...' },
      { t: 5000, text: 'Nenek sudah tua, giginya tinggal dua...' },
      { t: 10000,text: 'Tra la la la la, tra la la la la...' },
      { t: 15000,text: 'Nenek sudah tua, giginya tinggal dua...' },
      { t: 20000,text: 'Burung kakaktua, hinggap di jendela...' },
    ],
  },
  {
    id: 's3', title: 'Pelangi Pelangi', artist: 'A.T. Mahmud',
    duration: 82, color: '#7BC8E8', color2: '#4EA8DE',
    lyrics: [
      { t: 0,    text: 'Pelangi pelangi, alangkah indahmu...' },
      { t: 5000, text: 'Merah kuning hijau di langit yang biru...' },
      { t: 10000,text: 'Pelukismu agung, siapa gerangan...' },
      { t: 15000,text: 'Pelangi pelangi, ciptaan Tuhan...' },
    ],
  },
  {
    id: 's4', title: 'Lihat Kebunku', artist: 'Ibu Sud',
    duration: 68, color: '#C28BD9', color2: '#9B59B6',
    lyrics: [
      { t: 0,    text: 'Lihat kebunku, penuh dengan bunga...' },
      { t: 5000, text: 'Ada yang putih, ada yang merah...' },
      { t: 10000,text: 'Setiap hari kusiram semua...' },
      { t: 15000,text: 'Mawar melati semuanya indah...' },
    ],
  },
  {
    id: 's5', title: 'Naik Delman', artist: 'Lagu Tradisional',
    duration: 72, color: '#FF8C9A', color2: '#E84A6A',
    lyrics: [
      { t: 0,    text: 'Pada hari Minggu kuturut ayah ke kota...' },
      { t: 5000, text: 'Naik delman istimewa kududuk di muka...' },
      { t: 10000,text: 'Kuda berlari cukup kencang...' },
      { t: 15000,text: 'Saya duduk dengan senang...' },
    ],
  },
  {
    id: 's6', title: 'Topi Saya Bundar', artist: 'Lagu Tradisional',
    duration: 55, color: '#FFA07A', color2: '#FF6347',
    lyrics: [
      { t: 0,    text: 'Topi saya bundar, bundar topi saya...' },
      { t: 5000, text: 'Kalau tidak bundar, bukan topi saya...' },
      { t: 10000,text: 'Topi saya bundar, bundar topi saya...' },
      { t: 15000,text: 'Kalau tidak bundar, bukan topi saya...' },
    ],
  },
];

// ── Library ──────────────────────────────────────────────────
const LaguLibrary = ({ go }) => (
  <div className="scroll fade-in">
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => go('home')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div>
          <div className="display" style={{ fontSize: 26 }}>Lagu Anak</div>
          <div className="greet-sub">Menyanyi sambil belajar!</div>
        </div>
      </div>
      <div className="avatar"><Mascot size={40}/></div>
    </div>

    {/* Hero card — currently playing / recommended */}
    <div className="wrap" style={{ marginTop: 12 }}>
      <button onClick={()=>go('lagu-player',{ songId: 's1' })} className="card" style={{ padding: 0, overflow: 'hidden', display: 'block', width: '100%', textAlign: 'left' }}>
        <div style={{ height: 140, background: `linear-gradient(135deg, ${SONGS[0].color}, ${SONGS[0].color2})`, position: 'relative', overflow: 'hidden' }}>
          {/* music note deco */}
          <svg width="100%" height="140" viewBox="0 0 390 140" style={{ position: 'absolute', inset: 0 }}>
            {['♩','♪','♫','♬','♩','♪'].map((n,i)=>(
              <text key={i} x={30+i*60} y={30+Math.sin(i)*30} fontSize={28+(i%3)*10} fill="rgba(255,255,255,.18)" fontFamily="sans-serif">{n}</text>
            ))}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mascot size={90}/>
          </div>
          <div style={{ position: 'absolute', right: 16, bottom: 14, width: 52, height: 52, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,.2)' }}>
            <Icon name="play" size={24} color={SONGS[0].color2}/>
          </div>
        </div>
        <div style={{ padding: '12px 16px' }}>
          <div className="small" style={{ color: 'var(--c-orange)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em' }}>Lagu Pilihan</div>
          <div className="h2" style={{ fontFamily: 'var(--font-display)' }}>{SONGS[0].title}</div>
          <div className="small">{SONGS[0].artist} • {Math.floor(SONGS[0].duration/60)}:{(SONGS[0].duration%60).toString().padStart(2,'0')}</div>
        </div>
      </button>
    </div>

    {/* All songs */}
    <div className="wrap" style={{ marginTop: 18 }}>
      <div className="h2" style={{ marginBottom: 10 }}>Semua Lagu</div>
      <div className="card" style={{ padding: 4 }}>
        {SONGS.map((s, i) => (
          <button key={s.id} onClick={()=>go('lagu-player',{ songId: s.id })}
            className="row" style={{ padding: '12px 14px', justifyContent: 'space-between', borderBottom: i < SONGS.length-1 ? '1px solid var(--ink-line)' : 'none', width: '100%', textAlign: 'left' }}>
            <div className="row" style={{ gap: 14, flex: 1, minWidth: 0 }}>
              {/* album art placeholder */}
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg, ${s.color}, ${s.color2})`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎵</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
                <div className="small">{s.artist}</div>
              </div>
            </div>
            <div className="row" style={{ gap: 10, flexShrink: 0 }}>
              <span className="small" style={{ fontWeight: 700, color: 'var(--ink-3)' }}>{Math.floor(s.duration/60)}:{(s.duration%60).toString().padStart(2,'0')}</span>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: '#FFE3CD', color: '#C44A1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="play" size={14}/>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
    <div className="bottom-spacer"/>
  </div>
);

// ── Player ──────────────────────────────────────────────────
const LaguPlayer = ({ songId, go, child }) => {
  const song = SONGS.find(s => s.id === songId) || SONGS[0];
  const [playing, setPlaying] = uSL(false);
  const [time, setTime] = uSL(0);
  const totalMs = song.duration * 1000;
  const rafRef = uRL(0);
  const startRef = uRL(0);
  const sessionStartRef = uRL(Date.now());

  const logAndExit = async (dest, params) => {
    if (child) {
      const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      if (elapsed > 5) await window.CerriaDB.logActivity({ childId: child.id, type: 'lagu', contentId: song.id, contentTitle: song.title, duration: elapsed });
    }
    go(dest, params || {});
  };

  // Reset on song change
  uEL(() => { setPlaying(false); setTime(0); }, [songId]);

  uEL(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    startRef.current = performance.now() - time;
    const tick = (now) => {
      const t = now - startRef.current;
      if (t >= totalMs) { setTime(totalMs); setPlaying(false); return; }
      setTime(t);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const activeLine = uML(() => {
    let idx = 0;
    for (let i = 0; i < song.lyrics.length; i++) if (song.lyrics[i].t <= time) idx = i;
    return idx;
  }, [time, song]);

  const fmt = (ms) => {
    const s = Math.floor(ms/1000);
    return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  };

  const nextSong = SONGS[(SONGS.indexOf(song)+1) % SONGS.length];
  const prevSong = SONGS[(SONGS.indexOf(song)-1+SONGS.length) % SONGS.length];

  return (
    <div className="app" style={{ background: `linear-gradient(180deg, ${song.color} 0%, ${song.color2} 60%, #2A1F18 100%)` }}>
      {/* stars deco */}
      <svg width="100%" height="100%" viewBox="0 0 390 844" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({length:18}).map((_,i)=>(
          <circle key={i} cx={20+i*22} cy={60+Math.sin(i*1.3)*40} r={1.5+Math.random()*2} fill="#fff" opacity={0.3+Math.random()*0.4}/>
        ))}
        {['♩','♫','♬','♪'].map((n,i)=>(
          <text key={i} x={40+i*100} y={180+i*30} fontSize={36} fill="rgba(255,255,255,.12)" fontFamily="sans-serif">{n}</text>
        ))}
      </svg>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top bar */}
        <div className="topbar">
          <button onClick={()=>logAndExit('lagu')} className="btn-icon-round" style={{ background:'rgba(255,255,255,.2)', color:'#fff', backdropFilter:'blur(8px)' }}>
            <Icon name="arrow-left" size={20}/>
          </button>
          <div style={{ color:'#fff', textAlign:'center' }}>
            <div className="small" style={{ color:'rgba(255,255,255,.8)', letterSpacing:'.06em', textTransform:'uppercase' }}>Sedang Diputar</div>
          </div>
          <button className="btn-icon-round" style={{ background:'rgba(255,255,255,.2)', color:'#fff', backdropFilter:'blur(8px)' }}>
            <Icon name="heart" size={18} color="#fff"/>
          </button>
        </div>

        {/* Album art + mascot */}
        <div style={{ display:'flex', justifyContent:'center', marginTop:18 }}>
          <div style={{ width:180, height:180, borderRadius:32, background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', border:'3px solid rgba(255,255,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 20px 40px rgba(0,0,0,.2)' }}>
            <Mascot size={140}/>
          </div>
        </div>

        {/* Title */}
        <div style={{ padding:'20px 24px 0', textAlign:'center' }}>
          <div className="display" style={{ fontSize:26, color:'#fff' }}>{song.title}</div>
          <div className="small" style={{ color:'rgba(255,255,255,.8)', marginTop:4 }}>{song.artist}</div>
        </div>

        {/* Lyrics */}
        <div className="scroll" style={{ flex:1, padding:'16px 24px' }}>
          <div className="card" style={{ padding:16, background:'rgba(255,255,255,.14)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.25)' }}>
            <div className="small" style={{ color:'rgba(255,255,255,.7)', fontWeight:800, letterSpacing:'.04em', marginBottom:10 }}>🎵 LIRIK</div>
            {song.lyrics.map((l,i)=>(
              <div key={i} style={{
                padding:'8px 10px',
                borderRadius:10,
                marginBottom:4,
                fontFamily:'var(--font-display)',
                fontWeight: i===activeLine ? 800 : 600,
                fontSize: i===activeLine ? 17 : 15,
                color: i===activeLine ? '#fff' : 'rgba(255,255,255,.5)',
                background: i===activeLine ? 'rgba(255,255,255,.18)' : 'transparent',
                transition:'all .3s ease',
              }}>{l.text}</div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding:'10px 18px 28px' }}>
          <div className="card" style={{ padding:16, background:'rgba(255,255,255,.14)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.2)' }}>
            <div className="row" style={{ justifyContent:'space-between', marginBottom:6 }}>
              <span className="small" style={{ color:'rgba(255,255,255,.8)', fontWeight:700 }}>{fmt(time)}</span>
              <span className="small" style={{ color:'rgba(255,255,255,.8)', fontWeight:700 }}>{fmt(totalMs)}</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,.2)', borderRadius:999, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${(time/totalMs)*100}%`, background:'linear-gradient(90deg,#fff,rgba(255,255,255,.8))', borderRadius:999 }}/>
            </div>
            <div className="row" style={{ justifyContent:'space-around', marginTop:14 }}>
              <button onClick={()=>go('lagu-player',{ songId: prevSong.id })} className="btn-icon-round" style={{ width:52,height:52, background:'rgba(255,255,255,.2)', color:'#fff' }}>
                <Icon name="rewind" size={22}/>
              </button>
              <button onClick={()=>setPlaying(p=>!p)} style={{ width:72,height:72, borderRadius:999, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px rgba(0,0,0,.2)', color: song.color2 }}>
                <Icon name={playing?'pause':'play'} size={30} color={song.color2}/>
              </button>
              <button onClick={()=>go('lagu-player',{ songId: nextSong.id })} className="btn-icon-round" style={{ width:52,height:52, background:'rgba(255,255,255,.2)', color:'#fff' }}>
                <Icon name="forward" size={22}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.LaguLibrary = LaguLibrary;
window.LaguPlayer = LaguPlayer;
window.SONGS = SONGS;
