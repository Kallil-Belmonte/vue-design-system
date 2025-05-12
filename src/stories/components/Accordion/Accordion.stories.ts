import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Accordion from './Accordion.vue';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    description: setArgs({
      name: 'description',
      description: 'Description.',
      type: 'string',
      control: 'text',
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
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
        <Accordion title="Title" v-bind="args">Content</Accordion>
      `,
  }),
};

export const Default: StoryObj<typeof Accordion> = {
  args: {
    description: 'Description',
  },
};

export default meta;
