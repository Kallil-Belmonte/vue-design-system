import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';
import Carousel from './Carousel.vue';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    slides: setArgs({
      name: 'slides',
      description: 'Slides.',
      type: 'Slide[]',
      required: true,
      control: false,
    }),
    duration: setArgs({
      name: 'duration',
      description: 'Duration of each slide in miliseconds.',
      type: 'number',
      defaultValue: '5000',
      control: 'number',
    }),
  },
  render: args => ({
    components: { Carousel, Button },
    setup() {
      return { args };
    },
    template: `
      <Carousel v-bind="args" />
    `,
  }),
};

export const Default: StoryObj<typeof Carousel> = {
  args: {
    slides: [
      {
        image: 'https://pic.pnnet.dev/938x300',
        content: '<p style="color: #fff; text-align: center; margin: 80px 0 0;">Slide 1</p>',
      },
      {
        image: 'https://pic.pnnet.dev/938x300',
        content: '<p style="color: #fff; text-align: center; margin: 80px 0 0;">Slide 2</p>',
      },
      {
        image: 'https://pic.pnnet.dev/938x300',
        content: '<p style="color: #fff; text-align: center; margin: 80px 0 0;">Slide 3</p>',
      },
    ],
  },
};

export default meta;
