import { setArgs } from '@/shared/helpers';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tag from './Tag.vue';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    closable: setArgs({
      name: 'closable',
      description: 'If <code>true</code>, the close button is shown.',
      type: 'boolean',
      control: 'boolean',
    }),
    color: setArgs({
      name: 'color',
      description: 'Color.',
      type: 'default | primary | secondary | success | warning | error',
      defaultValue: 'default',
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
    }),
    counter: setArgs({
      name: 'counter',
      description: 'The amount that shows in the counter icon.',
      type: 'number',
      control: 'number',
    }),
    endIcon: setArgs({
      name: 'endIcon',
      description: 'Icon that shows at the end of the Tag.',
      type: '{ category?: Category; name: Icons }',
      control: 'object',
    }),
    click: setArgs({
      name: 'click',
      description: 'Callback for when the Tag is clicked.',
      type: "HTMLAttributes['onClick']",
      control: false,
    }),
    size: setArgs({
      name: 'size',
      description: 'Size.',
      type: 'small | medium | large',
      defaultValue: 'medium',
      control: 'radio',
      options: ['small', 'medium', 'large'],
    }),
    startIcon: setArgs({
      name: 'startIcon',
      description: 'Icon that shows at the beginning of the Tag.',
      type: '{ category?: Category; name: Icons }',
      control: 'object',
    }),
    variant: setArgs({
      name: 'variant',
      description: 'Variant.',
      type: 'light | outlined | solid',
      defaultValue: 'solid',
      control: 'radio',
      options: ['light', 'outlined', 'solid'],
    }),
  },
};

export const Default: StoryObj<typeof Tag> = {
  args: {
    default: 'Tag',
  },
};

export default meta;
