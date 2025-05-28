import { addons } from 'storybook/manager-api';

import Theme from './Theme';

/**
 * @name Manager
 * @see Theming {@link https://storybook.js.org/docs/react/configure/theming}
 * @see FeaturesAndBehavior {@link https://storybook.js.org/docs/react/configure/features-and-behavior}
 */

addons.setConfig({
  theme: Theme,
});
