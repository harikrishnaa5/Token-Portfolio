import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchListSlice";

export const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem("watchlist", JSON.stringify(store.getState().watchlist));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
