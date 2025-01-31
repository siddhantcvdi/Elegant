import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface Details {
  email: string;
  password: string;
}

interface UserState {
  user: User;
  token: string;
  login: (details: Details) => Promise<void>;
  logout: (token: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: {
    id: "",
    displayName: "",
    email: "",
  },
  token: "",
  login: (details) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;
    const url =  `${backendUrl}/users/login`;
    return new Promise<void>(async (resolve, reject) => {
      axios
        .post(url, details, { withCredentials: true })
        .then((response) => {
          const user = response.data.data.loggedInUser;
          // console.log(response.data.data.loggedInUser);
          set(() => ({ token: response.data.data.accessToken }));
          set(() => ({
            user: {
              id: user._id,
              displayName: user.displayName,
              email: user.email,
            },
          }));
          resolve();
        })
        .catch((err) => {
          set(() => ({ token: "" }));
          reject(err.response.data.message);
        });
    });
  },
  logout: (token: string) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;

    return new Promise<void>(async (resolve, reject) => {
      const url = backendUrl+"/users/logout";
      axios
        .post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then(() => {
          set(() => ({ token: "" }));
          resolve();
        })
        .catch(async (err) => {
          if (err.response.data.message === "ACCESS_TOKEN_EXPIRED") {
            await useUserStore.getState().refreshAccessToken();
            await useUserStore.getState().logout(useUserStore.getState().token);
          } else reject(err);
        });
    });
  },
  refreshAccessToken: () => {
    return new Promise<void>(async (resolve, reject) => {
      const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL_DEPLOY,
        withCredentials: true,
      });
      axiosInstance
        .post("/users/refreshAccessToken")
        .then((response) => {
          set(() => ({ token: response.data.data.accessToken }));
          console.log("Token Refreshed");
          set(() => ({
            user: {
              id: response.data.data.loggedInUser._id,
              displayName: response.data.data.loggedInUser.displayName,
              email: response.data.data.loggedInUser.email,
            },
          }))
          console.log(useUserStore.getState().user);
          resolve();
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message || "Token refresh failed";
          console.error("Error Refreshing Token:", errorMessage); // ✅ Logs only short error message
          reject(errorMessage); // ✅ Rejects only the short message
        });
    });
  },
}));

export { useUserStore };
