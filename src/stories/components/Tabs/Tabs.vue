<template>
  <section ref="element" data-component="Tabs">
    <details v-for="tab in tabs" :key="tab.title" class="tab" :name="`tab-${id}`">
      <summary>
        <Icon v-if="tab.icon" :name="tab.icon" size="20px" />
        <h3 class="title">{{ tab.title }}</h3>
      </summary>
      <section class="content">
        <slot></slot>
      </section>
    </details>
  </section>
</template>

<script lang="ts" setup>
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';
import { useId, useTemplateRef } from 'vue';

type Tab = {
  icon?: Icons;
  title: string;
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

const id = useId();

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

[data-component='Tabs'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  display: flex;
  width: 100%;
  position: relative;

  > .tab {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;

    > .content {
      @include position(absolute, auto, 0, auto, 0);
    }
  }
}
</style>
