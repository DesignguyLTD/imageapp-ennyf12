
import SearchResultPage from './SearchResultPage';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // Adjust framework
import { Photo } from '../../types/pexels'; // Your Photo type

// --- Mock Data ---
// Re-using mock photos from ImageGrid story for consistency
const mockPhotos: Photo[] = [
  { id: 1, alt: 'Elegant briefcase', photographer: 'Photographer A', src: { tiny: 'https://via.placeholder.com/280x200/FF5733/FFFFFF?text=Result+1', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
  { id: 2, alt: 'Stylish handbags', photographer: 'Photographer B', src: { tiny: 'https://via.placeholder.com/280x200/33FF57/000000?text=Result+2', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
  { id: 3, alt: 'Beach bags', photographer: 'Photographer C', src: { tiny: 'https://via.placeholder.com/280x200/5733FF/FFFFFF?text=Result+3', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
  { id: 4, alt: 'Yellow backpack', photographer: 'Photographer D', src: { tiny: 'https://via.placeholder.com/280x200/FF5733/FFFFFF?text=Result+4', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
  { id: 5, alt: 'Colorful sneakers', photographer: 'Photographer E', src: { tiny: 'https://via.placeholder.com/280x200/33FF57/000000?text=Result+5', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
  { id: 6, alt: 'Vintage camera', photographer: 'Photographer F', src: { tiny: 'https://via.placeholder.com/280x200/5733FF/FFFFFF?text=Result+6', original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '' }, url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false, },
];

// --- Mocking usePexelsApi ---
// This is the core of how we control the page's state in Storybook
// It will dynamically return different values based on Storybook args
const createMockPexelsApi = (args: any) => () => ({
  photos: args.photos,
  loading: args.loading,
  error: args.error,
  hasMore: args.hasMore,
  currentQuery: args.currentQuery,
  // Mock searchImages and loadMoreImages functions
  searchImages: (query: string) => console.log(`Mock: Searching for "${query}"`),
  loadMoreImages: () => console.log('Mock: Loading more images'),
});

const meta: Meta<typeof SearchResultPage> = {
  title: 'Pages/SearchResultPage',
  component: SearchResultPage,
  tags: ['autodocs'],
  // Define controls for the MOCKED usePexelsApi hook's return values
  argTypes: {
    photos: { control: 'object', description: 'Mock array of photos from usePexelsApi.' },
    loading: { control: 'boolean', description: 'Mock loading state from usePexelsApi.' },
    error: { control: 'text', description: 'Mock error message from usePexelsApi.' },
    hasMore: { control: 'boolean', description: 'Mock hasMore state from usePexelsApi.' },
    currentQuery: { control: 'text', description: 'Mock currentQuery from usePexelsApi.' },
    // loadMore and searchImages are actions, not directly controlled as args
  },
  parameters: {
    layout: 'fullscreen', // Makes the page span full width
    // Mock the usePexelsApi hook for all stories in this file
    // This decorator effectively replaces the real usePexelsApi for Storybook
    mockData: { // A custom Storybook parameter for mocking hooks
      usePexelsApi: createMockPexelsApi,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchResultPage>;

// --- Stories ---

// Default Story: Page showing results for a query
export const ResultsFound: Story = {
  args: {
    photos: mockPhotos,
    loading: false,
    error: null,
    hasMore: true,
    currentQuery: 'bags',
  },
  // Apply the mock hook for this story
  play: async ({ args, canvasElement }) => {
    // This 'play' function is optional, but useful if you want to explicitly
    // demonstrate interaction, e.g., typing in search bar and seeing action log.
  },
};

// Story: Page showing initial loading state
export const InitialLoading: Story = {
  args: {
    photos: [], // No photos yet
    loading: true,
    error: null,
    hasMore: false,
    currentQuery: 'shoes',
  },
};

// Story: Page showing loading more results
export const LoadingMoreResults: Story = {
  args: {
    photos: mockPhotos.slice(0, 3), // Show some initial photos
    loading: true, // Indicate loading more
    error: null,
    hasMore: true,
    currentQuery: 'nature',
  },
};

// Story: Page showing an error state
export const ErrorState: Story = {
  args: {
    photos: [],
    loading: false,
    error: 'Failed to load results. Please try again!',
    hasMore: false,
    currentQuery: 'mountains',
  },
};

// Story: Page showing no results found for a query
export const NoResultsFound: Story = {
  args: {
    photos: [],
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: 'xyzrandomquery',
  },
};

// Story: Page showing "Start searching!" message (empty query)
export const EmptyQuery: Story = {
  args: {
    photos: [],
    loading: false,
    error: null,
    hasMore: false,
    currentQuery: '',
  },
};

// Responsive Stories
export const MobileView: Story = {
  args: { ...ResultsFound.args },
  parameters: { viewport: { defaultViewport: 'iphone6' } },
};

export const TabletView: Story = {
  args: { ...ResultsFound.args },
  parameters: { viewport: { defaultViewport: 'ipad' } },
};