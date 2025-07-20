
import Logo from './Logo';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; 
const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'The text content of the logo.' },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    text: 'DesignGuy Img',
  },
};

export const CustomText: Story = {
  args: {
    text: 'MyBrand Logo',
  },
};