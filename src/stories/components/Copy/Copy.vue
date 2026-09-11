<template>
  <section ref="element" data-component="Copy" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <Tooltip :open="open" :color="tooltipColor">
      <template #default>
        <button type="button" :aria-label="copyText" @click="copy">
          <Icon :name="icon" :color="iconColor" />
        </button>
      </template>
      <template #tooltip>{{ text }}</template>
    </Tooltip>
  </section>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';
import Tooltip from '@/stories/components/Tooltip/Tooltip.vue';

type Props = {
  copiedText?: string;
  copyText?: string;
  delay?: number;
  iconColor?: string;
  size?: string;
  textToCopy: string;
  tooltipColor?: 'base' | 'primary' | 'secondary';
};

const {
  copiedText = 'Copied!',
  copyText = 'Copy',
  delay = 3000,
  iconColor,
  size = '25px',
  tooltipColor = 'base',
  textToCopy,
} = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const open = ref(false);
const icon = ref<Icons>('Copy');
const text = ref(copyText);

const mouseEnter = () => {
  open.value = true;
};

const mouseLeave = () => {
  if (text.value === copiedText) return;
  open.value = false;
};

const copy = () => {
  navigator.clipboard?.writeText(textToCopy);
  icon.value = 'Check';
  text.value = copiedText;

  setTimeout(() => {
    open.value = false;
    icon.value = 'Copy';
    text.value = copyText;
  }, delay);
};

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Copy'] {
  @include square(v-bind(size));

  [data-component='Tooltip'] {
    &,
    [popovertarget],
    button {
      @include square(100%);
    }

    button {
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    }
  }
}
</style>
