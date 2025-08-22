import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavLink from '../components/navlink/NavLink';

describe('NavLink', () => {
  it('renders children content', () => {
    render(<NavLink>Home</NavLink>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<NavLink onClick={handleClick}>Click Me</NavLink>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected class when isSelected is true', () => {
    const { container } = render(<NavLink isSelected={true}>Selected</NavLink>);
    expect(container.firstChild).toHaveClass('selected');
  });

  it('does not apply selected class when isSelected is false', () => {
    const { container } = render(<NavLink isSelected={false}>Not Selected</NavLink>);
    expect(container.firstChild).not.toHaveClass('selected');
  });

  it('shows dropdown indicator when hasDropdown is true', () => {
    render(<NavLink hasDropdown={true}>More</NavLink>);
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  it('does not show dropdown indicator when hasDropdown is false', () => {
    render(<NavLink hasDropdown={false}>Less</NavLink>);
    expect(screen.queryByText('▼')).not.toBeInTheDocument();
  });
});
