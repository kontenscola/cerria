/* global supabase */
// ─────────────────────────────────────────────────────────────
// Cerria — Supabase client + auth helpers
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://uvggjbejmjjdztfykylh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_3Wi4xhsozPUJIvaLTiDRAg_Z-N18-QF';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Auth ─────────────────────────────────────────────────────

const signUp = async ({ email, password, name }) => {
  const { data, error } = await db.auth.signUp({
    email, password,
    options: { data: { name } },
  });
  return { data, error };
};

const signIn = async ({ email, password }) => {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  return { data, error };
};

const signOut = async () => {
  await db.auth.signOut();
};

const getSession = async () => {
  const { data } = await db.auth.getSession();
  return data.session;
};

const onAuthChange = (cb) => {
  const { data: { subscription } } = db.auth.onAuthStateChange((_event, session) => cb(session));
  return subscription;
};

// ── Profile ───────────────────────────────────────────────────

const getProfile = async (userId) => {
  const { data } = await db.from('profiles').select('*').eq('id', userId).single();
  return data;
};

const updateProfile = async (userId, updates) => {
  const { error } = await db.from('profiles').update(updates).eq('id', userId);
  return error;
};

// ── Children ─────────────────────────────────────────────────

const getChildren = async (parentId) => {
  const { data } = await db.from('children').select('*').eq('parent_id', parentId).order('created_at');
  return data || [];
};

const createChild = async ({ parentId, name, ageGroup, avatarIdx = 0 }) => {
  const { data, error } = await db.from('children').insert({
    parent_id: parentId, name, age_group: ageGroup, avatar_idx: avatarIdx,
  }).select().single();
  return { data, error };
};

// ── Reading Progress ─────────────────────────────────────────

const getReadingProgress = async (childId) => {
  const { data } = await db.from('reading_progress').select('*').eq('child_id', childId);
  return data || [];
};

const saveReadingProgress = async ({ childId, bookId, currentChapter, progress, timeSpent }) => {
  const { error } = await db.from('reading_progress').upsert({
    child_id: childId, book_id: bookId,
    current_chapter: currentChapter, progress, time_spent: timeSpent,
    last_read_at: new Date().toISOString(),
  }, { onConflict: 'child_id,book_id' });
  return error;
};

// ── Mission Progress ─────────────────────────────────────────

const getMissionProgress = async (childId) => {
  const { data } = await db.from('mission_progress').select('*').eq('child_id', childId);
  return data || [];
};

const saveMissionProgress = async ({ childId, levelId, subjectId, stars }) => {
  const { error } = await db.from('mission_progress').upsert({
    child_id: childId, level_id: levelId, subject_id: subjectId, stars,
    completed_at: new Date().toISOString(),
  }, { onConflict: 'child_id,level_id,subject_id' });
  return error;
};

// ── Activity Log ─────────────────────────────────────────────

const logActivity = async ({ childId, type, contentId, contentTitle, duration }) => {
  await db.from('activity_log').insert({
    child_id: childId, type, content_id: contentId,
    content_title: contentTitle, duration,
  });
};

const getActivityLog = async (childId, limit = 20) => {
  const { data } = await db.from('activity_log')
    .select('*').eq('child_id', childId)
    .order('created_at', { ascending: false }).limit(limit);
  return data || [];
};

const getTodayStats = async (childId) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const { data } = await db.from('activity_log')
    .select('type, duration')
    .eq('child_id', childId)
    .gte('created_at', today.toISOString());
  const totalMinutes = Math.floor((data || []).reduce((s, r) => s + (r.duration || 0), 0) / 60);
  return { totalMinutes, logs: data || [] };
};

// ── Parental Controls ─────────────────────────────────────────

const getParentalControls = async (childId) => {
  const { data } = await db.from('parental_controls').select('*').eq('child_id', childId).single();
  return data;
};

// ── Content (Admin CRUD) ──────────────────────────────────────

const getContentBooks = async () => {
  const { data } = await db.from('content_books').select('*').eq('active', true).order('sort_order');
  return data || [];
};
const createContentBook = async (d) => {
  const { data, error } = await db.from('content_books').insert(d).select().single();
  return { data, error };
};
const updateContentBook = async (id, d) => {
  const { error } = await db.from('content_books').update({ ...d, updated_at: new Date().toISOString() }).eq('id', id);
  return error;
};
const deleteContentBook = async (id) => {
  await db.from('content_books').update({ active: false }).eq('id', id);
};

const getContentEpisodes = async () => {
  const { data } = await db.from('content_episodes').select('*').eq('active', true).order('sort_order');
  return data || [];
};
const createContentEpisode = async (d) => {
  const { data, error } = await db.from('content_episodes').insert(d).select().single();
  return { data, error };
};
const updateContentEpisode = async (id, d) => {
  const { error } = await db.from('content_episodes').update({ ...d, updated_at: new Date().toISOString() }).eq('id', id);
  return error;
};
const deleteContentEpisode = async (id) => {
  await db.from('content_episodes').update({ active: false }).eq('id', id);
};

const getContentSongs = async () => {
  const { data } = await db.from('content_songs').select('*').eq('active', true).order('sort_order');
  return data || [];
};
const createContentSong = async (d) => {
  const { data, error } = await db.from('content_songs').insert(d).select().single();
  return { data, error };
};
const updateContentSong = async (id, d) => {
  const { error } = await db.from('content_songs').update({ ...d, updated_at: new Date().toISOString() }).eq('id', id);
  return error;
};
const deleteContentSong = async (id) => {
  await db.from('content_songs').update({ active: false }).eq('id', id);
};

const getContentWorksheets = async () => {
  const { data } = await db.from('content_worksheets').select('*').eq('active', true).order('sort_order');
  return data || [];
};
const createContentWorksheet = async (d) => {
  const { data, error } = await db.from('content_worksheets').insert(d).select().single();
  return { data, error };
};
const updateContentWorksheet = async (id, d) => {
  const { error } = await db.from('content_worksheets').update({ ...d, updated_at: new Date().toISOString() }).eq('id', id);
  return error;
};
const deleteContentWorksheet = async (id) => {
  await db.from('content_worksheets').update({ active: false }).eq('id', id);
};

const getContentLevels = async (subjectId) => {
  let q = db.from('content_levels').select('*').eq('active', true).order('sort_order');
  if (subjectId) q = q.eq('subject_id', subjectId);
  const { data } = await q;
  return data || [];
};
const createContentLevel = async (d) => {
  const { data, error } = await db.from('content_levels').insert(d).select().single();
  return { data, error };
};
const updateContentLevel = async (id, d) => {
  const { error } = await db.from('content_levels').update({ ...d, updated_at: new Date().toISOString() }).eq('id', id);
  return error;
};
const deleteContentLevel = async (id) => {
  await db.from('content_levels').update({ active: false }).eq('id', id);
};

const getContentQuestions = async (levelId) => {
  const { data } = await db.from('content_questions').select('*').eq('level_id', levelId).order('sort_order');
  return data || [];
};
const createContentQuestion = async (d) => {
  const { data, error } = await db.from('content_questions').insert(d).select().single();
  return { data, error };
};
const updateContentQuestion = async (id, d) => {
  const { error } = await db.from('content_questions').update(d).eq('id', id);
  return error;
};
const deleteContentQuestion = async (id) => {
  await db.from('content_questions').delete().eq('id', id);
};

// ── Load App Content from DB (override static data.jsx) ───────

const loadAppContent = async () => {
  try {
    const [books, episodes, songs, worksheets] = await Promise.all([
      getContentBooks(),
      getContentEpisodes(),
      getContentSongs(),
      getContentWorksheets(),
    ]);

    const cur = window.CERRIA_DATA || {};

    if (books.length > 0) {
      cur.BOOKS = books.map(b => ({
        id: b.id, title: b.title, author: b.author, theme: b.theme || 'sunset',
        age: b.age || '6-8', genre: b.genre || 'petualangan',
        chapters: b.chapters || 6, progress: 0, currentChapter: 1,
        reads: b.reads || 0, likes: b.likes || 0, summary: b.summary || '',
      }));
    }
    if (episodes.length > 0) {
      cur.EPISODES = episodes.map(e => ({
        id: e.id, title: e.title, duration: e.duration || '5:00',
        thumb: e.thumb || 'forest', theme: e.theme || 'forest',
      }));
    }
    if (songs.length > 0) {
      window.SONGS = songs.map(s => ({
        id: s.id, title: s.title, artist: s.artist,
        duration: s.duration_secs || 60,
        color: s.color || '#FFD17A', color2: s.color2 || '#FF8C42',
        lyrics: Array.isArray(s.lyrics) ? s.lyrics : [],
      }));
    }
    if (worksheets.length > 0) {
      window.WORKSHEETS = worksheets.map(w => ({
        id: w.id, title: w.title, subject: w.subject || 'mat',
        age: w.age || '6-8', color: w.color || '#4EA8DE',
        pages: w.pages || 2, difficulty: w.difficulty || 'Mudah',
        preview: w.preview || 'numbers', desc: w.description || '',
      }));
    }

    window.CERRIA_DATA = cur;
  } catch (e) {
    // fallback: keep static data.jsx values
  }
};

window.CerriaDB = {
  db, signUp, signIn, signOut, getSession, onAuthChange,
  getProfile, updateProfile,
  getChildren, createChild,
  getReadingProgress, saveReadingProgress,
  getMissionProgress, saveMissionProgress,
  logActivity, getActivityLog, getTodayStats,
  getParentalControls,
  getContentBooks, createContentBook, updateContentBook, deleteContentBook,
  getContentEpisodes, createContentEpisode, updateContentEpisode, deleteContentEpisode,
  getContentSongs, createContentSong, updateContentSong, deleteContentSong,
  getContentWorksheets, createContentWorksheet, updateContentWorksheet, deleteContentWorksheet,
  getContentLevels, createContentLevel, updateContentLevel, deleteContentLevel,
  getContentQuestions, createContentQuestion, updateContentQuestion, deleteContentQuestion,
  loadAppContent,
};
