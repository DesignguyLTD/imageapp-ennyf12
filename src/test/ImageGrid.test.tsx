import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGrid from '../components/imagegrid/ImageGrid';
import { Photo } from '../types/pexels';
import { MemoryRouter } from 'react-router-dom';

const mockPhotos: Photo[] = [
  {
    id: 1,
    src: {
      original: 'original.jpg',
      large2x: 'large2x.jpg',
      large: 'large.jpg',
      medium: 'medium.jpg',
      small: 'small.jpg',
      portrait: 'portrait.jpg',
      landscape: 'landscape.jpg',
      tiny: 'tiny.jpg',
    },
    alt: 'Test Image 1',
    photographer: 'Jane Doe',
    photographer_url: 'https://example.com',
    url: 'https://pexels.com/photo/1',
    width: 6000,
    height: 4000,
    photographer_id: 456,
    avg_color: '#fff',
    liked: false,
  },
  {
    id: 2,
    src: {
      original: 'original2.jpg',
      large2x: 'large2x2.jpg',
      large: 'large2.jpg',
      medium: 'medium2.jpg',
      small: 'small2.jpg',
      portrait: 'portrait2.jpg',
      landscape: 'landscape2.jpg',
      tiny: 'tiny2.jpg',
    },
    alt: 'Test Image 2',
    photographer: 'John Smith',
    photographer_url: 'https://example.com',
    url: 'https://pexels.com/photo/2',
    width: 5000,
    height: 3000,
    photographer_id: 789,
    avg_color: '#ccc',
    liked: false,
  },
];

describe('ImageGrid Component', () => {
  it('shows loading message when loading and no photos yet', () => {
    render(
      <MemoryRouter>
        <ImageGrid
          photos={[]}
          loading={true}
          error={null}
          loadMore={jest.fn()}
          hasMore={false}
          currentQuery="cats"
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading images for "cats"/i)).toBeInTheDocument();
  });

  it('shows error message if error exists', () => {
    render(
      <MemoryRouter>
        <ImageGrid
          photos={[]}
          loading={false}
          error="Network error"
          loadMore={jest.fn()}
          hasMore={false}
          currentQuery="dogs"
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
  });

  it('shows no images found message for empty results', () => {
    render(
      <MemoryRouter>
        <ImageGrid
          photos={[]}
          loading={false}
          error={null}
          loadMore={jest.fn()}
          hasMore={false}
          currentQuery="elephants"
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/No images found for "elephants"/i)).toBeInTheDocument();
  });

  it('renders image cards when photos are present', () => {
    render(
      <MemoryRouter>
        <ImageGrid
          photos={mockPhotos}
          loading={false}
          error={null}
          loadMore={jest.fn()}
          hasMore={false}
          currentQuery="nature"
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Image 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Image 2/i)).toBeInTheDocument();
  });

  it('calls loadMore when Load More button is clicked', () => {
    const mockLoadMore = jest.fn();

    render(
      <MemoryRouter>
        <ImageGrid
          photos={mockPhotos}
          loading={false}
          error={null}
          loadMore={mockLoadMore}
          hasMore={true}
          currentQuery="mountains"
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(button);
    expect(mockLoadMore).toHaveBeenCalled();
  });
});
