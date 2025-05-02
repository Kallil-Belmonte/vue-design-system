import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Password from './Password.vue';

const meta: Meta<typeof Password> = {
  title: 'Components/Form/Password',
  component: Password,
  argTypes: {
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
      type: '(payload: Event) => void',
      control: false,
    }),
    label: setArgs({
      name: 'label',
      description: 'Label.',
      type: 'string',
      control: 'text',
    }),
    maxlength: setArgs({
      name: 'maxlength',
      description: 'Maxlength native prop.',
      type: "InputHTMLAttributes['maxlength']",
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
  },
  render: args => ({
    components: { Password },
    setup() {
      const password = ref('');
      return { args, password };
    },
    template: `
      <Password name="password" v-model="password" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Password> = {};

export default meta;
