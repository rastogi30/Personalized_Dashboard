import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '../api/apiSlice';

interface FavoritesState {
  items: ContentItem[];
}

const initialState: FavoritesState = {
  items: [],
};

// Load from localStorage if available
const loadFromStorage = (): FavoritesState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
  }
  return initialState;
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFromStorage(),
  reducers: {
    addFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state));
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    reorderFavorites: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;