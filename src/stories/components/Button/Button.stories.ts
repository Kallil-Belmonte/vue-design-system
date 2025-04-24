import type { Meta, StoryFn } from '@storybook/vue3';

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
      type: '{ name: Icons; color?: string; size?: string }',
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
      type: 'icon | contain | full',
      defaultValue: 'full',
      control: 'radio',
      options: ['icon', 'contain', 'full'],
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
      type: 'blank | base | primary | secondary',
      defaultValue: 'primary',
      control: 'radio',
      options: ['blank', 'base', 'primary', 'secondary'],
    }),
  },
};

export const Primary: StoryFn<typeof Button> = () => ({
  components: { Button },
  template: '<Button>Button</Button>',
});

export const Icon: StoryFn<typeof Button> = () => ({
  components: { Button },
  template: '<Button mode="icon" />',
});

export default meta;
