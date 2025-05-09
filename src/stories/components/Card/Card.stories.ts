import type { Meta, StoryObj } from '@storybook/vue3';

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
    subtitle: setArgs({
      name: 'subtitle',
      description: 'Subtitle.',
      type: 'string',
      control: 'text',
    }),
  },
  render: args => ({
    components: { Card, Button },
    setup() {
      return { args };
    },
    template: `
      <Card title="Title" v-bind="args">
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
    subtitle: 'Subtitle',
  },
};

export default meta;
