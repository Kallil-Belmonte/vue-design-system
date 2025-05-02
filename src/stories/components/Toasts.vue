<template>
  <div ref="element" data-component="Toasts">
    <div class="container">
      <div
        v-for="toast in toasts"
        :key="toast.message"
        :class="`toast ${toast.status}`"
        role="alert"
        aria-live="assertive"
      >
        <Icon :name="getIcon(toast.status)" size="25px" />
        <div class="content">
          {{ toast.message }}
        </div>
        <button type="button" aria-label="Close" @click="removeToast(toast.id)">
          <Icon name="Close" size="15px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';

type Status = 'info' | 'success' | 'warning' | 'danger';

const element = useTemplateRef<HTMLDivElement>('element');

const getIcon = (status: Status) => {
  if (status === 'success') return 'CheckCircle';
  if (status === 'warning' || status === 'danger') return 'Warning';
  return 'Info';
};

// EXPOSE
defineExpose({ element });
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

    &.info {
      background-color: var(--info);
    }

    &.success {
      background-color: var(--success);
    }

    &.warning {
      background-color: var(--warning);
    }

    &.danger {
      background-color: var(--danger);
    }

    > [data-component='Icon'] {
      margin: 3px 10px 0 0;
    }

    .content {
      width: 100%;
      margin-top: 5px;
    }

    button {
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
  }
}
</style>
