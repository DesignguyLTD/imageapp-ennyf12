import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryCard from '../components/categorycard/CategoryCard';

describe('CategoryCard Component', () => {
  const props = {
    src: 'test-image.png',
    alt: 'Test Image',
    label: 'Test Label',
    textStyle: 'customTextStyle',
    onClick: jest.fn(),
  };

  it('renders image with correct src and alt', () => {
    render(<CategoryCard {...props} />);
    const image = screen.getByAltText('Test Image') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('test-image.png');
  });

  it('renders label text', () => {
    render(<CategoryCard {...props} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies custom text style when provided', () => {
    render(<CategoryCard {...props} />);
    const label = screen.getByText('Test Label');

    expect(label.className).toContain('customTextStyle');
  });

  it('calls onClick when card is clicked', () => {
    render(<CategoryCard {...props} />);
    const container = screen.getByText('Test Label').parentElement; // container div

    fireEvent.click(container!);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when optional props are not passed', () => {
    render(<CategoryCard src="img.png" alt="image" label="Label" />);
    expect(screen.getByAltText('image')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});
