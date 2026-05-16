/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Home screen v3 (editorial layout, referensi Ruangguru/Duolingo style)
// ─────────────────────────────────────────────────────────────

const { useState: uSH, useEffect: uEH, useRef: uRH, useMemo: uMH } = React;

// ── TopBar ───────────────────────────────────────────────────
const TopBar = ({ go, child }) => {
  const unread = (window.NOTIFS || []).filter(n => n.unread).length;
  const initial = child ? child.name[0].toUpperCase() : '?';
  return (
    <div className="topbar" style={{ background: 'transparent' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--ink-1)', lineHeight: 1.15 }}>Hai! 👋</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, marginTop: 2 }}>
          {child ? `Pilihkan untuk ${child.name} hari ini` : 'Selamat datang di Cerria!'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={() => go('notifikasi')} style={{ width: 42, height: 42, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(180,90,40,.10)', position: 'relative', border: 'none', cursor: 'pointer' }}>
          <Icon name="sparkle" size={20} color="#FF8C42"/>
          {unread > 0 && <div style={{ position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: 999, background: '#E84A4A', border: '2px solid #fff' }}/>}
        </button>
        <button onClick={() => go('profil')} style={{ width: 42, height: 42, borderRadius: 999, background: 'linear-gradient(180deg,#FF9D5C,#FF7A3A)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 0 #C45A23' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>{initial}</span>
        </button>
      </div>
    </div>
  );
};

// ── Feature Chips (horizontal scroll) ───────────────────────
const FEATURES = [
  { id: 'buku',      label: 'Buku Cerita',   sub: '120+ cerita',  icon: 'book',     fg: '#C44A1E', bg: '#FFE3CD' },
  { id: 'video',     label: 'Video Book',    sub: '24 episode',   icon: 'play',     fg: '#1F5C8A', bg: '#CFE7F5' },
  { id: 'lagu',      label: 'Lagu Anak',     sub: '30+ lagu',     icon: 'volume',   fg: '#C0395B', bg: '#FFE8F0' },
  { id: 'modul',     label: 'Belajar',       sub: '4 mapel',      icon: 'map',      fg: '#2F6B4A', bg: '#D6EBC9' },
  { id: 'worksheet', label: 'Worksheet',     sub: '10 lembar',    icon: 'subtitle', fg: '#5B3A8A', bg: '#EDE0F7' },
  { id: 'majalah',   label: 'Majalah',       sub: 'Edisi Mei',    icon: 'magazine', fg: '#1A6EA8', bg: '#E8F8FF' },
];

const FeatureChips = ({ go }) => {
  const [active, setActive] = uSH('video');
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: 'var(--ink-1)' }}>Pilih Petualangan</div>
        <button onClick={() => go('buku')} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#FF7A3A', background: 'none', border: 'none', cursor: 'pointer' }}>Semua →</button>
      </div>
      <div style={{ overflowX: 'auto', paddingLeft: 20, paddingBottom: 4, scrollbarWidth: 'none', display: 'flex', gap: 10 }}>
        {FEATURES.map(f => {
          const isActive = active === f.id;
          return (
            <button key={f.id} onClick={() => { setActive(f.id); go(f.id); }} style={{
              flexShrink: 0, width: 96, padding: '12px 8px',
              borderRadius: 18,
              background: isActive ? '#fff' : f.bg,
              border: `2.5px solid ${isActive ? '#FF7A3A' : 'transparent'}`,
              boxShadow: isActive ? '0 4px 12px rgba(255,122,58,.22)' : 'none',
              textAlign: 'center', cursor: 'pointer', transition: 'all .18s ease',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: isActive ? f.bg : 'rgba(255,255,255,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <Icon name={f.icon} size={20} color={isActive ? f.fg : '#A89070'}/>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: isActive ? '#FF7A3A' : 'var(--ink-1)', lineHeight: 1.2 }}>{f.label}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>{f.sub}</div>
            </button>
          );
        })}
        <div style={{ width: 12, flexShrink: 0 }}/>
      </div>
    </div>
  );
};

// ── Recommendation Card (big) ────────────────────────────────
const RecoCard = ({ go, child }) => (
  <div style={{ margin: '20px 20px 0' }}>
    <div style={{ color: '#FF7A3A', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, letterSpacing: '.06em', marginBottom: 10 }}>
      ⭐ REKOMENDASI UNTUK {child ? child.name.toUpperCase() : 'KAMU'}
    </div>
    <div style={{ background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 20px rgba(180,90,40,.10)' }}>
      {/* Illustration area */}
      <div style={{ height: 160, background: 'linear-gradient(160deg,#E8F4FF 0%,#D2ECFF 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 110, height: 110, borderRadius: 999, background: 'rgba(255,255,255,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="play" size={56} color="#1A6EA8"/>
        </div>
        <div style={{ position: 'absolute', top: 12, left: 14 }}>
          <span style={{ background: '#FF7A3A', color: '#fff', padding: '5px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11 }}>Video Book · Baru</span>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 14, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(4px)', padding: '5px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="flame" size={12} color="#FF8C42"/>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: 'var(--ink-2)' }}>15 mnt</span>
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: 12, color: '#3BB273', fontWeight: 700, marginBottom: 4 }}>✓ Cocok untuk usia 6–8 tahun Tessa</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, color: 'var(--ink-1)', lineHeight: 1.2, marginBottom: 6 }}>Petualangan ke Luar Angkasa</div>
        <div style={{ fontSize: 13, color: '#C47A3A', fontWeight: 600, lineHeight: 1.45, marginBottom: 12 }}>Ikuti Kira menjelajahi planet-planet sambil belajar angka dan warna!</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: '#FFF3E8', color: '#C47A3A', padding: '5px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11 }}>6–8 tahun</span>
            <span style={{ background: '#EBF5FF', color: '#1A6EA8', padding: '5px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11 }}>Bahasa & Kognitif</span>
          </div>
          <button onClick={() => go('player', { epId: 'v2' })} style={{ width: 46, height: 46, borderRadius: 999, background: 'linear-gradient(180deg,#FF9D5C,#FF7A3A)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 0 #C45A23' }}>
            <Icon name="play" size={20} color="#fff"/>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── Lanjut Main ──────────────────────────────────────────────
const LanjutMain = ({ go }) => {
  const { BOOKS } = window.CERRIA_DATA;
  const book = BOOKS.find(b => b.progress > 0 && b.progress < 1);
  if (!book) return null;
  return (
    <div style={{ margin: '22px 20px 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: 'var(--ink-1)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="play" size={16} color="var(--ink-1)"/> Lanjut Membaca
      </div>
      <button onClick={() => go('reader', { bookId: book.id })} style={{ width: '100%', background: '#fff', borderRadius: 18, padding: '14px 14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 14px rgba(180,90,40,.08)', textAlign: 'left' }}>
        <BookCover theme={book.theme} title={book.title} w={56} h={76} rounded={10}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--ink-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>{Math.round(book.progress*100)}% selesai · Bab {book.currentChapter} dari {book.chapters}</div>
          <div style={{ marginTop: 8, height: 5, background: '#F0E6D0', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${book.progress*100}%`, background: 'linear-gradient(90deg,#FFD17A,#FF7A3A)', borderRadius: 999 }}/>
          </div>
        </div>
        <Icon name="arrow-right" size={18} color="#C4B49A"/>
      </button>
    </div>
  );
};

// ── Promo Banner ─────────────────────────────────────────────
const PromoBanner = ({ go }) => (
  <div style={{ margin: '14px 20px 0' }}>
    <div style={{ background: '#F0EBFF', borderRadius: 18, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -12, left: -12, width: 70, height: 70, borderRadius: 999, background: 'rgba(155,89,182,.10)' }}/>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: '#E0D5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="star" size={26} color="#8B59C6"/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10.5, color: '#8B59C6', letterSpacing: '.06em', textTransform: 'uppercase' }}>Full Akses</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--ink-1)', lineHeight: 1.2 }}>Semua fitur tanpa batas</div>
        <div style={{ fontSize: 12, color: '#8B59C6', fontWeight: 600 }}>Coba gratis 7 hari</div>
      </div>
      <button onClick={() => go('paket')} style={{ background: '#9B59B6', color: '#fff', padding: '9px 16px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 3px 0 #6E3D8A', flexShrink: 0 }}>
        Coba →
      </button>
    </div>
  </div>
);

// ── Mungkin Juga Suka ────────────────────────────────────────
const SUGGESTIONS = [
  { id: 's1', title: 'Singa Pemberani', sub: 'Video · 12 mnt',  icon: 'play',    fg: '#1F5C8A', bg: '#CFE7F5', target: 'player', params: { epId: 'v1' } },
  { id: 's2', title: 'Hitung Bintang',  sub: 'Misi · 10 mnt',   icon: 'map',     fg: '#2F6B4A', bg: '#D6EBC9', target: 'modul',  params: {} },
  { id: 's3', title: 'Kupu Cantik',     sub: 'Lagu · 3 mnt',    icon: 'volume',  fg: '#C0395B', bg: '#FFE8F0', target: 'lagu',   params: {} },
  { id: 's4', title: 'Taman Bunga',     sub: 'Buku · 8 mnt',    icon: 'book',    fg: '#C44A1E', bg: '#FFE3CD', target: 'buku',   params: {} },
];

const SuggestionRow = ({ go }) => (
  <div style={{ margin: '22px 0 0' }}>
    <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: 'var(--ink-1)' }}>Mungkin juga suka</div>
      <button onClick={() => go('buku')} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#FF7A3A', background: 'none', border: 'none', cursor: 'pointer' }}>Semua →</button>
    </div>
    <div style={{ overflowX: 'auto', paddingLeft: 20, paddingBottom: 4, scrollbarWidth: 'none', display: 'flex', gap: 12 }}>
      {SUGGESTIONS.map(s => (
        <button key={s.id} onClick={() => go(s.target, s.params)} style={{ flexShrink: 0, width: 110, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ width: 110, height: 100, borderRadius: 18, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <Icon name={s.icon} size={38} color={s.fg}/>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: 'var(--ink-1)', lineHeight: 1.2 }}>{s.title}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>{s.sub}</div>
        </button>
      ))}
      <div style={{ width: 8, flexShrink: 0 }}/>
    </div>
  </div>
);

// ── Home Screen ──────────────────────────────────────────────
const HomeScreen = ({ go, child }) => (
  <div className="scroll fade-in" style={{ background: 'var(--bg-app)' }}>
    <TopBar go={go} child={child}/>
    <FeatureChips go={go}/>
    <RecoCard go={go} child={child}/>
    <LanjutMain go={go}/>
    <PromoBanner go={go}/>
    <SuggestionRow go={go}/>
    <div className="bottom-spacer"/>
  </div>
);

// ── Bottom Nav (4 items + center video button) ───────────────
const BottomNav = ({ tab, setTab }) => {
  const items = [
    { id: 'home',   label: 'Beranda',  icon: 'home'   },
    { id: 'buku',   label: 'Jelajahi', icon: 'search' },
    { id: 'modul',  label: 'Belajar',  icon: 'map'    },
    { id: 'profil', label: 'Si Kecil', icon: 'badge'  },
  ];
  const videoActive = tab === 'video';
  return (
    <div className="bottom-nav-wrap">
      <div style={{
        background: '#fff', borderRadius: 999, padding: '6px 8px',
        display: 'flex', alignItems: 'center', gap: 0,
        boxShadow: '0 12px 30px rgba(180,90,40,.18), 0 2px 6px rgba(180,90,40,.10)',
        pointerEvents: 'auto',
      }}>
        {items.map((it, idx) => {
          const active = tab === it.id;
          return (
            <React.Fragment key={it.id}>
              {idx === 2 && (
                <button onClick={() => setTab('video')} style={{
                  width: 52, height: 52, borderRadius: 999, flexShrink: 0, margin: '0 4px',
                  background: videoActive ? 'linear-gradient(180deg,#FF9D5C,#FF7A3A)' : 'linear-gradient(180deg,#FF9D5C,#FF7A3A)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 0 #C45A23',
                }}>
                  <Icon name="play" size={22} color="#fff"/>
                </button>
              )}
              <button onClick={() => setTab(it.id)} style={{
                flex: 1, height: 56, borderRadius: 999,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                background: active ? 'linear-gradient(180deg,#FF9D5C,#FF7A3A)' : 'transparent',
                border: 'none', cursor: 'pointer', transition: 'all .18s ease',
                boxShadow: active ? '0 4px 10px rgba(255,122,58,.30)' : 'none',
              }}>
                <Icon name={it.icon} size={active ? 22 : 20} color={active ? '#fff' : '#A89070'}/>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: active ? 800 : 600, fontSize: 9.5, color: active ? '#fff' : '#A89070', lineHeight: 1 }}>{it.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

window.HomeScreen   = HomeScreen;
window.BottomNav    = BottomNav;
window.TopBar       = TopBar;
