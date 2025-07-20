
import Hero from './Hero'; 
import type { Meta, StoryObj } from '@storybook/react-webpack5'; 

const meta: Meta<typeof Hero> = {
  title: 'Pages/HeroSection', 
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    
    
    
  },
  parameters: {
    layout: 'fullscreen', 
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;


export const Default: Story = {
  
  args: {},
};


export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphone6', 
    },
  },
};


export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad', 
    },
  },
};