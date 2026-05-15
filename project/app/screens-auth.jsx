/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Auth v2: Login, Register, Paket
// Inspired by: floating pastel circles, cream bg, flat pill layout
// ─────────────────────────────────────────────────────────────

const { useState: uS5 } = React;

const ScolaLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#2A6BD9"/>
    <path d="M8 9q0-2 4-2t4 2-4 2-4 2 4 2 4-2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const GoogleLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22 12.2c0-.7-.06-1.36-.18-2H12v3.79h5.62a4.8 4.8 0 0 1-2.08 3.16v2.62h3.36C20.86 18.04 22 15.4 22 12.2z"/>
    <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.36-2.62c-.93.62-2.12 1-3.26 1-2.5 0-4.62-1.69-5.38-3.96H3.16v2.7A10 10 0 0 0 12 22z"/>
    <path fill="#FBBC05" d="M6.62 13.99a6 6 0 0 1 0-3.78V7.51H3.16a10 10 0 0 0 0 8.98l3.46-2.5z"/>
    <path fill="#EA4335" d="M12 6.16c1.47 0 2.78.5 3.82 1.5L18.7 4.8C16.95 3.18 14.7 2.2 12 2.2A10 10 0 0 0 3.16 7.5l3.46 2.7C7.38 7.85 9.5 6.16 12 6.16z"/>
  </svg>
);

// Floating pastel circles background
const BubbleBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 390 844" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    {/* top row */}
    <circle cx="130" cy="60"  r="62" fill="#F9B8C4" opacity=".55"/>
    <circle cx="330" cy="44"  r="70" fill="#C9B8F0" opacity=".50"/>
    <circle cx="220" cy="105" r="30" fill="#A8DFF0" opacity=".55"/>
    {/* mid */}
    <circle cx="60"  cy="200" r="78" fill="#B4E6A0" opacity=".50"/>
    <circle cx="290" cy="175" r="36" fill="#F9CFA0" opacity=".55"/>
    <circle cx="170" cy="248" r="22" fill="#A8DFF0" opacity=".45"/>
    <circle cx="340" cy="270" r="52" fill="#F9B8C4" opacity=".40"/>
    {/* lower deco */}
    <circle cx="80"  cy="640" r="44" fill="#B4E6A0" opacity=".25"/>
    <circle cx="340" cy="700" r="56" fill="#C9B8F0" opacity=".22"/>
  </svg>
);

// Shared auth page wrapper — cream bg + bubbles
const AuthPage = ({ children, topPad = 280 }) => (
  <div className="app" style={{ background: '#FAF5E9', position: 'relative', overflow: 'hidden' }}>
    <BubbleBg/>
    {/* Logo */}
    <div style={{ position: 'absolute', top: 68, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
      <img src="uploads/cerria-fix.png" alt="Cerria" style={{ width: 180, filter: 'drop-shadow(0 3px 8px rgba(180,90,40,.18))' }}/>
    </div>
    {/* Content area */}
    <div style={{ position: 'relative', zIndex: 3, marginTop: topPad, padding: '0 28px 40px' }}>
      {children}
    </div>
  </div>
);

// Pill social button
const SocialPill = ({ icon, label, onClick, bg = '#F5E4C0', color = '#4A3510' }) => (
  <button onClick={onClick} style={{
    width: '100%', height: 54, borderRadius: 999,
    background: bg, color,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5,
    border: 'none', cursor: 'pointer',
    transition: 'transform .12s ease, opacity .12s ease',
  }}
  onMouseDown={e => e.currentTarget.style.opacity = '.85'}
  onMouseUp={e => e.currentTarget.style.opacity = '1'}
  onTouchStart={e => e.currentTarget.style.opacity = '.85'}
  onTouchEnd={e => e.currentTarget.style.opacity = '1'}>
    {icon}{label}
  </button>
);

// Divider "atau"
const Divider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '14px 0' }}>
    <div style={{ flex: 1, height: 1.5, background: 'rgba(74,53,16,.12)', borderRadius: 999 }}/>
    <span style={{ color: '#A89070', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>atau</span>
    <div style={{ flex: 1, height: 1.5, background: 'rgba(74,53,16,.12)', borderRadius: 999 }}/>
  </div>
);

// Pill input
const PillInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    value={value} onChange={onChange} placeholder={placeholder} type={type}
    style={{
      width: '100%', height: 54, borderRadius: 999,
      background: '#fff', border: '1.5px solid rgba(74,53,16,.12)',
      padding: '0 22px', fontFamily: 'var(--font-display)', fontWeight: 600,
      fontSize: 15, color: '#4A3510', outline: 'none',
      boxSizing: 'border-box',
    }}
  />
);

// Primary CTA pill
const CTAPill = ({ label, onClick, bg = '#F5B429', color = '#4A3510' }) => (
  <button onClick={onClick} style={{
    width: '100%', height: 54, borderRadius: 999,
    background: bg, color,
    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
    border: 'none', cursor: 'pointer',
    boxShadow: '0 6px 0 rgba(180,100,0,.22)',
    transition: 'transform .1s, box-shadow .1s',
  }}
  onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 3px 0 rgba(180,100,0,.22)'; }}
  onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 0 rgba(180,100,0,.22)'; }}
  onTouchStart={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 3px 0 rgba(180,100,0,.22)'; }}
  onTouchEnd={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 0 rgba(180,100,0,.22)'; }}>
    {label}
  </button>
);

// ── Login ───────────────────────────────────────────────────
const Login = ({ go }) => {
  const [mode, setMode] = uS5('main');
  const [email, setEmail] = uS5('');
  const [pw, setPw] = uS5('');
  const [loading, setLoading] = uS5(false);
  const [err, setErr] = uS5('');

  const doLogin = async () => {
    if (!email || !pw) { setErr('Email dan kata sandi wajib diisi.'); return; }
    setLoading(true); setErr('');
    const { error } = await window.CerriaDB.signIn({ email, password: pw });
    setLoading(false);
    if (error) setErr(error.message === 'Invalid login credentials' ? 'Email atau kata sandi salah.' : error.message);
    // on success, auth listener in app.jsx will redirect to home
  };

  if (mode === 'form') {
    return (
      <AuthPage topPad={220}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#2A1F10', marginBottom: 6 }}>Masuk dengan Email</div>
        <div style={{ color: '#8C7A5A', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>Gunakan email dan kata sandi kamu.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PillInput value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"/>
          <PillInput value={pw} onChange={e => setPw(e.target.value)} placeholder="Kata sandi" type="password"/>
          {err && <div style={{ color: '#E84A4A', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'center' }}>{err}</div>}
          <div style={{ marginTop: 4 }}>
            <CTAPill label={loading ? 'Memuat...' : 'Masuk'} onClick={doLogin}/>
          </div>
          <button onClick={() => setMode('main')} style={{ color: '#A89070', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', marginTop: 4 }}>
            ← Kembali
          </button>
        </div>
      </AuthPage>
    );
  }

  return (
    <AuthPage topPad={240}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#2A1F10', marginBottom: 24 }}>Selamat datang!</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SocialPill
          icon={<ScolaLogo size={22}/>}
          label="Masuk dengan Scola"
          bg="#DEEAFF" color="#1A3D8A"
          onClick={() => go('home')}/>
        <SocialPill
          icon={<GoogleLogo size={22}/>}
          label="Masuk dengan Google"
          bg="#F5E4C0" color="#4A3510"
          onClick={() => go('home')}/>
        <Divider/>
        <SocialPill
          icon={<Icon name="menu-dots" size={20} color="#4A3510"/>}
          label="Masuk dengan Email"
          bg="#F5E4C0" color="#4A3510"
          onClick={() => setMode('form')}/>
      </div>
      <div style={{ textAlign: 'center', marginTop: 22, fontFamily: 'var(--font-display)', fontSize: 14, color: '#8C7A5A' }}>
        Belum punya akun?{' '}
        <button onClick={() => go('register')} style={{ color: '#E07A20', fontWeight: 800, fontFamily: 'var(--font-display)' }}>Daftar</button>
      </div>
    </AuthPage>
  );
};

// ── Register (multi-step: voucher → method → form) ────────────
const Register = ({ go }) => {
  const [step, setStep] = uS5(1);          // 1 = voucher, 2 = method, 3 = form
  const [voucher, setVoucher] = uS5('');
  const [voucherOK, setVoucherOK] = uS5(null);
  const [method, setMethod] = uS5(null);   // 'scola' | 'google' | 'username'
  const [name, setName] = uS5('');
  const [age, setAge] = uS5('');
  const [email, setEmail] = uS5('');
  const [pw, setPw] = uS5('');
  const [loading, setLoading] = uS5(false);
  const [err, setErr] = uS5('');

  const doRegister = async () => {
    if (!name.trim()) { setErr('Nama anak wajib diisi.'); return; }
    if (!age) { setErr('Pilih kelompok usia.'); return; }
    if (!email.trim()) { setErr('Email wajib diisi.'); return; }
    if (pw.length < 6) { setErr('Kata sandi minimal 6 karakter.'); return; }
    setLoading(true); setErr('');
    const { error } = await window.CerriaDB.signUp({ email, password: pw, name: name.trim() });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    go('paket');
  };

  const checkVoucher = () => {
    const v = voucher.trim().toUpperCase();
    if (!v) { setStep(2); return; }
    setVoucherOK(v === 'CERRIA20' ? 'ok' : 'bad');
    if (v === 'CERRIA20') setTimeout(() => setStep(2), 800);
  };

  // Step 1 — Voucher
  if (step === 1) return (
    <AuthPage topPad={210}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#2A1F10', marginBottom: 4 }}>Punya kode voucher?</div>
      <div style={{ color: '#8C7A5A', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>Masukkan kode untuk diskon. Kosongkan jika tidak punya.</div>

      <div style={{ background: '#FFF8E6', borderRadius: 20, padding: '18px 16px', border: '2px dashed #F5B429', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#8C6A20', marginBottom: 12 }}>🎁 Kode Voucher (Opsional)</div>
        <input
          value={voucher} onChange={e => { setVoucher(e.target.value.toUpperCase()); setVoucherOK(null); }}
          placeholder="Contoh: CERRIA20"
          style={{ width: '100%', height: 50, borderRadius: 999, border: '1.5px solid rgba(74,53,16,.12)', padding: '0 20px', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '.06em', fontSize: 15, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
        />
        {voucherOK === 'ok'  && <div style={{ color: '#3BB273', fontWeight: 800, fontSize: 13, marginTop: 8, fontFamily: 'var(--font-display)' }}>✓ Voucher valid! Diskon 20% aktif 🎉</div>}
        {voucherOK === 'bad' && <div style={{ color: '#E84A4A', fontWeight: 800, fontSize: 13, marginTop: 8, fontFamily: 'var(--font-display)' }}>✗ Kode tidak ditemukan. Periksa kembali.</div>}
      </div>

      <CTAPill label="Lanjut →" onClick={checkVoucher}/>
      <div style={{ textAlign: 'center', marginTop: 18, fontFamily: 'var(--font-display)', fontSize: 14, color: '#8C7A5A' }}>
        Sudah punya akun?{' '}
        <button onClick={() => go('login')} style={{ color: '#E07A20', fontWeight: 800 }}>Masuk</button>
      </div>
    </AuthPage>
  );

  // Step 2 — Pilih metode
  if (step === 2) return (
    <AuthPage topPad={210}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <button onClick={() => setStep(1)} style={{ color: '#A89070', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>← Kembali</button>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#2A1F10', marginBottom: 4 }}>Lengkapi data</div>
      <div style={{ color: '#8C7A5A', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>Pilih cara mendaftar yang paling mudah.</div>

      {voucherOK === 'ok' && (
        <div style={{ background: '#FFF8E6', borderRadius: 14, padding: '10px 14px', border: '1.5px dashed #F5B429', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>🎁</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#8C6A20' }}>Diskon 20% aktif · Rp 16.000/bulan</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SocialPill icon={<ScolaLogo size={22}/>}   label="Lanjutkan dengan Scola"   bg="#DEEAFF" color="#1A3D8A" onClick={() => { setMethod('scola');    go('paket'); }}/>
        <SocialPill icon={<GoogleLogo size={22}/>}   label="Lanjutkan dengan Google"  bg="#F5E4C0" color="#4A3510" onClick={() => { setMethod('google');   go('paket'); }}/>
        <Divider/>
        <SocialPill icon={<Icon name="menu-dots" size={20} color="#4A3510"/>} label="Isi data sendiri" bg="#F5E4C0" color="#4A3510" onClick={() => { setMethod('username'); setStep(3); }}/>
      </div>
    </AuthPage>
  );

  // Step 3 — Form manual
  return (
    <div className="app" style={{ background: '#FAF5E9', position: 'relative', overflow: 'hidden' }}>
      <BubbleBg/>
      <div style={{ position: 'absolute', top: 52, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <img src="uploads/cerria-fix.png" alt="Cerria" style={{ width: 130, filter: 'drop-shadow(0 3px 8px rgba(180,90,40,.18))' }}/>
      </div>
      <div style={{ position: 'relative', zIndex: 3, marginTop: 158, padding: '0 28px 40px', overflowY: 'auto', maxHeight: 'calc(100% - 158px)' }}>
        <button onClick={() => setStep(2)} style={{ color: '#A89070', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>← Kembali</button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#2A1F10', marginBottom: 18 }}>Data Anak</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PillInput value={name}  onChange={e => setName(e.target.value)}  placeholder="Nama anak"/>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['3-5','3–5 thn'],['6-8','6–8 thn'],['9-12','9–12 thn']].map(([id, l]) => (
              <button key={id} onClick={() => setAge(id)} style={{
                flex: 1, height: 44, borderRadius: 999,
                background: age === id ? '#F5B429' : '#fff',
                color: age === id ? '#4A3510' : '#A89070',
                border: `2px solid ${age === id ? '#F5B429' : 'rgba(74,53,16,.12)'}`,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>
          <PillInput value={email} onChange={e => setEmail(e.target.value)} placeholder="Email orang tua" type="email"/>
          <PillInput value={pw}    onChange={e => setPw(e.target.value)}    placeholder="Buat kata sandi (min. 6 karakter)"  type="password"/>
          {err && <div style={{ color: '#E84A4A', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'center' }}>{err}</div>}
          <div style={{ marginTop: 4 }}><CTAPill label={loading ? 'Membuat Akun...' : 'Buat Akun & Pilih Paket'} onClick={doRegister}/></div>
          <div style={{ fontSize: 11, color: '#A89070', fontFamily: 'var(--font-display)', textAlign: 'center' }}>
            Dengan mendaftar, kamu menyetujui Syarat & Ketentuan Cerria.
          </div>
        </div>
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
};

// ── Paket ────────────────────────────────────────────────────
const Paket = ({ go }) => {
  const [pick, setPick] = uS5('full');

  const Plan = ({ id, title, price, sub, features, badge, color }) => {
    const active = pick === id;
    return (
      <button onClick={() => setPick(id)} style={{
        width: '100%', textAlign: 'left', padding: 18,
        borderRadius: 24,
        background: active ? '#fff' : 'rgba(255,255,255,.6)',
        border: active ? `2.5px solid ${color}` : '2.5px solid transparent',
        boxShadow: active ? '0 8px 24px rgba(180,90,40,.14)' : '0 2px 8px rgba(180,90,40,.06)',
        position: 'relative', cursor: 'pointer', transition: 'all .2s ease',
      }}>
        {badge && <span style={{ position: 'absolute', top: -11, right: 16, background: color, color: '#fff', padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '.04em' }}>{badge}</span>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color }}>{title}</div>
            <div style={{ fontSize: 12, color: '#A89070', fontWeight: 600 }}>{sub}</div>
          </div>
          <div style={{ width: 24, height: 24, borderRadius: 999, border: `2px solid ${active ? color : '#D4C4A8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? color : 'transparent' }}>
            {active && <Icon name="check" size={14} color="#fff"/>}
          </div>
        </div>
        <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontWeight: 800 }}>
          <span style={{ fontSize: 26, color: '#2A1F10' }}>{price}</span>
          {id === 'full' && <span style={{ fontSize: 13, color: '#A89070', fontWeight: 700 }}> /bulan</span>}
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name={f.has ? 'check' : 'lock'} size={15} color={f.has ? color : '#C4B49A'}/>
              <span style={{ fontSize: 13, color: f.has ? '#4A3510' : '#C4B49A', fontWeight: 600 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </button>
    );
  };

  return (
    <div className="app" style={{ background: '#FAF5E9' }}>
      <BubbleBg/>
      <div className="topbar" style={{ position: 'relative', zIndex: 3 }}>
        <button onClick={() => go('register')} className="btn-icon-round" style={{ background: 'rgba(255,255,255,.7)' }}><Icon name="arrow-left" size={20}/></button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#2A1F10' }}>Pilih Paket</div>
        <button onClick={() => go('home')} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#A89070' }}>Lewati</button>
      </div>

      <div style={{ position: 'relative', zIndex: 3, padding: '8px 22px 32px', overflowY: 'auto', maxHeight: 'calc(100% - 80px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Plan id="free" title="Free" price="Rp 0" sub="Akses terbatas, cocok untuk coba-coba" color="#3BB273"
            features={[
              { has: true,  label: '5 buku terpilih per minggu' },
              { has: true,  label: '1 episode Video Book per hari' },
              { has: true,  label: 'Modul Belajar level 1–3' },
              { has: false, label: 'Majalah edisi bulanan' },
              { has: false, label: 'Lencana premium & sertifikat' },
            ]}/>
          <Plan id="full" title="Full Akses" price="Rp 20.000" sub="Semua fitur tanpa batas" color="#E07A20" badge="POPULER"
            features={[
              { has: true, label: 'Semua buku & cerita interaktif' },
              { has: true, label: 'Semua episode Video Book' },
              { has: true, label: 'Semua mata pelajaran & level' },
              { has: true, label: 'Majalah + arsip bulanan' },
              { has: true, label: 'Laporan progres lengkap' },
            ]}/>

          {/* Voucher badge */}
          <div style={{ background: '#FFF8E6', borderRadius: 16, padding: '12px 16px', border: '1.5px dashed #F5B429', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🎁</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#8C6A20' }}>Voucher CERRIA20 aktif</div>
              <div style={{ fontSize: 12, color: '#A89070' }}>Hemat 20% bulan pertama → <b style={{ color: '#2A1F10' }}>Rp 16.000</b></div>
            </div>
          </div>

          <CTAPill label={pick === 'free' ? 'Mulai Gratis' : 'Lanjutkan ke Pembayaran'} onClick={() => go('home')}/>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#A89070', fontFamily: 'var(--font-display)' }}>Bebas batalkan kapan saja. Tanpa iklan.</div>
        </div>
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
};

window.Login    = Login;
window.Register = Register;
window.Paket    = Paket;
