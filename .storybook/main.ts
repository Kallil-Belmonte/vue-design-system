import type { StorybookConfig } from '@storybook/vue3-vite';

/**
 * @name Main
 * @see Configuration {@link https://storybook.js.org/docs/react/builders/vite#configuration}
 */

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  }
};

export default config;
