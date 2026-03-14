import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import RangeSlider from './RangeSlider.vue';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/Form/RangeSlider',
  component: RangeSlider,
  argTypes: {
    blur: setArgs({
      name: 'blur',
      description: 'Blur callback.',
      type: "InputHTMLAttributes['onBlur']",
      control: false,
    }),
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled native prop.',
      type: "InputHTMLAttributes['disabled']",
      control: 'boolean',
    }),
    info: setArgs({
      name: 'info',
      description: 'Info props.',
      type: '{ text: string; maxWidth?: string; position?: Position }',
      control: 'object',
    }),
    input: setArgs({
      name: 'input',
      description: 'Input callback.',
      type: "InputHTMLAttributes['onInput']",
      control: false,
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
      type: "InputHTMLAttributes['max']",
      control: 'text',
    }),
    min: setArgs({
      name: 'min',
      description: 'Min value.',
      type: "InputHTMLAttributes['min']",
      control: 'text',
    }),
    name: setArgs({
      name: 'name',
      description: 'Name native prop.',
      type: "InputHTMLAttributes['name']",
      required: true,
      control: 'text',
    }),
    required: setArgs({
      name: 'required',
      description: 'Required native prop.',
      type: "InputHTMLAttributes['required']",
      control: 'boolean',
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
    name: 'range-slider',
    label: 'Range Slider',
  },
};

export default meta;
