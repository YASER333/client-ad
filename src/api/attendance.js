import api from './http';

export const markAttendance = async (payload) => {
  const { data } = await api.post('/attendance/mark', payload);
  return data;
};

export const fetchDashboardStats = async (params) => {
  const { data } = await api.get('/attendance/dashboard', { params });
  return data;
};

export const fetchStudentAttendance = async (studentId, params) => {
  const { data } = await api.get(`/attendance/student/${studentId}`, { params });
  return data;
};

export const fetchMyAttendance = async (params) => {
  const { data } = await api.get('/attendance/me/history', { params });
  return data;
};

export const fetchMySummary = async (params) => {
  const { data } = await api.get('/attendance/me/summary', { params });
  return data;
};

export const fetchStudentSummary = async (studentId, params) => {
  const { data } = await api.get(`/attendance/student/${studentId}/summary`, { params });
  return data;
};

export const exportAttendance = async (params) => {
  const { data } = await api.get('/attendance/export', { params });
  return data;
};

export const bulkAttendanceImport = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/attendance/bulk-import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};


