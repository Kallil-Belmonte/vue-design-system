<template>
  <section ref="element" data-component="Alert" role="alert" :class="`${status}`">
    <header>
      <Icon :name="icon" size="25px" />
      <h3 class="title">{{ title }}</h3>
      <Button
        v-if="close"
        aria-label="Close"
        mode="blank"
        variant="base"
        :icon="{ name: 'Close', size: '18px' }"
        @click="close"
      />
    </header>

    <section v-if="slots.default" class="description">
      <slot></slot>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { computed, useSlots, useTemplateRef } from 'vue';

import Button from '@/stories/components/Button/Button.vue';
import Icon from '@/stories/components/Icon/Icon.vue';

type Status = 'info' | 'success' | 'warning' | 'danger';

type Props = {
  title: string;
  status?: Status;
  close?: (event: MouseEvent) => void;
};

type Slots = {
  /** Default slot */
  default(): any;
};

const { title, status = 'info', close } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const slots = useSlots();

const icon = computed(() => {
  if (status === 'success') return 'CheckCircle';
  if (status === 'warning' || status === 'danger') return 'Warning';
  return 'Info';
});

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

@mixin setColors($color, $bgColor) {
  background-color: $bgColor;

  > header {
    > [data-component='Icon'] {
      color: $color;
    }
  }
}

[data-component='Alert'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  padding: 12px;
  border-radius: 15px;

  > header {
    @extend %flex-vertical-center;
    gap: 5px;

    > .title {
      font-family: var(--font-secondary);
      font-size: 18px;
      font-weight: 700;
      margin: 0;
    }

    > [data-component='Button'] {
      margin-left: auto;
    }
  }

  > .description {
    margin-left: 30px;
  }

  // Color
  &.info {
    @include setColors(var(--info), #{color.adjust(#14d5f3, $lightness: 45%)});
  }

  &.success {
    @include setColors(var(--success), #{color.adjust(#43b883, $lightness: 45%)});
  }

  &.warning {
    @include setColors(var(--warning), #{color.adjust(#ffb23e, $lightness: 35%)});
  }

  &.danger {
    @include setColors(var(--danger), #{color.adjust(#fd6e64, $lightness: 28%)});
  }
}
</style>
