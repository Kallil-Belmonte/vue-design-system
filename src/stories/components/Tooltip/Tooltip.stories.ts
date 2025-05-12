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
    closeOnTooltipClick: setArgs({
      name: 'closeOnTooltipClick',
      description: 'If <code>true</code>, the tooltip will close when its content is clicked.',
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
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <template #default>
          Content
        </template>
        <template #tooltip>
          Tooltip
        </template>
      </Tooltip>
    `,
  }),
};

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    style: 'width: max-content;',
  },
};

export default meta;
