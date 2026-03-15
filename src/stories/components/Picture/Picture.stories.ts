import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Picture from './Picture.vue';

const meta: Meta<typeof Picture> = {
  title: 'Components/Picture',
  component: Picture,
  argTypes: {
    alt: setArgs({
      name: 'alt',
      description: 'Alt native prop.',
      type: "InputHTMLAttributes['type']",
      required: true,
      control: 'text',
    }),
    src: setArgs({
      name: 'src',
      description: 'Src native prop.',
      type: "InputHTMLAttributes['src']",
      required: true,
      control: 'text',
    }),
    sources: setArgs({
      name: 'sources',
      description: 'Sources.',
      type: 'Source[]',
      control: 'object',
    }),
  },
  render: args => ({
    components: { Picture },
    setup() {
      return { args };
    },
    template: `
      <Picture v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Picture> = {
  args: {
    alt: 'Logo',
    src: '/logos/storybook.svg',
    sources: [{ srcset: '/logos/storybook-icon.svg', media: '(max-width: 650px)' }],
  },
};

export default meta;
