import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Alert from './Alert.vue';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    close: setArgs({
      name: 'close',
      description: 'Close callback.',
      type: '(event: MouseEvent) => void',
      control: false,
    }),
    status: setArgs({
      name: 'status',
      description: 'Status.',
      type: 'Status',
      control: 'radio',
      options: ['info', 'success', 'warning', 'danger'],
    }),
    title: setArgs({
      name: 'title',
      description: 'Title.',
      type: 'string',
      control: 'text',
    }),
  },
};

export const Default: StoryObj<typeof Alert> = {
  args: {
    // Props
    title: 'Title',
    close: () => undefined,
    // Slots
    default: 'Description.',
  },
};

export default meta;
