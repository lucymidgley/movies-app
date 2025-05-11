import { createContext, Dispatch, FC, ReactNode, Reducer, useContext } from "react";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import { api } from '../api';
import { handleError } from "../helpers/errorHandler";
import { Movie, User } from "../types";


export type PageState = {
  loading: boolean;
  error: string | null;
  user: User | null;
  movies: Movie[]
};

type SyncAction =
  | { type: "BEGIN_REQUEST" }
  | { type: "REQUEST_FAILURE"; error: string }
  | { type: "REQUEST_SUCCESS" }
  | { type: "SET_USER"; user: User | null }
  | { type: "SET_MOVIES"; movies: Movie[] }
  | { type: "CLEAN_ALL" };

type AsyncAction =
  | { type: "SIGN_UP"; email: string; password: string; name: string }
  | { type: "SIGN_IN"; email: string; password: string }
  | { type: "FETCH_MOVIES" }
  | {
    type: "ADD_MOVIE";
    title: string
    description: string
    director: string
    rating: number
    year: string
    image: string
  }
  | { type: "UPDATE_MOVIE"; movie: Movie }
  | { type: "SIGN_OUT" }

type Action = SyncAction | AsyncAction;

export const initialState: PageState = {
  user: null,
  loading: false,
  error: null,
  movies: []
};

export const reducer: Reducer<PageState, SyncAction> = (
  state,
  action
): PageState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user, loading: false, error: null };
    case "SET_MOVIES":
      return { ...state, movies: action.movies, loading: false, error: null };
    case "BEGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "REQUEST_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REQUEST_FAILURE":
      return { ...state, error: action.error, loading: false };
    case "CLEAN_ALL":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

export const asyncActionHandlers: AsyncActionHandlers<
  Reducer<PageState, Action>,
  AsyncAction
> = {
  SIGN_IN:
    ({ dispatch }) =>
      async (action: { email: string; password: string }) => {
        const { email, password } = action;
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          const response = await api.users.signIn({ email, password });
          dispatch({
            type: "SET_USER",
            user: response?.user,
          });
          window.location.href = "/";
        } catch (e) {
          console.error(e);
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
  SIGN_OUT:
    ({ dispatch }) =>
      async () => {
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          const response = await api.users.signOut();
          dispatch({
            type: "SET_USER",
            user: null,
          });
          window.location.href = "/";
        } catch (e) {
          console.error(e);
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
  FETCH_MOVIES:
    ({ dispatch }) =>
      async () => {
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          const movies = await api.movies.index();
          dispatch({
            type: "SET_MOVIES",
            movies,
          });
        } catch (e) {
          console.error(e);
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
  SIGN_UP:
    ({ dispatch }) =>
      async (action: { email: string; password: string; name: string }) => {
        const { email, password, name } = action;
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          await api.users.create({ email, password, name });
          dispatch({
            type: "REQUEST_SUCCESS",
          });
          window.location.href = "/";
        } catch (e) {
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
  ADD_MOVIE:
    ({ dispatch }) =>
      async (action: {
        title: string
        description: string
        director: string
        rating: number
        year: string
        image: string
      }) => {
        const { title,
          description,
          director,
          rating,
          year,
          image } = action;
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          await api.movies.create({
            description,
            director,
            rating,
            year,
            image,
            title
          });
          const movies = await api.movies.index();
          dispatch({
            type: "SET_MOVIES",
            movies,
          });
          dispatch({ type: "REQUEST_SUCCESS" });
        } catch (e) {
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
  UPDATE_MOVIE:
    ({ dispatch }) =>
      async (action: { movie: Movie }) => {
        const { movie } = action;
        dispatch({ type: "BEGIN_REQUEST" });
        try {
          await api.movies.update(movie);
          const movies = await api.movies.index();
          dispatch({
            type: "SET_MOVIES",
            movies,
          });
          dispatch({ type: "REQUEST_SUCCESS" });
        } catch (e) {
          const error = handleError(e);
          dispatch({ type: "REQUEST_FAILURE", error });
        }
      },
};

const PageContext = createContext<{
  state: PageState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useAppContext = () => useContext(PageContext);

type Props = {
  overrideInitialState?: PageState;
  dispatchOverride?: Dispatch<Action>;
  children: ReactNode
};

export const AppProvider: FC<Props> = ({
  dispatchOverride,
  children,
  ...overrideInitialState
}) => {
  const [state, dispatch] = useReducerAsync<
    Reducer<PageState, SyncAction>,
    AsyncAction,
    Action
  >(reducer, { ...initialState, ...overrideInitialState }, asyncActionHandlers);

  const d = dispatchOverride || dispatch;

  return (
    <PageContext.Provider value={{ state, dispatch: d }}>
      {children}
    </PageContext.Provider>
  );
};