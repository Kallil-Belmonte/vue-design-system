<template>
  <button
    ref="element"
    data-component="Button"
    :class="`${mode} ${variant}`"
    :type="type"
    :disabled="disabled || loading"
  >
    <Icon v-if="loading" name="Loading" color="#fff" />
    <Icon v-else-if="name" :name="name" :color="color" :size="size" />

    <slot v-if="!loading"></slot>
  </button>
</template>

<script lang="ts" setup>
import { type ButtonHTMLAttributes, useTemplateRef } from 'vue';

import Icon from '../Icon/Icon.vue';
import type { Icons } from '../Icon/types';

type Props = {
  type?: ButtonHTMLAttributes['type'];
  mode?: 'icon' | 'contain' | 'full';
  variant?: 'base' | 'primary' | 'secondary' | 'blank';
  icon?: { name: Icons; color?: string; size?: string };
  loading?: boolean;
  disabled?: ButtonHTMLAttributes['disabled'];
  click?: (event: MouseEvent) => void;
};

const {
  type = 'button',
  mode = 'full',
  variant = 'primary',
  icon,
  loading,
  disabled,
} = defineProps<Props>();
const { name, color, size = '20px' } = icon || {};

const element = useTemplateRef<HTMLButtonElement>('element');

// SLOTS
defineSlots<{
  /** Default slot */
  default(): any;
}>();

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Button'] {
  $size: 45px;

  font: inherit;
  font-family: var(--font-primary);
  font-size: var(--font-size);
  font-weight: 700;
  color: var(--text-color);
  @extend %flex-center;
  gap: 10px;
  height: $size;
  border: none;
  cursor: pointer;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  overflow: hidden;
  transition: background-color 0.4s ease;

  &,
  [data-component='Icon'] {
    flex-shrink: 0;
  }

  [data-component='Icon'][data-name='Loading'] {
    @include square(30px);
  }

  // Mode
  &.icon {
    min-width: $size;
    min-height: $size;
    @include square(max-content);
    padding: 10px;
  }

  &.contain {
    min-width: $size;
    width: max-content;
    padding: 0 20px;
  }

  &.full {
    width: 100%;
  }

  // Variant
  &.blank,
  &.base,
  &.primary,
  &.secondary {
    border-radius: 8px;
  }

  &.blank {
    @include square(max-content);
    padding: 0;
  }

  &.base {
    background-color: #fff;
    border: 1px solid var(--grey-4);

    @include active-style {
      background-color: color.adjust(#fff, $lightness: -2%);

      [data-component='Icon'] {
        color: var(--primary);
      }
    }
  }

  &.primary {
    color: #fff;
    background-color: var(--primary);

    @include active-style {
      background-color: var(--primary-darker);
    }
  }

  &.secondary {
    color: #fff;
    background-color: var(--secondary);

    @include active-style {
      background-color: var(--secondary-darker);
    }
  }

  // Disabled
  &:disabled {
    font-weight: 400;
    color: var(--text-color) !important;
    background-color: var(--grey-4) !important;
    cursor: not-allowed;
  }
}
</style>
