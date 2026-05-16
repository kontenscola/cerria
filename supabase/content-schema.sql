-- =============================================================================
-- Cerria — Content Schema (Admin-managed content tables)
-- =============================================================================
-- Run this in the Supabase SQL Editor after schema.sql has been applied.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Alter profiles: add is_admin flag
-- (parent_pin already exists from earlier schema — skipping)
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;


-- ---------------------------------------------------------------------------
-- Helper: is_admin_user()
-- Returns TRUE when the calling user has is_admin = true in profiles.
-- Used in RLS policies on all content tables.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;


-- =============================================================================
-- TABLE: content_books
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_books (
  id          TEXT        PRIMARY KEY DEFAULT ('b' || substr(md5(random()::text), 1, 8)),
  title       TEXT        NOT NULL DEFAULT '',
  author      TEXT        NOT NULL DEFAULT '',
  theme       TEXT        NOT NULL DEFAULT 'sunset',
  age         TEXT        NOT NULL DEFAULT '6-8' CHECK (age IN ('3-5', '6-8', '9-12')),
  genre       TEXT        NOT NULL DEFAULT 'petualangan',
  chapters    INT         NOT NULL DEFAULT 1,
  reads       INT         NOT NULL DEFAULT 0,
  likes       INT         NOT NULL DEFAULT 0,
  summary     TEXT        NOT NULL DEFAULT '',
  sort_order  INT         NOT NULL DEFAULT 0,
  active      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_books IS 'Admin-managed library of story books.';


-- =============================================================================
-- TABLE: content_episodes
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_episodes (
  id          TEXT        PRIMARY KEY DEFAULT ('v' || substr(md5(random()::text), 1, 8)),
  title       TEXT        NOT NULL DEFAULT '',
  duration    TEXT        NOT NULL DEFAULT '0:00',
  theme       TEXT        NOT NULL DEFAULT 'forest',
  thumb       TEXT        NOT NULL DEFAULT 'forest',
  sort_order  INT         NOT NULL DEFAULT 0,
  active      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_episodes IS 'Admin-managed video book episodes.';


-- =============================================================================
-- TABLE: content_songs
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_songs (
  id             TEXT        PRIMARY KEY DEFAULT ('s' || substr(md5(random()::text), 1, 8)),
  title          TEXT        NOT NULL DEFAULT '',
  artist         TEXT        NOT NULL DEFAULT '',
  duration_secs  INT         NOT NULL DEFAULT 60,
  color          TEXT        NOT NULL DEFAULT '#FFD17A',
  color2         TEXT        NOT NULL DEFAULT '#FF8C42',
  lyrics         JSONB       NOT NULL DEFAULT '[]',
  sort_order     INT         NOT NULL DEFAULT 0,
  active         BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_songs IS 'Admin-managed children''s songs with timed lyrics.';


-- =============================================================================
-- TABLE: content_worksheets
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_worksheets (
  id          TEXT        PRIMARY KEY DEFAULT ('w' || substr(md5(random()::text), 1, 8)),
  title       TEXT        NOT NULL DEFAULT '',
  subject     TEXT        NOT NULL DEFAULT 'mat',
  age         TEXT        NOT NULL DEFAULT '6-8' CHECK (age IN ('3-5', '6-8', '9-12')),
  color       TEXT        NOT NULL DEFAULT '#4EA8DE',
  pages       INT         NOT NULL DEFAULT 1,
  difficulty  TEXT        NOT NULL DEFAULT 'Mudah',
  preview     TEXT        NOT NULL DEFAULT 'numbers',
  description TEXT        NOT NULL DEFAULT '',
  sort_order  INT         NOT NULL DEFAULT 0,
  active      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_worksheets IS 'Admin-managed printable worksheet catalogue.';


-- =============================================================================
-- TABLE: content_levels
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_levels (
  id          SERIAL      PRIMARY KEY,
  subject_id  TEXT        NOT NULL DEFAULT 'mat',
  title       TEXT        NOT NULL DEFAULT '',
  is_boss     BOOLEAN     NOT NULL DEFAULT false,
  sort_order  INT         NOT NULL DEFAULT 0,
  active      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_levels IS 'Admin-managed mission levels, grouped by subject.';


-- =============================================================================
-- TABLE: content_questions
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.content_questions (
  id          SERIAL      PRIMARY KEY,
  level_id    INT         NOT NULL REFERENCES public.content_levels(id) ON DELETE CASCADE,
  prompt      TEXT        NOT NULL DEFAULT '',
  scene       TEXT        NOT NULL DEFAULT 'apples',
  options     JSONB       NOT NULL DEFAULT '[]',
  sort_order  INT         NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.content_questions IS 'Admin-managed quiz questions belonging to a mission level.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_questions_level_id ON public.content_questions (level_id);
CREATE INDEX IF NOT EXISTS idx_content_levels_subject_id  ON public.content_levels (subject_id);


-- =============================================================================
-- ROW LEVEL SECURITY — content tables
-- Public SELECT for anon + authenticated; admin-only INSERT/UPDATE/DELETE.
-- =============================================================================

ALTER TABLE public.content_books       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_episodes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_songs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_worksheets  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_levels      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_questions   ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- content_books
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_books: public read"   ON public.content_books;
DROP POLICY IF EXISTS "content_books: admin insert"  ON public.content_books;
DROP POLICY IF EXISTS "content_books: admin update"  ON public.content_books;
DROP POLICY IF EXISTS "content_books: admin delete"  ON public.content_books;

CREATE POLICY "content_books: public read"
  ON public.content_books FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_books: admin insert"
  ON public.content_books FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_books: admin update"
  ON public.content_books FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_books: admin delete"
  ON public.content_books FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- ---------------------------------------------------------------------------
-- content_episodes
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_episodes: public read"   ON public.content_episodes;
DROP POLICY IF EXISTS "content_episodes: admin insert"  ON public.content_episodes;
DROP POLICY IF EXISTS "content_episodes: admin update"  ON public.content_episodes;
DROP POLICY IF EXISTS "content_episodes: admin delete"  ON public.content_episodes;

CREATE POLICY "content_episodes: public read"
  ON public.content_episodes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_episodes: admin insert"
  ON public.content_episodes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_episodes: admin update"
  ON public.content_episodes FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_episodes: admin delete"
  ON public.content_episodes FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- ---------------------------------------------------------------------------
-- content_songs
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_songs: public read"   ON public.content_songs;
DROP POLICY IF EXISTS "content_songs: admin insert"  ON public.content_songs;
DROP POLICY IF EXISTS "content_songs: admin update"  ON public.content_songs;
DROP POLICY IF EXISTS "content_songs: admin delete"  ON public.content_songs;

CREATE POLICY "content_songs: public read"
  ON public.content_songs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_songs: admin insert"
  ON public.content_songs FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_songs: admin update"
  ON public.content_songs FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_songs: admin delete"
  ON public.content_songs FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- ---------------------------------------------------------------------------
-- content_worksheets
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_worksheets: public read"   ON public.content_worksheets;
DROP POLICY IF EXISTS "content_worksheets: admin insert"  ON public.content_worksheets;
DROP POLICY IF EXISTS "content_worksheets: admin update"  ON public.content_worksheets;
DROP POLICY IF EXISTS "content_worksheets: admin delete"  ON public.content_worksheets;

CREATE POLICY "content_worksheets: public read"
  ON public.content_worksheets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_worksheets: admin insert"
  ON public.content_worksheets FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_worksheets: admin update"
  ON public.content_worksheets FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_worksheets: admin delete"
  ON public.content_worksheets FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- ---------------------------------------------------------------------------
-- content_levels
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_levels: public read"   ON public.content_levels;
DROP POLICY IF EXISTS "content_levels: admin insert"  ON public.content_levels;
DROP POLICY IF EXISTS "content_levels: admin update"  ON public.content_levels;
DROP POLICY IF EXISTS "content_levels: admin delete"  ON public.content_levels;

CREATE POLICY "content_levels: public read"
  ON public.content_levels FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_levels: admin insert"
  ON public.content_levels FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_levels: admin update"
  ON public.content_levels FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_levels: admin delete"
  ON public.content_levels FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- ---------------------------------------------------------------------------
-- content_questions
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "content_questions: public read"   ON public.content_questions;
DROP POLICY IF EXISTS "content_questions: admin insert"  ON public.content_questions;
DROP POLICY IF EXISTS "content_questions: admin update"  ON public.content_questions;
DROP POLICY IF EXISTS "content_questions: admin delete"  ON public.content_questions;

CREATE POLICY "content_questions: public read"
  ON public.content_questions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_questions: admin insert"
  ON public.content_questions FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_questions: admin update"
  ON public.content_questions FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "content_questions: admin delete"
  ON public.content_questions FOR DELETE
  TO authenticated
  USING (public.is_admin_user());


-- =============================================================================
-- SEED DATA
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Books (b1–b6)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_books (id, title, author, theme, age, genre, chapters, reads, likes, summary, sort_order)
VALUES
  ('b1', 'Pulau Misterius',  'Jessinia Neilvart', 'sunset', '6-8',  'petualangan', 12, 19359, 16571, 'Sebuah botol. Sebuah gulungan. Pulau penuh kejutan! Bersama Kira dan Bima, ikuti petualangan seru di Pulau Berbisik.', 1),
  ('b2', 'Hutan Bercerita',  'Pak Doni',          'forest', '6-8',  'petualangan', 8,  8420,  5210,  'Pohon-pohon tua menyimpan dongeng. Apa yang akan kamu temukan di sana?', 2),
  ('b3', 'Sahabat Bintang',  'Bu Ratna',          'night',  '3-5',  'fabel',       6,  12044, 9930,  'Setiap malam, Lila bertemu sahabat di langit.', 3),
  ('b4', 'Kucing Pemberani', 'Kak Iqbal',         'meadow', '3-5',  'humor',       5,  3120,  2810,  'Si Mio takut tikus — tapi cuma yang besar!', 4),
  ('b5', 'Penjelajah Laut',  'Tim Cerria',        'ocean',  '9-12', 'edukasi',     10, 7611,  6020,  'Selami fakta-fakta seru penghuni laut.', 5),
  ('b6', 'Negeri Awan Ungu', 'Mira S.',           'purple', '6-8',  'petualangan', 9,  5510,  4101,  'Awan bisa menjadi rumah?', 6)
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- Episodes (v1–v3)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_episodes (id, title, duration, theme, thumb, sort_order)
VALUES
  ('v1', 'Si Kelinci & Sahabat Hutan', '4:32', 'forest', 'forest', 1),
  ('v2', 'Petualangan Kapten Buah',    '6:08', 'sunset', 'island', 2),
  ('v3', 'Bintang yang Hilang',        '3:50', 'night',  'island', 3)
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- Songs (s1–s6)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_songs (id, title, artist, duration_secs, color, color2, lyrics, sort_order)
VALUES
  ('s1', 'Bintang Kecil',   'Lagu Tradisional', 90, '#FFD17A', '#FF8C42',
   '[{"t":0,"text":"Bintang kecil di langit yang biru..."},{"t":5000,"text":"Amat banyak menghias angkasa..."},{"t":10000,"text":"Aku ingin terbang dan menari..."},{"t":15000,"text":"Melayang jauh di atas sana..."},{"t":20000,"text":"Bintang kecil di langit yang biru..."},{"t":25000,"text":"Amat banyak menghias angkasa..."}]',
   1),
  ('s2', 'Burung Kakaktua', 'Lagu Tradisional', 75, '#6FD296', '#3BB273',
   '[{"t":0,"text":"Burung kakaktua, hinggap di jendela..."},{"t":5000,"text":"Nenek sudah tua, giginya tinggal dua..."},{"t":10000,"text":"Tra la la la la, tra la la la la..."},{"t":15000,"text":"Nenek sudah tua, giginya tinggal dua..."},{"t":20000,"text":"Burung kakaktua, hinggap di jendela..."}]',
   2),
  ('s3', 'Pelangi Pelangi', 'A.T. Mahmud', 82, '#7BC8E8', '#4EA8DE',
   '[{"t":0,"text":"Pelangi pelangi, alangkah indahmu..."},{"t":5000,"text":"Merah kuning hijau di langit yang biru..."},{"t":10000,"text":"Pelukismu agung, siapa gerangan..."},{"t":15000,"text":"Pelangi pelangi, ciptaan Tuhan..."}]',
   3),
  ('s4', 'Lihat Kebunku',   'Ibu Sud', 68, '#C28BD9', '#9B59B6',
   '[{"t":0,"text":"Lihat kebunku, penuh dengan bunga..."},{"t":5000,"text":"Ada yang putih, ada yang merah..."},{"t":10000,"text":"Setiap hari kusiram semua..."},{"t":15000,"text":"Mawar melati semuanya indah..."}]',
   4),
  ('s5', 'Naik Delman',     'Ibu Sud', 72, '#FF9B9B', '#E84A4A',
   '[{"t":0,"text":"Pada hari minggu kuturut ayah ke kota..."},{"t":5000,"text":"Naik delman istimewa kududuk di muka..."},{"t":10000,"text":"Kuda berlari cepat, sudah sampai kota..."},{"t":15000,"text":"Hei! hei! hei! suara kusir berseru..."}]',
   5),
  ('s6', 'Topi Saya Bundar', 'Lagu Tradisional', 60, '#FFB347', '#FF7A3A',
   '[{"t":0,"text":"Topi saya bundar, bundar topi saya..."},{"t":5000,"text":"Kalau tidak bundar, bukan topi saya..."},{"t":10000,"text":"Topi saya bundar, bundar topi saya..."},{"t":15000,"text":"Kalau tidak bundar, bukan topi saya..."}]',
   6)
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- Worksheets (w1–w10)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_worksheets (id, title, subject, age, color, pages, difficulty, preview, description, sort_order)
VALUES
  ('w1',  'Menghitung Apel',       'mat', '3-5', '#4EA8DE', 2,  'Mudah',  'apples',  'Latihan menghitung buah dengan gambar berwarna.', 1),
  ('w2',  'Penjumlahan 1–10',      'mat', '6-8', '#4EA8DE', 4,  'Mudah',  'numbers', 'Soal penjumlahan dasar dengan gambar bantu.', 2),
  ('w3',  'Pengurangan Seru',      'mat', '6-8', '#4EA8DE', 3,  'Sedang', 'numbers', 'Latihan pengurangan dengan cerita bergambar.', 3),
  ('w4',  'Menebalkan Huruf A–Z',  'bin', '3-5', '#FF8C42', 6,  'Mudah',  'letters', 'Latihan menebalkan huruf kapital dan kecil.', 4),
  ('w5',  'Menulis Kata Pertama',  'bin', '6-8', '#FF8C42', 4,  'Mudah',  'letters', 'Salin dan tulis kata-kata sederhana.', 5),
  ('w6',  'Kalimat Sederhana',     'bin', '6-8', '#FF8C42', 5,  'Sedang', 'letters', 'Susun kata menjadi kalimat yang benar.', 6),
  ('w7',  'Bagian Tubuh Tumbuhan', 'sci', '6-8', '#3BB273', 3,  'Mudah',  'science', 'Labeli bagian-bagian tumbuhan: akar, batang, daun.', 7),
  ('w8',  'Hewan dan Makanannya',  'sci', '6-8', '#3BB273', 4,  'Sedang', 'science', 'Hubungkan hewan dengan jenis makanannya.', 8),
  ('w9',  'Mewarnai Hutan Ajaib',  'art', '3-5', '#9B59B6', 8,  'Seru',   'art',     'Delapan gambar hutan & hewan untuk diwarnai.', 9),
  ('w10', 'Membuat Kartu Ucapan',  'art', '6-8', '#9B59B6', 2,  'Seru',   'art',     'Template kartu ulang tahun dan hari ibu.', 10)
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- Levels (content_levels seed)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_levels (id, subject_id, title, is_boss, sort_order)
OVERRIDING SYSTEM VALUE
VALUES
  (1,  'mat', 'Mengenal Angka',          false, 1),
  (2,  'mat', 'Menjumlah Sampai 10',     false, 2),
  (3,  'mat', 'Menjumlah Sampai 20',     false, 3),
  (4,  'mat', 'Mengurangi',              false, 4),
  (5,  'mat', 'Bilangan Genap',          false, 5),
  (6,  'mat', 'Bilangan Ganjil',         false, 6),
  (7,  'mat', 'Pola Angka',              false, 7),
  (8,  'mat', 'Bos: Si Naga Angka',      true,  8),
  (9,  'bin', 'Mengenal Huruf A–E',      false, 1),
  (10, 'bin', 'Mengenal Huruf F–J',      false, 2),
  (11, 'bin', 'Membaca Suku Kata',       false, 3),
  (12, 'bin', 'Kata Sederhana',          false, 4),
  (13, 'bin', 'Bos: Sang Kata Ajaib',    true,  5),
  (14, 'eng', 'Hello, World!',           false, 1),
  (15, 'eng', 'Colors & Shapes',         false, 2),
  (16, 'eng', 'Numbers 1–10',            false, 3),
  (17, 'eng', 'Boss: Word Wizard',       true,  4),
  (18, 'sci', 'Bagian Tumbuhan',         false, 1),
  (19, 'sci', 'Hewan & Makanannya',      false, 2),
  (20, 'sci', 'Bos: Ilmuwan Cilik',      true,  3)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence so next auto-insert won't collide
SELECT setval('public.content_levels_id_seq', (SELECT MAX(id) FROM public.content_levels));


-- ---------------------------------------------------------------------------
-- Questions (content_questions seed — one question per level for starter data)
-- ---------------------------------------------------------------------------

INSERT INTO public.content_questions (level_id, prompt, scene, options, sort_order)
VALUES
  -- Level 1: Mengenal Angka
  (1, 'Ada berapa apel di gambar ini?', 'apples',
   '[{"id":"a","label":"3","correct":false},{"id":"b","label":"5","correct":true},{"id":"c","label":"4","correct":false},{"id":"d","label":"6","correct":false}]',
   1),
  -- Level 2: Menjumlah Sampai 10
  (2, '3 + 4 = ?', 'apples',
   '[{"id":"a","label":"6","correct":false},{"id":"b","label":"8","correct":false},{"id":"c","label":"7","correct":true},{"id":"d","label":"5","correct":false}]',
   1),
  -- Level 3: Menjumlah Sampai 20
  (3, '9 + 8 = ?', 'numbers',
   '[{"id":"a","label":"16","correct":false},{"id":"b","label":"17","correct":true},{"id":"c","label":"18","correct":false},{"id":"d","label":"15","correct":false}]',
   1),
  -- Level 4: Mengurangi
  (4, 'Ada 7 apel di keranjang. Kira makan 2. Berapa sisanya?', 'apples',
   '[{"id":"a","label":"4","correct":false},{"id":"b","label":"5","correct":true},{"id":"c","label":"6","correct":false},{"id":"d","label":"3","correct":false}]',
   1),
  -- Level 9: Mengenal Huruf A–E
  (9, 'Huruf apakah ini? — A', 'letters',
   '[{"id":"a","label":"A","correct":true},{"id":"b","label":"B","correct":false},{"id":"c","label":"C","correct":false},{"id":"d","label":"D","correct":false}]',
   1),
  -- Level 14: Hello World
  (14, 'How do you say "halo" in English?', 'letters',
   '[{"id":"a","label":"Bye","correct":false},{"id":"b","label":"Hello","correct":true},{"id":"c","label":"Thanks","correct":false},{"id":"d","label":"Sorry","correct":false}]',
   1),
  -- Level 18: Bagian Tumbuhan
  (18, 'Bagian tumbuhan yang menyerap air dari tanah adalah ...', 'numbers',
   '[{"id":"a","label":"Daun","correct":false},{"id":"b","label":"Batang","correct":false},{"id":"c","label":"Akar","correct":true},{"id":"d","label":"Bunga","correct":false}]',
   1)
ON CONFLICT DO NOTHING;


-- =============================================================================
-- End of content-schema.sql
-- =============================================================================
