<template>
  <section ref="element" data-component="Tabs">
    <details
      v-for="tab in tabs"
      :key="tab.title"
      class="tab"
      :name="name"
      :open="tab.open"
      @click="tab.click"
    >
      <summary>
        <Icon v-if="tab.icon" :name="tab.icon" size="20px" />
        <h3 class="title">{{ tab.title }}</h3>
      </summary>
      <section class="content">
        <slot :name="`${tab.id}`"></slot>
      </section>
    </details>
  </section>
</template>

<script lang="ts" setup>
import { useId, useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';

type Tab = {
  id: string;
  icon?: Icons;
  title: string;
  open?: boolean;
  click?: (payload: MouseEvent) => void;
};

type Props = {
  tabs: Tab[];
};

type Slots = {
  /** Default slot */
  default(): any;
};

const { tabs } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const name = `tab-${useId()}`;

// SLOTS
defineSlots<Slots>();

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

$tab-padding: 5px;

[data-component='Tabs'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  display: flex;
  @include size(100%, 50px, 50px);
  border: 1px solid var(--grey-3);
  position: relative;

  > .tab {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    padding: $tab-padding;
    box-sizing: border-box;

    > summary {
      @extend %flex-center;
      height: 100%;
      border-radius: 50px;
      cursor: pointer;
      transition: background-color 0.4s ease;

      [data-component='Icon'],
      .title {
        color: var(--text-color);
        transition: color 0.4s ease;
      }

      [data-component='Icon'] {
        margin-right: 5px;
      }

      .title {
        font-family: var(--font-secondary);
        font-size: var(--font-size);
        font-weight: 700;
        margin: 0;
      }
    }

    > .content {
      margin-top: calc($tab-padding + 10px);
      @include position(absolute, auto, 0, auto, 0);
    }

    @include active-style {
      [data-component='Icon'],
      .title {
        color: var(--primary);
      }
    }

    &:open {
      > summary {
        background-color: var(--primary);

        [data-component='Icon'],
        .title {
          color: #fff;
        }
      }
    }
  }
}
</style>
