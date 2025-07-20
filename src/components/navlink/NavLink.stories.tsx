
import NavLink from './NavLink';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; 

const meta: Meta<typeof NavLink> = {
  title: 'Components/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'The text content of the navigation link.' },
    href: { control: 'text', description: 'The URL the link points to.' },
    hasDropdown: { control: 'boolean', description: 'If true, shows a dropdown indicator.' },
    isSelected: { control: 'boolean', description: 'If true, indicates this is the currently active link.' },
    onClick: { action: 'link clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    children: 'Home',
    href: '/',
  },
};

export const WithDropdown: Story = {
  args: {
    children: 'Graphics',
    href: '/graphics',
    hasDropdown: true,
  },
};

export const Selected: Story = {
  args: {
    children: 'Illustrations',
    href: '/illustrations',
    isSelected: true,
    hasDropdown: true,
  },
};

export const SelectedNoDropdown: Story = {
  args: {
    children: '3D',
    href: '/3d',
    isSelected: true,
  },
};