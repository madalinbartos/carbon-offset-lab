import axios from "axios";
import jwt_decode from "jwt-decode";

import IUser from "../types/user.type";

const API_URL = "http://localhost:4000/api/auth/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  register(name: string, username: string, email: string, password: string) {
    return axios
      .post(API_URL + "signup", {
        name,
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  getCurrentUser(): IUser | undefined {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userJson = JSON.parse(userStr);
      return jwt_decode(userJson.token);
    }

    return undefined;
  }
}

export default new AuthService();
