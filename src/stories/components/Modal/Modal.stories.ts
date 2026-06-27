import { type Meta, type StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Button from '../Button/Button.vue';
import Modal from './Modal.vue';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    closedby: setArgs({
      name: 'closedby',
      description:
        'Specifies the types of user actions that can be used to close the <code><dialog></code> element. ',
      type: 'any | closerequest | none',
      control: 'radio',
      options: ['any', 'closerequest', 'none'],
    }),
    icon: setArgs({
      name: 'icon',
      description: 'Icon props.',
      type: '{ category?: Category; name: Icons }',
      control: 'object',
    }),
    id: setArgs({
      name: 'id',
      description: 'Modal id.',
      type: 'string',
      required: true,
      control: 'text',
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
  args: {
    title: 'Title',
    icon: {
      name: 'Home',
    },
  },
  render: args => ({
    components: { Button, Modal },
    setup() {
      return { args };
    },
    template: `
      <Button :commandfor="args.id || 'modal'" command="show-modal" mode="contain">Open</Button>

      <Modal id="modal" v-bind="args">
        <template #default>
          Content
        </template>
        <template #footer>
          <Button :commandfor="args.id || 'modal'" command="close" mode="contain">Confirm</Button>
          <Button :commandfor="args.id || 'modal'" command="close" mode="contain" variant="base">Cancel</Button>
        </template>
      </Modal>
    `,
  }),
};

export const Default: StoryObj<typeof Modal> = {};

export default meta;
