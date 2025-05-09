<template>
  <section ref="element" data-component="Tooltip">
    <div :popovertarget="id" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="click">
      <slot></slot>
    </div>

    <div
      ref="tooltip"
      data-subcomponent="TooltipContent"
      :popover="popoverAttr"
      :data-open="isOpen"
      :id="id"
      :class="`${trigger} ${animation} ${color} ${position}`"
    >
      <slot name="tooltip"></slot>

      <Button
        v-if="showClose"
        mode="blank"
        variant="danger"
        :icon="{ name: 'Close' }"
        @click="close"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, useTemplateRef } from 'vue';

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
  animation?: 'fade' | 'scale';
  color?: 'base' | 'primary' | 'secondary';
  position?: Position;
  spacing?: string;
  trigger?: 'hover' | 'click';
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
  animation = 'scale',
  color = 'base',
  position = 'top',
  spacing = '10px',
  trigger = 'hover',
  showClose: showCloseProp = true,
} = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const tooltip = useTemplateRef<HTMLDivElement>('tooltip');

const isOpen = ref(false);

const id = `tooltip-${uuid().split('-')[0]}`;

const anchorName = `--${id}`;

const popoverAttr = computed(() => (trigger === 'hover' ? 'hint' : 'manual'));

const showClose = computed(() => trigger === 'click' && showCloseProp);

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

    > [data-component='Button']:has([data-component='Icon'][data-name='Close']) {
      @include position(absolute, 8px, 10px);
    }

    // Trigger
    &.click {
      width: 100%;
    }

    // Animation
    &.fade {
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
    }

    &.scale {
      opacity: 0;
      scale: 0.8;
      transition: opacity 0.3s, scale 0.3s, overlay 0.3s allow-discrete, display 0.3s allow-discrete;

      &:popover-open {
        opacity: 1;
        scale: none;
      }

      @starting-style {
        &:popover-open {
          opacity: 0;
          scale: 0.8;
        }
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
