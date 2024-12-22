import { useState } from 'react';
import { markAttendance, getStudentAttendance, getSchoolAttendance } from '@/services/attendance';

export function useAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markStudentAttendance = async ({
    studentId,
    schoolId,
    status,
    location
  }: {
    studentId: string;
    schoolId: string;
    status: 'present' | 'absent' | 'late';
    location?: { latitude: number; longitude: number };
  }) => {
    try {
      setLoading(true);
      await markAttendance({
        studentId,
        schoolId,
        status,
        ...location
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentAttendance = async (studentId: string) => {
    try {
      setLoading(true);
      return await getStudentAttendance(studentId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSchoolAttendance = async (schoolId: string, date: string) => {
    try {
      setLoading(true);
      return await getSchoolAttendance(schoolId, date);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch school attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    markStudentAttendance,
    fetchStudentAttendance,
    fetchSchoolAttendance
  };
}