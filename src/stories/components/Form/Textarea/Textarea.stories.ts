import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Textarea from './Textarea.vue';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  argTypes: {
    cols: setArgs({
      name: 'cols',
      description: 'Cols native prop.',
      type: "TextareaHTMLAttributes['cols']",
      control: 'text',
    }),
    disabled: setArgs({
      name: 'disabled',
      description: 'Disabled native prop.',
      type: "TextareaHTMLAttributes['disabled']",
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
      required: true,
      control: 'text',
    }),
    maxlength: setArgs({
      name: 'maxlength',
      description: 'Maxlength native prop.',
      type: "TextareaHTMLAttributes['maxlength']",
      control: 'text',
    }),
    minlength: setArgs({
      name: 'minlength',
      description: 'Minlength native prop.',
      type: "TextareaHTMLAttributes['minlength']",
      control: 'text',
    }),
    name: setArgs({
      name: 'name',
      description: 'Name native prop.',
      type: "TextareaHTMLAttributes['name']",
      required: true,
      control: 'text',
    }),
    placeholder: setArgs({
      name: 'placeholder',
      description: 'Placeholder native prop.',
      type: "TextareaHTMLAttributes['placeholder']",
      control: 'text',
    }),
    required: setArgs({
      name: 'required',
      description: 'Required native prop.',
      type: "TextareaHTMLAttributes['required']",
      control: 'boolean',
    }),
    rows: setArgs({
      name: 'rows',
      description: 'Rows native prop.',
      type: "TextareaHTMLAttributes['rows']",
      control: 'text',
    }),
  },
  render: args => ({
    components: { Textarea },
    setup() {
      const textarea = ref('');
      return { args, textarea };
    },
    template: `
      <Textarea v-model="textarea" v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Textarea> = {
  args: {
    name: 'textarea',
    label: 'Textarea',
  },
};

export default meta;
