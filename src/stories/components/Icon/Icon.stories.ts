import type { Meta, StoryObj } from '@storybook/vue3';

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
      control: 'color',
    }),
    name: setArgs({
      name: 'name',
      description: 'Icon name.',
      type: 'Icons',
      required: true,
      control: 'select',
      options: [
        'Brazil',
        'Portugal',
        'UnitedStates',
        'CheckCircle',
        'Close',
        'Home',
        'Info',
        'Loading',
        'Warning',
      ],
    }),
    size: setArgs({
      name: 'size',
      description: 'Category name.',
      type: 'string',
      defaultValue: '100%',
      control: 'text',
    }),
  },
  args: {
    name: 'Home',
    size: '50px',
  },
};

export const Default: StoryObj<typeof Icon> = {
  args: {},
};

export default meta;
