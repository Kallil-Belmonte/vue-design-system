<template>
  <dialog ref="element" data-component="Modal" :class="variant" aria-modal="true" @click="click">
    <header>
      <div class="title">
        <Icon v-if="name" :category="category" :name="name" size="30px" />
        <h3>{{ title }}</h3>
      </div>
      <Button aria-label="Close" mode="blank" :icon="{ name: 'Close' }" @click="close" />
    </header>
    <section class="body">
      <slot></slot>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>

<script lang="ts" setup>
import { useTemplateRef, watchEffect } from 'vue';

import Button from '@/stories/components/Button/Button.vue';
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Category, Icons } from '@/stories/components/Icon/types';

type Props = {
  open: boolean;
  variant?: 'default' | 'full';
  icon?: { category?: Category; name: Icons };
  title: string;
  close: (event: MouseEvent) => void;
};

type Slots = {
  /** Default slot */
  default(): any;
  /** Footer slot */
  footer(): any;
};

const { variant = 'default', open, icon, title, close } = defineProps<Props>();
const { category, name } = icon || {};

const element = useTemplateRef<HTMLDialogElement>('element');

const click = (event: MouseEvent) => {
  if (event.target === element.value) close(event);
};

const toggleModal = () => {
  if (open) element.value?.showModal();
  else element.value?.close();
};

// LIFECYCLE HOOKS
watchEffect(() => {
  toggleModal();
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

[data-component='Modal'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  padding: 0;
  border: none;
  transition: opacity 300ms ease, scale 300ms ease;

  &[open] {
    display: grid;
    grid-template-rows: 60px 1fr 80px;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 300ms ease;
  }

  @starting-style {
    opacity: 0;
    scale: 0.8;

    &::backdrop {
      background-color: transparent;
    }
  }

  header {
    @extend %flex-vertical-center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid var(--grey-1);

    .title {
      @extend %flex-vertical-center;
      color: var(--text-color);

      [data-component='Icon'] {
        color: var(--primary);
        margin-right: 10px;
      }

      h3 {
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        margin: 0;
      }
    }

    > [data-component='Button'] {
      opacity: 0.6;
      transition: opacity 0.4s ease;

      @include active-style {
        opacity: 1;
      }
    }
  }

  .body {
    padding: 15px;
    overflow-y: auto;

    p {
      margin: 0 0 5px;

      &:last-child {
        margin: 0;
      }
    }
  }

  footer {
    @extend %flex-vertical-center;
    column-gap: 20px;
    padding: 0 15px;
    border-top: 1px solid var(--grey-1);
  }

  // Variant
  &.default {
    max-width: 600px;
    max-height: 500px;
    @include size(calc(100% - 40px), max-content, 20px);
  }

  &.full {
    max-width: none;
    max-height: none;
    @include size(100vw, 100svh);
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
