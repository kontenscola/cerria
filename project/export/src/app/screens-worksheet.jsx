/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Worksheet Anak: Library + Viewer
// ─────────────────────────────────────────────────────────────

const { useState: uSW } = React;

const WORKSHEETS = [
  // Matematika
  { id: 'w1', title: 'Menghitung Apel',       subject: 'mat', age: '3-5', color: '#4EA8DE', pages: 2,  difficulty: 'Mudah',   preview: 'apples',  desc: 'Latihan menghitung buah dengan gambar berwarna.' },
  { id: 'w2', title: 'Penjumlahan 1–10',      subject: 'mat', age: '6-8', color: '#4EA8DE', pages: 4,  difficulty: 'Mudah',   preview: 'numbers', desc: 'Soal penjumlahan dasar dengan gambar bantu.' },
  { id: 'w3', title: 'Pengurangan Seru',      subject: 'mat', age: '6-8', color: '#4EA8DE', pages: 3,  difficulty: 'Sedang',  preview: 'numbers', desc: 'Latihan pengurangan dengan cerita bergambar.' },
  // Bahasa Indonesia
  { id: 'w4', title: 'Menebalkan Huruf A–Z',  subject: 'bin', age: '3-5', color: '#FF8C42', pages: 6,  difficulty: 'Mudah',   preview: 'letters', desc: 'Latihan menebalkan huruf kapital dan kecil.' },
  { id: 'w5', title: 'Menulis Kata Pertama',  subject: 'bin', age: '6-8', color: '#FF8C42', pages: 4,  difficulty: 'Mudah',   preview: 'letters', desc: 'Salin dan tulis kata-kata sederhana.' },
  { id: 'w6', title: 'Kalimat Sederhana',     subject: 'bin', age: '6-8', color: '#FF8C42', pages: 5,  difficulty: 'Sedang',  preview: 'letters', desc: 'Susun kata menjadi kalimat yang benar.' },
  // Sains
  { id: 'w7', title: 'Bagian Tubuh Tumbuhan', subject: 'sci', age: '6-8', color: '#3BB273', pages: 3,  difficulty: 'Mudah',   preview: 'science', desc: 'Labeli bagian-bagian tumbuhan: akar, batang, daun.' },
  { id: 'w8', title: 'Hewan dan Makanannya',  subject: 'sci', age: '6-8', color: '#3BB273', pages: 4,  difficulty: 'Sedang',  preview: 'science', desc: 'Hubungkan hewan dengan jenis makanannya.' },
  // Kreativitas
  { id: 'w9', title: 'Mewarnai Hutan Ajaib',  subject: 'art', age: '3-5', color: '#9B59B6', pages: 8,  difficulty: 'Seru',    preview: 'art',    desc: 'Delapan gambar hutan & hewan untuk diwarnai.' },
  { id: 'w10',title: 'Membuat Kartu Ucapan',  subject: 'art', age: '6-8', color: '#9B59B6', pages: 2,  difficulty: 'Seru',    preview: 'art',    desc: 'Template kartu ulang tahun dan hari ibu.' },
];

const SUBJECTS_WS = [
  { id: 'semua', label: 'Semua',        color: '#FF8C42' },
  { id: 'mat',   label: '➕ Matematika', color: '#4EA8DE' },
  { id: 'bin',   label: '✏️ Bahasa',    color: '#FF8C42' },
  { id: 'sci',   label: '🔬 Sains',     color: '#3BB273' },
  { id: 'art',   label: '🎨 Seni',      color: '#9B59B6' },
];

const DIFF_COLORS = { Mudah: '#3BB273', Sedang: '#FF8C42', Seru: '#9B59B6' };

// Worksheet page preview — rendered as inline SVG
const WsPreview = ({ kind, color, w = 240, h = 160, rounded = 14 }) => {
  if (kind === 'apples') return (
    <svg width={w} height={h} viewBox="0 0 240 160" style={{ display:'block', borderRadius: rounded }}>
      <rect width="240" height="160" rx={rounded} fill="#FFF6E6"/>
      <text x="120" y="28" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="800" fill="#3A2A1E">Menghitung Apel</text>
      <rect x="16" y="36" width="208" height="1" fill="#E8D8C0"/>
      {[0,1,2,3,4].map(i=>(
        <g key={i} transform={`translate(${26+i*42},75)`}>
          <circle cx="0" cy="0" r="15" fill="#E84A4A"/>
          <ellipse cx="-4" cy="-6" rx="5" ry="3" fill="#fff" opacity=".3"/>
          <path d="M0 -16 q4 -3 6 0" stroke="#5A3520" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
      ))}
      <text x="120" y="118" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="700" fill="#8C7A6B">Ada berapa apel? ___</text>
      <rect x="24" y="128" width="192" height="24" rx="8" fill="#FFF3DE" stroke="#E8D8C0" strokeWidth="1.5"/>
    </svg>
  );
  if (kind === 'numbers') return (
    <svg width={w} height={h} viewBox="0 0 240 160" style={{ display:'block', borderRadius: rounded }}>
      <rect width="240" height="160" rx={rounded} fill="#EBF5FF"/>
      <text x="120" y="28" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="800" fill="#1F5C8A">Penjumlahan</text>
      <rect x="16" y="36" width="208" height="1" fill="#C9E0F4"/>
      {[[1,2],[3,1],[4,3]].map(([a,b],i)=>(
        <g key={i} transform={`translate(0,${50+i*30})`}>
          <text x="40" textAnchor="middle" y="18" fontFamily="Baloo 2" fontSize="18" fontWeight="800" fill="#1F5C8A">{a}</text>
          <text x="80" textAnchor="middle" y="18" fontFamily="Baloo 2" fontSize="16" fontWeight="700" fill="#4EA8DE">+</text>
          <text x="120" textAnchor="middle" y="18" fontFamily="Baloo 2" fontSize="18" fontWeight="800" fill="#1F5C8A">{b}</text>
          <text x="158" textAnchor="middle" y="18" fontFamily="Baloo 2" fontSize="16" fontWeight="700" fill="#4EA8DE">=</text>
          <rect x="170" y="2" width="44" height="20" rx="6" fill="#fff" stroke="#C9E0F4" strokeWidth="1.5"/>
        </g>
      ))}
    </svg>
  );
  if (kind === 'letters') return (
    <svg width={w} height={h} viewBox="0 0 240 160" style={{ display:'block', borderRadius: rounded }}>
      <rect width="240" height="160" rx={rounded} fill="#FFF4EA"/>
      <text x="120" y="28" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="800" fill="#C44A1E">Huruf A–Z</text>
      <rect x="16" y="36" width="208" height="1" fill="#FFD9C0"/>
      {['A','B','C','D','E','F','G','H'].map((l,i)=>(
        <g key={l} transform={`translate(${20+i*28}, 60)`}>
          <rect x="-10" y="-16" width="22" height="22" rx="6" fill="#FFE3CD"/>
          <text textAnchor="middle" y="0" fontFamily="Baloo 2" fontSize="16" fontWeight="800" fill="#C44A1E" opacity=".3">{l}</text>
        </g>
      ))}
      {/* tracing dots */}
      {[0,1,2,3,4,5].map(i=>(
        <circle key={i} cx={30+i*34} cy={118} r="3" fill="none" stroke="#FFB390" strokeWidth="1.5" strokeDasharray="2 3"/>
      ))}
      <rect x="24" y="128" width="192" height="20" rx="6" fill="#FFF3DE" stroke="#FFD9C0" strokeWidth="1.5"/>
    </svg>
  );
  if (kind === 'science') return (
    <svg width={w} height={h} viewBox="0 0 240 160" style={{ display:'block', borderRadius: rounded }}>
      <rect width="240" height="160" rx={rounded} fill="#E8F6EE"/>
      <text x="120" y="28" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="800" fill="#1F4E36">Tumbuhan</text>
      <rect x="16" y="36" width="208" height="1" fill="#BCDFC9"/>
      {/* simple plant */}
      <line x1="120" y1="145" x2="120" y2="90" stroke="#5A3520" strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="88" cy="90" rx="22" ry="14" fill="#3BB273" transform="rotate(-20 88 90)"/>
      <ellipse cx="152" cy="85" rx="22" ry="14" fill="#6FD296" transform="rotate(20 152 85)"/>
      <ellipse cx="120" cy="64" rx="18" ry="28" fill="#3BB273"/>
      <ellipse cx="120" cy="148" rx="28" ry="7" fill="#8B5E3C" opacity=".6"/>
      {['Daun','Batang','Akar'].map((l,i)=>(
        <g key={l}>
          <rect x={152+0*0} y={40+i*32} width="70" height="20" rx="6" fill="#fff" stroke="#BCDFC9" strokeWidth="1.5"/>
          <text x="187" y={54+i*32} textAnchor="middle" fontFamily="Nunito" fontSize="11" fontWeight="700" fill="#2F6B4A">{l}</text>
        </g>
      ))}
    </svg>
  );
  // art
  return (
    <svg width={w} height={h} viewBox="0 0 240 160" style={{ display:'block', borderRadius: rounded }}>
      <rect width="240" height="160" rx={rounded} fill="#F2EAF9"/>
      <text x="120" y="28" textAnchor="middle" fontFamily="Baloo 2" fontSize="13" fontWeight="800" fill="#5B3A8A">Mewarnai</text>
      <rect x="16" y="36" width="208" height="1" fill="#D9CAF0"/>
      {/* palette dots */}
      {['#E84A4A','#FF8C42','#FFC857','#3BB273','#4EA8DE','#9B59B6'].map((c,i)=>(
        <circle key={i} cx={40+i*30} cy={90} r={12} fill={c} opacity=".7"/>
      ))}
      {/* butterfly outline */}
      <g transform="translate(92,110)">
        <path d="M0 0 q-20-30-40-20 q0 20 40 20z" fill="none" stroke="#5B3A8A" strokeWidth="2"/>
        <path d="M0 0 q20-30 40-20 q0 20-40 20z" fill="none" stroke="#5B3A8A" strokeWidth="2"/>
        <path d="M0 0 q-10 10-14 22" stroke="#5B3A8A" strokeWidth="2" fill="none"/>
        <path d="M0 0 q10 10 14 22" stroke="#5B3A8A" strokeWidth="2" fill="none"/>
        <circle cx="0" cy="0" r="4" fill="#5B3A8A"/>
      </g>
    </svg>
  );
};

// ── Worksheet Library ─────────────────────────────────────────
const WorksheetLibrary = ({ go }) => {
  const [subject, setSubject] = uSW('semua');
  const filtered = subject === 'semua' ? WORKSHEETS : WORKSHEETS.filter(w => w.subject === subject);

  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <div>
          <div className="display" style={{ fontSize: 26 }}>Worksheet</div>
          <div className="greet-sub">Latihan seru buat anak aktif!</div>
        </div>
        <div className="avatar"><Mascot size={40}/></div>
      </div>

      {/* filter strip */}
      <div style={{ overflowX:'auto', padding:'12px 18px 0', whiteSpace:'nowrap' }}>
        <div style={{ display:'inline-flex', gap:8 }}>
          {SUBJECTS_WS.map(s=>(
            <button key={s.id} onClick={()=>setSubject(s.id)} className="chip" style={{
              background: subject===s.id ? s.color : '#fff',
              color: subject===s.id ? '#fff' : 'var(--ink-2)',
              fontFamily:'var(--font-display)', fontWeight:700,
              padding:'10px 16px', borderRadius:999,
              boxShadow: subject===s.id ? '0 4px 0 rgba(0,0,0,.15)' : 'var(--shadow-card)',
              transition:'all .15s ease',
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:'14px 18px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {filtered.map(ws=>(
          <button key={ws.id} onClick={()=>go('worksheet-viewer',{ wsId: ws.id })} className="card" style={{ padding:10, textAlign:'left', display:'block' }}>
            <WsPreview kind={ws.preview} color={ws.color} w="100%" h={130} rounded={12}/>
            <div className="h3" style={{ marginTop:10, fontSize:14, fontFamily:'var(--font-display)', lineHeight:1.2 }}>{ws.title}</div>
            <div className="row" style={{ marginTop:6, justifyContent:'space-between' }}>
              <span className="tag" style={{ background: ws.color+'22', color: ws.color, fontSize:10.5 }}>{ws.difficulty}</span>
              <span className="small">{ws.pages} hal.</span>
            </div>
          </button>
        ))}
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

// ── Worksheet Viewer ──────────────────────────────────────────
const WorksheetViewer = ({ wsId, go }) => {
  const ws = WORKSHEETS.find(w => w.id === wsId) || WORKSHEETS[0];
  const [page, setPage] = uSW(0);
  const [done, setDone] = uSW(false);

  return (
    <div className="app">
      <div className="topbar">
        <button onClick={()=>go('worksheet')} className="btn-icon-round"><Icon name="arrow-left" size={20}/></button>
        <div style={{ textAlign:'center' }}>
          <div className="h3" style={{ fontFamily:'var(--font-display)' }}>{ws.title}</div>
          <div className="small">Hal. {page+1} dari {ws.pages}</div>
        </div>
        <button className="btn-icon-round" style={{ background: ws.color, color:'#fff', boxShadow:`0 3px 0 rgba(0,0,0,.18)` }}>
          <Icon name="menu-dots" size={18}/>
        </button>
      </div>

      {/* page progress */}
      <div className="wrap" style={{ marginTop:0 }}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width:`${((page+1)/ws.pages)*100}%`, background: ws.color }}/>
        </div>
      </div>

      <div className="scroll" style={{ padding:'14px 18px' }}>
        {/* worksheet page */}
        <div className="card" style={{ padding:20, minHeight:380, position:'relative' }}>
          {/* worksheet header */}
          <div className="row" style={{ justifyContent:'space-between', marginBottom:14 }}>
            <div>
              <div className="small" style={{ color:ws.color, fontWeight:800, textTransform:'uppercase', letterSpacing:'.04em' }}>{['Matematika','Bahasa Indonesia','Sains','Seni'][['mat','bin','sci','art'].indexOf(ws.subject)] || 'Pelajaran'}</div>
              <div className="h3" style={{ fontFamily:'var(--font-display)' }}>{ws.title}</div>
            </div>
            <div className="small" style={{ background:ws.color+'18', color:ws.color, padding:'4px 10px', borderRadius:999, fontWeight:700, height:'fit-content' }}>Hal. {page+1}</div>
          </div>
          <div style={{ height:1, background:'var(--ink-line)', marginBottom:14 }}/>

          {/* Content area — interactive worksheet */}
          {ws.preview === 'numbers' || ws.preview === 'apples' ? (
            <div>
              <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, marginBottom:14 }}>
                {page===0 ? 'Hitunglah benda-benda berikut dan tulis jawabannya!' : 'Lengkapi penjumlahan di bawah ini!'}
              </p>
              {[[2,3],[4,1],[5,2]].map(([a,b],i)=>(
                <div key={i} className="card" style={{ padding:'14px 16px', marginBottom:10, display:'flex', alignItems:'center', justifyContent:'space-between', background:'#FAFAFA' }}>
                  <div className="row" style={{ gap:8 }}>
                    {Array.from({length:a}).map((_,j)=>(
                      <div key={j} style={{ width:30,height:30,borderRadius:8,background:ws.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>★</div>
                    ))}
                    <span style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:20,color:'var(--ink-2)' }}>+</span>
                    {Array.from({length:b}).map((_,j)=>(
                      <div key={j} style={{ width:30,height:30,borderRadius:8,background:'#FFE3CD',color:'#C44A1E',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>★</div>
                    ))}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:20 }}>=</span>
                    <div style={{ width:48,height:40,borderRadius:12,border:`2.5px solid ${ws.color}`,background:`${ws.color}10`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontWeight:800,fontSize:20,color:done?ws.color:'transparent' }}>{a+b}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : ws.preview === 'letters' ? (
            <div>
              <p style={{ fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginBottom:14 }}>Tebalkan huruf-huruf berikut!</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
                {['A','B','C','D','E','F','G','H'].map((l)=>(
                  <div key={l} style={{ aspectRatio:'1', borderRadius:14, background:'#FFF4EA', border:`2px dashed ${ws.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:32, color:ws.color+'55' }}>{l}</div>
                ))}
              </div>
            </div>
          ) : ws.preview === 'art' ? (
            <div>
              <p style={{ fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginBottom:14 }}>Warnai gambar di bawah ini!</p>
              <WsPreview kind="art" color={ws.color} w="100%" h={200} rounded={14}/>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginBottom:14 }}>Pasangkan dengan garis!</p>
              <div className="row" style={{ justifyContent:'space-between', gap:10 }}>
                <div className="col" style={{ gap:16 }}>
                  {['🐄 Sapi','🐔 Ayam','🐟 Ikan'].map(a=>(
                    <div key={a} className="chip" style={{ background:'#E8F6EE',color:'#2F6B4A',fontWeight:700 }}>{a}</div>
                  ))}
                </div>
                <div style={{ width:60, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="40" height="120" viewBox="0 0 40 120">
                    <path d="M20 15 q-30 30 20 45" stroke={ws.color} strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
                    <path d="M20 60 q30 0 0 45" stroke={ws.color} strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="col" style={{ gap:16 }}>
                  {['🌾 Rumput','🪱 Cacing','🐛 Serangga'].map(b=>(
                    <div key={b} className="chip" style={{ background:'#E8F6EE',color:'#2F6B4A',fontWeight:700 }}>{b}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* navigation */}
        <div className="row" style={{ marginTop:16, gap:10 }}>
          <button onClick={()=>setPage(p=>Math.max(0,p-1))} className="btn btn-secondary" style={{ flex:1 }} disabled={page===0}>
            <Icon name="arrow-left" size={18}/> Sebelumnya
          </button>
          {page < ws.pages-1 ? (
            <button onClick={()=>setPage(p=>p+1)} className="btn btn-primary" style={{ flex:1 }}>
              Lanjut <Icon name="arrow-right" size={18}/>
            </button>
          ) : (
            <button onClick={()=>setDone(true)} className="btn btn-primary" style={{ flex:1 }}>
              Selesai! <Icon name="star" size={18}/>
            </button>
          )}
        </div>

        <div style={{ height:20 }}/>
      </div>

      {/* Completion overlay */}
      {done && (
        <div className="fade-in" style={{ position:'absolute', inset:0, background:'rgba(27,42,78,.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, zIndex:10 }}>
          <div className="card" style={{ padding:24, textAlign:'center', maxWidth:300, width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'center' }}><Mascot size={100}/></div>
            <div className="display" style={{ fontSize:24, marginTop:8 }}>Hebat sekali!</div>
            <div className="body" style={{ marginTop:4 }}>Kamu menyelesaikan worksheet <b>{ws.title}</b>.</div>
            <div className="row" style={{ justifyContent:'center', gap:6, marginTop:12 }}>
              <Icon name="star" size={26} color="#FFC857"/>
              <Icon name="star" size={26} color="#FFC857"/>
              <Icon name="star" size={26} color="#FFC857"/>
            </div>
            <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:10 }}>
              <button onClick={()=>{setDone(false); setPage(0);}} className="btn btn-primary btn-block">Ulangi</button>
              <button onClick={()=>go('worksheet')} className="btn btn-secondary btn-block">Pilih Worksheet Lain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.WorksheetLibrary = WorksheetLibrary;
window.WorksheetViewer = WorksheetViewer;
window.WORKSHEETS = WORKSHEETS;
