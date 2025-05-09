import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';
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
    duration: setArgs({
      name: 'duration',
      description: 'Duration until the toast closes, ex: 5s or 5000ms',
      type: 'string',
      control: 'text',
    }),
    toasts: setArgs({
      name: 'toasts',
      description: 'Toasts.',
      type: 'Toast[]',
      required: true,
      control: false,
    }),
  },
  render: args => ({
    components: { Button, Toasts },
    setup() {
      const toasts = ref<any[]>([]);

      const add = (status: string) => {
        toasts.value = [
          ...toasts.value,
          {
            id: String(Math.random()),
            status,
            title: `${status.charAt(0).toUpperCase()}${status.slice(1)}`,
            description: 'Description.',
          },
        ];
      };

      const close = (toast: any) => {
        toasts.value = toasts.value.filter(item => item.id !== toast.id);
      };

      return { args, toasts, add, close };
    },
    template: `
        <div style="display: flex; gap: 10px;">
          <Button mode="contain" variant="info" @click="add('info')">Info</Button>
          <Button mode="contain" variant="success" @click="add('success')">Success</Button>
          <Button mode="contain" variant="warning" @click="add('warning')">Warning</Button>
          <Button mode="contain" variant="danger" @click="add('danger')">Danger</Button>
        </div>

        <Toasts :toasts="toasts" :close="close" v-bind="args" />
      `,
  }),
};

export const Default: StoryObj<typeof Toasts> = {};

export default meta;
