import AssetCategories from './AssetCategories';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

const mockCategoryItems = [
  { src: image1, alt: 'Logo category', label: 'Logo' },
  { src: image2, alt: 'Bundles category', label: 'Bundles/ Collections' },
  { src: image3, alt: 'Illustrations category', label: 'Illustrations' },
  { src: image4, alt: 'Vector Creatives category', label: 'Vector Creatives', textStyle: 'textss' },
];

const meta: Meta<typeof AssetCategories> = {
  title: 'Homepage/AssetCategories',
  component: AssetCategories,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array of image and label data for category cards.' },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'blue-section',
      values: [{ name: 'blue-section', value: '#415AFE' }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof AssetCategories>;

export const Default: Story = {
  args: {
    items: mockCategoryItems,
  },
};

export const FewerItems: Story = {
  args: {
    items: mockCategoryItems.slice(0, 2),
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};