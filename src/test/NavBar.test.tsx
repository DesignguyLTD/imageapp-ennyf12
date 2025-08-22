import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../components/navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('NavBar Component', () => {
  test('renders logo and menu icon', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/DesignGuy Img/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle navigation menu/i)).toBeInTheDocument();
  });

  test('toggles mobile menu when menu icon is clicked', () => {
    renderWithRouter(<NavBar />);
    const menuButton = screen.getByLabelText(/toggle navigation menu/i);
    
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('displays all navigation items', () => {
    renderWithRouter(<NavBar />);
    const navItems = ['Graphics', 'Illustration', 'Images', '3D', 'GIFs', 'Music', 'NFTs'];

    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('highlights the active nav link', () => {
    renderWithRouter(<NavBar activeNavLink="Graphics" />);
    const activeItem = screen.getByText('Graphics');
    expect(activeItem.className).toMatch(/selected/);
  });

  test('shows login button when not logged in', () => {
    renderWithRouter(<NavBar isLoggedIn={false} />);
    expect(screen.getByText(/login \/ sign up/i)).toBeInTheDocument();
  });

  test('shows logout button when logged in', () => {
    renderWithRouter(<NavBar isLoggedIn={true} />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('calls onLoginClick when button is clicked', () => {
    const handleLoginClick = jest.fn();
    renderWithRouter(<NavBar onLoginClick={handleLoginClick} />);
    
    const button = screen.getByText(/login \/ sign up/i);
    fireEvent.click(button);

    expect(handleLoginClick).toHaveBeenCalledTimes(1);
  });
});
