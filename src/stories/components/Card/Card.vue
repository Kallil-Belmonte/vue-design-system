<template>
  <section ref="element" data-component="Card">
    <header>
      <Icon v-if="icon" :name="icon" size="30px" />

      <div class="heading">
        <h2 class="title">{{ title }}</h2>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>

      <TooltipOld v-if="actions" trigger="click" position="bottom-end">
        <template #default>
          <Button v-if="actions" mode="blank" variant="base" :icon="{ name: 'Actions' }" />
        </template>
        <template #tooltip>
          <ul>
            <li v-for="action in actions" :key="action.text">
              {{ action.text }}
            </li>
          </ul>
        </template>
      </TooltipOld>
    </header>
    <section class="content">
      <slot></slot>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import Button from '@/stories/components/Button/Button.vue';
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';
import TooltipOld from '@/stories/components/TooltipOld/TooltipOld.vue';

type Action = {
  text: string;
  click: (event: MouseEvent) => void;
};

type Props = {
  icon?: Icons;
  title: string;
  subtitle?: string;
  actions?: Action[];
};

type Slots = {
  /** Default slot */
  default(): any;
  /** Footer slot */
  footer(): any;
};

const { icon, title, subtitle, actions } = defineProps<Props>();

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
@use '@/assets/scss/helpers' as *;

[data-component='Card'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  border-radius: 8px;
  border: 1px solid var(--grey-3);

  > header,
  > .content,
  > footer {
    padding: 10px;
  }

  > header {
    @extend %flex-vertical-center;
    border-bottom: 1px solid var(--grey-3);

    [data-component='Icon'] {
      margin-right: 10px;
    }

    .heading {
      .title,
      .subtitle {
        margin: 0;
      }

      .title {
        font-size: 18px;
      }

      .subtitle {
        font-size: 14px;
      }
    }

    [data-component='TooltipOld'] {
      margin-left: auto;
    }
  }

  > footer {
    @extend %flex-vertical-center;
    gap: 10px;
    border-top: 1px solid var(--grey-3);
  }
}
</style>
