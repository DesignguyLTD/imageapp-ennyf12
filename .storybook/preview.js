// .storybook/preview.js (THIS IS NOW A JAVASCRIPT FILE!)

import React from 'react'; // Crucial for JSX rendering
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import '../src/App.module.css'; // Ensure your main app CSS module is imported globally

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Your viewport configurations (as before)
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
  // The decorator function, returning JSX
  decorators: [
    (Story) => ( // No explicit type needed for 'Story' in JS
      <Router>
        <Story />
      </Router>
    ),
  ],
};

export default preview;