/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Profile + Notifikasi screens
// ─────────────────────────────────────────────────────────────

const { useState: uSP, useEffect: uEP } = React;

// ── Notifications ────────────────────────────────────────────
const NOTIFS = [
  { id: 'n1', type: 'streak',   unread: true,  time: '2 menit lalu',   icon: 'flame',   color: '#FF8C42', title: 'Streak 47 hari! 🔥',          body: 'Kamu konsisten belajar 47 hari berturut-turut. Luar biasa!' },
  { id: 'n2', type: 'new',      unread: true,  time: '1 jam lalu',     icon: 'book',    color: '#4EA8DE', title: 'Buku baru tersedia!',           body: '"Misteri Pulau Naga" sudah bisa dibaca. Cek perpustakaan.' },
  { id: 'n3', type: 'mission',  unread: true,  time: '3 jam lalu',     icon: 'map',     color: '#3BB273', title: 'Misi baru terbuka!',            body: 'Level 5 "Bilangan Genap" siap dimainkan. Ayo tantang dirimu!' },
  { id: 'n4', type: 'mag',      unread: false, time: 'Kemarin',        icon: 'magazine',color: '#9B59B6', title: 'Majalah Mei sudah terbit!',     body: 'Tema bulan ini: Negeri Air. Ada 8 artikel + kuis seru.' },
  { id: 'n5', type: 'badge',    unread: false, time: 'Kemarin',        icon: 'badge',   color: '#FFC857', title: 'Lencana baru didapat!',         body: 'Kamu mendapatkan lencana "Pembaca Handal" setelah membaca 10 buku.' },
  { id: 'n6', type: 'parent',   unread: false, time: '2 hari lalu',    icon: 'shield',  color: '#C28BD9', title: 'Laporan mingguan siap',         body: 'Tessa belajar 7j 32m minggu ini. Lihat laporan lengkapnya.' },
  { id: 'n7', type: 'lagu',     unread: false, time: '3 hari lalu',    icon: 'volume',  color: '#FF7A93', title: 'Playlist lagu baru!',           body: '5 lagu baru ditambahkan ke perpustakaan. Dengarkan sekarang.' },
];

const NotifikasiScreen = ({ go }) => {
  const [notifs, setNotifs] = uSP(NOTIFS);
  const unreadCount = notifs.filter(n => n.unread).length;

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  const markOne = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));

  return (
    <div className="scroll fade-in">
      <div className="topbar">
        <button onClick={() => go('home')} className="btn-icon-round">
          <Icon name="arrow-left" size={20}/>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className="h3">Notifikasi</div>
          {unreadCount > 0 && <div className="small" style={{ color: 'var(--c-orange)' }}>{unreadCount} belum dibaca</div>}
        </div>
        {unreadCount > 0
          ? <button onClick={markAll} className="small" style={{ color: 'var(--c-orange)', fontWeight: 800 }}>Tandai semua</button>
          : <div style={{ width: 44 }}/>
        }
      </div>

      <div className="wrap" style={{ marginTop: 8 }}>
        <div className="card" style={{ padding: 4 }}>
          {notifs.map((n, i) => (
            <button key={n.id} onClick={() => markOne(n.id)}
              className="row"
              style={{
                padding: '14px 14px',
                borderBottom: i < notifs.length - 1 ? '1px solid var(--ink-line)' : 'none',
                width: '100%', textAlign: 'left', alignItems: 'flex-start', gap: 12,
                background: n.unread ? 'rgba(255,140,66,.05)' : 'transparent',
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: n.color + '22', color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={n.icon} size={20} color={n.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{n.title}</span>
                  {n.unread && <div style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--c-orange)', flexShrink: 0, marginTop: 4 }}/>}
                </div>
                <div className="small" style={{ color: 'var(--ink-2)', marginTop: 2, fontWeight: 600, lineHeight: 1.4 }}>{n.body}</div>
                <div className="small" style={{ color: 'var(--ink-3)', marginTop: 4 }}>{n.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: 30 }}/>
    </div>
  );
};

// ── Profile ──────────────────────────────────────────────────
const AVATAR_COLORS = [
  ['#FFD17A','#FF8C42'],
  ['#6FD296','#3BB273'],
  ['#7BC8E8','#4EA8DE'],
  ['#C28BD9','#9B59B6'],
  ['#FF8C9A','#E84A6A'],
];

const ProfileScreen = ({ go, child }) => {
  const [avatarIdx, setAvatarIdx] = uSP(child ? child.avatar_idx : 0);
  const [name, setName] = uSP(child ? child.name : 'Anak');
  const [editName, setEditName] = uSP(false);
  const [nameVal, setNameVal] = uSP(child ? child.name : 'Anak');
  const [activeTab, setActiveTab] = uSP('prestasi');

  const [c1, c2] = AVATAR_COLORS[avatarIdx];

  const BADGES = [
    { icon: 'star',    color: '#FFC857', label: 'Bintang',      earned: true  },
    { icon: 'badge',   color: '#FF8C42', label: 'Pembaca',      earned: true  },
    { icon: 'flame',   color: '#E84A4A', label: 'Api 30 Hari',  earned: true  },
    { icon: 'book',    color: '#4EA8DE', label: 'Petualang',    earned: true  },
    { icon: 'map',     color: '#3BB273', label: 'Penjelajah',   earned: false },
    { icon: 'sparkle', color: '#9B59B6', label: 'Juara',        earned: false },
    { icon: 'heart',   color: '#FF7A93', label: 'Sahabat',      earned: false },
    { icon: 'shield',  color: '#C28BD9', label: 'Pelindung',    earned: false },
  ];

  const HISTORY = [
    { type: 'book',      label: 'Selesai membaca "Pulau Misterius"',  time: '1 jam lalu',  icon: 'book',    color: '#FF8C42' },
    { type: 'mission',   label: 'Misi 3 Matematika — 3 bintang',       time: 'Kemarin',     icon: 'map',     color: '#3BB273' },
    { type: 'lagu',      label: 'Mendengarkan "Bintang Kecil"',        time: 'Kemarin',     icon: 'volume',  color: '#FF7A93' },
    { type: 'worksheet', label: 'Worksheet "Penjumlahan 1–10" selesai',time: '2 hari lalu', icon: 'subtitle',color: '#9B59B6' },
    { type: 'video',     label: 'Tonton "Si Kelinci & Sahabat Hutan"', time: '3 hari lalu', icon: 'play',    color: '#4EA8DE' },
  ];

  return (
    <div className="scroll fade-in">
      {/* Hero header */}
      <div style={{ background: `linear-gradient(135deg, #FFE3CD 0%, #FFB59E 100%)`, padding: '56px 0 0', position: 'relative' }}>
        {/* back + settings */}
        <div className="topbar" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '56px 16px 0' }}>
          <button onClick={() => go('home')} className="btn-icon-round" style={{ background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)' }}>
            <Icon name="arrow-left" size={20}/>
          </button>
          <div/>
          <button onClick={() => go('parent-pin')} className="btn-icon-round" style={{ background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)' }}>
            <Icon name="settings" size={18}/>
          </button>
        </div>

        {/* Avatar area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 24, paddingTop: 8 }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div style={{ width: 96, height: 96, borderRadius: 999, background: `linear-gradient(180deg,${c1},${c2})`, border: '4px solid #fff', boxShadow: '0 8px 20px rgba(180,90,40,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mascot size={80}/>
            </div>
            {/* avatar color picker */}
            <div style={{ position: 'absolute', bottom: -4, right: -4, display: 'flex', gap: 3 }}>
              {AVATAR_COLORS.map(([a], i) => (
                <button key={i} onClick={() => setAvatarIdx(i)} style={{ width: i === avatarIdx ? 16 : 12, height: i === avatarIdx ? 16 : 12, borderRadius: 999, background: a, border: i === avatarIdx ? '2px solid #fff' : 'none', boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'all .15s' }}/>
              ))}
            </div>
          </div>

          {/* Name (editable) */}
          {editName ? (
            <div className="row" style={{ gap: 8 }}>
              <input value={nameVal} onChange={e => setNameVal(e.target.value)} style={{ height: 38, borderRadius: 999, border: '2px solid rgba(255,140,66,.4)', padding: '0 14px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, textAlign: 'center', background: '#fff', outline: 'none', width: 160 }}/>
              <button onClick={() => { setName(nameVal); setEditName(false); }} className="btn-icon-round" style={{ width: 38, height: 38, background: '#FF7A3A', color: '#fff' }}>
                <Icon name="check" size={16} color="#fff"/>
              </button>
            </div>
          ) : (
            <button onClick={() => setEditName(true)} className="row" style={{ gap: 8 }}>
              <span className="display" style={{ fontSize: 24 }}>{name}</span>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: 'rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="plus" size={14} color="#C44A1E"/>
              </div>
            </button>
          )}
          <div className="small" style={{ marginTop: 2, color: 'var(--ink-2)' }}>{child ? `Usia ${child.age_group} tahun` : ''} • Full Akses</div>

          {/* Stats row */}
          <div className="row" style={{ gap: 16, marginTop: 14 }}>
            {[
              { v: '12',    l: 'Buku',      icon: 'book'  },
              { v: '47',    l: 'Hari',      icon: 'flame' },
              { v: '7',     l: 'Misi',      icon: 'badge' },
              { v: '2j48m', l: 'Waktu',     icon: 'star'  },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>{s.v}</div>
                <div className="small" style={{ color: 'var(--ink-2)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', padding: '12px 18px 0', borderBottom: '1px solid var(--ink-line)' }}>
        <div className="row" style={{ gap: 0 }}>
          {[['prestasi','Prestasi'],['riwayat','Riwayat'],['paket','Paket']].map(([id, l]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              flex: 1, padding: '10px 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
              color: activeTab === id ? 'var(--c-orange)' : 'var(--ink-3)',
              borderBottom: activeTab === id ? '3px solid var(--c-orange)' : '3px solid transparent',
              transition: 'all .15s',
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Prestasi tab */}
        {activeTab === 'prestasi' && (
          <div className="fade-in">
            <div className="h3" style={{ marginBottom: 12, fontFamily: 'var(--font-display)' }}>Lencana ({BADGES.filter(b=>b.earned).length}/{BADGES.length})</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 18 }}>
              {BADGES.map((b, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: 60, height: 60, margin: '0 auto', borderRadius: 18, background: b.earned ? b.color : '#F0E6D0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: b.earned ? `0 5px 0 rgba(0,0,0,.14)` : 'none', opacity: b.earned ? 1 : .55 }}>
                    <Icon name={b.earned ? b.icon : 'lock'} size={26} color={b.earned ? '#fff' : '#BFA98F'}/>
                  </div>
                  <div className="small" style={{ marginTop: 5, fontWeight: 700 }}>{b.label}</div>
                </div>
              ))}
            </div>

            <div className="h3" style={{ marginBottom: 10, fontFamily: 'var(--font-display)' }}>Level per Mapel</div>
            <div className="card" style={{ padding: 16 }}>
              {[
                { l: 'Matematika',        v: '42%', p: 0.42, c: '#4EA8DE' },
                { l: 'Bahasa Indonesia',  v: '65%', p: 0.65, c: '#FF8C42' },
                { l: 'Bahasa Inggris',    v: '20%', p: 0.20, c: '#9B59B6' },
                { l: 'Sains',             v: '10%', p: 0.10, c: '#3BB273' },
              ].map(r => (
                <div key={r.l} style={{ marginBottom: 12 }}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.l}</span>
                    <span className="small" style={{ fontWeight: 800, color: r.c }}>{r.v}</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${r.p*100}%`, background: r.c }}/></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Riwayat tab */}
        {activeTab === 'riwayat' && (
          <div className="fade-in">
            <div className="h3" style={{ marginBottom: 10, fontFamily: 'var(--font-display)' }}>Aktivitas Terbaru</div>
            <div className="card" style={{ padding: 4 }}>
              {HISTORY.map((h, i) => (
                <div key={i} className="row" style={{ padding: '12px 14px', borderBottom: i < HISTORY.length-1 ? '1px solid var(--ink-line)' : 'none', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: h.color+'22', color: h.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={h.icon} size={18} color={h.color}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{h.label}</div>
                    <div className="small">{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paket tab */}
        {activeTab === 'paket' && (
          <div className="fade-in">
            <div className="card" style={{ padding: 18, background: 'linear-gradient(135deg,#FFD17A,#FF8C42)', marginBottom: 14 }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="lbl" style={{ color: 'rgba(255,255,255,.8)' }}>PAKET AKTIF</div>
                  <div className="h1" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>Full Akses</div>
                  <div className="small" style={{ color: 'rgba(255,255,255,.9)' }}>Diperpanjang otomatis 2 Jun 2026</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.25)', padding: '8px 14px', borderRadius: 12 }}>
                  <div className="display" style={{ fontSize: 18, color: '#fff' }}>Rp20.000</div>
                  <div className="small" style={{ color: 'rgba(255,255,255,.8)' }}>/bulan</div>
                </div>
              </div>
            </div>
            <button onClick={() => go('paket')} className="btn btn-primary btn-block">Kelola Langganan</button>
            <div className="row" style={{ marginTop: 14, gap: 10 }}>
              <div className="card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
                <Icon name="shield" size={26} color="#3BB273"/>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginTop: 6 }}>Aman</div>
                <div className="small">Tanpa iklan</div>
              </div>
              <div className="card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
                <Icon name="star" size={26} color="#FFC857"/>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginTop: 6 }}>Premium</div>
                <div className="small">Semua fitur</div>
              </div>
              <div className="card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
                <Icon name="heart" size={26} color="#FF7A93"/>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginTop: 6 }}>Bebas</div>
                <div className="small">Batal kapan saja</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout */}
      <div style={{ padding: '8px 18px 0' }}>
        <button onClick={() => window.CerriaDB.signOut()} style={{
          width: '100%', height: 52, borderRadius: 999,
          background: '#FFF0EE', border: '2px solid #FFD0CC',
          color: '#D93025', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D93025" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Keluar dari Akun
        </button>
      </div>

      <div style={{ height: 30 }}/>
    </div>
  );
};

window.NotifikasiScreen = NotifikasiScreen;
window.ProfileScreen = ProfileScreen;
window.NOTIFS = NOTIFS;
