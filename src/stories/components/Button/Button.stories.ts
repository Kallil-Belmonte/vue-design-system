import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled property.',
      type: "ButtonHTMLAttributes['disabled']",
      control: 'boolean',
    }),
    icon: setArgs({
      name: 'icon',
      description: 'Icon props.',
      type: '{ category?: Category; name: Icons; color?: string; size?: string }',
      control: 'object',
    }),
    loading: setArgs({
      name: 'loading',
      description: 'Loading status.',
      type: 'boolean',
      control: 'boolean',
    }),
    mode: setArgs({
      name: 'mode',
      description: 'Expansion mode.',
      type: 'blank | icon | contain | full',
      defaultValue: 'full',
      control: 'radio',
      options: ['blank', 'icon', 'contain', 'full'],
    }),
    type: setArgs({
      name: 'type',
      description: 'Type native property.',
      type: "ButtonHTMLAttributes['type']",
      control: 'text',
    }),
    variant: setArgs({
      name: 'variant',
      description: 'Variation.',
      type: 'base | info | success | warning | danger | primary | secondary',
      defaultValue: 'primary',
      control: 'radio',
      options: ['base', 'info', 'success', 'warning', 'danger', 'primary', 'secondary'],
    }),
  },
};

export const Default: StoryObj<typeof Button> = {
  args: {
    default: 'Button',
  },
};

export const Icon: StoryObj<typeof Button> = {
  args: {
    mode: 'icon',
    icon: { name: 'Home' },
  },
};

export const BlankIcon: StoryObj<typeof Button> = {
  args: {
    mode: 'blank',
    icon: { name: 'Home' },
  },
};

export const Loading: StoryObj<typeof Button> = {
  args: {
    loading: true,
  },
};

export default meta;
