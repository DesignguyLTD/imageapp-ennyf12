// ImageCard.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ImageCard from '../components/imagecard/ImageCard';
import { Photo } from '../types/pexels';

const mockPhoto: Photo = {
  id: 1,
  width: 1920,
  height: 1080,
  url: 'https://example.com/photo',
  photographer: 'John Doe',
  photographer_url: 'https://example.com/john',
  photographer_id: 123,
  avg_color: '#ffffff',
  src: {
    original: 'https://example.com/original.jpg',
    large2x: 'https://example.com/large2x.jpg',
    large: 'https://example.com/large.jpg',
    medium: 'https://example.com/medium.jpg',
    small: 'https://example.com/small.jpg',
    portrait: 'https://example.com/portrait.jpg',
    landscape: 'https://example.com/landscape.jpg',
    tiny: 'https://example.com/tiny.jpg',
  },
  alt: 'Sample Photo',
  liked: false,
};

describe('ImageCard Component', () => {
  test('renders the image and photographer name', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <ImageCard photo={mockPhoto} />
      </MemoryRouter>
    );

    expect(getByAltText('Sample Photo')).toBeInTheDocument();
    expect(getByText(/John Doe/i)).toBeInTheDocument();
  });
});
