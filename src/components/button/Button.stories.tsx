
import Buttons from './Buttons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Buttons> = {
  title: 'Components/Button',
  component: Buttons,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Callback function when the button is clicked. Will not fire if button is disabled.',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'download'],
      description: 'Defines the visual style (color, background, etc.) of the button from predefined variants.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Defines the size of the button.',
    },
    children: {
      control: 'text',
      description: 'The content (text or JSX) inside the button.',
    },
    backgroundColor: {
      control: 'color',
      description: 'Optional: Custom background color (overrides variant color).',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled and unclickable.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Buttons>;

export const Primary: Story = {
  args: {
    children: 'Login / Sign Up',
    variant: 'primary',
  },
};

export const Download: Story = {
  args: {
    children: 'Download',
    variant: 'download',
    size: 'large',
    backgroundColor: "#322aa3"
  },
};

export const Secondary: Story = {
  args: {
    children: 'Collection',
    variant: 'secondary',
    size: 'small',
  },
};

export const CustomText: Story = {
  args: {
    children: 'Click Me!',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary',
  },
};