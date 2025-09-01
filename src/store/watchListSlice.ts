import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Token = {
    id: string;
    name: string;
    symbol: string;
    image: string;
    price: number;
    priceChange24h: number;
    sparkline: number[];
    holdings: number;
};

type WatchlistState = {
    items: Token[];
};

const persisted = localStorage.getItem("watchlist");
const initialState: WatchlistState = persisted ? JSON.parse(persisted) : { items: [] };

const watchListSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<Token>) => {
            if (!state.items.find((item) => item.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        removeToken: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateHoldings: (state, action: PayloadAction<{ id: string; holdings: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) item.holdings = action.payload.holdings;
        },
        updatePrices: (
            state,
            action: PayloadAction<{ id: string; price: number; priceChange24h: number; sparkline: number[] }[]>
        ) => {
            action.payload.forEach((update) => {
                const item = state.items.find((i) => i.id === update.id);
                if (item) {
                    item.price = update.price;
                    item.priceChange24h = update.priceChange24h;
                    item.sparkline = update.sparkline;
                }
            });
        },
        setWatchlist: (state, action: PayloadAction<Token[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addToken, updateHoldings, updatePrices, setWatchlist, removeToken } = watchListSlice.actions;
export default watchListSlice.reducer;
