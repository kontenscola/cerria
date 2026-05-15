-- =============================================================================
-- Cerria Children's Literacy App — Database Schema
-- =============================================================================
-- Supabase / PostgreSQL
-- All tables use UUID primary keys and Row Level Security (RLS).
-- Parents can only access data belonging to themselves and their children.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================================
-- TABLE: profiles
-- One row per authenticated user (parent). Created automatically via trigger
-- when a new user signs up through Supabase Auth.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name            TEXT        NOT NULL DEFAULT '',
    plan            TEXT        NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'full')),
    parent_pin      TEXT,                        -- hashed PIN for parental controls
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.profiles           IS 'One profile per parent account, linked to auth.users.';
COMMENT ON COLUMN public.profiles.plan      IS 'Subscription tier: free or full.';
COMMENT ON COLUMN public.profiles.parent_pin IS 'Bcrypt-hashed 4–6 digit PIN used to unlock parental controls.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles (created_at);

-- ---------------------------------------------------------------------------
-- Trigger: auto-create profile on sign-up
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================================================
-- TABLE: children
-- Child profiles owned by a parent. A parent may have multiple children.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.children (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name        TEXT        NOT NULL,
    age_group   TEXT        NOT NULL CHECK (age_group IN ('3-5', '6-8', '9-12')),
    avatar_idx  INT         NOT NULL DEFAULT 0 CHECK (avatar_idx >= 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.children            IS 'Child profiles associated with a parent account.';
COMMENT ON COLUMN public.children.age_group  IS 'Content filter group: 3-5, 6-8, or 9-12 years old.';
COMMENT ON COLUMN public.children.avatar_idx IS 'Index into the app avatar asset list.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_children_parent_id  ON public.children (parent_id);
CREATE INDEX IF NOT EXISTS idx_children_created_at ON public.children (created_at);


-- =============================================================================
-- TABLE: reading_progress
-- Tracks how far each child has read each book.
-- One row per (child, book) pair — updated in place on subsequent reads.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.reading_progress (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id        UUID        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    book_id         TEXT        NOT NULL,
    current_chapter INT         NOT NULL DEFAULT 0 CHECK (current_chapter >= 0),
    progress        FLOAT       NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 1),
    time_spent      INT         NOT NULL DEFAULT 0 CHECK (time_spent >= 0),  -- seconds
    last_read_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (child_id, book_id)
);

COMMENT ON TABLE  public.reading_progress              IS 'Per-child reading progress, keyed by (child_id, book_id).';
COMMENT ON COLUMN public.reading_progress.book_id      IS 'Opaque book identifier from the app content catalogue.';
COMMENT ON COLUMN public.reading_progress.progress     IS 'Fractional completion 0.0–1.0.';
COMMENT ON COLUMN public.reading_progress.time_spent   IS 'Cumulative seconds spent reading this book.';
COMMENT ON COLUMN public.reading_progress.last_read_at IS 'Timestamp of the most recent reading session.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reading_progress_child_id     ON public.reading_progress (child_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_last_read_at ON public.reading_progress (last_read_at);


-- =============================================================================
-- TABLE: mission_progress
-- Tracks completion and star rating for each (child, level, subject) tuple.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.mission_progress (
    id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id     UUID        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    level_id     INT         NOT NULL CHECK (level_id >= 1),
    subject_id   TEXT        NOT NULL,
    stars        INT         NOT NULL DEFAULT 0 CHECK (stars >= 0 AND stars <= 3),
    completed_at TIMESTAMPTZ,
    UNIQUE (child_id, level_id, subject_id)
);

COMMENT ON TABLE  public.mission_progress              IS 'Mission / module completion per child, level, and subject.';
COMMENT ON COLUMN public.mission_progress.level_id     IS 'Numeric level within the subject curriculum.';
COMMENT ON COLUMN public.mission_progress.subject_id   IS 'Subject slug, e.g. "reading", "math", "science".';
COMMENT ON COLUMN public.mission_progress.stars        IS 'Score 0–3 stars awarded on completion.';
COMMENT ON COLUMN public.mission_progress.completed_at IS 'NULL means started but not yet completed.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mission_progress_child_id     ON public.mission_progress (child_id);
CREATE INDEX IF NOT EXISTS idx_mission_progress_subject_id   ON public.mission_progress (subject_id);
CREATE INDEX IF NOT EXISTS idx_mission_progress_completed_at ON public.mission_progress (completed_at);


-- =============================================================================
-- TABLE: activity_log
-- Append-only log of every content interaction (book, mission, video,
-- lagu/song, worksheet, majalah/magazine).
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.activity_log (
    id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id      UUID        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    type          TEXT        NOT NULL CHECK (type IN ('book', 'mission', 'video', 'lagu', 'worksheet', 'majalah')),
    content_id    TEXT        NOT NULL,
    content_title TEXT        NOT NULL DEFAULT '',
    duration      INT         NOT NULL DEFAULT 0 CHECK (duration >= 0),  -- seconds
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.activity_log              IS 'Append-only log of all child content interactions.';
COMMENT ON COLUMN public.activity_log.type         IS 'Content category: book, mission, video, lagu, worksheet, or majalah.';
COMMENT ON COLUMN public.activity_log.content_id   IS 'Identifier of the content item from the catalogue.';
COMMENT ON COLUMN public.activity_log.duration     IS 'Time spent on this activity in seconds.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_activity_log_child_id   ON public.activity_log (child_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log (created_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_type       ON public.activity_log (type);


-- =============================================================================
-- TABLE: parental_controls
-- One row per child. Uses child_id as PK so there is always at most one
-- control record per child, created lazily on first parental-controls access.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.parental_controls (
    child_id             UUID    PRIMARY KEY REFERENCES public.children(id) ON DELETE CASCADE,
    daily_limit_minutes  INT     NOT NULL DEFAULT 120 CHECK (daily_limit_minutes >= 0),
    allowed_age_group    TEXT    CHECK (allowed_age_group IN ('3-5', '6-8', '9-12')),
    sleep_mode           BOOLEAN NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE  public.parental_controls                     IS 'One parental-control configuration row per child.';
COMMENT ON COLUMN public.parental_controls.daily_limit_minutes IS 'Maximum screen time per day in minutes (0 = unlimited).';
COMMENT ON COLUMN public.parental_controls.allowed_age_group   IS 'Override content age filter; NULL inherits child.age_group.';
COMMENT ON COLUMN public.parental_controls.sleep_mode          IS 'When TRUE, the child account is locked (e.g. after bedtime).';


-- =============================================================================
-- ROW LEVEL SECURITY
-- Every table is locked down so that a parent can only read/write rows that
-- belong to them or to their children. Service-role bypasses RLS as usual.
-- =============================================================================

ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parental_controls ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Helper: returns the set of child IDs that belong to the calling parent.
-- Used in subqueries inside child-data policies.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.my_child_ids()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT id FROM public.children WHERE parent_id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- profiles — parents manage only their own profile row
-- ---------------------------------------------------------------------------

CREATE POLICY "profiles: owner read"
    ON public.profiles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "profiles: owner insert"
    ON public.profiles FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "profiles: owner update"
    ON public.profiles FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

CREATE POLICY "profiles: owner delete"
    ON public.profiles FOR DELETE
    USING (id = auth.uid());

-- ---------------------------------------------------------------------------
-- children — parent sees / manages only their own children
-- ---------------------------------------------------------------------------

CREATE POLICY "children: owner read"
    ON public.children FOR SELECT
    USING (parent_id = auth.uid());

CREATE POLICY "children: owner insert"
    ON public.children FOR INSERT
    WITH CHECK (parent_id = auth.uid());

CREATE POLICY "children: owner update"
    ON public.children FOR UPDATE
    USING (parent_id = auth.uid())
    WITH CHECK (parent_id = auth.uid());

CREATE POLICY "children: owner delete"
    ON public.children FOR DELETE
    USING (parent_id = auth.uid());

-- ---------------------------------------------------------------------------
-- reading_progress — scoped to parent's children
-- ---------------------------------------------------------------------------

CREATE POLICY "reading_progress: owner read"
    ON public.reading_progress FOR SELECT
    USING (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "reading_progress: owner insert"
    ON public.reading_progress FOR INSERT
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "reading_progress: owner update"
    ON public.reading_progress FOR UPDATE
    USING (child_id IN (SELECT public.my_child_ids()))
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "reading_progress: owner delete"
    ON public.reading_progress FOR DELETE
    USING (child_id IN (SELECT public.my_child_ids()));

-- ---------------------------------------------------------------------------
-- mission_progress — scoped to parent's children
-- ---------------------------------------------------------------------------

CREATE POLICY "mission_progress: owner read"
    ON public.mission_progress FOR SELECT
    USING (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "mission_progress: owner insert"
    ON public.mission_progress FOR INSERT
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "mission_progress: owner update"
    ON public.mission_progress FOR UPDATE
    USING (child_id IN (SELECT public.my_child_ids()))
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "mission_progress: owner delete"
    ON public.mission_progress FOR DELETE
    USING (child_id IN (SELECT public.my_child_ids()));

-- ---------------------------------------------------------------------------
-- activity_log — scoped to parent's children (insert + read only; no update)
-- ---------------------------------------------------------------------------

CREATE POLICY "activity_log: owner read"
    ON public.activity_log FOR SELECT
    USING (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "activity_log: owner insert"
    ON public.activity_log FOR INSERT
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

-- Logs are intentionally immutable — no UPDATE/DELETE policies for regular users.

-- ---------------------------------------------------------------------------
-- parental_controls — scoped to parent's children
-- ---------------------------------------------------------------------------

CREATE POLICY "parental_controls: owner read"
    ON public.parental_controls FOR SELECT
    USING (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "parental_controls: owner insert"
    ON public.parental_controls FOR INSERT
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "parental_controls: owner update"
    ON public.parental_controls FOR UPDATE
    USING (child_id IN (SELECT public.my_child_ids()))
    WITH CHECK (child_id IN (SELECT public.my_child_ids()));

CREATE POLICY "parental_controls: owner delete"
    ON public.parental_controls FOR DELETE
    USING (child_id IN (SELECT public.my_child_ids()));


-- =============================================================================
-- End of schema
-- =============================================================================
