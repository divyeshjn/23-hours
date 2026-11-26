import api from "./api";

const BASE = "/daily-logs";

export const dailyLogService = {
  async getAll() {
    const response = await api.get(BASE);

    return response.data;
  },

  async getByDate(date) {
    const response = await api.get(
      `${BASE}/${date}`
    );

    return response.data;
  },

  async saveMeal(date, mealType, meal) {
    const response = await api.put(
      `${BASE}/${date}/meals/${mealType}`,
      meal
    );

    return response.data;
  },

  async deleteMeal(date, mealType) {
    const response = await api.delete(
      `${BASE}/${date}/meals/${mealType}`
    );

    return response.data;
  },

  async completeHabit(date, habitId) {
    const response = await api.put(
      `${BASE}/${date}/habits/${habitId}`
    );

    return response.data;
  },

  async uncompleteHabit(date, habitId) {
    const response = await api.delete(
      `${BASE}/${date}/habits/${habitId}`
    );

    return response.data;
  },

  async updateWater(date, water) {
    const response = await api.patch(
      `${BASE}/${date}/water`,
      { water }
    );

    return response.data;
  },

  async updateWorkout(date, workout) {
    const response = await api.patch(
      `${BASE}/${date}/workout`,
      workout
    );

    return response.data;
  },

  async createExtra(date, extra) {
    const response = await api.post(
      `${BASE}/${date}/extras`,
      extra
    );

    return response.data;
  },

  async updateExtra(date, id, extra) {
    const response = await api.patch(
      `${BASE}/${date}/extras/${id}`,
      extra
    );

    return response.data;
  },

  async deleteExtra(date, id) {
    const response = await api.delete(
      `${BASE}/${date}/extras/${id}`
    );

    return response.data;
  }
};