import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../components/hero/Hero';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Hero Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
  });

  it('renders title and description correctly', () => {
    expect(screen.getByText(/all the assets you need in one place/i)).toBeInTheDocument();
    expect(screen.getByText(/curated svgs, vector icons/i)).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    expect(screen.getByPlaceholderText(/search for your images/i)).toBeInTheDocument();
  });

  it('navigates to correct path on valid search', () => {
    const input = screen.getByPlaceholderText(/search for your images/i);
    const button = screen.getByRole('button', { name: /go/i });

    fireEvent.change(input, { target: { value: 'nature' } });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/search/nature');
  });

  it('does not navigate if input is empty', () => {
    const button = screen.getByRole('button', { name: /go/i });
    fireEvent.click(button);

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
