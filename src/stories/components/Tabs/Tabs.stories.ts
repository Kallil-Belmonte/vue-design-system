import type { Meta, StoryObj } from '@storybook/vue3-vite';

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
        <Tabs v-bind="args">
          <template #tab-1>Content 1</template>
          <template #tab-2>Content 2</template>
          <template #tab-3>Content 3</template>
        </Tabs>
      `,
  }),
};

export const Default: StoryObj<typeof Tabs> = {
  args: {
    tabs: [
      { id: 'tab-1', icon: 'Home', title: 'Tab 1', open: true },
      { id: 'tab-2', icon: 'Home', title: 'Tab 2' },
      { id: 'tab-3', icon: 'Home', title: 'Tab 3', disabled: true },
    ],
  },
};

export default meta;
