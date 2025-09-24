<template>
  <details ref="element" data-component="Accordion">
    <summary>
      <header>
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </header>
      <Icon name="ArrowDown" size="20px" />
    </summary>
    <section class="content">
      <slot></slot>
    </section>
  </details>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';

type Props = {
  title: string;
  description?: string;
};

type Slots = {
  /** Default slot */
  default(): any;
};

const { title, description } = defineProps<Props>();

const element = useTemplateRef<HTMLDetailsElement>('element');

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

[data-component='Accordion'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border-radius: 15px;
  border: 1px solid var(--grey-3);
  background-color: #fff;
  overflow: hidden;
  interpolate-size: allow-keywords;

  &::details-content {
    block-size: 0;
    transition: block-size 0.4s, content-visibility 0.4s;
    transition-behavior: allow-discrete;
  }

  [data-component='Icon'] {
    transition: rotate 0.4s ease;
  }

  > summary,
  > .content {
    padding: 12px;
  }

  > summary {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &::marker {
      content: '';
    }

    > header {
      > .title,
      > .description {
        margin: 0;
      }

      > .title {
        font-family: var(--font-secondary);
        font-size: 18px;
        font-weight: 700;
        margin: 0;
      }
    }
  }

  > .content {
    border-top: 1px solid var(--grey-3);
  }

  &:open {
    [data-component='Icon'] {
      rotate: 180deg;
    }

    &::details-content {
      block-size: auto;
    }
  }
}
</style>
