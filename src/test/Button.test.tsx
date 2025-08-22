// Buttons.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from '../components/button/Buttons';

describe('Buttons component', () => {
  it('renders with default props', () => {
    render(<Buttons>Click Me</Buttons>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button'); // default class
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Buttons onClick={handleClick}>Click</Buttons>);
    const button = screen.getByRole('button', { name: /click/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Buttons onClick={handleClick} disabled>
        Disabled
      </Buttons>
    );
    const button = screen.getByRole('button', { name: /disabled/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('applies the correct variant and size classes', () => {
    render(
      <Buttons variant="secondary" size="large">
        Styled Button
      </Buttons>
    );
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('secondary');
    expect(button).toHaveClass('large');
  });

  it('applies custom background color style', () => {
    render(
      <Buttons backgroundColor="red">
        Colored Button
      </Buttons>
    );
    const button = screen.getByRole('button', { name: /colored button/i });
    expect(button).toHaveStyle({ backgroundColor: 'red' });
  });
});
