import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Tabs from './Tabs.vue';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    tabs: setArgs({
      name: 'tabs',
      description: 'Tabs.',
      type: 'Tab[]',
      required: true,
      control: false,
    }),
  },
  render: args => ({
    components: { Tabs },
    setup() {
      return { args };
    },
    template: `
        <Tabs :tabs="[{ icon: 'Home', title: 'Tab 1' }, { icon: 'Home', title: 'Tab 2' }, { icon: 'Home', title: 'Tab 3' }]" v-bind="args">
          Content
        </Tabs>
      `,
  }),
};

export const Default: StoryObj<typeof Tabs> = {};

export default meta;
