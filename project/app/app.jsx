/* global React, ReactDOM, IOSDevice, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect */
// ─────────────────────────────────────────────────────────────
// Cerria — App router + responsive layout v3
// ─────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "navStyle": "pill",
  "primaryHue": "orange",
  "background": "peach",
  "showStreak": true,
  "density": "cozy",
  "showFrame": false
}/*EDITMODE-END*/;

const SCREENS = [
  { id: 'home',              tab: 'home'   },
  { id: 'buku',              tab: 'buku'   },
  { id: 'detail',            tab: 'buku'   },
  { id: 'reader',            tab: 'buku'   },
  { id: 'modul',             tab: 'modul'  },
  { id: 'peta',              tab: 'modul'  },
  { id: 'misi',              tab: 'modul'  },
  { id: 'video',             tab: 'video'  },
  { id: 'player',            tab: 'video'  },
  { id: 'lagu',              tab: null     },
  { id: 'lagu-player',       tab: null     },
  { id: 'worksheet',         tab: null     },
  { id: 'worksheet-viewer',  tab: null     },
  { id: 'profil',            tab: 'profil' },
  { id: 'notifikasi',        tab: null     },
  { id: 'majalah',           tab: null     },
  { id: 'artikel',           tab: null     },
  { id: 'parent-pin',        tab: null     },
  { id: 'parent-dash',       tab: null     },
  { id: 'report',            tab: null     },
  { id: 'login',             tab: null     },
  { id: 'register',          tab: null     },
  { id: 'paket',             tab: null     },
  { id: 'add-child',         tab: null     },
];

const PRIMARY_HUES = {
  orange: { c1: '#FF9D5C', c2: '#FF7A3A', shadow: '#C45A23' },
  yellow: { c1: '#FFD17A', c2: '#FFB347', shadow: '#A87412' },
  green:  { c1: '#6FD296', c2: '#3BB273', shadow: '#228653' },
  blue:   { c1: '#7BC8E8', c2: '#4EA8DE', shadow: '#2A7AB5' },
  purple: { c1: '#C28BD9', c2: '#9B59B6', shadow: '#6E3D8A' },
};

const BG_GRADIENTS = {
  peach: 'radial-gradient(900px 500px at 80% -10%, #FFD9C0 0%, transparent 60%), radial-gradient(700px 500px at 0% 100%, #FFE9D2 0%, transparent 60%), linear-gradient(180deg,#FFE3CD 0%,#FFD2BB 100%)',
  green: 'radial-gradient(900px 500px at 80% -10%, #C9E8B6 0%, transparent 60%), radial-gradient(700px 500px at 0% 100%, #DFF0CF 0%, transparent 60%), linear-gradient(180deg,#E5F2D5 0%,#C9E1B4 100%)',
  cream: 'radial-gradient(900px 500px at 80% -10%, #FFF1D4 0%, transparent 60%), radial-gradient(700px 500px at 0% 100%, #FFE6BE 0%, transparent 60%), linear-gradient(180deg,#FFF4DC 0%,#FFE5B8 100%)',
};

// ── Breakpoint hook ──────────────────────────────────────────
function useBreakpoint() {
  const get = () => window.innerWidth >= 1024 ? 'desktop' : window.innerWidth >= 640 ? 'tablet' : 'mobile';
  const [bp, setBp] = React.useState(get);
  React.useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return bp;
}

// ── Desktop sidebar ──────────────────────────────────────────
const FEATURES_SIDEBAR = [
  { icon: 'book',     label: 'Buku & Cerita',        sub: '120+ cerita interaktif',   color: '#FFE3CD', fg: '#C44A1E' },
  { icon: 'map',      label: 'Modul Belajar',         sub: 'Matematika, Bahasa & IPA', color: '#D6EBC9', fg: '#2F6B4A' },
  { icon: 'volume',   label: 'Lagu Anak',             sub: '30+ lagu tradisional',     color: '#FFE8F0', fg: '#C0395B' },
  { icon: 'subtitle', label: 'Worksheet Interaktif',  sub: 'Cetak atau kerjakan online',color: '#EDE0F7', fg: '#5B3A8A' },
];

const DesktopSidebar = ({ go }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <img src="uploads/cerria-fix.png" alt="Cerria" style={{ width: 140, filter: 'drop-shadow(0 4px 12px rgba(180,90,40,.18))' }}/>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#2A1F10', marginTop: 10, lineHeight: 1.15 }}>
        Literasi Digital<br/>untuk Anak Indonesia
      </div>
      <div style={{ fontSize: 14, color: '#8C7A5A', fontWeight: 600, marginTop: 8, lineHeight: 1.55 }}>
        Buku, lagu, video, dan modul belajar yang menyenangkan untuk usia 3–12 tahun.
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {FEATURES_SIDEBAR.map(f => (
        <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(180,90,40,.07)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={f.icon} size={20} color={f.fg}/>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#2A1F10' }}>{f.label}</div>
            <div style={{ fontSize: 12, color: '#8C7A6B', fontWeight: 600 }}>{f.sub}</div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ background: 'linear-gradient(135deg,#FFD17A,#FF8C42)', borderRadius: 20, padding: '18px 20px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#fff' }}>Full Akses — Rp 20.000/bln</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,.9)', marginTop: 4, fontWeight: 600 }}>Semua fitur tanpa batas. Bebas batal kapan saja.</div>
      <button onClick={() => go('paket')} style={{ marginTop: 12, height: 40, padding: '0 20px', background: '#fff', color: '#C44A1E', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 3px 0 rgba(0,0,0,.12)' }}>
        Mulai Gratis →
      </button>
    </div>

    <div style={{ fontSize: 12, color: '#B09880', textAlign: 'center', fontWeight: 600 }}>
      © 2026 Cerria · Bahasa Indonesia
    </div>
  </div>
);

// ── Shared quick-nav for tweaks ───────────────────────────────
const NavGrid = ({ go, route }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
    {[
      ['login','Login'],['register','Register'],['paket','Paket'],['add-child','Tambah Anak'],
      ['home','Beranda'],['buku','Buku'],['detail','Detail'],['reader','Reader'],
      ['modul','Modul'],['peta','Peta Level'],['misi','Misi'],
      ['video','Video'],['player','Player'],
      ['lagu','Lagu'],['lagu-player','Lagu Player'],
      ['worksheet','Worksheet'],['worksheet-viewer','WS Viewer'],
      ['majalah','Majalah'],['artikel','Artikel'],
      ['profil','Profil'],['notifikasi','Notif'],
      ['parent-pin','Parent PIN'],['parent-dash','Parent Dash'],['report','Laporan'],
    ].map(([id,label]) => (
      <button key={id} onClick={() => {
        const p = id==='detail'?{bookId:'b1'}:id==='reader'?{bookId:'b1'}:id==='peta'?{subjectId:'mat'}:id==='player'?{epId:'v1'}:id==='artikel'?{articleId:'a1'}:id==='lagu-player'?{songId:'s1'}:id==='worksheet-viewer'?{wsId:'w1'}:{};
        go(id, p);
      }} style={{ padding:'8px 10px', fontSize:11, borderRadius:8, background: route===id?'#FF7A3A':'rgba(255,255,255,.10)', color: route===id?'#fff':'inherit', fontWeight:700, fontFamily:'inherit', border:'1px solid rgba(255,255,255,.10)', cursor:'pointer' }}>{label}</button>
    ))}
  </div>
);

// ── App ──────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({ id: 'login', params: {} });
  const [session, setSession] = React.useState(undefined);
  const [activeChild, setActiveChild] = React.useState(null);
  const bp = useBreakpoint();

  const afterLogin = async (s) => {
    const children = await window.CerriaDB.getChildren(s.user.id);
    if (children.length === 0) {
      setRoute({ id: 'add-child', params: {} });
    } else {
      setActiveChild(children[0]);
      setRoute({ id: 'home', params: {} });
    }
  };

  // Auth state listener
  React.useEffect(() => {
    window.CerriaDB.getSession().then(s => {
      setSession(s);
      if (s) afterLogin(s);
      else setSession(null);
    });
    const sub = window.CerriaDB.onAuthChange(s => {
      setSession(s);
      if (!s) { setActiveChild(null); setRoute({ id: 'login', params: {} }); }
      else if (['login','register','paket','add-child'].includes(route.id)) afterLogin(s);
    });
    return () => sub.unsubscribe();
  }, []);

  const go = (id, params = {}) => setRoute({ id, params });
  const setTab = (tab) => {
    const map = { home:'home', buku:'buku', modul:'modul', video:'video', profil:'profil' };
    go(map[tab] || 'home');
  };

  // Screens that manage their own full-bleed container
  const isSelfShell = ['reader','peta','misi','player','parent-pin','parent-dash',
    'login','register','paket','lagu-player','add-child'].includes(route.id);

  // Screens that hide the bottom nav
  const hideNav = ['reader','peta','misi','player','parent-pin','parent-dash',
    'report','login','register','paket','lagu-player','worksheet-viewer','notifikasi','add-child'].includes(route.id);

  const currentTab = (SCREENS.find(s => s.id === route.id) || {}).tab;
  const hasFrame = bp === 'desktop' && t.showFrame;

  React.useEffect(() => {
    const h = PRIMARY_HUES[t.primaryHue] || PRIMARY_HUES.orange;
    document.documentElement.style.setProperty('--c-primary-1', h.c1);
    document.documentElement.style.setProperty('--c-primary-2', h.c2);
    document.documentElement.style.setProperty('--c-primary-shadow', h.shadow);
  }, [t.primaryHue]);

  // Show splash while checking initial session
  if (session === undefined) {
    return (
      <div className="app" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, background:'#FAF5E9' }}>
        <img src="uploads/cerria-fix.png" alt="Cerria" style={{ width:160, filter:'drop-shadow(0 3px 8px rgba(180,90,40,.18))' }}/>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, color:'#A89070' }}>Memuat...</div>
      </div>
    );
  }

  let screen;
  switch (route.id) {
    case 'home':             screen = <window.HomeScreen go={go}/>; break;
    case 'buku':             screen = <window.BukuLibrary go={go}/>; break;
    case 'detail':           screen = <window.BukuDetail go={go} bookId={route.params.bookId}/>; break;
    case 'reader':           screen = <window.Reader go={go} bookId={route.params.bookId} mode={route.params.mode||'read'} child={activeChild}/>; break;
    case 'modul':            screen = <window.ModulHome go={go}/>; break;
    case 'peta':             screen = <window.LevelMap go={go} subjectId={route.params.subjectId}/>; break;
    case 'misi':             screen = <window.Mission go={go} child={activeChild} levelId={route.params.levelId} subjectId={route.params.subjectId}/>; break;
    case 'video':            screen = <window.VideoHome go={go}/>; break;
    case 'player':           screen = <window.VideoPlayer go={go} epId={route.params.epId}/>; break;
    case 'lagu':             screen = <window.LaguLibrary go={go}/>; break;
    case 'lagu-player':      screen = <window.LaguPlayer go={go} songId={route.params.songId}/>; break;
    case 'worksheet':        screen = <window.WorksheetLibrary go={go}/>; break;
    case 'worksheet-viewer': screen = <window.WorksheetViewer go={go} wsId={route.params.wsId}/>; break;
    case 'profil':           screen = <window.ProfileScreen go={go} child={activeChild}/>; break;
    case 'add-child':        screen = <window.AddChild go={go} session={session} onCreated={c => { setActiveChild(c); go('home'); }}/>; break;
    case 'notifikasi':       screen = <window.NotifikasiScreen go={go}/>; break;
    case 'majalah':          screen = <window.MajalahScreen go={go}/>; break;
    case 'artikel':          screen = <window.ArticleDetail go={go} articleId={route.params.articleId}/>; break;
    case 'parent-pin':       screen = <window.ParentPin go={go}/>; break;
    case 'parent-dash':      screen = <window.ParentDash go={go} child={activeChild}/>; break;
    case 'report':           screen = <window.Report go={go} child={activeChild}/>; break;
    case 'login':            screen = <window.Login go={go}/>; break;
    case 'register':         screen = <window.Register go={go}/>; break;
    case 'paket':            screen = <window.Paket go={go}/>; break;
    default:                 screen = <window.HomeScreen go={go}/>;
  }

  // Wrap non-self-shell screens in the .app container
  const inner = isSelfShell ? screen : (
    <div className={`app ${hasFrame ? 'has-status-bar' : 'no-status-bar'}`}>
      {screen}
      {!hideNav && <BottomNav tab={currentTab || 'home'} setTab={setTab}/>}
      {route.id === 'home' && (
        <button onClick={() => go('parent-pin')} style={{
          position:'absolute', right:16, top: hasFrame ? 70 : 14, zIndex:4,
          width:38, height:38, borderRadius:999,
          background:'rgba(255,255,255,.7)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 10px rgba(180,90,40,.15)', border:'none', cursor:'pointer',
        }}>
          <Icon name="shield" size={18} color="#9B59B6"/>
        </button>
      )}
    </div>
  );

  // ── Mobile (< 640px): full viewport, no chrome ───────────
  if (bp === 'mobile') {
    return (
      <>
        <div style={{ width:'100vw', height:'100dvh', overflow:'hidden', display:'flex', flexDirection:'column', background:'var(--bg-app)' }}>
          {inner}
        </div>
        <TweaksPanel title="Tweaks">
          <TweakSection label="Navigasi"><NavGrid go={go} route={route.id}/></TweakSection>
        </TweaksPanel>
      </>
    );
  }

  // ── Tablet (640–1023px): centered rounded card ───────────
  if (bp === 'tablet') {
    return (
      <>
        <div style={{ width:'100vw', minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', padding:'28px 20px', boxSizing:'border-box', background: BG_GRADIENTS[t.background] || BG_GRADIENTS.peach }}>
          <div style={{ width:500, maxWidth:'calc(100vw - 40px)', height:'calc(100dvh - 56px)', maxHeight:900, borderRadius:36, overflow:'hidden', boxShadow:'0 28px 70px rgba(180,90,40,.22)', display:'flex', flexDirection:'column', flexShrink:0, background:'var(--bg-app)' }}>
            {inner}
          </div>
        </div>
        <TweaksPanel title="Tweaks">
          <TweakSection label="Tema">
            <TweakRadio label="Background" value={t.background} options={[{value:'peach',label:'Peach'},{value:'green',label:'Hijau'},{value:'cream',label:'Krem'}]} onChange={v=>setTweak('background',v)}/>
            <TweakSelect label="Warna Utama" value={t.primaryHue} options={[{value:'orange',label:'Oranye'},{value:'yellow',label:'Kuning'},{value:'green',label:'Hijau'},{value:'blue',label:'Biru'},{value:'purple',label:'Ungu'}]} onChange={v=>setTweak('primaryHue',v)}/>
          </TweakSection>
          <TweakSection label="Navigasi"><NavGrid go={go} route={route.id}/></TweakSection>
        </TweaksPanel>
      </>
    );
  }

  // ── Desktop (≥ 1024px): phone frame + sidebar ────────────
  return (
    <>
      <div style={{ width:'100vw', minHeight:'100vh', display:'flex', flexDirection:'row', flexWrap:'nowrap', alignItems:'center', justifyContent:'center', gap:56, padding:'40px 48px', boxSizing:'border-box', background: BG_GRADIENTS[t.background] || BG_GRADIENTS.peach }}>
        {/* Phone */}
        <div style={{ flexShrink:0, flexGrow:0, width: t.showFrame ? 'auto' : 390, height: t.showFrame ? 'auto' : 844, overflow: t.showFrame ? 'visible' : 'hidden', borderRadius: t.showFrame ? 0 : 44, boxShadow: t.showFrame ? 'none' : '0 40px 80px rgba(180,90,40,.25)' }}>
          {t.showFrame
            ? <IOSDevice width={390} height={844} dark={false}>{inner}</IOSDevice>
            : inner
          }
        </div>
      </div>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Tema">
          <TweakRadio label="Background" value={t.background} options={[{value:'peach',label:'Peach'},{value:'green',label:'Hijau'},{value:'cream',label:'Krem'}]} onChange={v=>setTweak('background',v)}/>
          <TweakSelect label="Warna Utama" value={t.primaryHue} options={[{value:'orange',label:'Oranye'},{value:'yellow',label:'Kuning'},{value:'green',label:'Hijau'},{value:'blue',label:'Biru'},{value:'purple',label:'Ungu'}]} onChange={v=>setTweak('primaryHue',v)}/>
        </TweakSection>
        <TweakSection label="Tampilan">
          <TweakToggle label="Device frame" value={t.showFrame} onChange={v=>setTweak('showFrame',v)}/>
        </TweakSection>
        <TweakSection label="Navigasi"><NavGrid go={go} route={route.id}/></TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
