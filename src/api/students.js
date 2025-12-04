import api from './http';

export const fetchStudents = async (filters = {}) => {
  const { data } = await api.get('/students', { params: filters });
  return data;
};

export const createStudent = async (payload) => {
  const { data } = await api.post('/students', payload);
  return data;
};

export const updateStudent = async (id, payload) => {
  const { data } = await api.put(`/students/${id}`, payload);
  return data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};

export const importStudents = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/students/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};


