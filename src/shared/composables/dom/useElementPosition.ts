import { type Ref, type ShallowRef, computed } from 'vue';

import useElementBounding from './useElementBounding';

type Element =
  | HTMLElement
  | HTMLDivElement
  | HTMLUListElement
  | HTMLLIElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLButtonElement
  | HTMLBodyElement
  | null;

type RefParam = Readonly<ShallowRef<Element>> | Readonly<Ref<Element>>;

const divide = (value: number) => value / 2;

/**
 * @function useElementPosition
 * @description Gets the position values of an element relative to another.
 * @param { RefParam } targetRef - Target ref.
 * @param { RefParam } elementRef - Element ref.
 */

const useElementPosition = (targetRef: RefParam, elementRef: RefParam, spacing = 10) => {
  const targetRect = useElementBounding(targetRef);

  const elementRect = useElementBounding(elementRef);

  const targetOffsetTop = computed(() => targetRect.top.value + window.scrollY);

  const targetOffsetRight = computed(() => targetRect.right.value + window.scrollX);

  const targetOffsetBottom = computed(() => targetRect.bottom.value + window.scrollY);

  const targetOffsetLeft = computed(() => targetRect.left.value + window.scrollX);

  const top = computed(() => `${targetOffsetTop.value - elementRect.height.value - spacing}px`);

  const right = computed(() => `${targetOffsetRight.value + spacing}px`);

  const bottom = computed(() => `${targetOffsetTop.value + targetRect.height.value + spacing}px`);

  const left = computed(() => `${targetOffsetLeft.value - elementRect.width.value - spacing}px`);

  const horizontalLeft = computed(() => `${targetOffsetLeft.value}px`);

  const horizontalCenter = computed(
    () =>
      `${
        targetOffsetLeft.value + divide(targetRect.width.value) - divide(elementRect.width.value)
      }px`,
  );

  const horizontalRight = computed(() => `${targetOffsetRight.value - elementRect.width.value}px`);

  const verticalTop = computed(() => `${targetOffsetTop.value}px`);

  const verticalCenter = computed(
    () =>
      `${
        targetOffsetBottom.value -
        divide(targetRect.height.value) -
        divide(elementRect.height.value)
      }px`,
  );

  const verticalBottom = computed(() => `${targetOffsetBottom.value - elementRect.height.value}px`);

  return {
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
  };
};

export default useElementPosition;
