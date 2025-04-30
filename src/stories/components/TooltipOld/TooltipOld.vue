<template>
  <div
    ref="element"
    data-component="TooltipOld"
    :popovertarget="id"
    @click="click"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <slot></slot>

    <section
      ref="tooltip"
      data-subcomponent="TooltipOldContent"
      popover
      data-open="false"
      :id="id"
      :class="`${color} ${position}`"
    >
      <slot name="tooltip"></slot>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

import { useElementPosition } from '@/shared/composables';
import { uuid } from '@/shared/helpers';

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
  closeOnTooltipClick?: boolean;
  click?: (event: MouseEvent) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
};

const {
  maxWidth = '300px',
  color = 'base',
  position = 'top',
  spacing = 10,
  trigger = 'hover',
  closeOnTooltipClick = false,
  click: clickProp,
  mouseenter: mouseenterProp,
  mouseleave: mouseleaveProp,
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

const id = `tooltip-${uuid().split('-')[0]}`;

const open = () => {
  tooltip.value?.setAttribute('data-open', 'true');
  tooltip.value?.showPopover();
};

const close = () => {
  tooltip.value?.setAttribute('data-open', 'false');
  tooltip.value?.hidePopover();
};

const mouseenter = (event: MouseEvent) => {
  if (trigger === 'hover') open();
  mouseenterProp?.(event);
};

const mouseleave = (event: MouseEvent) => {
  if (trigger === 'hover') close();
  mouseleaveProp?.(event);
};

const click = (event: MouseEvent) => {
  if (trigger === 'click') {
    const isOpen = tooltip.value?.getAttribute('data-open') === 'true';
    const clickedOutsidePopover = !tooltip.value?.contains(event.target as HTMLElement);

    if (clickedOutsidePopover || closeOnTooltipClick) {
      isOpen ? close() : open();
    }
  }

  clickProp?.(event);
};

const clickListener = (event: MouseEvent) => {
  if (element.value?.contains(event.target as HTMLElement)) return;

  const { display } = window.getComputedStyle(tooltip.value as HTMLElement);

  if (display === 'none') close();
  else open();
};

// LIFECYCLE HOOKS
onMounted(() => {
  if (trigger === 'click') document.addEventListener('click', clickListener);
});

onUnmounted(() => {
  if (trigger === 'click') document.removeEventListener('click', clickListener);
});

// SLOTS
defineSlots<{
  /** Default slot */
  default(): any;
  /** Tooltip slot */
  tooltip(): any;
}>();

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
    transition: opacity 300ms ease;

    &:popover-open {
      @starting-style {
        opacity: 0;
      }
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
