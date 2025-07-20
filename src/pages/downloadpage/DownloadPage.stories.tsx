
import DownloadPage from './DownloadPage';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // Adjust framework
import { Photo } from '../../types/pexels'; // Your Photo type

// --- Mock Photo Data for DownloadPage ---
const mockDownloadedPhoto: Photo = {
  id: 12345,
  width: 1000, height: 1500, url: 'https://www.pexels.com/photo/man-in-blue-suit-3949071/',
  photographer: 'Angela Brooks', photographer_url: 'https://www.pexels.com/@user', photographer_id: 100, avg_color: '#4A5B6F',
  src: {
    original: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    large2x: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    large: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    medium: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&h=350',
    small: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&h=130',
    portrait: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    landscape: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tiny: 'https://images.pexels.com/photos/3949071/pexels-photo-3949071.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
  },
  liked: true,
  alt: 'Man in blue suit adjusting tie - a stylish image', // More descriptive alt
};

const meta: Meta<typeof DownloadPage> = {
  title: 'Pages/DownloadPage',
  component: DownloadPage,
  tags: ['autodocs'],
  argTypes: {
    // These props directly control the component's internal state for Storybook
    storyImageId: { control: 'text', description: 'Mocks the image ID from URL params.' },
    storyImageData: { control: 'object', description: 'Mocks the fetched image data.' },
    storyLoading: { control: 'boolean', description: 'Mocks the loading state.' },
    storyError: { control: 'text', description: 'Mocks the error message.' },
  },
  parameters: {
    layout: 'fullscreen', // Make the page span full width
  },
};

export default meta;

type Story = StoryObj<typeof DownloadPage>;

// --- Stories ---

// Story: Page showing fully loaded image details
export const LoadedPage: Story = {
  args: {
    storyImageId: '12345', // A mock ID
    storyImageData: mockDownloadedPhoto,
    storyLoading: false,
    storyError: null,
  },
};

// Story: Page showing loading state
export const LoadingPage: Story = {
  args: {
    storyImageId: 'loading-id',
    storyImageData: null, // No data yet
    storyLoading: true,
    storyError: null,
  },
};

// Story: Page showing an error state (e.g., image not found, API error)
export const ErrorPage: Story = {
  args: {
    storyImageId: 'error-id',
    storyImageData: null,
    storyLoading: false,
    storyError: 'Image not found or API error occurred!',
  },
};

// Story: Page showing "Image ID not found in URL"
export const NoIdInUrl: Story = {
  args: {
    storyImageId: undefined, // Simulates no ID in URL
    storyImageData: null,
    storyLoading: false,
    storyError: 'Image ID not found in URL.', // Simulates error message from component
  },
};

// Story: Page showing "API Key not found" (if your component handles this explicitly)
export const NoApiKey: Story = {
  args: {
    storyImageId: 'any-id',
    storyImageData: null,
    storyLoading: false,
    storyError: 'Pexels API key not found. Please set REACT_APP_PEXELS_API_KEY.', // Simulates API key error
  },
};

// Responsive Stories
export const MobileView: Story = {
  args: { ...LoadedPage.args },
  parameters: { viewport: { defaultViewport: 'iphone6' } },
};

export const TabletView: Story = {
  args: { ...LoadedPage.args },
  parameters: { viewport: { defaultViewport: 'ipad' } },
};