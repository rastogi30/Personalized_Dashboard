import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '../api/apiSlice';

interface ContentState {
  feed: ContentItem[];
  trending: ContentItem[];
  searchResults: ContentItem[];
  searchQuery: string;
  loading: boolean;
}

const initialState: ContentState = {
  feed: [],
  trending: [],
  searchResults: [],
  searchQuery: '',
  loading: false,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.feed = action.payload;
    },
    setTrending: (state, action: PayloadAction<ContentItem[]>) => {
      state.trending = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<ContentItem[]>) => {
      state.searchResults = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reorderFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.feed = action.payload;
    },
  },
});

export const {
  setFeed,
  setTrending,
  setSearchResults,
  setSearchQuery,
  setLoading,
  reorderFeed,
} = contentSlice.actions;

export default contentSlice.reducer;