import Axios from "axios";
import {
  SignInResponse,
  User,
  UserCreateParams,
} from "./types";

const apiAxios = Axios.create({ withCredentials: true });
apiAxios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
apiAxios.defaults.baseURL = "http://localhost:8080/auth";
export const api = {
  users: {
    create: async (params: UserCreateParams) =>
      void (await apiAxios.post<void>("/signup", params)),
    show: async (): Promise<User | null> =>
      (await apiAxios.get<User>("/profile")).data,
    signIn: async (params: { user: { email: string; password: string } }) =>
       (await apiAxios.post<SignInResponse>("/login", params)).data,
  },
};