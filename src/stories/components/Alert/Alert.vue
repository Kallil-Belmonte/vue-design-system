<template>
  <div ref="element" data-component="Alert" role="alert" :class="status">
    <header>
      <Icon :name="icon" size="25px" />
      <h3 class="title">{{ title }}</h3>
      <Button
        v-if="close"
        aria-label="Close"
        mode="blank"
        :icon="{ name: 'Close', size: '18px' }"
        @click="close"
      />
    </header>

    <section class="description">
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue';

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

const { status = 'info', close } = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

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
@use '@/assets/scss/helpers' as *;

[data-component='Alert'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  padding: 12px;
  border-radius: 15px;
  border-width: 2px;
  border-style: solid;

  > header {
    @extend %flex-vertical-center;
    gap: 10px;

    > .title {
      font-size: var(--font-size);
      margin: 0;
    }

    > [data-component='Button'] {
      margin-left: auto;

      @include active-style {
        [data-component='Icon'] {
          color: var(--danger);
        }
      }
    }
  }

  > .description {
    margin-left: 35px;
  }

  // Color
  &.info {
    border-color: var(--info);

    > header {
      > [data-component='Icon'] {
        color: var(--info);
      }
    }
  }

  &.success {
    border-color: var(--success);

    > header {
      > [data-component='Icon'] {
        color: var(--success);
      }
    }
  }

  &.warning {
    border-color: var(--warning);

    > header {
      > [data-component='Icon'] {
        color: var(--warning);
      }
    }
  }

  &.danger {
    border-color: var(--danger);

    > header {
      > [data-component='Icon'] {
        color: var(--danger);
      }
    }
  }
}
</style>
