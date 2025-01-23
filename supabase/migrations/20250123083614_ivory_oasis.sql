/*
  # Create blogs table and security policies

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `author_email` (text)

  2. Security
    - Enable RLS on `blogs` table
    - Add policies for:
      - Anyone can read blogs
      - Authenticated users can create their own blogs
      - Users can only update/delete their own blogs
*/

CREATE TABLE blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  author_email text NOT NULL
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read blogs
CREATE POLICY "Anyone can read blogs"
  ON blogs
  FOR SELECT
  USING (true);

-- Allow authenticated users to create blogs
CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own blogs
CREATE POLICY "Users can update their own blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own blogs
CREATE POLICY "Users can delete their own blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);