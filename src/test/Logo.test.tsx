import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../components/logo/Logo';

describe('Logo component', () => {
  it('renders with default text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(getByText('DesignGuy Img')).toBeInTheDocument();
  });

  it('links to the homepage ("/")', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    const link = getByText('DesignGuy Img') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/');
  });
});
