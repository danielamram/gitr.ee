-- Create repo_summaries table for caching AI-generated repository summaries
CREATE TABLE IF NOT EXISTS repo_summaries (
  id SERIAL PRIMARY KEY,
  repo_name TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add index on repo_name for faster lookups
  CONSTRAINT repo_name_idx UNIQUE (repo_name)
);

-- Add comment to table
COMMENT ON TABLE repo_summaries IS 'Cached AI-generated summaries for GitHub repositories';

-- Add permissions for authenticated and anonymous users
ALTER TABLE repo_summaries ENABLE ROW LEVEL SECURITY;

-- Policies for reading summaries (allow all users to read)
CREATE POLICY "Anyone can read repo summaries"
  ON repo_summaries FOR SELECT
  USING (true);

-- Only allow service role to insert/update summaries
CREATE POLICY "Service role can insert repo summaries"
  ON repo_summaries FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update repo summaries"
  ON repo_summaries FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); 