import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrowserProvider } from "ethers";

interface WalletState {
  account: string | null;
  balance: string;
  provider: BrowserProvider | null;
}

const initialState: WalletState = {
  account: null,
  balance: "0.0",
  provider: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<BrowserProvider | null>) => {
      state.provider = action.payload;
    },
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const { setProvider, setAccount, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
