<template>
  <div
    ref="element"
    data-component="Tag"
    :class="`${variant} ${color} ${size} ${click ? 'clickable' : ''}`"
    @click="click"
  >
    <Icon v-if="startIcon" :category="startIcon.category" :name="startIcon.name" />

    <slot></slot>

    <div v-if="typeof counter === 'number'" class="counter">{{ counter }}</div>

    <Icon v-if="endIcon" :category="endIcon.category" :name="endIcon.name" />

    <Button
      v-if="closable"
      aria-label="Close"
      title="Close"
      mode="blank"
      variant="base"
      :icon="{ name: 'Close' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, useTemplateRef } from 'vue';

import Button from '@/stories/components/Button/Button.vue';
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Category, Icons } from '@/stories/components/Icon/types';

type Props = {
  variant?: 'solid' | 'outlined' | 'light';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  counter?: number;
  startIcon?: { category?: Category; name: Icons };
  endIcon?: { category?: Category; name: Icons };
  closable?: boolean;
  click?: HTMLAttributes['onClick'];
};

type Slots = {
  /** Default slot */
  default(): any;
};

const {
  variant = 'solid',
  color = 'default',
  size = 'medium',
  counter,
  startIcon,
  endIcon,
  closable,
  click,
} = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

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

@mixin setColor($color, $bgColor, $borderColor: '') {
  background-color: $bgColor;
  @if $borderColor != '' {
    border-color: $borderColor;
  } @else {
    border-color: $bgColor;
  }

  .counter {
    color: $bgColor;
    background-color: $color;
  }

  &,
  [data-component='Button'] {
    color: $color;
  }
}

@mixin setSize($fontSize, $height, $paddingX, $radius: 16px) {
  font-size: $fontSize;
  height: $height;
  padding: 0 $paddingX;
  border-radius: $radius;
}

@mixin setIconSize($size, $gap) {
  gap: $gap;

  [data-component='Icon'] {
    @include square($size, '', true);
  }
}

@mixin setCounterSize($padding) {
  .counter {
    padding: $padding;
  }
}

@mixin setButtonSize($size) {
  [data-component='Button'] {
    @include square($size);
  }
}

[data-component='Tag'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  font-weight: 700;
  @extend %inline-flex-vertical-center;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;

  &.clickable {
    cursor: pointer;
  }

  .counter {
    border-radius: 4px;
  }

  // VARIANT
  &.solid {
    // COLOR
    &.default {
      @include setColor(var(--text-color), var(--grey-4));
    }

    &.primary {
      @include setColor(#fff, var(--primary));
    }

    &.secondary {
      @include setColor(#fff, var(--secondary));
    }

    &.success {
      @include setColor(#fff, var(--success));
    }

    &.warning {
      @include setColor(var(--text-color), var(--warning));
    }

    &.error {
      @include setColor(#fff, var(--danger));
    }
  }

  &.outlined {
    // COLOR
    &.default {
      @include setColor(var(--text-color), #fff, var(--grey-7));
    }

    &.primary {
      @include setColor(var(--primary), color.adjust(#43b883, $lightness: 40%), var(--primary));
    }

    &.secondary {
      @include setColor(var(--secondary), color.adjust(#35495e, $lightness: 45%), var(--secondary));
    }

    &.success {
      @include setColor(var(--success), color.adjust(#37c991, $lightness: 40%), var(--success));
    }

    &.warning {
      @include setColor(var(--warning), color.adjust(#ffb23e, $lightness: 30%), var(--warning));
    }

    &.error {
      @include setColor(var(--danger), color.adjust(#fd6e64, $lightness: 25%), var(--danger));
    }
  }

  &.light {
    // COLOR
    &.default {
      @include setColor(var(--text-color), var(--grey-2));
    }

    &.primary {
      @include setColor(var(--primary), color.adjust(#43b883, $lightness: 40%));
    }

    &.secondary {
      @include setColor(var(--secondary), color.adjust(#35495e, $lightness: 45%));
    }

    &.success {
      @include setColor(var(--success), color.adjust(#37c991, $lightness: 40%));
    }

    &.warning {
      @include setColor(var(--warning), color.adjust(#ffb23e, $lightness: 30%));
    }

    &.error {
      @include setColor(var(--danger), color.adjust(#fd6e64, $lightness: 25%));
    }
  }

  // SIZE
  &.small {
    @include setSize(12px, 20px, 10px);
    @include setIconSize(10px, 5px);
    @include setCounterSize(0 5px);
    @include setButtonSize(7px);
  }

  &.medium {
    @include setSize(14px, 30px, 14px);
    @include setIconSize(15px, 5px);
    @include setCounterSize(2px 6px);
    @include setButtonSize(10px);
  }

  &.large {
    @include setSize(16px, 40px, 18px, 36px);
    @include setIconSize(18px, 7px);
    @include setCounterSize(2px 6px);
    @include setButtonSize(10px);
  }
}
</style>
