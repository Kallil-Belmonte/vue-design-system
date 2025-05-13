import type { Meta, StoryObj } from '@storybook/vue3';

import { setArgs } from '@/shared/helpers';
import Loader from './Loader.vue';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  decorators: [
    () => ({
      template: `
        <div style="display: flex; align-content: center; justify-content: center; height: 50px;">
          <story/>
        </div>
      `,
    }),
  ],
  argTypes: {
    loading: setArgs({
      name: 'loading',
      description: 'Loading.',
      type: 'boolean',
      required: true,
      control: 'boolean',
    }),
    mode: setArgs({
      name: 'mode',
      description: 'Expansion mode.',
      type: 'content | page',
      defaultValue: 'content',
      control: 'radio',
      options: ['content', 'page'],
    }),
    showContent: setArgs({
      name: 'showContent',
      description: 'If <code>true</code>, the content is shown.',
      type: 'boolean',
      defaultValue: 'true',
      control: 'boolean',
    }),
  },
  render: args => ({
    components: { Loader },
    setup() {
      return { args };
    },
    template: `
        <Loader v-bind="args">
          <div style="font-family: var(--font-primary); display: flex; align-items: center; justify-content: center; height: 50px">
            Content
          </div>
        </Loader>
      `,
  }),
};

export const Default: StoryObj<typeof Loader> = {
  args: {
    loading: true,
  },
};

export default meta;
