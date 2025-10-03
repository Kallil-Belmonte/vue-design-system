<template>
  <section ref="element" data-component="TooltipOld">
    <div :popovertarget="id" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="click">
      <slot></slot>
    </div>

    <div
      ref="tooltip"
      data-subcomponent="TooltipOldContent"
      :popover="popoverAttr"
      :data-open="open"
      :id="id"
      :class="`${trigger} ${color} ${position}`"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <slot name="tooltip"></slot>

      <Button
        v-if="showClose"
        mode="blank"
        variant="base"
        :icon="{ name: 'Close' }"
        @click="closeTooltip"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, useTemplateRef, watchEffect } from 'vue';

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
  open?: boolean;
  trigger?: 'hover' | 'click';
  closeDelay?: number;
  closeOnTooltipClick?: boolean;
  color?: 'base' | 'primary' | 'secondary';
  position?: Position;
  spacing?: number;
  showClose?: boolean;
};

type Slots = {
  /** Default slot */
  default(): any;
  /** Tooltip slot */
  tooltip(): any;
};

const {
  maxWidth = '300px',
  open: openProp = undefined,
  trigger = 'hover',
  closeDelay = 0,
  closeOnTooltipClick = false,
  color = 'base',
  position = 'top',
  spacing = 10,
  showClose: showCloseProp = true,
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

const open = ref(false);
const closeTimeout = ref();

const id = `tooltip-${uuid().split('-')[0]}`;

const popoverAttr = computed(() =>
  typeof openProp === 'boolean' || trigger === 'click' ? 'manual' : 'hint',
);

const showClose = computed(
  () => typeof openProp !== 'boolean' && trigger === 'click' && showCloseProp,
);

const openTooltip = () => {
  open.value = true;
  tooltip.value?.showPopover();

  if (typeof openProp !== 'boolean' && trigger === 'click') {
    document.addEventListener('click', clickListener);
  }
};

const closeTooltip = () => {
  open.value = false;
  tooltip.value?.hidePopover();

  if (typeof openProp !== 'boolean' && trigger === 'click') {
    document.removeEventListener('click', clickListener);
  }
};

const toggleTooltip = () => {
  if (typeof openProp !== 'boolean') return;

  if (openProp) openTooltip();
  else closeTooltip();
};

const mouseenter = () => {
  if (typeof openProp === 'boolean' || trigger === 'click') return;

  clearTimeout(closeTimeout.value);
  openTooltip();
};

const mouseleave = () => {
  if (typeof openProp === 'boolean' || trigger === 'click') return;

  closeTimeout.value = setTimeout(() => closeTooltip(), closeDelay);
};

const click = () => {
  if (typeof openProp === 'boolean' || trigger === 'hover') return;

  if (open.value) closeTooltip();
  else openTooltip();
};

const clickListener = (event: MouseEvent) => {
  const clickedInTooltip =
    closeOnTooltipClick && tooltip.value?.contains(event.target as HTMLElement);
  const clickedOutside = !element.value?.contains(event.target as HTMLElement);

  if (clickedInTooltip || clickedOutside) closeTooltip();
};

// LIFECYCLE HOOKS
watchEffect(() => {
  toggleTooltip();
});

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
