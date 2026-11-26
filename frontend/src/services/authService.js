import api from "./api";

export const authService = {

  async login(passcode) {
    const response = await api.post(
      "/auth/login",
      { passcode }
    );

    return response.data;
  },

  async getSession() {
    const response = await api.get(
      "/auth/session"
    );

    return response.data;
  },

  async logout() {
    return await api.post(
      "/auth/logout"
    );
  }

};