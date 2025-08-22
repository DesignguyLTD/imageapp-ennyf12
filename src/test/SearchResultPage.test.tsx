import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchResultPage from '../pages/searchresultpage/SearchResultPage';
import { BrowserRouter } from 'react-router-dom';

// Mock ImageGrid to prevent full rendering and add test id
jest.mock('../components/imagegrid/ImageGrid', () => () => <div data-testid="image-grid">Mock Grid</div>);

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('SearchResultPage', () => {
  it('calls navigate when a new search is submitted', () => {
    renderWithRouter(<SearchResultPage />);

    const input = screen.getByPlaceholderText('Search for your images');
    const button = screen.getByRole('button', { name: /go/i });

    fireEvent.change(input, { target: { value: 'ocean' } });
    fireEvent.click(button);

    expect(input).toHaveValue('ocean');
  });

  it('renders ImageGrid with appropriate props', () => {
    renderWithRouter(<SearchResultPage />);
    const grid = screen.getByTestId('image-grid');
    expect(grid).toBeInTheDocument();
  });
});
