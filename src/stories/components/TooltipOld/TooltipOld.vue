<template>
  <section ref="element" data-component="TooltipOld">
    <div :popovertarget="id" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="click">
      <slot></slot>
    </div>

    <div
      ref="tooltip"
      data-subcomponent="TooltipOldContent"
      :popover="popoverAttr"
      :data-open="isOpen"
      :id="id"
      :class="`${trigger} ${color} ${position}`"
    >
      <slot name="tooltip"></slot>

      <Button v-if="showClose" mode="blank" :icon="{ name: 'Close' }" @click="close" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, useTemplateRef } from 'vue';

import { useElementPosition } from '@/shared/composables';
import { uuid } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';

type Position =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

type Props = {
  maxWidth?: string;
  color?: 'base' | 'primary' | 'secondary';
  position?: Position;
  spacing?: number;
  trigger?: 'hover' | 'click';
};

type Slots = {
  /** Default slot */
  default(): any;
  /** Tooltip slot */
  tooltip(): any;
};

const {
  maxWidth = '300px',
  color = 'base',
  position = 'top',
  spacing = 10,
  trigger = 'hover',
} = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const tooltip = useTemplateRef<HTMLElement>('tooltip');

const {
  top,
  right,
  bottom,
  left,
  horizontalLeft,
  horizontalCenter,
  horizontalRight,
  verticalTop,
  verticalCenter,
  verticalBottom,
} = useElementPosition(element, tooltip, spacing);

const isOpen = ref(false);

const id = `tooltip-${uuid().split('-')[0]}`;

const popoverAttr = computed(() => (trigger === 'hover' ? 'hint' : 'manual'));

const showClose = computed(() => trigger === 'click');

const open = () => {
  isOpen.value = true;
  tooltip.value?.showPopover();
  if (trigger === 'click') document.addEventListener('click', clickListener);
};

const close = () => {
  isOpen.value = false;
  tooltip.value?.hidePopover();
  if (trigger === 'click') document.removeEventListener('click', clickListener);
};

const mouseenter = () => {
  if (trigger === 'hover') open();
};

const mouseleave = () => {
  if (trigger === 'hover') close();
};

const clickListener = (event: MouseEvent) => {
  const clickedOutside = !element.value?.contains(event.target as HTMLElement);
  if (clickedOutside) close();
};

const click = () => {
  if (trigger === 'click') isOpen.value ? close() : open();
};

// LIFECYCLE HOOKS
onUnmounted(() => {
  if (trigger === 'click') document.removeEventListener('click', clickListener);
});

// SLOTS
defineSlots<Slots>();

// EXPOSE
defineExpose({
  /** Element ref */
  element,
  /** Tooltip ref */
  tooltip,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='TooltipOld'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  position: relative;

  [data-subcomponent='TooltipOldContent'] {
    width: max-content;
    max-width: v-bind(maxWidth);
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    border: none;
    margin: 0;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s, overlay 0.3s allow-discrete, display 0.3s allow-discrete;

    &:popover-open {
      opacity: 1;
    }

    @starting-style {
      &:popover-open {
        opacity: 0;
      }
    }

    > [data-component='Button']:has([data-component='Icon'][data-name='Close']) {
      @include position(absolute, 8px, 10px);

      [data-component='Icon'][data-name='Close'] {
        @include active-style {
          color: var(--danger);
        }
      }
    }

    // Trigger
    &.click {
      width: 100%;
    }

    // Color
    &.base {
      color: var(--text-color);
      background-color: #fff;
      box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
    }

    &.primary {
      color: #fff;
      background-color: var(--primary);
    }

    &.secondary {
      color: #fff;
      background-color: var(--secondary);
    }

    // Position
    &.top-start {
      top: v-bind(top);
      left: v-bind(horizontalLeft);
    }

    &.top {
      top: v-bind(top);
      left: v-bind(horizontalCenter);
    }

    &.top-end {
      top: v-bind(top);
      left: v-bind(horizontalRight);
    }

    &.right-start {
      top: v-bind(verticalTop);
      left: v-bind(right);
    }

    &.right {
      top: v-bind(verticalCenter);
      left: v-bind(right);
    }

    &.right-end {
      top: v-bind(verticalBottom);
      left: v-bind(right);
    }

    &.bottom-start {
      top: v-bind(bottom);
      left: v-bind(horizontalLeft);
    }

    &.bottom {
      top: v-bind(bottom);
      left: v-bind(horizontalCenter);
    }

    &.bottom-end {
      top: v-bind(bottom);
      left: v-bind(horizontalRight);
    }

    &.left-start {
      top: v-bind(verticalTop);
      left: v-bind(left);
    }

    &.left {
      top: v-bind(verticalCenter);
      left: v-bind(left);
    }

    &.left-end {
      top: v-bind(verticalBottom);
      left: v-bind(left);
    }
  }
}
</style>
