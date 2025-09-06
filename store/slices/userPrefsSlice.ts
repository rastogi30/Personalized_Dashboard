import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  categories: string[];
  darkMode: boolean;
  language: string;
}

const initialState: UserPreferences = {
  categories: ['technology', 'business', 'entertainment'],
  darkMode: false,
  language: 'en',
};

// Load from localStorage if available
const loadFromStorage = (): UserPreferences => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        return { ...initialState, ...JSON.parse(saved) };
      } catch {
        return initialState;
      }
    }
  }
  return initialState;
};

const userPrefsSlice = createSlice({
  name: 'userPrefs',
  initialState: loadFromStorage(),
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
        document.documentElement.classList.toggle('dark', state.darkMode);
      }
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.darkMode);
      }
    },
  },
});

export const { toggleDarkMode, updateCategories, initializeTheme } = userPrefsSlice.actions;
export default userPrefsSlice.reducer;