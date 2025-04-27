import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import SelectOld from './SelectOld.vue';

const meta: Meta<typeof SelectOld> = {
  title: 'Components/Form/SelectOld',
  component: SelectOld,
  argTypes: {
    change: setArgs({
      name: 'change',
      description: 'Change callback.',
      type: '(option: SelectOption, event: KeyboardEvent | FocusEvent | MouseEvent) => void',
      required: true,
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
    name: setArgs({
      name: 'name',
      description: 'Name native prop.',
      type: "InputHTMLAttributes['name']",
      required: true,
      control: 'text',
    }),
    options: setArgs({
      name: 'value',
      description: 'Name native prop.',
      type: 'SelectOption[]',
      required: true,
      control: 'text',
    }),
    required: setArgs({
      name: 'required',
      description: 'Required native prop.',
      type: "InputHTMLAttributes['required']",
      control: 'boolean',
    }),
    value: setArgs({
      name: 'value',
      description: 'Name native prop.',
      type: 'any',
      required: true,
      control: 'text',
    }),
  },
  render: args => ({
    components: { SelectOld },
    setup() {
      const country = ref('');
      return { args, country };
    },
    template: `
        <SelectOld
          :value="country"
          name="countries"
          label="Countries"
          :options="[
            { text: 'Brazil', value: 'BR' },
            { text: 'Portugal', value: 'PT' },
            { text: 'United States', value: 'US' },
          ]"
          v-bind="args"
          :change="option => country = option.value"
        />
      `,
  }),
};

export const Default: StoryObj<typeof SelectOld> = {};

export default meta;
