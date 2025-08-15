import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState { ids: string[] }
const initialState: FavoritesState = { ids: [] };

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) state.ids = state.ids.filter(x => x !== id);
      else state.ids.push(id);
    },
    clearFavorites(state) { state.ids = []; }
  }
});

export const { toggleFavorite, clearFavorites } = slice.actions;
export default slice.reducer;
