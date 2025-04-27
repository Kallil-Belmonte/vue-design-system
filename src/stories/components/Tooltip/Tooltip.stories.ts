import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Tooltip from './Tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    animation: setArgs({
      name: 'animation',
      description: 'Animation.',
      type: 'fade | scale',
      defaultValue: 'scale',
      control: 'radio',
      options: ['fade', 'scale'],
    }),
    click: setArgs({
      name: 'click',
      description: 'Click function.',
      type: '(event: MouseEvent) => void',
      control: false,
    }),
    closeOnTooltipClick: setArgs({
      name: 'closeOnTooltipClick',
      description: 'If <code>true</code>, the tooltip will close when clicked.',
      type: 'boolean',
      defaultValue: 'false',
      control: 'boolean',
    }),
    color: setArgs({
      name: 'color',
      description: 'Color.',
      type: 'base | primary | secondary',
      defaultValue: 'base',
      control: 'radio',
      options: ['base', 'primary', 'secondary'],
    }),
    maxWidth: setArgs({
      name: 'maxWidth',
      description: 'Max width.',
      type: 'string',
      defaultValue: '300px',
      control: 'text',
    }),
    mouseenter: setArgs({
      name: 'mouseenter',
      description: 'Mouseenter function.',
      type: '(event: MouseEvent) => void',
      control: false,
    }),
    mouseleave: setArgs({
      name: 'mouseleave',
      description: 'Mouseleave function.',
      type: '(event: MouseEvent) => void',
      control: false,
    }),
    position: setArgs({
      name: 'position',
      description: 'Position.',
      type: 'top-start | top | top-end | right-start | right | right-end | bottom-start | bottom | bottom-end | left-start | left | left-end',
      defaultValue: 'top',
      control: 'radio',
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    }),
    spacing: setArgs({
      name: 'spacing',
      description: 'Distance between the content from the tooltip.',
      type: 'string',
      defaultValue: '10px',
      control: 'text',
    }),
    trigger: setArgs({
      name: 'trigger',
      description: 'Trigger mode.',
      type: 'hover | click',
      defaultValue: 'hover',
      control: 'radio',
      options: ['hover', 'click'],
    }),
  },
  args: {
    // Slots
    default: 'Content',
    tooltip: 'Tooltip',
  },
};

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    style: 'width: max-content;',
  },
};

export default meta;
