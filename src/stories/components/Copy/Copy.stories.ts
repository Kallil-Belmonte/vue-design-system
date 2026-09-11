import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Copy from './Copy.vue';

const meta: Meta<typeof Copy> = {
  title: 'Components/Copy',
  component: Copy,
  argTypes: {
    copiedText: setArgs({
      name: 'copiedText',
      description: 'Copied text.',
      type: 'string',
      defaultValue: 'Copied!',
      control: 'text',
    }),
    copyText: setArgs({
      name: 'copyText',
      description: 'Copy text.',
      type: 'string',
      defaultValue: 'Copy',
      control: 'text',
    }),
    delay: setArgs({
      name: 'delay',
      description: 'Delay in milliseconds for the copied text to disappear.',
      type: 'number',
      defaultValue: 3000,
      control: 'number',
    }),
    iconColor: setArgs({
      name: 'iconColor',
      description: 'Icon color.',
      type: 'string',
      control: 'color',
    }),
    size: setArgs({
      name: 'size',
      description: 'Size.',
      type: 'string',
      defaultValue: '25px',
      control: 'text',
    }),
    textToCopy: setArgs({
      name: 'textToCopy',
      description: 'Text to copy.',
      type: 'string',
      required: true,
      control: 'text',
    }),
    tooltipColor: setArgs({
      name: 'tooltipColor',
      description: 'Tooltip color.',
      type: 'base | primary | secondary',
      defaultValue: 'base',
      control: 'radio',
      options: ['base', 'primary', 'secondary'],
    }),
  },
};

export const Default: StoryObj<typeof Copy> = {
  args: {
    textToCopy: 'Lorem ipsum.',
  },
};

export default meta;
