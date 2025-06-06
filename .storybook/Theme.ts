import { create } from 'storybook/theming';

/**
 * @name Theme
 * @see Theming {@link https://storybook.js.org/docs/react/configure/theming}
 */

export default create({
  base: 'light',
  brandTitle: 'Vue',
  brandUrl: 'https://vuejs.org',
  brandImage: '/logo/vue.svg',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#43B883',
  colorSecondary: '#43B883',
});
