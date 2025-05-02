import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import TooltipOld from './TooltipOld.vue';

const meta: Meta<typeof TooltipOld> = {
  title: 'Components/TooltipOld',
  component: TooltipOld,
  argTypes: {
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
  render: args => ({
    components: { TooltipOld },
    setup() {
      return { args };
    },
    template: `
      <TooltipOld v-bind="args">
        <template #default>
          Content
        <template #tooltip>
          Tooltip
        </template>
      </Tooltip>
    `,
  }),
};

export const Default: StoryObj<typeof TooltipOld> = {
  args: {
    style: 'width: max-content;',
  },
};

export default meta;
