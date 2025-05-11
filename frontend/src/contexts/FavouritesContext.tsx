import { createContext, Dispatch, FC, ReactNode, Reducer, useContext } from "react";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import { api } from '../api';
import { handleError } from "../helpers/errorHandler";
import { Movie, User, Favourite } from "../types";


export type PageState = {
    loading: boolean;
    error: string | null;
    favourites: Favourite[]
};

type SyncAction =
    | { type: "BEGIN_REQUEST" }
    | { type: "REQUEST_FAILURE"; error: string }
    | { type: "REQUEST_SUCCESS" }
    | { type: "SET_FAVOURITES"; favourites: Favourite[] }
    | { type: "CLEAN_ALL" };

type AsyncAction =
    | { type: "FETCH_FAVOURITES" }
    | { type: "ADD_FAVOURITE", movie_id: Movie['id'] }
    | { type: "DELETE_FAVOURITE", id: Favourite['id'] }

type Action = SyncAction | AsyncAction;

export const initialState: PageState = {
    loading: false,
    error: null,
    favourites: []
};

export const reducer: Reducer<PageState, SyncAction> = (
    state,
    action
): PageState => {
    switch (action.type) {
        case "SET_FAVOURITES":
            return { ...state, favourites: action.favourites, loading: false, error: null };
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
    FETCH_FAVOURITES:
        ({ dispatch }) =>
            async () => {
                dispatch({ type: "BEGIN_REQUEST" });
                try {
                    const favourites = await api.favourites.index();
                    dispatch({
                        type: "SET_FAVOURITES",
                        favourites,
                    });
                } catch (e) {
                    console.error(e);
                    const error = handleError(e);
                    dispatch({ type: "REQUEST_FAILURE", error });
                }
            },
    ADD_FAVOURITE:
        ({ dispatch }) =>
            async (action: {
                movie_id: Movie['id']
            }) => {
                const { movie_id } = action;
                dispatch({ type: "BEGIN_REQUEST" });
                try {
                    await api.favourites.create({
                        movie_id
                    });
                    const favourites = await api.favourites.index();
                    dispatch({
                        type: "SET_FAVOURITES",
                        favourites,
                    });
                    dispatch({ type: "REQUEST_SUCCESS" });
                } catch (e) {
                    const error = handleError(e);
                    dispatch({ type: "REQUEST_FAILURE", error });
                }
            },
    DELETE_FAVOURITE:
        ({ dispatch }) =>
            async (action: { id: Favourite['id'] }) => {
                const { id } = action;
                dispatch({ type: "BEGIN_REQUEST" });
                try {
                    await api.favourites.delete(id);
                    const favourites = await api.favourites.index();
                    dispatch({
                        type: "SET_FAVOURITES",
                        favourites,
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

export const useFavouritesContext = () => useContext(PageContext);

type Props = {
    overrideInitialState?: PageState;
    dispatchOverride?: Dispatch<Action>;
    children: ReactNode
};

export const FavouritesProvider: FC<Props> = ({
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