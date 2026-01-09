<template>
  <div v-if="loading" ref="element" data-component="Loader" :class="`${mode}`">
    <Icon name="Loading" size="40px" />
    <slot></slot>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';

type Props = {
  loading: boolean;
  mode?: 'content' | 'page';
  showContent?: boolean;
};

type Slots = {
  /** Default slot */
  default(): any;
};

const { loading, mode = 'content', showContent = true } = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const opacity = computed(() => (showContent ? '0.5' : '0'));

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

[data-component='Loader'] {
  pointer-events: none;

  > [data-component='Icon'] {
    color: var(--primary);
    @extend %absolute-center;
    z-index: 1000;

    ~ * {
      opacity: v-bind(opacity);
    }
  }

  // Mode
  &.content {
    position: relative;
  }

  &.page {
    @include position(fixed, 0, 0, 0, 0, 9999);
  }
}
</style>
