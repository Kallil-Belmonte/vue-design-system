import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Cellphone from './Cellphone.vue';

const meta: Meta<typeof Cellphone> = {
  title: 'Components/Form/Cellphone',
  component: Cellphone,
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
    selectPrefix: setArgs({
      name: 'selectPrefix',
      description: 'Callback for when selecting a prefix.',
      type: '(language: LanguageData) => void',
      required: true,
      control: false,
    }),
  },
  render: args => ({
    components: { Cellphone },
    setup() {
      const cellphone = ref('');
      return { args, cellphone };
    },
    template: `
      <Cellphone v-model="cellphone" v-bind="args"  />
    `,
  }),
};

export const Default: StoryObj<typeof Cellphone> = {
  args: {
    name: 'cellphone',
    selectPrefix: () => undefined,
  },
};

export default meta;
