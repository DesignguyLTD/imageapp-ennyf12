
import ImageCard from './ImageCard';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Photo } from '../../types/pexels'; 


const mockPhoto1: Photo = {
  id: 100,
  alt: 'Elegant brown leather briefcase with dark straps',
  photographer: 'Photographer A',
  src: {
    tiny: 'https://via.placeholder.com/280x200/FF5733/FFFFFF?text=Card+A',
    original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '',
  },
  url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
};

const mockPhoto2: Photo = {
  id: 101,
  alt: 'Stylish pastel handbags on pink and mint split background',
  photographer: 'Photographer B',
  src: {
    tiny: 'https://via.placeholder.com/280x200/33FF57/000000?text=Card+B',
    original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '',
  },
  url: '', width: 0, height: 0, photographer_url: '', photographer_id: 0, avg_color: '', liked: false,
};

const meta: Meta<typeof ImageCard> = {
  title: 'Search/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  argTypes: {
    photo: { control: 'object', description: 'Photo data object as expected by the component.' },
   
  },
};

export default meta;

type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {
  args: {
    photo: mockPhoto1,
  },
};

export const AnotherImage: Story = {
  args: {
    photo: mockPhoto2,
  },
};