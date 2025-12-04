import api from './http';

export const fetchEvents = async (params) => {
  const { data } = await api.get('/events', { params });
  return data;
};

export const createEvent = async (payload) => {
  const { data } = await api.post('/events', payload);
  return data;
};

export const updateEvent = async (id, payload) => {
  const { data } = await api.put(`/events/${id}`, payload);
  return data;
};

export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}`);
};


