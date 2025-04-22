import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: setArgs({
      name: 'variant',
      description: 'Variation.',
      type: 'base | primary | secondary | icon | icon-base | icon-primary | icon-secondary',
      control: 'radio',
    }),
  },
  args: {
    // Slots
    default: 'Button',
    // Props
    click: fn(),
  },
};

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
  },
};

// export const Secondary: StoryObj<typeof Button> = {
//   args: {
//     label: 'Button',
//   },
// };

export default meta;
