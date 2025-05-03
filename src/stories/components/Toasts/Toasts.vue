<template>
  <section ref="element" data-component="Toasts">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`toast ${toast.status}`"
      role="alert"
      aria-live="assertive"
      @animationend="close(toast)"
    >
      <Icon :name="getIcon(toast.status)" size="25px" />
      <div class="content">
        {{ toast.description }}
      </div>
      <button type="button" aria-label="Close" @click="close(toast)">
        <Icon name="Close" size="15px" />
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

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
  hideDuration: number;
  close: (toast: Toast) => void;
};

const { toasts, hideDuration = 2000 } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const getIcon = (status: Status) => {
  if (status === 'success') return 'CheckCircle';
  if (status === 'warning' || status === 'danger') return 'Warning';
  return 'Info';
};

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Toasts'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  @include position(fixed, 15px, 0, auto, 0, 1000);

  .toast {
    display: flex;
    color: #fff;
    font-weight: 700;
    min-height: 30px;
    padding: 8px 15px;
    border-radius: 15px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &::after {
      content: '';
      width: 100%;
      height: 4px;
      border-radius: 4px 4px 0 0;
      @include position(absolute, 0, auto, auto, 0);
      animation-name: grow;
      animation-duration: v-bind(hideDuration);
      animation-timing-function: ease-in-out;

      @keyframes grow {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
    }

    &:hover::after {
      animation-play-state: paused;
    }

    > [data-component='Icon'] {
      margin: 3px 10px 0 0;
    }

    > .content {
      width: 100%;
      margin-top: 5px;
    }

    > button {
      color: #fff;
      align-self: start;
      height: auto;
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
      margin: 7px 0 0 10px;

      svg {
        opacity: 0.5;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }

    // Color
    &.info {
      &,
      &::after {
        background-color: var(--info);
      }
    }

    &.success {
      &,
      &::after {
        background-color: var(--success);
      }
    }

    &.warning {
      &,
      &::after {
        background-color: var(--warning);
      }
    }

    &.danger {
      &,
      &::after {
        background-color: var(--danger);
      }
    }
  }
}
</style>
