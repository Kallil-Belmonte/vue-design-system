<template>
  <table data-component="Table">
    <thead>
      <tr>
        <th
          v-for="{ slot, sortAscending, sortDescending, ...otherProps } in headings"
          :key="slot"
          v-bind="otherProps"
        >
          <div class="heading">
            <slot :name="slot"></slot>

            <div v-if="sortAscending || sortDescending" class="sort">
              <button
                v-if="sortAscending"
                class="asc"
                type="button"
                aria-label="Crescente"
                title="Crescente"
                @click="sortAscending"
              ></button>
              <button
                v-if="sortDescending"
                class="desc"
                type="button"
                aria-label="Decrescente"
                title="Decrescente"
                @click="sortDescending"
              ></button>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { ThHTMLAttributes } from 'vue';

type Heading = {
  slot: string;
  sortAscending?: () => void;
  sortDescending?: () => void;
} & ThHTMLAttributes;

type Props = {
  headings: Heading[];
};

const { headings } = defineProps<Props>();
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Table'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--grey-300);
  border-radius: 8px;
  overflow: hidden;

  tr {
    th,
    td {
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid var(--grey-300);
      border-right: 1px solid var(--grey-300);

      &:last-child {
        border-right: none;
      }
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  thead {
    tr {
      th {
        padding-top: 5px;
        padding-bottom: 5px;

        .heading {
          @extend %flex-center;
          gap: 5px;

          .sort {
            display: inline-flex;
            flex-direction: column;
            gap: 3px;

            button {
              @include square(0);
              padding: 0;
              border: none;
              background: none;
              cursor: pointer;
              @include transitionAll();

              &.asc {
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid var(--dark-200);

                @include active-style {
                  border-bottom-color: var(--primary);
                }
              }

              &.desc {
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--dark-200);

                @include active-style {
                  border-top-color: var(--primary);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
