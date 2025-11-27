<template>
  <dialog
    ref="element"
    data-component="Modal"
    :class="`${variant}`"
    aria-modal="true"
    @click="click"
  >
    <header>
      <Icon v-if="name" :category="category" :name="name" size="30px" />
      <h3 class="title">{{ title }}</h3>
      <Button
        aria-label="Close"
        mode="blank"
        variant="base"
        :icon="{ name: 'Close' }"
        @click="close"
      />
    </header>
    <section class="body">
      <slot></slot>
    </section>
    <footer v-if="slots.footer">
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>

<script lang="ts" setup>
import { useSlots, useTemplateRef, watchEffect } from 'vue';

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

const slots = useSlots();

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

$modal-height: 500px;
$header-height: 50px;
$footer-height: 80px;

[data-component='Modal'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  padding: 0;
  border: none;
  margin: auto;
  transition: opacity 0.3s, scale 0.3s, overlay 0.3s allow-discrete, display 0.3s allow-discrete;

  @starting-style {
    opacity: 0;
    scale: 0.8;

    &::backdrop {
      background-color: transparent;
    }
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 300ms ease;
  }

  &:not(:open) {
    display: none;
    opacity: 0;
    scale: 0.8;

    &::backdrop {
      background-color: transparent;
    }
  }

  > header {
    @extend %flex-vertical-center;
    height: $header-height;
    padding: 0 20px;
    border-bottom: 1px solid var(--grey-1);
    box-sizing: border-box;

    > [data-component='Icon'] {
      color: var(--primary);
      margin-right: 10px;
    }

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

  > .body {
    padding: 15px;
    box-sizing: border-box;
    overflow-y: auto;

    p {
      margin: 0 0 5px;

      &:last-child {
        margin: 0;
      }
    }
  }

  > footer {
    @extend %flex-vertical-center;
    column-gap: 20px;
    height: $footer-height;
    padding: 0 15px;
    border-top: 1px solid var(--grey-1);
    box-sizing: border-box;
  }

  // Variant
  &.default {
    max-width: 600px;
    max-height: $modal-height;
    @include size(calc(100% - 40px), max-content, 20px);

    > .body {
      max-height: calc($modal-height - $header-height - $footer-height);
    }
  }

  &.full {
    max-width: none;
    max-height: none;
    @include size(100vw, 100svh);
    margin-top: 0;
    margin-bottom: 0;

    > .body {
      height: calc(100% - $header-height - $footer-height);
    }
  }
}
</style>
