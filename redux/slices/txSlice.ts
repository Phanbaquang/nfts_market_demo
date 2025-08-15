import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/types/tx';

interface TxState { history: Transaction[] }
const initialState: TxState = { history: [] };

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) { state.history.unshift(action.payload); },
    clearTransactions(state) { state.history = []; },
  }
});

export const { addTransaction, clearTransactions } = slice.actions;
export default slice.reducer;
