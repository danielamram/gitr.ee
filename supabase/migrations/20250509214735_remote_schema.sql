-- GitHub Stars
CREATE TABLE IF NOT EXISTS github_stars (
  user_id uuid NOT NULL,
  repo_id bigint NOT NULL,
  repo_name text NOT NULL,
  repo_url text NOT NULL,
  PRIMARY KEY (user_id, repo_id)
);

-- GitHub Follows (users the user follows)
CREATE TABLE IF NOT EXISTS github_follows (
  user_id uuid NOT NULL,
  followed_user_id bigint NOT NULL,
  followed_user_name text NOT NULL,
  url text NOT NULL,
  PRIMARY KEY (user_id, followed_user_id)
);

-- GitHub Followers (users who follow the user)
CREATE TABLE IF NOT EXISTS github_followers (
  user_id uuid NOT NULL,
  follower_user_id bigint NOT NULL,
  follower_user_name text NOT NULL,
  url text NOT NULL,
  PRIMARY KEY (user_id, follower_user_id)
);

-- GitHub Languages
CREATE TABLE IF NOT EXISTS github_languages (
  user_id uuid NOT NULL,
  language text NOT NULL,
  frequency integer NOT NULL,
  PRIMARY KEY (user_id, language)
);

-- GitHub Activity
CREATE TABLE IF NOT EXISTS github_activity (
  user_id uuid NOT NULL,
  action text NOT NULL,
  repo text,
  created_at timestamptz NOT NULL,
  raw jsonb,
  PRIMARY KEY (user_id, created_at, action)
);
