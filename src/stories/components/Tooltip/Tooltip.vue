<template>
  <div
    ref="element"
    data-component="Tooltip"
    :popovertarget="id"
    @click="click"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <slot></slot>

    <section
      ref="tooltip"
      data-subcomponent="TooltipContent"
      popover
      data-open="false"
      :id="id"
      :class="`${animation} ${color} ${position}`"
    >
      <slot name="tooltip"></slot>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

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
  animation?: 'fade' | 'scale';
  color?: 'base' | 'primary' | 'secondary';
  position?: Position;
  spacing?: string;
  trigger?: 'hover' | 'click';
  closeOnTooltipClick?: boolean;
  click?: (event: MouseEvent) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
};

const {
  maxWidth = '300px',
  animation = 'scale',
  color = 'base',
  position = 'top',
  spacing = '10px',
  trigger = 'hover',
  closeOnTooltipClick = false,
  click: clickProp,
  mouseenter: mouseenterProp,
  mouseleave: mouseleaveProp,
} = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const tooltip = useTemplateRef<HTMLElement>('tooltip');

const id = `tooltip-${uuid().split('-')[0]}`;

const anchorName = `--${id}`;

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

[data-component='Tooltip'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  position: relative;
  anchor-name: v-bind(anchorName);

  [data-subcomponent='TooltipContent'] {
    width: max-content;
    max-width: v-bind(maxWidth);
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    margin: 0;
    position-anchor: v-bind(anchorName);

    // Animation
    &.fade {
      transition: opacity 300ms ease;

      &:popover-open {
        @starting-style {
          opacity: 0;
        }
      }

      &[data-open='false'] {
        opacity: 0;
      }
    }

    &.scale {
      transition: opacity 300ms ease, scale 300ms ease;

      &:popover-open {
        @starting-style {
          opacity: 0;
          scale: 0.8;
        }
      }

      &[data-open='false'] {
        opacity: 0;
        scale: 0.8;
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
      top: calc(anchor(top) - v-bind(spacing));
      left: anchor(left);
      translate: 0% -100%;
    }

    &.top {
      top: calc(anchor(top) - v-bind(spacing));
      left: anchor(center);
      translate: -50% -100%;
    }

    &.top-end {
      top: calc(anchor(top) - v-bind(spacing));
      left: anchor(right);
      translate: -100% -100%;
    }

    &.right-start {
      top: anchor(top);
      left: calc(anchor(right) + 10px);
    }

    &.right {
      top: anchor(center);
      left: calc(anchor(right) + 10px);
      translate: 0% -50%;
    }

    &.right-end {
      top: anchor(bottom);
      left: calc(anchor(right) + 10px);
      translate: 0% -100%;
    }

    &.bottom-start {
      top: calc(anchor(bottom) + v-bind(spacing));
      left: anchor(left);
    }

    &.bottom {
      top: calc(anchor(bottom) + v-bind(spacing));
      left: anchor(center);
      translate: -50% 0%;
    }

    &.bottom-end {
      top: calc(anchor(bottom) + v-bind(spacing));
      left: anchor(right);
      translate: -100% -0%;
    }

    &.left-start {
      top: anchor(top);
      left: calc(anchor(left) - 10px);
      translate: -100% 0%;
    }

    &.left {
      top: anchor(center);
      left: calc(anchor(left) - 10px);
      translate: -100% -50%;
    }

    &.left-end {
      top: anchor(bottom);
      left: calc(anchor(left) - 10px);
      translate: -100% -100%;
    }
  }
}
</style>
