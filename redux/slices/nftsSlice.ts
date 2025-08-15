import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NftItem } from '@/types/nft';

type Filters = { status?: 'available' | 'sold'; min?: number; max?: number };
interface NftsState {
  items: NftItem[];
  loading: boolean;
  error?: string;
  search?: string;
  filters?: Filters;
}

const initialState: NftsState = { items: [], loading: false, search: '', filters: {} };

const slice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<NftItem[]>) { state.items = action.payload; },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload; },
    setError(state, action: PayloadAction<string | undefined>) { state.error = action.payload; },
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setFilters(state, action: PayloadAction<Filters>) { state.filters = action.payload; },
    resetFilters(state) { state.filters = {}; state.search = ''; }
  }
});

export const { setItems, setLoading, setError, setSearch, setFilters, resetFilters } = slice.actions;
export default slice.reducer;
