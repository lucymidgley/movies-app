import Axios from "axios";
import {
  Favourite,
  Movie,
  MovieCreateParams,
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
  movies: {
    index: async () => (await apiAxios.get<Movie[]>("/auth/movies")).data,
    create: async (data: MovieCreateParams) => (await apiAxios.post<Movie>("/auth/movies", data)).data,
    update: async (movie: Movie) => (await apiAxios.put<Movie>(`/auth/movies/${movie.id}`, { movie })).data,
  },
  favourites: {
    index: async () => (await apiAxios.get<Favourite[]>("/auth/favourites")).data,
    create: async (data: { movie_id: Movie['id'] }) => (await apiAxios.post<Favourite>("/auth/favourites", data)).data,
    delete: async (id: Favourite['id']) => (await apiAxios.delete<void>(`/auth/favourites/${id}`)),
  },
};