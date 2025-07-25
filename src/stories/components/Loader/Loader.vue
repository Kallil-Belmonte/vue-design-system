<template>
  <div ref="element" data-component="Loader" :class="`${loading ? 'loading' : ''} ${mode}`">
    <Icon v-if="loading" name="Loading" size="40px" />
    <slot></slot>
  </div>
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

const backgroundColor = computed(() => `rgba(255, 255, 255, ${showContent ? '0.8' : '1'})`);

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
  &.loading {
    pointer-events: none;

    &::after {
      content: '';
      @include position(absolute, 0, 0, 0, 0, 999);
      background-color: v-bind(backgroundColor);
    }

    > [data-component='Icon'] {
      color: var(--primary);
      @extend %absolute-center;
      z-index: 1000;
    }

    // Mode
    &.content {
      position: relative;
    }

    &.page {
      @include position(fixed, 0, 0, 0, 0, 9999);
    }
  }
}
</style>
