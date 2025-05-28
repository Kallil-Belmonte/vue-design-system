import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { ICONS } from '@/shared/files/consts';
import { setArgs } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';
import Card from './Card.vue';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    actions: setArgs({
      name: 'actions',
      description: 'Actions.',
      type: 'Action[]',
      control: false,
    }),
    description: setArgs({
      name: 'description',
      description: 'Description.',
      type: 'string',
      control: 'text',
    }),
    icon: setArgs({
      name: 'icon',
      description: 'Icon name.',
      type: 'Icons',
      control: 'select',
      options: ICONS,
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
    components: { Card, Button },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #default>
          Content
        </template>
        <template #footer>
          <Button mode="contain">Confirm</Button>
          <Button mode="contain" variant="base">Cancel</Button>
        </template>
      </Card>
    `,
  }),
};

export const Default: StoryObj<typeof Card> = {
  args: {
    icon: 'Home',
    title: 'Title',
    description: 'Description',
    actions: [
      { text: 'Action', click: () => undefined },
      { text: 'Action', click: () => undefined },
      { text: 'Action', click: () => undefined },
      { text: 'Action', click: () => undefined },
    ],
  },
};

export default meta;
