/*
  # Create schools and attendance tracking tables

  1. New Tables
    - `schools`
      - `id` (uuid, primary key)
      - `name` (text) - school name
      - `address` (text) - physical address
      - `latitude` (float8) - geographical location
      - `longitude` (float8) - geographical location
      - `radius` (float8) - geofence radius in meters
      - `created_at` (timestamp)

    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `school_id` (uuid, foreign key)
      - `date` (date)
      - `status` (text) - present, absent, late
      - `latitude` (float8) - check-in location
      - `longitude` (float8) - check-in location
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for role-based access
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  radius float8 NOT NULL DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  school_id uuid REFERENCES schools(id) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  latitude float8,
  longitude float8,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Policies for schools
CREATE POLICY "Schools are viewable by authenticated users"
  ON schools FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Principals can manage their school"
  ON schools FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role_id = (SELECT id FROM roles WHERE name = 'principal')
    )
  );

-- Policies for attendance
CREATE POLICY "Students can view their own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Parents can view their children's attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = student_id
      AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view and mark attendance"
  ON attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role_id = (SELECT id FROM roles WHERE name = 'teacher')
    )
  );