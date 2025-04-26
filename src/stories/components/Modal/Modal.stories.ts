import { ref } from 'vue';

import { type Meta, type StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Button from '../Button/Button.vue';
import Modal from './Modal.vue';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    close: setArgs({
      name: 'close',
      description: 'Close callback.',
      type: '(event: MouseEvent) => void',
      required: true,
      control: false,
    }),
    icon: setArgs({
      name: 'icon',
      description: 'Icon props.',
      type: '{ category?: Category; name: Icons }',
      control: 'object',
    }),
    open: setArgs({
      name: 'open',
      description: 'If <code>true</code>, the modal will be open.',
      type: 'bolean',
      required: true,
      control: 'boolean',
    }),
    title: setArgs({
      name: 'title',
      description: 'Title.',
      type: 'string',
      required: true,
      control: 'text',
    }),
    variant: setArgs({
      name: 'variant',
      description: 'Variant.',
      type: 'default | full',
      defaultValue: 'default',
      control: 'radio',
      options: ['default', 'full'],
    }),
  },
  render: args => ({
    components: { Button, Modal },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <Button mode="contain" @click="open = true">Open</Button>

      <Modal :open="open" v-bind="args" :close="() => open = false">
        <template #default>
          Content
        </template>
        <template #footer>
          <Button variant="base" @click="open = false">Cancel</Button>
          <Button @click="open = false">Confirm</Button>
        </template>
      </Modal>
    `,
  }),
  args: {
    title: 'Title',
    icon: {
      name: 'Home',
    },
  },
};

export const Default: StoryObj<typeof Modal> = {};

export default meta;
