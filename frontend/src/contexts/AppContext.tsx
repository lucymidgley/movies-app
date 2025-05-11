import { createContext, Dispatch, FC, ReactNode, Reducer, useContext } from "react";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import { api } from '../api';
import { handleError } from "../helpers/errorHandler";
import { User } from "../types";


export type PageState = {
  loading: boolean;
  error: string | null;
  user: User | null;
};

type SyncAction =
  | { type: "BEGIN_REQUEST" }
  | { type: "REQUEST_FAILURE"; error: string }
  | { type: "REQUEST_SUCCESS" }
  | { type: "SET_USER"; user: User | null }
  | { type: "CLEAN_ALL" };

type AsyncAction =
  | { type: "SIGN_UP"; email: string; password: string; name: string }
  | { type: "SIGN_IN"; email: string; password: string }
  | { type: "SIGN_OUT" }

type Action = SyncAction | AsyncAction;

export const initialState: PageState = {
  user: null,
  loading: false,
  error: null,
};

export const reducer: Reducer<PageState, SyncAction> = (
  state,
  action
): PageState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user, loading: false, error: null };
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