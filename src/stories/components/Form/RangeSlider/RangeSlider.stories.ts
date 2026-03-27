import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import RangeSlider from './RangeSlider.vue';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/Form/RangeSlider',
  component: RangeSlider,
  argTypes: {
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled prop',
      type: 'boolean',
      control: 'boolean',
    }),
    info: setArgs({
      name: 'info',
      description: 'Info props.',
      type: '{ text: string; maxWidth?: string; position?: Position }',
      control: 'object',
    }),
    label: setArgs({
      name: 'label',
      description: 'Label.',
      type: 'string',
      control: 'text',
    }),
    max: setArgs({
      name: 'max',
      description: 'Max value.',
      type: 'number',
      control: 'number',
    }),
    maxPrefix: setArgs({
      name: 'maxPrefix',
      description: 'Prefix for the max value.',
      type: 'string',
      control: 'text',
    }),
    maxSufix: setArgs({
      name: 'maxSufix',
      description: 'Sufix for the max value.',
      type: 'string',
      control: 'text',
    }),
    min: setArgs({
      name: 'min',
      description: 'Min value.',
      type: 'number',
      control: 'number',
    }),
    minPrefix: setArgs({
      name: 'minPrefix',
      description: 'Prefix for the min value.',
      type: 'string',
      control: 'text',
    }),
    minSufix: setArgs({
      name: 'minSufix',
      description: 'Sufix for the min value.',
      type: 'string',
      control: 'text',
    }),
  },
  render: args => ({
    components: { RangeSlider },
    setup() {
      const minValue = ref(0);
      const maxValue = ref(100);
      return { args, minValue, maxValue };
    },
    template: `
      <RangeSlider v-model:min-value="minValue" v-model:max-value="maxValue" :min="0" :max="100" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof RangeSlider> = {
  args: {
    label: 'Range Slider',
  },
};

export default meta;
