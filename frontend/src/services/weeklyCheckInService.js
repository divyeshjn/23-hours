import api from "./api";

const BASE_URL = "/weekly-checkins";

export const getWeeklyCheckIns = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const getCurrentWeeklyCheckIn = async () => {
  const response = await api.get(`${BASE_URL}/current`);
  return response.data;
};

export const getWeeklyCheckIn = async (weekDate) => {
  const response = await api.get(`${BASE_URL}/${weekDate}`);
  return response.data;
};

export const saveWeeklyCheckIn = async (weekDate, payload) => {
  const response = await api.put(
    `${BASE_URL}/${weekDate}`,
    payload
  );

  return response.data;
};

export const deleteWeeklyCheckIn = async (weekDate) => {
  return api.delete(`${BASE_URL}/${weekDate}`);
};