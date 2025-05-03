<template>
  <section ref="element" data-component="Card" :class="variant">
    <header v-if="icon || title">
      <Icon v-if="icon" :name="icon" />
      <h2 v-if="title" class="title">{{ title }}</h2>
    </header>
    <div v-if="$slots.default" class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';

type Variant = 'base' | 'primary';

type Props = {
  variant?: Variant;
  icon?: Icons;
  title?: string;
};

const { variant = 'base', icon, title } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Card'] {
  border-radius: 20px;
  background-color: #fff;
  position: relative;

  > header {
    @extend %flex-vertical-center;
    padding: 10px 20px;
    font-weight: 700;

    [data-component='Icon'] {
      @include square(20px);
      flex-shrink: 0;
      color: var(--primary);
      margin-right: 10px;
    }

    .title {
      font-size: 20px;
    }
  }

  .content {
    padding: 0 20px 10px;
  }

  // VARIANT

  // Base
  &.base {
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
  }

  // Primary
  &.primary {
    border: 2px solid #f4f6fa;
  }
}
</style>
