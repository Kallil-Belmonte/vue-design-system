import type { StorybookConfig } from '@storybook/vue3-vite';

/**
 * @name Main
 * @see Configuration {@link https://storybook.js.org/docs/react/builders/vite#configuration}
 */

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
};

export default config;
