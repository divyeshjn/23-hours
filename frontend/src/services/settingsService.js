import api from "./api";

export const settingsService = {
  async getSettings() {
    const response = await api.get("/settings");

    return response.data;
  },

  async updateTargets(targets) {
    const response = await api.patch(
      "/settings/targets",
      targets
    );

    return response.data;
  },

  async createHabit(habit) {
    const response = await api.post(
      "/settings/habits",
      habit
    );

    return response.data;
  },

  async updateHabit(id, habit) {
    const response = await api.patch(
      `/settings/habits/${id}`,
      habit
    );

    return response.data;
  },

  async deleteHabit(id) {
    const response = await api.delete(
      `/settings/habits/${id}`
    );

    return response.data;
  },

  async updatePreferences(preferences) {
    const response = await api.patch(
      "/settings/preferences",
      preferences
    );

    return response.data;
  }
};