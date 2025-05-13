import type { Meta, StoryObj } from '@storybook/vue3';

import { ICONS } from '@/shared/files/consts';
import { setArgs } from '@/shared/helpers';
import Icon from './Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    category: setArgs({
      name: 'category',
      description: 'Category name.',
      type: 'Category',
      defaultValue: 'UI',
      control: 'select',
      options: ['UI', 'Flag'],
    }),
    color: setArgs({
      name: 'color',
      description: 'Icon color.',
      type: 'string',
      defaultValue: 'inherit',
      control: 'color',
    }),
    name: setArgs({
      name: 'name',
      description: 'Icon name.',
      type: 'Icons',
      required: true,
      control: 'select',
      options: ICONS,
    }),
    size: setArgs({
      name: 'size',
      description: 'Category name.',
      type: 'string',
      defaultValue: '100%',
      control: 'text',
    }),
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
        <Icon v-bind="args" />
      `,
  }),
};

export const Default: StoryObj<typeof Icon> = {
  args: {
    name: 'Home',
    size: '50px',
  },
};

export default meta;
