// src/components/ImageCard/ImageCard.stories.tsx

import React from 'react';
import ImageCard from './ImageCard';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof ImageCard> = {
  title: 'Components/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text', description: 'URL of the image for the card.' },
    title: { control: 'text', description: 'Text overlay for category cards.' },
    slogan: { control: 'text', description: 'Slogan text for branded cards.' },
    onClick: { action: 'card clicked', description: 'Callback when the card is clicked.' },
    isLoading: { control: 'boolean', description: 'If true, shows a loading placeholder instead of content.' },
  },
};

export default meta;

type Story = StoryObj<typeof ImageCard>;

// --- Stories with more engaging default images ---

export const CategoryCard: Story = {
  args: {
    // Replaced placeholder with a Picsum image, square format
    imageUrl: 'https://picsum.photos/id/1015/250/250', // A landscape photo
    title: 'Vector Creatives',
    isLoading: false,
  },
};

export const IllustrationCard: Story = {
  args: {
    // Replaced placeholder with a Picsum image
    imageUrl: 'https://picsum.photos/id/1025/250/250', // A dog photo
    title: 'Illustrations',
    isLoading: false,
  },
};

export const BundlesCollectionsCard: Story = {
  args: {
    // Replaced placeholder with a Picsum image
    imageUrl: 'https://picsum.photos/id/1018/250/250', // A forest/road photo
    title: 'Bundles/Collections',
    isLoading: false,
  },
};

export const BrandedLogoCard: Story = {
  args: {
    // Replaced placeholder with a darker Picsum image more suitable for a logo overlay
    imageUrl: 'https://picsum.photos/id/1041/250/250?grayscale', // Grayscale for a more logo-like feel
    slogan: 'Mezzanine Slogan Here',
    isLoading: false,
  },
};

export const SimpleImagePreview: Story = {
  args: {
    // Replaced placeholder with a Picsum image
    imageUrl: 'https://picsum.photos/id/1054/250/250', // A nature photo
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#f8f8f8' }],
    },
  },
};