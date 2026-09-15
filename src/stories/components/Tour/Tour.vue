<template>
  <section ref="element" data-component="Tour">
    <div
      v-for="({ position = 'top', spacing = '10px' }, index) in items"
      :key="index"
      :id="ids[index]"
      popover
      :style="{ 'position-anchor': `--${ids[index]}`, '--spacing': spacing }"
      :class="`item ${position}`"
    >
      <button type="button" @click="close">X</button>

      Item {{ index + 1 }}/{{ items.length }}

      <button v-if="activeIndex" type="button" @click="previous">Anterior</button>
      <button v-if="activeIndex !== items.length - 1" type="button" @click="next">Próximo</button>
    </div>
  </section>

  <Teleport to="body">
    <div v-if="open" ref="overlay" :style="styles"></div>
  </Teleport>
</template>

<script lang="ts" setup>
import { type CSSProperties, nextTick, ref, useTemplateRef, watch } from 'vue';

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
  target: string;
  position?: Position;
  spacing?: string;
  highlights: Highlight[];
};

type Props = {
  open: boolean;
  items: Item[];
  close: () => void;
};

const { open, items, close } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');
const overlay = useTemplateRef<HTMLDivElement>('overlay');

const activeIndex = ref(0);

const styles: CSSProperties = {
  position: 'fixed',
  inset: 0,
  'background-color': 'rgba(0, 0, 0, 0.7)',
};

const ids = items.map(() => `tour-${crypto.randomUUID().split('-')[0]}`);

const show = () => document.getElementById(ids[activeIndex.value])?.showPopover();

const hide = () => document.getElementById(ids[activeIndex.value])?.hidePopover();

const updateMask = () => {
  if (!overlay.value) return;

  const holes = items[activeIndex.value].highlights.map(({ selector, expansion = 0 }) => {
    const {
      top = 0,
      right = 0,
      bottom = 0,
      left = 0,
    } = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect() || {};

    return `
      linear-gradient(
        #000 0 0
      ) ${left - expansion}px ${top - expansion}px /
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

  const target = document.querySelector<HTMLElement>(items[activeIndex.value].target);
  if (target) target.style.anchorName = `--${ids[activeIndex.value]}`;

  updateMask();
  show();
};

const previous = () => {
  hide();
  activeIndex.value--;
  highlight();
};

const next = () => {
  hide();
  activeIndex.value++;
  highlight();
};

// TODO: Adicionar a atualização dinâmica sempre que scrollar.

// LIFECYCLE HOOKS
watch(
  () => open,
  newOpen => {
    if (newOpen) {
      highlight();
    } else {
      hide();
      activeIndex.value = 0;
    }
  },
);

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Tour'] {
  .item {
    border: none;
    margin: 0;

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
