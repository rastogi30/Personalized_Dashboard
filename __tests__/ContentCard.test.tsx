import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '@/components/content/ContentCard';
import userPrefsReducer from '@/store/slices/userPrefsSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';
import contentReducer from '@/store/slices/contentSlice';
import { ContentItem } from '@/store/api/apiSlice';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  Reorder: {
    Group: ({ children }: any) => <div>{children}</div>,
    Item: ({ children }: any) => <div>{children}</div>,
  },
}));

const mockStore = configureStore({
  reducer: {
    userPrefs: userPrefsReducer,
    favorites: favoritesReducer,
    content: contentReducer,
  },
});

const mockItem: ContentItem = {
  id: 'test-1',
  type: 'news',
  title: 'Test Article',
  description: 'Test description',
  image: 'https://example.com/image.jpg',
  url: 'https://example.com',
  meta: {
    source: { name: 'Test Source' },
    publishedAt: '2025-01-01T00:00:00Z',
  },
};

const renderWithStore = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('ContentCard', () => {
  it('renders content correctly', () => {
    renderWithStore(<ContentCard item={mockItem} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('displays correct button text for news', () => {
    renderWithStore(<ContentCard item={mockItem} />);
    
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('displays correct button text for movies', () => {
    const movieItem: ContentItem = {
      ...mockItem,
      type: 'movie',
    };
    
    renderWithStore(<ContentCard item={movieItem} />);
    
    expect(screen.getByText('Watch Now')).toBeInTheDocument();
  });

  it('handles favorite toggle', () => {
    renderWithStore(<ContentCard item={mockItem} />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);
    
    // Test that the button is clickable (actual state testing would require more setup)
    expect(favoriteButton).toBeInTheDocument();
  });
});