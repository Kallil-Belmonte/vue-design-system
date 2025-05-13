import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import RadioButton from './RadioButton.vue';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Form/RadioButton',
  component: RadioButton,
  argTypes: {
    change: setArgs({
      name: 'change',
      description: 'Change callback.',
      type: '(value: string, event: Event) => void',
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
    name: setArgs({
      name: 'name',
      description: 'Name native prop.',
      type: "InputHTMLAttributes['name']",
      required: true,
      control: 'text',
    }),
    radios: setArgs({
      name: 'radios',
      description: 'Radio options.',
      type: 'Radio[]',
      required: true,
      control: false,
    }),
    required: setArgs({
      name: 'required',
      description: 'Required native prop.',
      type: "InputHTMLAttributes['required']",
      control: 'boolean',
    }),
    title: setArgs({
      name: 'title',
      description: 'Title.',
      type: 'string',
      required: true,
      control: 'text',
    }),
  },
  render: args => ({
    components: { RadioButton },
    setup() {
      const radio = ref('');
      return { args, radio };
    },
    template: `
      <RadioButton v-model="radio" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof RadioButton> = {
  args: {
    name: 'radio',
    title: 'Title',
    radios: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ],
  },
};

export default meta;
