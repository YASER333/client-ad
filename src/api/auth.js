import api from './http';

export const adminLogin = async (payload) => {
  const { data } = await api.post('/auth/admin', payload);
  return data;
};

export const studentLogin = async (payload) => {
  const { data } = await api.post('/auth/student', payload);
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};


