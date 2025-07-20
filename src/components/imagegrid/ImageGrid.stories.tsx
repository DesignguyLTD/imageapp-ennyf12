
import ImageGrid from './ImageGrid'; // Import the component
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Photo } from '../../types/pexels'; // Import your Photo type

// Mock Photo data for stories (using via.placeholder.com)
const mockPhotos: Photo[] = [
  {
    id: 1, alt: 'Elegant brown briefcase', photographer: 'Photographer A',
    src: { tiny: 'https://via.placeholder.com/280x200/FF5733/FFFFFF?text=Grid+Img+1', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
  {
    id: 2, alt: 'Stylish pastel handbags', photographer: 'Photographer B',
    src: { tiny: 'https://via.placeholder.com/280x200/33FF57/000000?text=Grid+Img+2', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
  {
    id: 3, alt: 'Vibrant collection of beach bags', photographer: 'Photographer C',
    src: { tiny: 'https://via.placeholder.com/280x200/5733FF/FFFFFF?text=Grid+Img+3', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
  {
    id: 4, alt: 'Stylish yellow backpack', photographer: 'Photographer D',
    src: { tiny: 'https://via.placeholder.com/280x200/FF5733/FFFFFF?text=Grid+Img+4', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
  {
    id: 5, alt: 'Colorful sneakers on display', photographer: 'Photographer E',
    src: { tiny: 'https://via.placeholder.com/280x200/33FF57/000000?text=Grid+Img+5', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
  {
    id: 6, alt: 'Vintage camera on a wooden table', photographer: 'Photographer F',
    src: { tiny: 'https://via.placeholder.com/280x200/5733FF/FFFFFF?text=Grid+Img+6', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' },
    url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
  },
];

// This is the crucial default export that Storybook requires!
const meta: Meta<typeof ImageGrid> = {
  title: 'Search/ImageGrid', // Group under 'Search'
  component: ImageGrid,
  tags: ['autodocs'],
  argTypes: {
    photos: { control: 'object', description: 'Array of photo data to display in the grid.' },
    loading: { control: 'boolean', description: 'If true, indicates initial loading or loading more.' },
    error: { control: 'text', description: 'Error message to display.' },
    loadMore: { action: 'load more clicked', description: 'Callback function to load more images.' },
    hasMore: { control: 'boolean', description: 'If true, "Load More" button is visible.' },
    currentQuery: { control: 'text', description: 'The current search query.' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta; // <--- This line MUST be present and correct

type Story = StoryObj<typeof ImageGrid>;

// --- Story Definitions ---

export const DefaultGrid: Story = {
  args: {
    photos: mockPhotos,
    loading: false,
    error: null,
    hasMore: true,
    currentQuery: 'bags',
  },
};

export const InitialLoading: Story = {
  args: {
    photos: [],
    loading: true,
    error: null,
    hasMore: false,
    currentQuery: 'fashion',
  },
};

export const LoadingMore: Story = {
  args: {
    photos: mockPhotos.slice(0, 3),
    loading: true,
    error: null,
    hasMore: true,
    currentQuery: 'landscape',
  },
};

export const ErrorState: Story = {
  args: {
    photos: [],
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: 'nature',
  },
};

export const NoResults: Story = {
  args: {
    photos: [],
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: 'xyzrandomquery',
  },
};

export const StartSearching: Story = {
  args: {
    photos: [],
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: '',
  },
};

export const AllResultsLoaded: Story = {
  args: {
    photos: mockPhotos,
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: 'complete',
  },
};