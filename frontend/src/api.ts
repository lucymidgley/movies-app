import Axios from "axios";
import {
  SignInResponse,
  User,
  UserCreateParams,
} from "./types";

const apiAxios = Axios.create({ withCredentials: true });
apiAxios.defaults.headers.post["Content-Type"] =
  "application/json";
apiAxios.defaults.baseURL = "http://localhost:8080";
export const api = {
  users: {
    create: async (data: UserCreateParams) =>
      void (await apiAxios.post<void>("/auth/signup", data)),
    show: async (): Promise<User | null> =>
      (await apiAxios.get<User>("/auth/profile")).data,
    signIn: async (data: { email: string; password: string }) =>
      (await apiAxios.post<SignInResponse>("/auth/login", data)).data,
    signOut: async () =>
      void (await apiAxios.delete<void>("/auth/signout")),
  },
};