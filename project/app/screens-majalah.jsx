/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Majalah: Cover + Article List + Article Detail
// ─────────────────────────────────────────────────────────────

const { useState: uSMag } = React;

const ARTICLES_FULL = [
  { id: 'a1', tag: 'Sains',  tagBg: '#D6EBC9', tagColor: '#2F6B4A', color: '#3BB273', title: 'Mengapa Laut Asin?',        mins: 3, emoji: '🌊',
    body: 'Air laut terasa asin karena mengandung garam mineral yang berasal dari batuan di daratan. Selama jutaan tahun, hujan melarutkan garam dari bebatuan dan membawanya ke sungai, lalu ke laut. Karena air laut terus menguap (menjadi awan dan hujan) sementara garamnya tidak ikut menguap, konsentrasi garam di laut terus meningkat.' },
  { id: 'a2', tag: 'Seni',   tagBg: '#FFE8F0', tagColor: '#C0395B', color: '#FF7A93', title: 'Mewarnai Ikan Pelangi',     mins: 5, emoji: '🐟',
    body: 'Ikan pelangi (Melanotaenia) adalah ikan air tawar yang berasal dari Australia dan Papua. Sisiknya memantulkan cahaya sehingga terlihat berwarna-warni seperti pelangi. Kamu bisa mencoba mewarnai ikan pelangi menggunakan krayon atau pensil warna. Gunakan minimal 5 warna berbeda untuk membuatnya tampak hidup!' },
  { id: 'a3', tag: 'Alam',   tagBg: '#CFE7F5', tagColor: '#1F5C8A', color: '#4EA8DE', title: 'Hewan-hewan di Sungai',     mins: 4, emoji: '🦦',
    body: 'Sungai adalah rumah bagi banyak hewan unik: berang-berang pembangun bendungan, kura-kura yang berjemur di batu, katak yang bernyanyi saat hujan, ikan-ikan warna-warni, dan capung dengan sayap berkilau. Setiap hewan memiliki peran penting dalam menjaga keseimbangan ekosistem sungai.' },
  { id: 'a4', tag: 'Kuis',   tagBg: '#FFE3CD', tagColor: '#C44A1E', color: '#FF8C42', title: 'Tebak Suara Binatang Air',  mins: 2, emoji: '🐸',
    body: 'Bisakah kamu menebak suara binatang air? Katak berbunyi "koak-koak", bangau bersuara "klak-klak", dan lumba-lumba berkomunikasi dengan bunyi klik dan siulan. Suara-suara ini digunakan untuk mencari makan, berkomunikasi dengan pasangan, dan menghindari bahaya.' },
  { id: 'a5', tag: 'Cerita', tagBg: '#EDE0F7', tagColor: '#5B3A8A', color: '#9B59B6', title: 'Si Kecil Ubur-Ubur',        mins: 6, emoji: '🪼',
    body: 'Namaku Jeli, ubur-ubur kecil yang tinggal di Samudra Biru. Setiap hari aku berenang mengikuti arus, melihat terumbu karang yang cantik dan ikan-ikan berwarna-warni. Suatu hari aku bertemu seekor penyu tua yang mengajariku tentang pentingnya menjaga kebersihan laut.' },
  { id: 'a6', tag: 'Tips',   tagBg: '#D6EBC9', tagColor: '#2F6B4A', color: '#3BB273', title: 'Hemat Air Setiap Hari',     mins: 3, emoji: '💧',
    body: 'Air adalah sumber kehidupan yang harus kita jaga. Cara mudah menghemat air: matikan keran saat menyikat gigi, mandi tidak terlalu lama, siram tanaman dengan air bekas cucian sayur, dan laporkan jika ada keran bocor. Setiap tetes air yang kita hemat sangat berarti!' },
];

// ── Majalah Cover + Article List ─────────────────────────────
const MajalahScreen = ({ go }) => {
  return (
    <div className="scroll fade-in">
      {/* Cover hero */}
      <div style={{ height: 220, background: 'linear-gradient(160deg, #1A9BE8 0%, #0A5FA8 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* wave deco */}
        <svg width="100%" height="220" viewBox="0 0 390 220" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <circle cx="60"  cy="40"  r="34" fill="rgba(255,255,255,.08)"/>
          <circle cx="330" cy="30"  r="50" fill="rgba(255,255,255,.07)"/>
          <circle cx="200" cy="80"  r="20" fill="rgba(255,255,255,.07)"/>
          {/* fish */}
          <ellipse cx="270" cy="70" rx="28" ry="12" fill="rgba(255,255,255,.13)" transform="rotate(-15 270 70)"/>
          <polygon points="295,64 315,58 295,78" fill="rgba(255,255,255,.13)"/>
          <ellipse cx="90"  cy="90" rx="16" ry="8"  fill="rgba(255,255,255,.10)" transform="rotate(10 90 90)"/>
          <polygon points="104,87 116,83 104,95" fill="rgba(255,255,255,.10)"/>
          {/* bubbles */}
          {[30,60,100,160,210,260,310,360].map((x,i)=>(
            <circle key={i} cx={x} cy={130+(i%3)*12} r={3+i%3} fill="rgba(255,255,255,.18)"/>
          ))}
          {/* waves */}
          <path d="M0 160 q48-22 96 0 q48-22 96 0 q48-22 96 0 q48-22 102 0 v60 H0z" fill="rgba(10,80,150,.50)"/>
          <path d="M0 178 q48-18 96 0 q48-18 96 0 q48-18 96 0 q48-18 102 0 v42 H0z" fill="rgba(8,60,120,.55)"/>
          {/* seaweed */}
          <path d="M340 220 q-12-14 0-28 q12-14 0-28 q-12-10 0-20" stroke="rgba(80,200,130,.5)" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M30 220 q10-12 0-24 q-10-12 0-24" stroke="rgba(80,200,130,.45)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </svg>
        {/* back button */}
        <button onClick={() => go('home')} style={{ position: 'absolute', top: 52, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={20} color="#fff"/>
        </button>
        {/* header text */}
        <div style={{ position: 'absolute', left: 20, bottom: 44, zIndex: 2 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.22)', backdropFilter: 'blur(6px)', padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, color: '#fff', letterSpacing: '.06em', marginBottom: 8 }}>MAJALAH · EDISI MEI 2026</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, color: '#fff', lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,.2)' }}>Negeri Air 🌊</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', marginTop: 4, fontWeight: 600 }}>6 artikel seru menunggu kamu!</div>
        </div>
        {/* fish emoji deco */}
        <div style={{ position: 'absolute', right: 20, bottom: 44, fontSize: 48, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.2))' }}>🐠</div>
      </div>

      {/* Articles */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: 'var(--ink-1)', marginBottom: 2 }}>Artikel Bulan Ini</div>
        {ARTICLES_FULL.map((a, i) => (
          <button key={a.id} onClick={() => go('artikel', { articleId: a.id })}
            style={{ width: '100%', textAlign: 'left', background: '#fff', borderRadius: 18, padding: '14px 14px', border: 'none', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 3px 10px rgba(180,90,40,.07)', transition: 'opacity .12s' }}>
            {/* emoji icon */}
            <div style={{ width: 56, height: 56, borderRadius: 16, background: a.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
              {a.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ background: a.tagBg, color: a.tagColor, padding: '2px 8px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10, letterSpacing: '.03em' }}>{a.tag}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>{a.mins} mnt baca</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--ink-1)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{a.body.substring(0, 70)}…</div>
            </div>
            <Icon name="arrow-right" size={16} color="#C4B49A"/>
          </button>
        ))}
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

// ── Article Detail ────────────────────────────────────────────
const ArticleDetail = ({ articleId, go }) => {
  const article = ARTICLES_FULL.find(a => a.id === articleId) || ARTICLES_FULL[0];
  const others = ARTICLES_FULL.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="scroll fade-in">
      {/* Hero */}
      <div style={{ height: 200, background: `linear-gradient(160deg, ${article.color}CC 0%, ${article.color} 100%)`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 90, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.15))' }}>{article.emoji}</div>
        <button onClick={() => go('majalah')} style={{ position: 'absolute', top: 52, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,.25)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={20} color="#fff"/>
        </button>
        <div style={{ position: 'absolute', top: 52, right: 16, display: 'flex', gap: 8 }}>
          <button style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,.25)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="heart" size={18} color="#fff"/>
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* tag + time */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          <span style={{ background: article.tagBg, color: article.tagColor, padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11 }}>{article.tag}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700 }}>{article.mins} menit baca</span>
        </div>
        {/* title */}
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--ink-1)', lineHeight: 1.15, marginBottom: 14 }}>{article.title}</div>
        {/* body */}
        <div style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.65, fontWeight: 500 }}>{article.body}</div>

        {/* Fun fact box */}
        <div style={{ marginTop: 20, background: article.tagBg, borderRadius: 18, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: article.tagColor, marginBottom: 4 }}>Tahukah kamu?</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, lineHeight: 1.5 }}>
              {article.tag === 'Sains' ? 'Air laut memiliki kadar garam sekitar 3.5% — artinya dalam 1 liter air laut ada sekitar 35 gram garam!' :
               article.tag === 'Alam'  ? 'Berang-berang adalah satu-satunya hewan selain manusia yang bisa mengubah bentang alam secara signifikan!' :
               article.tag === 'Seni'  ? 'Ikan pelangi bisa hidup hingga 5 tahun dan bisa mengenali wajah pemiliknya!' :
               'Kamu sudah membaca artikel ini — keren sekali! Terus belajar dan jelajahi dunia.'}
            </div>
          </div>
        </div>

        {/* Artikel lainnya */}
        {others.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--ink-1)', marginBottom: 10 }}>Artikel Lainnya</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {others.map(o => (
                <button key={o.id} onClick={() => go('artikel', { articleId: o.id })}
                  style={{ width: '100%', textAlign: 'left', background: '#fff', borderRadius: 14, padding: '12px 14px', border: 'none', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(180,90,40,.06)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: o.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{o.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13.5, color: 'var(--ink-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{o.mins} mnt · {o.tag}</div>
                  </div>
                  <Icon name="arrow-right" size={14} color="#C4B49A"/>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bottom-spacer"/>
    </div>
  );
};

window.MajalahScreen  = MajalahScreen;
window.ArticleDetail  = ArticleDetail;
window.ARTICLES_FULL  = ARTICLES_FULL;
