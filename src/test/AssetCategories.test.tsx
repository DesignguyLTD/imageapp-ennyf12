import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetCategories from '../components/assetcategories/AssetCategories';

// Mock CategoryCard so we don’t worry about its internal logic here
jest.mock('../components/categorycard/CategoryCard', () => ({ src, alt, label, textStyle }: any) => (
  <div data-testid="category-card">
    <img src={src} alt={alt} />
    <p className={textStyle}>{label}</p>
  </div>
));

describe('AssetCategories Component', () => {
  it('renders all category cards', () => {
    render(<AssetCategories />);

    // Check number of cards rendered
    const cards = screen.getAllByTestId('category-card');
    expect(cards.length).toBe(4); // matches your images array length
  });

  it('renders the correct labels and alt texts', () => {
    render(<AssetCategories />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Logo')).toBeInTheDocument();

    expect(screen.getByAltText('Bundles/ Collections')).toBeInTheDocument();
    expect(screen.getByText('Bundles/ Collections')).toBeInTheDocument();

    expect(screen.getByAltText('Illustrations')).toBeInTheDocument();
    expect(screen.getByText('Illustrations')).toBeInTheDocument();

    expect(screen.getByAltText('Vector Creatives')).toBeInTheDocument();
    expect(screen.getByText('Vector Creatives')).toBeInTheDocument();
  });
});
