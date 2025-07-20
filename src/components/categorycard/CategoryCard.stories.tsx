
import CategoryCard from './CategoryCard';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; 


import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png'; 


const blackTextStyle = 'textss'; 

const meta: Meta<typeof CategoryCard> = {
  title: 'Homepage/CategoryCard', 
  component: CategoryCard,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image source URL.' },
    alt: { control: 'text', description: 'Alt text for the image.' },
    label: { control: 'text', description: 'Text label displayed on the card.' },
    
    textStyle: { control: 'text', description: 'CSS class name for custom text styling (e.g., "textss").' },
    onClick: { action: 'card clicked', description: 'Callback function when the card is clicked.' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;



export const LogoCard: Story = {
  args: {
    src: image1,
    alt: 'Logo',
    label: 'Logo',
  },
};

export const BundlesCollectionsCard: Story = {
  args: {
    src: image2,
    alt: 'Bundles and Collections',
    label: 'Bundles/ Collections',
  },
};

export const IllustrationsCard: Story = {
  args: {
    src: image3,
    alt: 'Illustrations',
    label: 'Illustrations',
  },
};

export const VectorCreativesCard: Story = {
  args: {
    src: image4,
    alt: 'Vector Creatives',
    label: 'Vector Creatives',
    textStyle: "textss", 
  },
};


export const MobileView: Story = {
  args: {
    ...VectorCreativesCard.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};