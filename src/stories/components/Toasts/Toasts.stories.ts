import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Toasts from './Toasts.vue';

const meta: Meta<typeof Toasts> = {
  title: 'Components/Toasts',
  component: Toasts,
  argTypes: {
    close: setArgs({
      name: 'close',
      description: 'Close callback.',
      type: '(event: MouseEvent) => void',
      required: true,
      control: false,
    }),
    toasts: setArgs({
      name: 'toasts',
      description: 'Toasts.',
      type: 'Toast[]',
      required: true,
      control: false,
    }),
  },
};

export const Default: StoryObj<typeof Toasts> = {
  args: {
    toasts: [{ id: 'id', status: 'success', title: 'Title', description: 'Description' }],
    close: () => undefined,
  },
};

export default meta;
