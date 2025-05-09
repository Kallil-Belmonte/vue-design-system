<template>
  <button
    ref="element"
    data-component="Button"
    :class="`${mode} ${variant}`"
    :type="type"
    :disabled="disabled || loading"
  >
    <Icon v-if="loading" name="Loading" color="#fff" />
    <Icon v-else-if="name" :category="category" :name="name" :color="color" :size="size" />

    <slot v-if="!loading"></slot>
  </button>
</template>

<script lang="ts" setup>
import { type ButtonHTMLAttributes, useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import type { Category, Icons } from '@/stories/components/Icon/types';

type Props = {
  type?: ButtonHTMLAttributes['type'];
  mode?: 'blank' | 'icon' | 'contain' | 'full';
  variant?: 'base' | 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary';
  icon?: { category?: Category; name: Icons; color?: string; size?: string };
  loading?: boolean;
  disabled?: ButtonHTMLAttributes['disabled'];
};

type Slots = {
  /** Default slot */
  default(): any;
};

const {
  type = 'button',
  mode = 'full',
  variant = 'primary',
  icon,
  loading,
  disabled,
} = defineProps<Props>();
const { category, name, color, size = '20px' } = icon || {};

const element = useTemplateRef<HTMLButtonElement>('element');

// SLOTS
defineSlots<Slots>();

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

$size: 45px;

@mixin setColors($bgColor, $activeBgColor) {
  color: #fff;
  background-color: $bgColor;

  @include active-style {
    background-color: $activeBgColor;
  }
}

[data-component='Button'] {
  font: inherit;
  font-family: var(--font-primary);
  font-size: var(--font-size);
  font-weight: 700;
  color: var(--text-color);
  @extend %flex-center;
  gap: 10px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.4s ease;

  [data-component='Icon'] {
    flex-shrink: 0;

    &[data-name='Loading'] {
      @include square(30px);
    }
  }

  // Mode
  &.blank {
    min-width: 0;
    min-height: 0;
    @include square(max-content);
    padding: 0;

    &.base {
      [data-component='Icon'] {
        transition: opacity 0.4s ease;

        @include active-style {
          opacity: 0.7;
        }
      }
    }

    &.info {
      [data-component='Icon'] {
        @include active-style {
          color: var(--info);
        }
      }
    }

    &.success {
      [data-component='Icon'] {
        @include active-style {
          color: var(--success);
        }
      }
    }

    &.warning {
      [data-component='Icon'] {
        @include active-style {
          color: var(--warning);
        }
      }
    }

    &.danger {
      [data-component='Icon'] {
        @include active-style {
          color: var(--danger);
        }
      }
    }

    &.primary {
      [data-component='Icon'] {
        @include active-style {
          color: var(--primary);
        }
      }
    }

    &.secondary {
      [data-component='Icon'] {
        @include active-style {
          color: var(--secondary);
        }
      }
    }

    &:disabled {
      cursor: not-allowed;

      [data-component='Icon'] {
        color: var(--grey-4) !important;
      }
    }
  }

  &.icon {
    min-width: $size;
    min-height: $size;
    @include square(max-content);
    padding: 10px;
  }

  &.contain {
    @include size(max-content, $size);
    padding: 0 20px;
  }

  &.full {
    @include size(100%, $size);
    padding: 0 20px;
  }

  &:not(.blank) {
    // Variant
    &.base,
    &.info,
    &.success,
    &.warning,
    &.danger,
    &.primary,
    &.secondary {
      border-radius: 8px;
    }

    &.base {
      background-color: #fff;
      border: 1px solid var(--grey-4);

      &:hover {
        background-color: color.adjust(#fff, $lightness: -2%);

        [data-component='Icon'] {
          color: var(--primary);
        }
      }
    }

    &.info {
      @include setColors(var(--info), var(--info-darker));
    }

    &.success {
      @include setColors(var(--success), var(--success-darker));
    }

    &.warning {
      @include setColors(var(--warning), var(--warning-darker));
    }

    &.danger {
      @include setColors(var(--danger), var(--danger-darker));
    }

    &.primary {
      @include setColors(var(--primary), var(--primary-darker));
    }

    &.secondary {
      @include setColors(var(--secondary), var(--secondary-darker));
    }

    // Disabled
    &:disabled {
      font-weight: 400;
      color: var(--text-color) !important;
      background-color: var(--grey-4) !important;
      cursor: not-allowed;

      [data-component='Icon'][data-name='Loading'] {
        color: #fff;
      }
    }
  }
}
</style>
