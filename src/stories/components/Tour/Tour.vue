<template>
  <section ref="element" data-component="Tour">
    <div
      v-for="(
        {
          slot,
          style = {},
          class: classProp = '',
          position = 'top',
          spacing = '10px',
          previousText = '← Previous',
          nextText = 'Next →',
        },
        index
      ) in items"
      :key="index"
      :id="ids[index]"
      popover="manual"
      :style="{
        'position-anchor': `--${ids[index]}`,
        '--spacing': spacing,
        ...style,
      }"
      :class="`item ${position} ${classProp}`.trim()"
    >
      <header>
        <Button
          aria-label="Close"
          mode="blank"
          variant="base"
          :icon="{ name: 'Close' }"
          @click="close"
        />
      </header>

      <section>
        <slot :name="slot"></slot>
      </section>

      <footer>
        <button v-if="activeIndex" type="button" @click="previous">
          {{ previousText }}
        </button>
        <button v-if="activeIndex !== items.length - 1" type="button" @click="next">
          {{ nextText }}
        </button>

        <b class="counter">{{ index + 1 }}/{{ items.length }}</b>
      </footer>
    </div>
  </section>

  <Teleport to="body">
    <div v-if="active" ref="overlay" :style="styles"></div>
  </Teleport>
</template>

<script lang="ts" setup>
import { type CSSProperties, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue';

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

type Highlight = {
  selector: string;
  expansion?: number;
};

type Item = {
  slot: string;
  style?: CSSProperties;
  class?: string;
  target: string;
  position?: Position;
  spacing?: string;
  previousText?: string;
  nextText?: string;
  highlights: Highlight[];
  onPrevious?: () => Promise<void>;
  onNext?: () => Promise<void>;
};

type Props = {
  active: boolean;
  items: Item[];
  overlayStyle?: CSSProperties;
  close: () => void;
};

type Slots = {
  /** Default slot */
  default(): any;
};

const { active, items, overlayStyle, close } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');
const overlay = useTemplateRef<HTMLDivElement>('overlay');

const activeIndex = ref(0);

const styles: CSSProperties = {
  position: 'fixed',
  inset: 0,
  'background-color': 'rgba(0, 0, 0, 0.6)',
  ...overlayStyle,
};

const ids = items.map(() => `tour-${crypto.randomUUID().split('-')[0]}`);

const select = (selector: string) => document.querySelector<HTMLElement>(selector);

const getTarget = () => select(items[activeIndex.value].target);

const show = () => {
  getTarget()?.style.setProperty('anchor-name', `--${ids[activeIndex.value]}`);
  document.getElementById(ids[activeIndex.value])?.showPopover();
};

const hide = () => {
  document.getElementById(ids[activeIndex.value])?.hidePopover();
  getTarget()?.style.removeProperty('anchor-name');
};

const setMask = () => {
  if (!overlay.value) return;

  const holes = items[activeIndex.value].highlights.map(({ selector, expansion = 0 }) => {
    const {
      top = 0,
      right = 0,
      bottom = 0,
      left = 0,
    } = select(selector)?.getBoundingClientRect() || {};

    return `
      linear-gradient(#000 0 0)
        ${left - expansion}px ${top - expansion}px /
        ${right - left + expansion * 2}px
        ${bottom - top + expansion * 2}px
        no-repeat
    `;
  });

  overlay.value.style.mask = `linear-gradient(#000 0 0), ${holes.join(',')}`;
  overlay.value.style.maskComposite = 'exclude';
};

const highlight = async () => {
  await nextTick();
  if (!overlay.value) return;

  setMask();
  show();
};

const previous = async () => {
  hide();
  await items[activeIndex.value].onPrevious?.();
  activeIndex.value--;
  highlight();
};

const next = async () => {
  hide();
  await items[activeIndex.value].onNext?.();
  activeIndex.value++;
  highlight();
};

const activate = () => {
  select('body')?.style.setProperty('overflow', 'hidden');
  highlight();
  window.addEventListener('resize', setMask);
};

const deactivate = () => {
  select('body')?.style.removeProperty('overflow');
  hide();
  activeIndex.value = 0;
  window.removeEventListener('resize', setMask);
};

// LIFECYCLE HOOKS
watch(
  () => active,
  newActive => {
    if (newActive) activate();
    else deactivate();
  },
);

onUnmounted(() => {
  deactivate();
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

[data-component='Tour'] {
  $vertical-padding: 8px;
  $horizontal-padding: 10px;

  font-family: var(--font-primary);
  font-size: var(--font-size);

  .item {
    width: 300px;
    padding: 0;
    border-radius: 8px;
    border: none;
    margin: 0;
    position-try: flip-block, flip-inline;

    > header {
      display: flex;
      padding: $vertical-padding $horizontal-padding;

      [data-component='Button'] {
        flex-shrink: 0;
        margin-left: auto;
      }
    }

    > section {
      padding: 0 $horizontal-padding;
    }

    > footer {
      @extend %flex-vertical-center;
      gap: 10px;
      padding: $vertical-padding $horizontal-padding;

      button {
        font: inherit;
        font-weight: 700;
        color: #fff;
        border: none;
        border-radius: 8px;
        background-color: var(--primary);
        box-shadow: none;
        cursor: pointer;
        padding: 5px 10px;
      }

      .counter {
        margin: 0 0 0 auto;
      }
    }

    // Position
    &.top-start {
      top: calc(anchor(top) - var(--spacing));
      left: anchor(left);
      translate: 0% -100%;
    }

    &.top {
      top: calc(anchor(top) - var(--spacing));
      left: anchor(center);
      translate: -50% -100%;
    }

    &.top-end {
      top: calc(anchor(top) - var(--spacing));
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
      top: calc(anchor(bottom) + var(--spacing));
      left: anchor(left);
    }

    &.bottom {
      top: calc(anchor(bottom) + var(--spacing));
      left: anchor(center);
      translate: -50% 0%;
    }

    &.bottom-end {
      top: calc(anchor(bottom) + var(--spacing));
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
