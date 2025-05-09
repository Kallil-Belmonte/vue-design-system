import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import TooltipOld from './TooltipOld.vue';

const meta: Meta<typeof TooltipOld> = {
  title: 'Components/TooltipOld',
  component: TooltipOld,
  argTypes: {
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
    showClose: setArgs({
      name: 'showClose',
      description:
        'If <code>trigger</code> is <code>click</code> and <code>showClose</code> is <code>true</code>, the close button is shown.',
      type: 'boolean',
      defaultValue: 'true',
      control: 'boolean',
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
        </template>
        <template #tooltip>
          Tooltip
        </template>
      </TooltipOld>
    `,
  }),
};

export const Default: StoryObj<typeof TooltipOld> = {
  args: {
    style: 'width: max-content;',
  },
};

export default meta;
