/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Admin Panel: content management for all tables
// ─────────────────────────────────────────────────────────────

const { useState: uSA, useEffect: uEA } = React;

// ── Shared helpers ────────────────────────────────────────────

const fld = (label, children) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--ink-2)', marginBottom: 5 }}>{label}</div>
    {children}
  </div>
);

const inp = (props) => (
  <input {...props} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--ink-line)', fontFamily: 'inherit', fontSize: 14, background: '#FAFAF8', color: 'var(--ink-1)', outline: 'none', ...(props.style || {}) }}/>
);

const sel = (props) => (
  <select {...props} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--ink-line)', fontFamily: 'inherit', fontSize: 14, background: '#FAFAF8', color: 'var(--ink-1)', outline: 'none', ...(props.style || {}) }}/>
);

const txta = (props) => (
  <textarea {...props} rows={3} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--ink-line)', fontFamily: 'inherit', fontSize: 14, background: '#FAFAF8', color: 'var(--ink-1)', outline: 'none', resize: 'vertical', ...(props.style || {}) }}/>
);

const RowCard = ({ title, subtitle, onEdit, onDelete }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: '#fff', borderRadius: 12, marginBottom: 8, boxShadow: '0 2px 6px rgba(180,90,40,.07)' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{subtitle}</div>}
    </div>
    <button onClick={onEdit} style={{ width: 32, height: 32, borderRadius: 8, background: '#FFF3DE', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name="settings" size={15} color="#C44A1E"/>
    </button>
    <button onClick={onDelete} style={{ width: 32, height: 32, borderRadius: 8, background: '#FFE8E8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: 16, color: '#E84A4A', lineHeight: 1 }}>
      ×
    </button>
  </div>
);

const Spinner = () => (
  <div style={{ width: 18, height: 18, borderRadius: 999, border: '2.5px solid rgba(255,255,255,.4)', borderTopColor: '#fff', animation: 'spin .7s linear infinite', display: 'inline-block' }}/>
);

// ── AdminModal ────────────────────────────────────────────────

const AdminModal = ({ title, onClose, onSave, saving, children }) => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(27,42,78,.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(27,42,78,.22)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 14px', borderBottom: '1px solid var(--ink-line)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--ink-1)' }}>{title}</div>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: '#F0EDE8', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 18, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
      </div>
      {/* Body — scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
        {children}
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', gap: 10, padding: '14px 18px', borderTop: '1px solid var(--ink-line)', flexShrink: 0 }}>
        <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 12, border: '1.5px solid var(--ink-line)', background: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--ink-2)', cursor: 'pointer' }}>Batal</button>
        <button onClick={onSave} disabled={saving} style={{ flex: 2, height: 44, borderRadius: 12, border: 'none', background: saving ? '#FFBA8A' : '#FF7A3A', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#fff', cursor: saving ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: saving ? 'none' : '0 3px 0 #C45A23' }}>
          {saving ? <Spinner/> : null}
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </div>
  </div>
);

// ── Tab header helper ─────────────────────────────────────────

const TabHeader = ({ label, onAdd }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--ink-1)' }}>{label}</div>
    <button onClick={onAdd} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: '#FF7A3A', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 3px 0 #C45A23' }}>
      <Icon name="plus" size={14} color="#fff"/> Tambah
    </button>
  </div>
);

// ── BooksTab ──────────────────────────────────────────────────

const BOOK_BLANK = { title: '', author: '', age: '6-8', genre: 'petualangan', theme: 'sunset', chapters: 1, summary: '' };

const BooksTab = () => {
  const [items, setItems] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [modal, setModal] = uSA(null); // null | 'add' | 'edit'
  const [form, setForm] = uSA(BOOK_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentBooks().then(d => { setItems(d || []); setLoading(false); });
  };
  uEA(load, []);

  const openAdd = () => { setForm(BOOK_BLANK); setEditId(null); setModal('edit'); };
  const openEdit = (item) => { setForm({ title: item.title, author: item.author, age: item.age, genre: item.genre, theme: item.theme, chapters: item.chapters, summary: item.summary }); setEditId(item.id); setModal('edit'); };
  const close = () => setModal(null);

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const data = { ...form, chapters: parseInt(form.chapters) || 1 };
    if (editId) await window.CerriaDB.updateContentBook(editId, data);
    else await window.CerriaDB.createContentBook(data);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus buku ini?')) return;
    await window.CerriaDB.deleteContentBook(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <TabHeader label={`Buku (${items.length})`} onAdd={openAdd}/>
      {loading ? <div className="small" style={{ color: 'var(--ink-3)' }}>Memuat...</div> : items.map(item => (
        <RowCard key={item.id} title={item.title} subtitle={`${item.author} · Usia ${item.age} · ${item.genre}`} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}/>
      ))}
      {modal && (
        <AdminModal title={editId ? 'Edit Buku' : 'Tambah Buku'} onClose={close} onSave={save} saving={saving}>
          {fld('Judul *', inp({ value: form.title, onChange: e => f('title', e.target.value), placeholder: 'Judul buku' }))}
          {fld('Penulis', inp({ value: form.author, onChange: e => f('author', e.target.value), placeholder: 'Nama penulis' }))}
          {fld('Usia', sel({ value: form.age, onChange: e => f('age', e.target.value), children: [<option key="3-5" value="3-5">3–5 tahun</option>, <option key="6-8" value="6-8">6–8 tahun</option>, <option key="9-12" value="9-12">9–12 tahun</option>] }))}
          {fld('Genre', sel({ value: form.genre, onChange: e => f('genre', e.target.value), children: ['petualangan','fabel','edukasi','humor'].map(g => <option key={g} value={g}>{g}</option>) }))}
          {fld('Tema / Warna', sel({ value: form.theme, onChange: e => f('theme', e.target.value), children: ['sunset','forest','night','meadow','ocean','purple'].map(t => <option key={t} value={t}>{t}</option>) }))}
          {fld('Jumlah Bab', inp({ type: 'number', min: 1, value: form.chapters, onChange: e => f('chapters', e.target.value) }))}
          {fld('Ringkasan', txta({ value: form.summary, onChange: e => f('summary', e.target.value), placeholder: 'Deskripsi singkat buku...' }))}
        </AdminModal>
      )}
    </div>
  );
};

// ── VideosTab ─────────────────────────────────────────────────

const VIDEO_BLANK = { title: '', duration: '', theme: 'forest', thumb: 'forest' };

const VideosTab = () => {
  const [items, setItems] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [modal, setModal] = uSA(null);
  const [form, setForm] = uSA(VIDEO_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentEpisodes().then(d => { setItems(d || []); setLoading(false); });
  };
  uEA(load, []);

  const openAdd = () => { setForm(VIDEO_BLANK); setEditId(null); setModal('edit'); };
  const openEdit = (item) => { setForm({ title: item.title, duration: item.duration, theme: item.theme, thumb: item.thumb }); setEditId(item.id); setModal('edit'); };
  const close = () => setModal(null);

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editId) await window.CerriaDB.updateContentEpisode(editId, form);
    else await window.CerriaDB.createContentEpisode(form);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus episode ini?')) return;
    await window.CerriaDB.deleteContentEpisode(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const THEMES = ['forest','sunset','night','island'];

  return (
    <div>
      <TabHeader label={`Video (${items.length})`} onAdd={openAdd}/>
      {loading ? <div className="small" style={{ color: 'var(--ink-3)' }}>Memuat...</div> : items.map(item => (
        <RowCard key={item.id} title={item.title} subtitle={`${item.duration} · tema: ${item.theme}`} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}/>
      ))}
      {modal && (
        <AdminModal title={editId ? 'Edit Episode' : 'Tambah Episode'} onClose={close} onSave={save} saving={saving}>
          {fld('Judul *', inp({ value: form.title, onChange: e => f('title', e.target.value), placeholder: 'Judul episode' }))}
          {fld('Durasi (e.g. 4:32)', inp({ value: form.duration, onChange: e => f('duration', e.target.value), placeholder: '4:32' }))}
          {fld('Tema', sel({ value: form.theme, onChange: e => f('theme', e.target.value), children: THEMES.map(t => <option key={t} value={t}>{t}</option>) }))}
          {fld('Thumbnail', sel({ value: form.thumb, onChange: e => f('thumb', e.target.value), children: THEMES.map(t => <option key={t} value={t}>{t}</option>) }))}
        </AdminModal>
      )}
    </div>
  );
};

// ── SongsTab ──────────────────────────────────────────────────

const SONG_BLANK = { title: '', artist: '', duration_secs: 60, color: '#FFD17A', color2: '#FF8C42', lyrics_text: '' };

const lyricsToJson = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, i) => ({ t: i * 5000, text: line }));
};

const jsonToLyricsText = (arr) => {
  if (!Array.isArray(arr)) return '';
  return arr.map(l => l.text || '').join('\n');
};

const SongsTab = () => {
  const [items, setItems] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [modal, setModal] = uSA(null);
  const [form, setForm] = uSA(SONG_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentSongs().then(d => { setItems(d || []); setLoading(false); });
  };
  uEA(load, []);

  const openAdd = () => { setForm(SONG_BLANK); setEditId(null); setModal('edit'); };
  const openEdit = (item) => {
    setForm({ title: item.title, artist: item.artist, duration_secs: item.duration_secs, color: item.color, color2: item.color2, lyrics_text: jsonToLyricsText(item.lyrics) });
    setEditId(item.id);
    setModal('edit');
  };
  const close = () => setModal(null);

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const data = {
      title: form.title, artist: form.artist,
      duration_secs: parseInt(form.duration_secs) || 60,
      color: form.color, color2: form.color2,
      lyrics: lyricsToJson(form.lyrics_text),
    };
    if (editId) await window.CerriaDB.updateContentSong(editId, data);
    else await window.CerriaDB.createContentSong(data);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus lagu ini?')) return;
    await window.CerriaDB.deleteContentSong(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const fmtDur = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div>
      <TabHeader label={`Lagu (${items.length})`} onAdd={openAdd}/>
      {loading ? <div className="small" style={{ color: 'var(--ink-3)' }}>Memuat...</div> : items.map(item => (
        <RowCard key={item.id} title={item.title} subtitle={`${item.artist} · ${fmtDur(item.duration_secs)}`} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}/>
      ))}
      {modal && (
        <AdminModal title={editId ? 'Edit Lagu' : 'Tambah Lagu'} onClose={close} onSave={save} saving={saving}>
          {fld('Judul *', inp({ value: form.title, onChange: e => f('title', e.target.value), placeholder: 'Judul lagu' }))}
          {fld('Artis', inp({ value: form.artist, onChange: e => f('artist', e.target.value), placeholder: 'Nama artis / tradisional' }))}
          {fld('Durasi (detik)', inp({ type: 'number', min: 1, value: form.duration_secs, onChange: e => f('duration_secs', e.target.value) }))}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>{fld('Warna 1 (hex)', inp({ value: form.color, onChange: e => f('color', e.target.value), placeholder: '#FFD17A' }))}</div>
            <div style={{ flex: 1 }}>{fld('Warna 2 (hex)', inp({ value: form.color2, onChange: e => f('color2', e.target.value), placeholder: '#FF8C42' }))}</div>
          </div>
          {/* color preview */}
          <div style={{ height: 28, borderRadius: 8, background: `linear-gradient(90deg, ${form.color}, ${form.color2})`, marginBottom: 14, boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)' }}/>
          {fld('Lirik (satu baris per bait)', txta({ value: form.lyrics_text, onChange: e => f('lyrics_text', e.target.value), placeholder: 'Bintang kecil di langit yang biru...\nAmat banyak menghias angkasa...', rows: 5 }))}
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: -8, marginBottom: 6 }}>Setiap baris akan ditampilkan setiap 5 detik secara berurutan.</div>
        </AdminModal>
      )}
    </div>
  );
};

// ── WorksheetsTab ─────────────────────────────────────────────

const WS_BLANK = { title: '', subject: 'mat', age: '6-8', pages: 1, difficulty: 'Mudah', preview: 'numbers', description: '' };

const WorksheetsTab = () => {
  const [items, setItems] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [modal, setModal] = uSA(null);
  const [form, setForm] = uSA(WS_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentWorksheets().then(d => { setItems(d || []); setLoading(false); });
  };
  uEA(load, []);

  const SUBJECT_COLORS = { mat: '#4EA8DE', bin: '#FF8C42', sci: '#3BB273', art: '#9B59B6' };

  const openAdd = () => { setForm(WS_BLANK); setEditId(null); setModal('edit'); };
  const openEdit = (item) => {
    setForm({ title: item.title, subject: item.subject, age: item.age, pages: item.pages, difficulty: item.difficulty, preview: item.preview, description: item.description || '' });
    setEditId(item.id);
    setModal('edit');
  };
  const close = () => setModal(null);

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const data = { ...form, pages: parseInt(form.pages) || 1, color: SUBJECT_COLORS[form.subject] || '#4EA8DE' };
    if (editId) await window.CerriaDB.updateContentWorksheet(editId, data);
    else await window.CerriaDB.createContentWorksheet(data);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus worksheet ini?')) return;
    await window.CerriaDB.deleteContentWorksheet(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <TabHeader label={`Worksheet (${items.length})`} onAdd={openAdd}/>
      {loading ? <div className="small" style={{ color: 'var(--ink-3)' }}>Memuat...</div> : items.map(item => (
        <RowCard key={item.id} title={item.title} subtitle={`${item.subject} · Usia ${item.age} · ${item.difficulty} · ${item.pages} hal.`} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}/>
      ))}
      {modal && (
        <AdminModal title={editId ? 'Edit Worksheet' : 'Tambah Worksheet'} onClose={close} onSave={save} saving={saving}>
          {fld('Judul *', inp({ value: form.title, onChange: e => f('title', e.target.value), placeholder: 'Judul worksheet' }))}
          {fld('Mata Pelajaran', sel({ value: form.subject, onChange: e => f('subject', e.target.value), children: [['mat','Matematika'],['bin','Bahasa Indonesia'],['sci','Sains'],['art','Seni']].map(([v,l]) => <option key={v} value={v}>{l}</option>) }))}
          {fld('Usia', sel({ value: form.age, onChange: e => f('age', e.target.value), children: [<option key="3-5" value="3-5">3–5 tahun</option>, <option key="6-8" value="6-8">6–8 tahun</option>] }))}
          {fld('Jumlah Halaman', inp({ type: 'number', min: 1, value: form.pages, onChange: e => f('pages', e.target.value) }))}
          {fld('Tingkat Kesulitan', sel({ value: form.difficulty, onChange: e => f('difficulty', e.target.value), children: ['Mudah','Sedang','Seru'].map(d => <option key={d} value={d}>{d}</option>) }))}
          {fld('Preview Template', sel({ value: form.preview, onChange: e => f('preview', e.target.value), children: ['apples','numbers','letters','science','art'].map(p => <option key={p} value={p}>{p}</option>) }))}
          {fld('Deskripsi', txta({ value: form.description, onChange: e => f('description', e.target.value), placeholder: 'Deskripsi singkat worksheet...' }))}
        </AdminModal>
      )}
    </div>
  );
};

// ── MissionsTab ───────────────────────────────────────────────

const LEVEL_BLANK = { subject_id: 'mat', title: '', is_boss: false };
const Q_BLANK = { prompt: '', scene: 'apples', opt_a: '', opt_b: '', opt_c: '', opt_d: '', correct: 'a' };

const SUBJECTS_MISSIONS = [
  { id: 'mat', label: 'Matematika', color: '#4EA8DE' },
  { id: 'bin', label: 'Bahasa Indonesia', color: '#FF8C42' },
  { id: 'eng', label: 'Bahasa Inggris', color: '#9B59B6' },
  { id: 'sci', label: 'Sains', color: '#3BB273' },
];

const QuestionsInline = ({ levelId }) => {
  const [qs, setQs] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [modal, setModal] = uSA(false);
  const [form, setForm] = uSA(Q_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentQuestions(levelId).then(d => { setQs(d || []); setLoading(false); });
  };
  uEA(load, [levelId]);

  const openAdd = () => { setForm(Q_BLANK); setEditId(null); setModal(true); };
  const openEdit = (q) => {
    const opts = Array.isArray(q.options) ? q.options : [];
    const getLabel = (id) => (opts.find(o => o.id === id) || {}).label || '';
    const correctId = (opts.find(o => o.correct) || {}).id || 'a';
    setForm({ prompt: q.prompt, scene: q.scene, opt_a: getLabel('a'), opt_b: getLabel('b'), opt_c: getLabel('c'), opt_d: getLabel('d'), correct: correctId });
    setEditId(q.id);
    setModal(true);
  };
  const close = () => setModal(false);

  const save = async () => {
    if (!form.prompt.trim()) return;
    setSaving(true);
    const options = [
      { id: 'a', label: form.opt_a, correct: form.correct === 'a' },
      { id: 'b', label: form.opt_b, correct: form.correct === 'b' },
      { id: 'c', label: form.opt_c, correct: form.correct === 'c' },
      { id: 'd', label: form.opt_d, correct: form.correct === 'd' },
    ];
    const data = { level_id: levelId, prompt: form.prompt, scene: form.scene, options };
    if (editId) await window.CerriaDB.updateContentQuestion(editId, data);
    else await window.CerriaDB.createContentQuestion(data);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus soal ini?')) return;
    await window.CerriaDB.deleteContentQuestion(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ marginTop: 8, paddingLeft: 12, borderLeft: '3px solid #FFE3CD' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)' }}>SOAL ({qs.length})</div>
        <button onClick={openAdd} style={{ height: 28, padding: '0 10px', borderRadius: 8, border: 'none', background: '#FFE3CD', color: '#C44A1E', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="plus" size={11} color="#C44A1E"/> Soal
        </button>
      </div>
      {loading ? <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Memuat soal...</div> : qs.length === 0 ? (
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>Belum ada soal.</div>
      ) : qs.map(q => (
        <div key={q.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px', background: '#FAFAF8', borderRadius: 8, marginBottom: 6, border: '1px solid var(--ink-line)' }}>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-1)', lineHeight: 1.4 }}>{q.prompt}</div>
          <button onClick={() => openEdit(q)} style={{ width: 26, height: 26, borderRadius: 6, background: '#FFF3DE', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="settings" size={12} color="#C44A1E"/>
          </button>
          <button onClick={() => del(q.id)} style={{ width: 26, height: 26, borderRadius: 6, background: '#FFE8E8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: 15, color: '#E84A4A', lineHeight: 1 }}>×</button>
        </div>
      ))}
      {modal && (
        <AdminModal title={editId ? 'Edit Soal' : 'Tambah Soal'} onClose={close} onSave={save} saving={saving}>
          {fld('Pertanyaan *', txta({ value: form.prompt, onChange: e => f('prompt', e.target.value), placeholder: 'Teks pertanyaan...' }))}
          {fld('Scene', sel({ value: form.scene, onChange: e => f('scene', e.target.value), children: ['apples','letters','numbers'].map(s => <option key={s} value={s}>{s}</option>) }))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['a','A'],['b','B'],['c','C'],['d','D']].map(([id, label]) => (
              <div key={id}>
                {fld(`Pilihan ${label}`, inp({ value: form[`opt_${id}`], onChange: e => f(`opt_${id}`, e.target.value), placeholder: `Jawaban ${label}` }))}
              </div>
            ))}
          </div>
          {fld('Jawaban Benar', (
            <div style={{ display: 'flex', gap: 8 }}>
              {['a','b','c','d'].map(id => (
                <label key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${form.correct === id ? '#FF7A3A' : 'var(--ink-line)'}`, background: form.correct === id ? '#FFF3DE' : '#fff', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: form.correct === id ? '#C44A1E' : 'var(--ink-2)' }}>
                  <input type="radio" name="correct" value={id} checked={form.correct === id} onChange={() => f('correct', id)} style={{ display: 'none' }}/>
                  {id.toUpperCase()}
                </label>
              ))}
            </div>
          ))}
        </AdminModal>
      )}
    </div>
  );
};

const MissionsTab = () => {
  const [levels, setLevels] = uSA([]);
  const [loading, setLoading] = uSA(true);
  const [activeSub, setActiveSub] = uSA('mat');
  const [expanded, setExpanded] = uSA(null);
  const [modal, setModal] = uSA(false);
  const [form, setForm] = uSA(LEVEL_BLANK);
  const [editId, setEditId] = uSA(null);
  const [saving, setSaving] = uSA(false);

  const load = () => {
    setLoading(true);
    window.CerriaDB.getContentLevels(null).then(d => { setLevels(d || []); setLoading(false); });
  };
  uEA(load, []);

  const filtered = levels.filter(l => l.subject_id === activeSub);
  const subMeta = SUBJECTS_MISSIONS.find(s => s.id === activeSub) || SUBJECTS_MISSIONS[0];

  const openAdd = () => { setForm({ ...LEVEL_BLANK, subject_id: activeSub }); setEditId(null); setModal(true); };
  const openEdit = (lv) => { setForm({ subject_id: lv.subject_id, title: lv.title, is_boss: lv.is_boss }); setEditId(lv.id); setModal(true); };
  const close = () => setModal(false);

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editId) await window.CerriaDB.updateContentLevel(editId, form);
    else await window.CerriaDB.createContentLevel(form);
    setSaving(false);
    close();
    load();
  };

  const del = async (id) => {
    if (!confirm('Hapus level ini beserta semua soalnya?')) return;
    await window.CerriaDB.deleteContentLevel(id);
    load();
  };

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (id) => setExpanded(e => e === id ? null : id);

  return (
    <div>
      {/* Subject filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {SUBJECTS_MISSIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSub(s.id)} style={{ padding: '6px 14px', borderRadius: 999, border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: activeSub === s.id ? s.color : '#F0EDE8', color: activeSub === s.id ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>{s.label}</button>
        ))}
      </div>

      <TabHeader label={`Level ${subMeta.label} (${filtered.length})`} onAdd={openAdd}/>

      {loading ? <div className="small" style={{ color: 'var(--ink-3)' }}>Memuat...</div> : filtered.map(lv => (
        <div key={lv.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: lv.is_boss ? '#FFF3DE' : '#fff', borderRadius: 12, border: lv.is_boss ? `1.5px solid ${subMeta.color}40` : '1.5px solid transparent', boxShadow: '0 2px 6px rgba(180,90,40,.07)' }}>
            {lv.is_boss && <span style={{ fontSize: 14 }}>👑</span>}
            <div style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--ink-1)' }}>{lv.title}</div>
            <button onClick={() => toggle(lv.id)} style={{ height: 28, padding: '0 10px', borderRadius: 8, border: 'none', background: expanded === lv.id ? subMeta.color : '#F0EDE8', color: expanded === lv.id ? '#fff' : 'var(--ink-2)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
              {expanded === lv.id ? 'Tutup' : 'Soal'}
            </button>
            <button onClick={() => openEdit(lv)} style={{ width: 30, height: 30, borderRadius: 8, background: '#FFF3DE', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="settings" size={13} color="#C44A1E"/>
            </button>
            <button onClick={() => del(lv.id)} style={{ width: 30, height: 30, borderRadius: 8, background: '#FFE8E8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, color: '#E84A4A', lineHeight: 1 }}>×</button>
          </div>
          {expanded === lv.id && <QuestionsInline levelId={lv.id}/>}
        </div>
      ))}

      {modal && (
        <AdminModal title={editId ? 'Edit Level' : 'Tambah Level'} onClose={close} onSave={save} saving={saving}>
          {fld('Mata Pelajaran', sel({ value: form.subject_id, onChange: e => f('subject_id', e.target.value), children: SUBJECTS_MISSIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>) }))}
          {fld('Judul Level *', inp({ value: form.title, onChange: e => f('title', e.target.value), placeholder: 'Nama level...' }))}
          {fld('Tipe', (
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is_boss} onChange={e => f('is_boss', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#FF7A3A' }}/>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink-1)' }}>Level Boss</span>
              <span style={{ fontSize: 20 }}>👑</span>
            </label>
          ))}
        </AdminModal>
      )}
    </div>
  );
};

// ── AdminDash ─────────────────────────────────────────────────

const TABS = [
  { id: 'buku',  label: 'Buku'  },
  { id: 'video', label: 'Video' },
  { id: 'lagu',  label: 'Lagu'  },
  { id: 'ws',    label: 'WS'    },
  { id: 'misi',  label: 'Misi'  },
];

const AdminDash = ({ go, session }) => {
  const [isAdmin, setIsAdmin] = uSA(null); // null = loading
  const [activeTab, setActiveTab] = uSA('buku');

  uEA(() => {
    if (!session) { setIsAdmin(false); return; }
    window.CerriaDB.getProfile(session.user.id).then(p => {
      setIsAdmin(p && p.is_admin === true);
    });
  }, [session && session.user.id]);

  // Loading
  if (isAdmin === null) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, border: '4px solid #FFE3CD', borderTopColor: '#FF7A3A', animation: 'spin .7s linear infinite' }}/>
        <div className="small" style={{ color: 'var(--ink-3)' }}>Memeriksa akses...</div>
      </div>
    );
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, padding: 32 }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: '#FFE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="shield" size={36} color="#E84A4A"/>
        </div>
        <div className="display" style={{ fontSize: 22, textAlign: 'center' }}>Akses Ditolak</div>
        <div className="small" style={{ textAlign: 'center', color: 'var(--ink-2)', maxWidth: 240, lineHeight: 1.5 }}>Kamu tidak memiliki hak akses admin. Hubungi pengelola aplikasi.</div>
        <button onClick={() => go('home')} className="btn btn-primary" style={{ marginTop: 8, height: 48, padding: '0 28px', borderRadius: 14 }}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div className="topbar">
        <button onClick={() => go('parent-dash')} className="btn-icon-round">
          <Icon name="arrow-left" size={20}/>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className="h3" style={{ fontFamily: 'var(--font-display)' }}>Admin Panel</div>
          <div className="small" style={{ color: 'var(--c-orange)', fontWeight: 700, fontSize: 11 }}>KONTEN CERRIA</div>
        </div>
        <div style={{ width: 44 }}/>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--ink-line)', background: '#fff', flexShrink: 0 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, height: 44, border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'transparent', color: activeTab === tab.id ? '#FF7A3A' : 'var(--ink-3)', borderBottom: activeTab === tab.id ? '2.5px solid #FF7A3A' : '2.5px solid transparent', transition: 'all .15s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="scroll" style={{ flex: 1, padding: '16px 16px 0' }}>
        {activeTab === 'buku'  && <BooksTab/>}
        {activeTab === 'video' && <VideosTab/>}
        {activeTab === 'lagu'  && <SongsTab/>}
        {activeTab === 'ws'    && <WorksheetsTab/>}
        {activeTab === 'misi'  && <MissionsTab/>}
        <div className="bottom-spacer"/>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

window.AdminDash = AdminDash;
