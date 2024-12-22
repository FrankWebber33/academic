/*
  # Create roles and users tables

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique) - role name
      - `description` (text) - role description
      - `created_at` (timestamp)
    
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role_id` (uuid, foreign key)
      - `parent_id` (uuid, foreign key, self-referential)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for role-based access
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create users table with role relationship
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role_id uuid REFERENCES roles(id),
  parent_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'System administrator with full access'),
  ('principal', 'School principal with administrative access'),
  ('teacher', 'Teacher with class management access'),
  ('coordinator', 'Pedagogical coordinator'),
  ('parent', 'Parent/Guardian of students'),
  ('student', 'Student user'),
  ('guest', 'Limited access visitor');

-- Policies for roles table
CREATE POLICY "Roles are viewable by all authenticated users"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

-- Policies for users table
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Principal can view school users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role_id = (SELECT id FROM roles WHERE name = 'principal')
    )
  );