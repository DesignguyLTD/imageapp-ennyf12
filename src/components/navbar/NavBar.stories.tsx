
import NavBar from './NavBar';
import type { NavBarProps } from './NavBar';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    forceMobileMenuOpen: { control: 'boolean', description: 'FOR STORYBOOK ONLY: Forces the mobile/tablet menu to be open on render.' },
    
    activeNavLink: {
      control: { type: 'select' },
      options: ['Graphics', 'Illustration', 'Images', '3D', 'GIFs', 'Music', 'NFTs', ''], 
      description: 'Highlights the currently active navigation link (e.g., current page).',
    },
    
    loginButtonText: { control: 'text', description: 'Text displayed on the Login/Logout button.' },
    
    onLoginClick: { action: 'login button clicked', description: 'Callback when the Login/Logout button is clicked.' },
    
    isLoggedIn: { control: 'boolean', description: 'Simulates the user being logged in/out.' },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        iphone5: { name: 'iPhone 5/SE', styles: { width: '320px', height: '568px' }, type: 'mobile' },
        iphone6: { name: 'iPhone 6/7/8', styles: { width: '375px', height: '667px' }, type: 'mobile' },
        ipad: { name: 'iPad', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        ipadPro: { name: 'iPad Pro (1024px)', styles: { width: '1024px', height: '1366px' }, type: 'tablet' },
        desktopSmall: { name: 'Desktop Small (1024px)', styles: { width: '1024px', height: '768px' }, type: 'desktop' },
        desktopMedium: { name: 'Desktop Medium (1280px)', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
        desktopLarge: { name: 'Desktop Large (1440px)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<NavBarProps>;



export const DesktopLayout: Story = {
  args: {
    forceMobileMenuOpen: false,
    activeNavLink: '',
    loginButtonText: 'Login / Sign Up',
    isLoggedIn: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktopLarge',
    },
  },
};


export const DesktopWithActiveLink: Story = {
  args: {
    ...DesktopLayout.args,
    activeNavLink: 'Music', 
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktopLarge',
    },
  },
};


export const DesktopLoggedIn: Story = {
  args: {
    ...DesktopLayout.args,
    isLoggedIn: true, 
    loginButtonText: 'Logout', 
    
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktopLarge',
    },
  },
};


export const TabletLayoutClosedMenu: Story = {
  args: {
    forceMobileMenuOpen: false,
    activeNavLink: '',
    loginButtonText: 'Login / Sign Up',
    isLoggedIn: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

export const TabletLayoutOpenMenu: Story = {
  args: {
    ...TabletLayoutClosedMenu.args,
    forceMobileMenuOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

export const MobileLayoutClosedMenu: Story = {
  args: {
    forceMobileMenuOpen: false,
    activeNavLink: '',
    loginButtonText: 'Login / Sign Up',
    isLoggedIn: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

export const MobileLayoutOpenMenu: Story = {
  args: {
    ...MobileLayoutClosedMenu.args,
    forceMobileMenuOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};


export const MobileLoggedInOpen: Story = {
  args: {
    ...MobileLayoutOpenMenu.args, 
    isLoggedIn: true,
    loginButtonText: 'Logout',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};