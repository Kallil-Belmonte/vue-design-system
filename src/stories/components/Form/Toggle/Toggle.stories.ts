import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Toggle from './Toggle.vue';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Form/Toggle',
  component: Toggle,
  argTypes: {
    change: setArgs({
      name: 'change',
      description: 'Change callback.',
      type: "InputHTMLAttributes['onChange']",
      control: false,
    }),
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled native prop.',
      type: "InputHTMLAttributes['disabled']",
      control: 'boolean',
    }),
    falseOption: setArgs({
      name: 'falseOption',
      description: 'Value for when is not checked.',
      type: 'ToggleOption',
      required: true,
      control: 'object',
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
      required: true,
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
    trueOption: setArgs({
      name: 'trueOption',
      description: 'Value for when is checked.',
      type: 'ToggleOption',
      required: true,
      control: 'object',
    }),
  },
  render: args => ({
    components: { Toggle },
    setup() {
      const toggle = ref(false);
      return { args, toggle };
    },
    template: `
      <Toggle v-model="toggle" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Toggle> = {
  args: {
    name: 'toggle',
    label: 'Toggle',
    trueOption: { value: true },
    falseOption: { value: false },
  },
};

export default meta;
