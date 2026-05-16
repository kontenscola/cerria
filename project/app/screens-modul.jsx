/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Modul Belajar: Subject picker, Level map, Mission
// ─────────────────────────────────────────────────────────────

const { useState: useSt2, useEffect: useEf2 } = React;

const ModulHome = ({ go }) => {
  const { SUBJECTS } = window.CERRIA_DATA;
  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <div>
          <div className="display" style={{ fontSize: 26 }}>Modul Belajar</div>
          <div className="greet-sub">Pilih mata pelajaran untuk memulai.</div>
        </div>
        <div className="avatar"><Mascot size={40}/></div>
      </div>

      <div className="wrap" style={{ marginTop: 14 }}>
        <div className="card-warm" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Mascot size={70} mood="wink"/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="h3" style={{ fontFamily: 'var(--font-display)', lineHeight: 1.25 }}>"Hari ini coba misi baru, yuk!"</div>
            <div className="small" style={{ color: 'var(--ink-2)', marginTop: 6 }}>Selesaikan 1 misi untuk dapat ⭐</div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {SUBJECTS.map(s => (
          <button key={s.id} onClick={()=>go('peta',{ subjectId: s.id })} className="card" style={{ padding: 14, textAlign: 'left' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: s.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <div className="h3" style={{ fontSize: 16, fontFamily: 'var(--font-display)' }}>{s.name}</div>
            <div className="progress-track" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{ width: `${s.progress*100}%`, background: s.color }}/>
            </div>
            <div className="small" style={{ marginTop: 6 }}>{Math.round(s.progress*100)}% selesai</div>
          </button>
        ))}
      </div>

      <div className="wrap" style={{ marginTop: 18 }}>
        <div className="h2" style={{ marginBottom: 10 }}>Lencana Pencapaian</div>
        <div className="card" style={{ padding: 16 }}>
          <div className="row" style={{ gap: 10, justifyContent: 'space-between' }}>
            {[
              { c: '#FFC857', s: '#A87412', i: 'star',    l: 'Ahli Angka', earned: true  },
              { c: '#3BB273', s: '#228653', i: 'badge',   l: 'Pembaca',    earned: true  },
              { c: '#9B59B6', s: '#6E3D8A', i: 'sparkle', l: 'Bintang',    earned: true  },
              { c: '#E0CDB7', s: 'none',    i: 'lock',    l: 'Belum',      earned: false },
            ].map((b, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ width: 56, height: 56, margin: '0 auto', borderRadius: 16, background: b.c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: b.earned ? `0 4px 0 ${b.s}` : 'none', opacity: b.earned ? 1 : .5 }}>
                  <Icon name={b.i} size={26} color="#fff"/>
                </div>
                <div className="small" style={{ marginTop: 6, fontWeight: 700, color: b.earned ? 'var(--ink-1)' : 'var(--ink-3)' }}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

// Level map — winding path of nodes
const LevelMap = ({ subjectId = 'mat', go }) => {
  const { LEVELS, SUBJECTS } = window.CERRIA_DATA;
  const subject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];

  // Compute zig-zag positions
  const positions = LEVELS.map((_, i) => {
    const row = i;
    const x = 50 + (i % 2 === 0 ? -1 : 1) * 28 * Math.sin(i * 0.9);
    return { x, y: 80 + row * 120 };
  });

  return (
    <div className="app" style={{ background: 'linear-gradient(180deg, #C7E5B7 0%, #88BD78 100%)' }}>
      {/* sky decoration */}
      <svg width="100%" height="120" viewBox="0 0 360 120" style={{ position: 'absolute', top: 0, left: 0 }}>
        <ellipse cx="60" cy="40" rx="36" ry="14" fill="#fff" opacity=".5"/>
        <ellipse cx="280" cy="60" rx="44" ry="16" fill="#fff" opacity=".5"/>
      </svg>
      <div className="topbar" style={{ position: 'relative', zIndex: 2 }}>
        <button onClick={()=>go('modul')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div style={{ textAlign: 'center' }}>
          <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>{subject.name}</div>
          <div className="small">Bab 1 — Penjumlahan & Pengurangan</div>
        </div>
        <button className="btn-icon-round"><Icon name="star" size={18} color="#FFC857"/></button>
      </div>

      <div className="scroll" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative', height: LEVELS.length * 120 + 80, padding: '0 30px' }}>
          {/* dashed path */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path
              d={positions.map((p,i) => `${i===0?'M':'L'} ${p.x} ${(p.y/1100)*1000}`).join(' ')}
              stroke="#fff" strokeWidth="3" strokeDasharray="4 6" fill="none" strokeLinecap="round" opacity=".75"
            />
          </svg>
          {LEVELS.map((lvl, i) => {
            const cls = lvl.status === 'done' ? 'done' : lvl.status === 'current' ? 'current' : 'locked';
            const left = `calc(${positions[i].x}% - 42px)`;
            const top = positions[i].y;
            return (
              <div key={lvl.id} style={{ position: 'absolute', left, top, textAlign: 'center', width: 100, marginLeft: -8 }}>
                <button
                  onClick={()=>{ if (lvl.status !== 'locked') go('misi',{ levelId: lvl.id, subjectId: subjectId }); }}
                  className={`lvl-node ${cls}`}
                  style={{ marginBottom: 6 }}
                >
                  {lvl.boss ? '👑' : lvl.status === 'locked' ? <Icon name="lock" size={26} color="#fff"/> : lvl.status === 'done' ? <Icon name="check" size={28} color="#fff"/> : lvl.id}
                </button>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: lvl.status === 'locked' ? 'rgba(255,255,255,.7)' : '#fff', textShadow: '0 1px 2px rgba(0,0,0,.25)', lineHeight: 1.15 }}>{lvl.title}</div>
                {lvl.status === 'done' && (
                  <div className="row" style={{ justifyContent: 'center', gap: 2, marginTop: 4 }}>
                    {[0,1,2].map(s => (
                      <Icon key={s} name="star" size={14} color={s < lvl.stars ? '#FFC857' : 'rgba(255,255,255,.5)'}/>
                    ))}
                  </div>
                )}
                {lvl.status === 'current' && (
                  <div style={{ marginTop: 6 }}>
                    <span className="lbl" style={{ background: '#fff', color: '#C44A1E', padding: '4px 10px', borderRadius: 999, boxShadow: '0 3px 0 #C45A23' }}>MULAI</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="bottom-spacer"/>
      </div>
    </div>
  );
};

// Mission screen — single multiple-choice with apple scene + reward
const Mission = ({ go, child, levelId, subjectId }) => {
  const { MISSION } = window.CERRIA_DATA;
  const [picked, setPicked] = useSt2(null);
  const [showReward, setShowReward] = useSt2(false);
  const startRef = React.useRef(Date.now());

  const onPick = async (opt) => {
    if (picked) return;
    setPicked(opt);
    if (opt.correct) {
      setTimeout(() => setShowReward(true), 700);
      if (child && levelId) {
        const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
        await window.CerriaDB.saveMissionProgress({
          childId: child.id, levelId: levelId || 1,
          subjectId: subjectId || 'mat', stars: 3,
        });
        await window.CerriaDB.logActivity({
          childId: child.id, type: 'mission',
          contentId: `${subjectId || 'mat'}-${levelId || 1}`,
          contentTitle: `Misi ${levelId || 1} — ${MISSION.prompt.slice(0, 30)}`,
          duration: elapsed,
        });
      }
    }
  };

  const confettiPieces = Array.from({ length: 24 }).map((_, i) => {
    const colors = ['#FFC857', '#FF8C42', '#3BB273', '#4EA8DE', '#9B59B6', '#FF7A93'];
    const dx = (Math.random() - 0.5) * 280;
    return <i key={i} style={{
      left: `${50 + (Math.random()-0.5)*30}%`,
      top: '20%',
      background: colors[i % colors.length],
      animationDelay: `${Math.random()*0.4}s`,
      ['--dx']: `${dx}px`,
    }}/>;
  });

  return (
    <div className="app">
      <div className="topbar">
        <button onClick={()=>go('peta',{ subjectId: 'mat' })} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div style={{ textAlign: 'center' }}>
          <div className="lbl" style={{ color: 'var(--c-orange)', letterSpacing: '.04em' }}>MISI 4</div>
          <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>Mengurangi</div>
        </div>
        <div className="row" style={{ gap: 4 }}>
          <Icon name="heart" size={18} color="#FF7A93"/>
          <Icon name="heart" size={18} color="#FF7A93"/>
          <Icon name="heart" size={18} color="rgba(42,31,24,.18)"/>
        </div>
      </div>

      {/* progress dots */}
      <div className="row" style={{ justifyContent: 'center', gap: 6, marginTop: 6 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width: 28, height: 6, borderRadius: 999, background: i < 2 ? 'var(--c-orange)' : 'rgba(42,31,24,.12)' }}/>
        ))}
      </div>

      <div className="scroll" style={{ padding: '14px 18px' }}>
        <div className="card-warm" style={{ padding: 16, position: 'relative' }}>
          <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
            <Mascot size={64}/>
            <div style={{ background: '#fff', padding: '10px 14px', borderRadius: 16, borderTopLeftRadius: 4, flex: 1, boxShadow: '0 2px 6px rgba(180,90,40,.10)' }}>
              <div className="body" style={{ fontWeight: 700, color: 'var(--ink-1)' }}>{MISSION.prompt}</div>
            </div>
          </div>

          {/* Apple scene */}
          <div style={{ marginTop: 14, height: 130, background: 'linear-gradient(180deg,#FFF3DE,#FFE3CD)', borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
            {/* basket */}
            <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'absolute', left: 18, bottom: 8 }}>
              <ellipse cx="60" cy="74" rx="56" ry="6" fill="#000" opacity=".10"/>
              <path d="M14 36 L20 70 Q60 78 100 70 L106 36 Z" fill="#A85F2C"/>
              <path d="M14 36 Q60 24 106 36" stroke="#7A4318" strokeWidth="3" fill="none"/>
              {[24, 36, 48, 60, 72, 84, 96].map((x, i) => (
                <line key={i} x1={x} y1="40" x2={x+2} y2="68" stroke="#7A4318" strokeWidth="1.5"/>
              ))}
            </svg>
            {/* 5 apples */}
            {[0,1,2,3,4].map(i => (
              <g key={i}/>
            ))}
            <svg width="100%" height="130" viewBox="0 0 360 130" style={{ position: 'absolute', inset: 0 }}>
              {[
                {x:60,y:46},{x:88,y:38},{x:116,y:46},{x:74,y:24},{x:102,y:24}
              ].map((p, i) => (
                <g key={i} transform={`translate(${p.x},${p.y})`}>
                  <circle cx="0" cy="6" r="11" fill="#E84A4A"/>
                  <ellipse cx="-3" cy="2" rx="4" ry="2.6" fill="#fff" opacity=".35"/>
                  <path d="M0 -6 q4 -2 6 0" stroke="#5A3520" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M2 -6 q4 -3 7 -1" stroke="#3F8A55" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </g>
              ))}
              {/* eaten apples — outside basket */}
              <g transform="translate(220, 80)" opacity=".45">
                <circle cx="0" cy="0" r="11" fill="#E84A4A"/>
                <path d="M-6 -4 q-3 4 0 8" stroke="#fff" strokeWidth="3" fill="none"/>
              </g>
              <g transform="translate(258, 96)" opacity=".45">
                <circle cx="0" cy="0" r="11" fill="#E84A4A"/>
                <path d="M-6 -4 q-3 4 0 8" stroke="#fff" strokeWidth="3" fill="none"/>
              </g>
              <text x="240" y="46" fontFamily="Baloo 2" fontSize="14" fontWeight="700" fill="#5A4A3E">dimakan</text>
            </svg>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          {MISSION.options.map(opt => {
            const isPicked = picked?.id === opt.id;
            const isCorrect = picked && opt.correct;
            const wrong = isPicked && !opt.correct;
            const bg = isCorrect ? 'linear-gradient(180deg,#6FD296,#3BB273)'
                     : wrong     ? 'linear-gradient(180deg,#FFB0B0,#FF7A93)'
                     : '#fff';
            const color = isCorrect || wrong ? '#fff' : 'var(--ink-1)';
            return (
              <button key={opt.id} onClick={()=>onPick(opt)} className="card" style={{
                padding: '24px 16px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 28,
                background: bg,
                color,
                border: !picked ? '2px solid transparent' : 'none',
                transition: 'all .25s ease',
                transform: isPicked ? 'scale(1.04)' : 'scale(1)',
              }}>
                {opt.label}
                {isCorrect && <div style={{ fontSize: 13, marginTop: 4, fontWeight: 700 }}>Benar! 🎉</div>}
                {wrong && <div style={{ fontSize: 13, marginTop: 4, fontWeight: 700 }}>Coba lagi</div>}
              </button>
            );
          })}
        </div>

        {picked && !picked.correct && (
          <button onClick={()=>setPicked(null)} className="btn btn-secondary btn-block" style={{ marginTop: 14 }}>Coba Lagi</button>
        )}
      </div>

      {/* Reward overlay */}
      {showReward && (
        <div className="fade-in" style={{
          position: 'absolute', inset: 0,
          background: 'rgba(27,42,78,.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, zIndex: 10,
        }}>
          <div className="confetti-burst">{confettiPieces}</div>
          <div className="card" style={{ padding: 24, textAlign: 'center', maxWidth: 320, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Mascot size={120}/></div>
            <div className="display" style={{ fontSize: 26, marginTop: 6 }}>Kerja Bagus!</div>
            <div className="body" style={{ marginTop: 4 }}>Kamu dapat 3 bintang dan lencana baru.</div>
            <div className="row" style={{ justifyContent: 'center', gap: 6, marginTop: 12 }}>
              <Icon name="star" size={28} color="#FFC857"/>
              <Icon name="star" size={28} color="#FFC857"/>
              <Icon name="star" size={28} color="#FFC857"/>
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={()=>{ setShowReward(false); setPicked(null); go('peta',{ subjectId: 'mat' }); }} className="btn btn-primary btn-block">Lanjut Petualangan</button>
              <button onClick={()=>setShowReward(false)} className="btn btn-secondary btn-block">Lihat Lencana</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ModulHome = ModulHome;
window.LevelMap = LevelMap;
window.Mission = Mission;
