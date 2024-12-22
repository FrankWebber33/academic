import { supabase } from '@/lib/supabase';

interface AttendanceRecord {
  id: string;
  student_id: string;
  school_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export async function markAttendance({
  studentId,
  schoolId,
  status,
  latitude,
  longitude
}: {
  studentId: string;
  schoolId: string;
  status: 'present' | 'absent' | 'late';
  latitude?: number;
  longitude?: number;
}) {
  const { data, error } = await supabase
    .from('attendance')
    .upsert({
      student_id: studentId,
      school_id: schoolId,
      status,
      latitude,
      longitude
    });

  if (error) throw error;
  return data;
}

export async function getStudentAttendance(studentId: string) {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data as AttendanceRecord[];
}

export async function getSchoolAttendance(schoolId: string, date: string) {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      users:student_id (
        name,
        email
      )
    `)
    .eq('school_id', schoolId)
    .eq('date', date);

  if (error) throw error;
  return data;
}