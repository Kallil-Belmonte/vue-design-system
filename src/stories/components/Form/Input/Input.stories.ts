import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { UIIcons } from '@/shared/files/consts';
import { setArgs } from '@/shared/helpers';
import Input from './Input.vue';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  argTypes: {
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled native prop.',
      type: "InputHTMLAttributes['disabled']",
      control: 'boolean',
    }),
    icon: setArgs({
      name: 'icon',
      description: 'Icon.',
      type: 'Icons',
      control: 'radio',
      options: UIIcons,
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
      type: '(payload: Event) => void',
      control: false,
    }),
    label: setArgs({
      name: 'label',
      description: 'Label.',
      type: 'string',
      required: true,
      control: 'text',
    }),
    max: setArgs({
      name: 'max',
      description: 'Max native prop.',
      type: "InputHTMLAttributes['max']",
      control: 'text',
    }),
    maxlength: setArgs({
      name: 'maxlength',
      description: 'Maxlength native prop.',
      type: "InputHTMLAttributes['maxlength']",
      control: 'text',
    }),
    min: setArgs({
      name: 'min',
      description: 'Min native prop.',
      type: "InputHTMLAttributes['min']",
      control: 'text',
    }),
    minlength: setArgs({
      name: 'minlength',
      description: 'Minlength native prop.',
      type: "InputHTMLAttributes['minlength']",
      control: 'text',
    }),
    name: setArgs({
      name: 'name',
      description: 'Name native prop.',
      type: "InputHTMLAttributes['name']",
      required: true,
      control: 'text',
    }),
    pattern: setArgs({
      name: 'pattern',
      description: 'Pattern native prop.',
      type: "InputHTMLAttributes['pattern']",
      control: 'text',
    }),
    placeholder: setArgs({
      name: 'placeholder',
      description: 'Placeholder native prop.',
      type: "InputHTMLAttributes['placeholder']",
      control: 'text',
    }),
    required: setArgs({
      name: 'required',
      description: 'Required native prop.',
      type: "InputHTMLAttributes['required']",
      control: 'boolean',
    }),
    type: setArgs({
      name: 'type',
      description: 'Type native prop.',
      type: "InputHTMLAttributes['type']",
      control: 'text',
    }),
  },
  render: args => ({
    components: { Input },
    setup() {
      const input = ref('');
      return { args, input };
    },
    template: `
      <Input v-model="input" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Input> = {
  args: {
    name: 'input',
    label: 'Input',
  },
};

export default meta;
