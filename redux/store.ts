import { configureStore } from "@reduxjs/toolkit";
import nftsReducer from "./slices/nftsSlice";
import walletReducer from "./slices/walletSlice";
import transactionsReducer from "./slices/txSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    nfts: nftsReducer,
    wallet: walletReducer,
    transactions: transactionsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
