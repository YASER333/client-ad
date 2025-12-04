import api from './http';

export const fetchSummaryReport = async (params) => {
  const { data } = await api.get('/reports/summary', { params });
  return data;
};

export const downloadSummaryCsv = async (params) => {
  const response = await api.get('/reports/summary/download', {
    params,
    responseType: 'blob'
  });
  return response.data;
};

export const fetchDailyReport = async (params) => {
  const { data } = await api.get('/reports/daily', { params });
  return data;
};

export const fetchWeeklyTrend = async (params) => {
  const { data } = await api.get('/reports/weekly-trend', { params });
  return data;
};


