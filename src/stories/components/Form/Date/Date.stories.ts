import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Date from './Date.vue';

const meta: Meta<typeof Date> = {
  title: 'Components/Form/Date',
  component: Date,
  argTypes: {
    change: setArgs({
      name: 'change',
      description: 'Change callback.',
      type: '(payload: Event) => void',
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
    min: setArgs({
      name: 'min',
      description: 'Min native prop.',
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
    components: { Date },
    setup() {
      return { args };
    },
    template: `
      <Date v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Date> = {
  args: {
    name: 'date',
    label: 'Date',
  },
};

export default meta;
