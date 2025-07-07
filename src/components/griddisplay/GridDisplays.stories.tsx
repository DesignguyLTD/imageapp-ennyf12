// src/components/GridDisplay/GridDisplay.stories.tsx

import React from 'react';
import GridDisplay from './GridDisplay';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // Ensure this matches your framework

// Mock data for ImageCard items
const mockImageItems = [
  { id: '1', imageUrl: 'https://picsum.photos/id/237/250/250', title: 'Curious Puppy' },
  { id: '2', imageUrl: 'https://picsum.photos/id/238/250/250', slogan: 'Abstract Patterns' },
  { id: '3', imageUrl: 'https://picsum.photos/id/239/250/250', title: 'Mountain Peaks' },
  { id: '4', imageUrl: 'https://picsum.photos/id/240/250/250', title: 'Urban Lights' },
  { id: '5', imageUrl: 'https://picsum.photos/id/241/250/250', slogan: 'Minimalist Design' },
  { id: '6', imageUrl: 'https://picsum.photos/id/242/250/250', title: 'Forest Path' },
  { id: '7', imageUrl: 'https://picsum.photos/id/243/250/250' },
  { id: '8', imageUrl: 'https://picsum.photos/id/244/250/250', title: 'Ocean Waves' },
  { id: '9', imageUrl: 'https://picsum.photos/id/245/250/250', slogan: 'City Skylines' },
  { id: '10', imageUrl: 'https://picsum.photos/id/246/250/250', title: 'Desert Dunes' },
  { id: '11', imageUrl: 'https://picsum.photos/id/247/250/250' },
  { id: '12', imageUrl: 'https://picsum.photos/id/248/250/250', title: 'Winter Wonderland' },
];

const meta: Meta<typeof GridDisplay> = {
  title: 'Components/GridDisplay',
  component: GridDisplay,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array of image data for the grid items.' },
    isLoading: { control: 'boolean', description: 'If true, shows loading placeholders instead of actual items.' },
    loadingCardCount: { control: 'number', description: 'Number of loading cards to display when isLoading is true.' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof GridDisplay>;

export const DefaultGrid: Story = {
  args: {
    items: mockImageItems,
    isLoading: false,
    loadingCardCount: 8,
  },
};

export const LoadingGrid: Story = {
  args: {
    items: [],
    isLoading: true,
    loadingCardCount: 12,
  },
};

export const FewItemsGrid: Story = {
  args: {
    items: mockImageItems.slice(0, 3),
    isLoading: false,
  },
};

export const MobileViewGrid: Story = {
  args: {
    items: mockImageItems,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

export const TabletViewGrid: Story = {
  args: {
    items: mockImageItems,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};