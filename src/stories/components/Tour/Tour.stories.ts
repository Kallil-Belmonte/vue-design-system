import { type CSSProperties, ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';
import Tour from './Tour.vue';

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
  component: Tour,
  argTypes: {
    active: setArgs({
      name: 'active',
      description: 'If <code>true</code>, the tour is active.',
      type: 'boolean',
      control: 'boolean',
    }),
    close: setArgs({
      name: 'close',
      description: 'Close callback.',
      type: '() => void',
      control: false,
    }),
    items: setArgs({
      name: 'items',
      description: 'Tour items.',
      type: 'Item[]',
      control: false,
    }),
    overlayStyle: setArgs({
      name: 'overlayStyle',
      description: 'Style for the overlay.',
      type: 'CSSProperties',
      control: 'object',
    }),
  },
  render: args => ({
    components: { Button, Tour },
    setup() {
      const active = ref(false);

      const styles: CSSProperties = {
        'font-family': 'var(--font-primary)',
        display: 'inline-block',
        width: '100px',
        height: '100px',
        border: '1px solid var(--dark-2)',
        'border-radius': '8px',
        margin: '30px 30px 0 0',
      };

      const close = () => {
        active.value = false;
      };

      return { args, close, active, styles };
    },
    template: `
      <Button mode="contain" @click="active = !active">Toggle</Button>

      <div data-step="1" :style="styles" class="d-inline-flex flex-center">Step 1</div>
      <div data-step="2" :style="styles" class="d-inline-flex flex-center">Step 2</div>
      <div data-step="3" :style="styles" class="d-inline-flex flex-center">Step 3</div>

      <Tour v-bind="args" :active="active" :close="close">
        <template #item-1>Content</template>
        <template #item-2>Content</template>
        <template #item-3>Content</template>
      </Tour>
    `,
  }),
};

export const Default: StoryObj<typeof Tour> = {
  args: {
    items: [
      {
        slot: 'item-1',
        target: '[data-step="1"]',
        highlights: [{ selector: '[data-step="1"]' }],
      },
      {
        slot: 'item-2',
        target: '[data-step="2"]',
        highlights: [{ selector: '[data-step="2"]' }],
      },
      {
        slot: 'item-3',
        target: '[data-step="3"]',
        highlights: [{ selector: '[data-step="3"]' }],
      },
    ],
  },
};

export default meta;
