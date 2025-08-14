<template>
  <section ref="element" data-component="Toasts" popover="manual">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`toast ${toast.status}`"
      role="alert"
      aria-live="assertive"
      @animationend="close(toast)"
    >
      <header>
        <Icon :name="getIcon(toast.status)" size="20px" />
        <h2 class="title">{{ toast.title }}</h2>
        <Button mode="blank" variant="base" :icon="{ name: 'Close' }" @click="close(toast)" />
      </header>
      <article v-if="toast.description">
        <p>{{ toast.description }}</p>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useTemplateRef, watch } from 'vue';

import Button from '@/stories/components/Button/Button.vue';
import Icon from '@/stories/components/Icon/Icon.vue';

type Status = 'info' | 'success' | 'warning' | 'danger';

type Toast = {
  id: string;
  status: Status;
  title: string;
  description?: string;
};

type Props = {
  toasts: Toast[];
  duration?: string;
  close: (toast: Toast) => void;
};

const { toasts, duration = '5s' } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const getIcon = (status: Status) => {
  if (status === 'success') return 'CheckCircle';
  if (status === 'warning' || status === 'danger') return 'Warning';
  return 'Info';
};

// LIFECYCLE HOOKS
watch(
  () => toasts,
  (newToasts, oldToasts = []) => {
    if (!oldToasts?.length && !!newToasts.length) {
      element.value?.showPopover();
    } else if (!!oldToasts.length && !newToasts.length) {
      element.value?.hidePopover();
    }
  },
  { immediate: true },
);

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

  &::after {
    background-color: $color;
  }

  > header {
    > [data-component='Icon'] {
      color: $color;
    }
  }
}

[data-component='Toasts'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  max-width: 400px;
  width: 100%;
  padding: 0;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  @include position(fixed, 15px, 15px);

  .toast {
    padding: 8px 15px;
    border-radius: 10px;
    box-sizing: border-box;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &::after {
      content: '';
      height: 4px;
      border-radius: 10px 10px 0 0;
      @include position(absolute, 0, 1px, auto, 1px);
      animation-name: grow;
      animation-duration: v-bind(duration);

      @keyframes grow {
        0% {
          width: 0%;
        }
        100% {
          width: 99%;
        }
      }
    }

    &:hover::after {
      animation-play-state: paused;
    }

    > header {
      @extend %flex-vertical-center;

      > [data-component='Icon'],
      > [data-component='Button'] {
        align-self: start;
        flex-shrink: 0;
      }

      > [data-component='Icon'] {
        margin-right: 5px;
      }

      > .title {
        font-family: var(--font-secondary);
        font-size: var(--font-size);
        font-weight: 700;
        margin: 0 5px 0 0;
      }

      > [data-component='Button'] {
        margin-left: auto;
      }
    }

    > article {
      margin-top: 3px;

      p {
        margin: 0;
      }
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
}
</style>
