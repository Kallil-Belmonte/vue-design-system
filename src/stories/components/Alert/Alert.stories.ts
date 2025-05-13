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
      defaultValue: 'info',
      control: 'radio',
      options: ['info', 'success', 'warning', 'danger'],
    }),
    title: setArgs({
      name: 'title',
      description: 'Title.',
      type: 'string',
      required: true,
      control: 'text',
    }),
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
        <Alert v-bind="args">Description.</Alert>
      `,
  }),
};

export const Default: StoryObj<typeof Alert> = {
  args: {
    title: 'Title',
    close: () => undefined,
  },
};

export default meta;
