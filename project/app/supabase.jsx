/* global supabase */
// ─────────────────────────────────────────────────────────────
// Cerria — Supabase client + auth helpers
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://uvggjbejmijdztfykylh.supabase.co';
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

window.CerriaDB = {
  db, signUp, signIn, signOut, getSession, onAuthChange,
  getProfile, updateProfile,
  getChildren, createChild,
  getReadingProgress, saveReadingProgress,
  getMissionProgress, saveMissionProgress,
  logActivity, getActivityLog, getTodayStats,
  getParentalControls,
};
