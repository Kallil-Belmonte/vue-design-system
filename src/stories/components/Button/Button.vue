<template>
  <button
    ref="element"
    data-component="Button"
    :class="variant"
    :type="type"
    :disabled="disabled || loading"
    @click="click"
  >
    <!-- <Icon v-if="loading" name="Loading" color="#fff" />
    <Icon v-else-if="name" :name="name" :color="color" :size="size" /> -->

    <slot v-if="!loading"></slot>
  </button>
</template>

<script lang="ts" setup>
import { type ButtonHTMLAttributes, useTemplateRef } from 'vue';

import { type RouteLocationRaw, useRouter } from 'vue-router';

// import Icon from '../Icon/Icon.vue';
// import type { Icons } from '../Icon/types';

type Icons = any;

type Props = {
  type?: ButtonHTMLAttributes['type'];
  variant?:
    | 'base'
    | 'primary'
    | 'secondary'
    | 'icon'
    | 'icon-base'
    | 'icon-primary'
    | 'icon-secondary';
  route?: RouteLocationRaw;
  icon?: { name: Icons; color?: string; size?: string };
  loading?: boolean;
  disabled?: ButtonHTMLAttributes['disabled'];
  click?: (event: MouseEvent) => void;
};

const {
  type = 'button',
  variant = 'primary',
  route,
  icon,
  loading,
  disabled,
  click: clickProp,
} = defineProps<Props>();
const { name, color, size = '20px' } = icon || {};

const router = useRouter();

const element = useTemplateRef<HTMLButtonElement>('element');

const click = (event: MouseEvent) => {
  clickProp?.(event);
  if (route) router.push(route);
};

// SLOTS
defineSlots<{
  /** Default slot */
  default(): any;
}>();

// EXPOSE
defineExpose({
  /** The element ref */
  element,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Button'] {
  font: inherit;
  font-family: $font-primary;
  font-size: $font-size;
  color: $text-color;
  text-align: center;
  padding: 0 15px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  @extend %flex-center;
  gap: 10px;
  font-weight: 700;
  box-shadow: none;
  transition: background-color 0.4s ease;
  overflow: hidden;

  [data-component='Icon'][data-name='Loading'] {
    @include square(30px);
  }

  // VARIANT

  // Base
  // Primary
  // Secondary
  &.base,
  &.primary,
  &.secondary {
    width: 100%;
    border-radius: 50px;
  }

  // Base
  &.base {
    background-color: #fff;
    border: 1px solid $grey-4;

    @include active-style {
      background-color: color.adjust(#fff, $lightness: -2%);

      [data-component='Icon'] {
        color: $primary;
      }
    }
  }

  // Primary
  &.primary {
    color: #fff;
    background-color: $primary;

    @include active-style {
      background-color: $primary-darker;
    }
  }

  // Secondary
  &.secondary {
    color: #fff;
    background-color: $secondary;

    @include active-style {
      background-color: $secondary-darker;
    }
  }

  // Icon
  // Icon Base
  // Icon Primary
  // Icon Secondary
  &.icon,
  &.icon-base,
  &.icon-primary,
  &.icon-secondary {
    @include square(v-bind(size));
    padding: 0;
  }

  // Icon Base
  // Icon Primary
  // Icon Secondary
  &.icon-base,
  &.icon-primary,
  &.icon-secondary {
    border-radius: 25%;

    [data-component='Icon'] {
      @include square(60%);
    }
  }

  // Icon Primary
  // Icon Secondary
  &.icon-primary,
  &.icon-secondary {
    color: #fff;
  }

  // Icon
  &.icon {
    color: $grey-7;

    @include active-style {
      color: $dark-1;
    }

    [data-component='Icon'] {
      @include square(100%);
    }

    &:disabled {
      background-color: transparent !important;
    }
  }

  // Icon Base
  &.icon-base {
    background-color: #fff;
    border: 1px solid $grey-4;

    @include active-style {
      background-color: color.adjust(#fff, $lightness: -1%);
    }
  }

  // Icon Primary
  &.icon-primary {
    background-color: $primary;

    @include active-style {
      background-color: $primary-darker;
    }
  }

  // Icon Secondary
  &.icon-secondary {
    background-color: $secondary;

    @include active-style {
      background-color: $secondary-darker;
    }
  }

  // DISABLED
  &:disabled {
    font-weight: 400;
    color: $text-color !important;
    background-color: $grey-4 !important;
    cursor: not-allowed;
  }
}
</style>
