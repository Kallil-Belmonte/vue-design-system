import { ref } from 'vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { setArgs } from '@/shared/helpers';
import { orderBy } from 'es-toolkit';
import Table from './Table.vue';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    headings: setArgs({
      name: 'headings',
      description: 'Headings.',
      type: 'Heading[]',
      required: true,
      control: 'object',
    }),
  },
  render: args => ({
    components: { Table },
    setup() {
      const users = ref([
        {
          name: 'John Doe',
          gender: 'Male',
          age: 20,
        },
        {
          name: 'Jane Doe',
          gender: 'Female',
          age: 25,
        },
        {
          name: 'Oliver Doe',
          gender: 'Male',
          age: 30,
        },
        {
          name: 'Greg Doe',
          gender: 'Male',
          age: 35,
        },
        {
          name: 'Jeremy Doe',
          gender: 'Male',
          age: 40,
        },
      ]);

      const sort = (property: keyof (typeof users.value)[0], order: 'asc' | 'desc') => {
        users.value = orderBy(users.value, [property], [order]);
      };

      const headings = [
        {
          slot: 'name',
          sortAscending: () => sort('name', 'asc'),
          sortDescending: () => sort('name', 'desc'),
        },
        {
          slot: 'gender',
          sortAscending: () => sort('gender', 'asc'),
          sortDescending: () => sort('gender', 'desc'),
        },
        {
          slot: 'age',
          sortAscending: () => sort('age', 'asc'),
          sortDescending: () => sort('age', 'desc'),
        },
      ];

      return { args, headings, users };
    },
    template: `
      <Table :headings="headings" v-bind="args">
        <template #name>Name</template>
        <template #gender>Gender</template>
        <template #age>Age</template>

        <tr v-for="user in users" :key="user.name">
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.age }}</td>
        </tr>
      </Table>
    `,
  }),
};

export const Default: StoryObj<typeof Table> = {
  args: {},
};

export default meta;
