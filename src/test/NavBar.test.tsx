import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from '../components/navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Mock the useAuth0 hook
jest.mock('@auth0/auth0-react');

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('NavBar Component', () => {
  test('renders logo and menu icon', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/DesignGuy Img/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle navigation menu/i)).toBeInTheDocument();
  });

  test('toggles mobile menu when menu icon is clicked', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<NavBar />);
    const menuButton = screen.getByLabelText(/toggle navigation menu/i);
    
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('displays all navigation items', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<NavBar />);
    const navItems = ['Graphics', 'Illustration', 'Images', '3D', 'GIFs', 'Music', 'NFTs'];

    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('highlights the active nav link', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<NavBar activeNavLink="Graphics" />);
    const activeItem = screen.getByText('Graphics');
    expect(activeItem.className).toMatch(/selected/);
  });

  test('shows login button when not authenticated and not loading', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: jest.fn(),
    });
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('shows logout button when authenticated and not loading', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: jest.fn(),
    });
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });

  test('shows loading state when loading', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('calls loginWithRedirect when login button is clicked', async () => {
    const loginWithRedirect = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: loginWithRedirect,
    });
    renderWithRouter(<NavBar />);
    
    const loginButton = screen.getByText(/Log In/i);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalledTimes(1);
    });
  });

  test('calls logout when logout button is clicked', async () => {
    const logout = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: logout,
    });
    renderWithRouter(<NavBar />);
    
    const logoutButton = screen.getByText(/Log Out/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalledWith({ logoutParams: { returnTo: window.location.origin } });
    });
  });
});
