
import SearchInput from './SearchInput';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text for the search input.' },
    initialValue: { control: 'text', description: 'Initial value of the search input.' },
    onSearch: { action: 'search initiated', description: 'Callback when the search button is clicked or Enter is pressed.' },
    isFocused: { control: 'boolean', description: 'FOR STORYBOOK ONLY: Forces the search input to be in a focused state.' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search for your images',
    initialValue: '',
    isFocused: false,
  },
};

export const WithText: Story = {
  args: {
    placeholder: 'Search for your images',
    initialValue: 'latest trends',
    isFocused: false,
  },
};

export const Focused: Story = {
  args: {
    placeholder: 'Searching...',
    initialValue: 'active search',
    isFocused: true,
  },
};

export const MobileView: Story = {
  args: {
    placeholder: 'Search images...',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

export const TabletView: Story = {
  args: {
    placeholder: 'Search images...',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};