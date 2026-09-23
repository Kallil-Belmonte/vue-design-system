import { onMounted, onUnmounted, ref, type Ref, type ShallowRef } from 'vue';

import { getScrollStatus } from '@/shared/helpers';

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

/**
 * @function useElementBounding
 * @description Gets the bounding box of an element.
 * @param elementRef - Element reference.
 */

const useElementBounding = (elementRef: Readonly<ShallowRef<Element>> | Readonly<Ref<Element>>) => {
  const x = ref(0);
  const y = ref(0);
  const top = ref(0);
  const right = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const width = ref(0);
  const height = ref(0);

  let scrollParent: HTMLElement | null = null;
  let mutationObserver: MutationObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const setValues = (element = elementRef.value) => {
    const rect = element?.getBoundingClientRect();

    x.value = rect?.x || 0;
    y.value = rect?.y || 0;
    top.value = rect?.top || 0;
    right.value = rect?.right || 0;
    bottom.value = rect?.bottom || 0;
    left.value = rect?.left || 0;
    width.value = rect?.width || 0;
    height.value = rect?.height || 0;
  };

  const listener = () => {
    setValues();
  };

  const removeListeners = () => {
    window.removeEventListener('resize', listener);

    scrollParent?.removeEventListener('scroll', listener);
    scrollParent = null;

    mutationObserver?.disconnect();
    mutationObserver = null;

    resizeObserver?.disconnect();
    resizeObserver = null;
  };

  const setListeners = () => {
    const element = elementRef.value;
    if (!element) return;

    window.addEventListener('resize', listener);

    let parent = element.parentElement;
    while (parent && parent.tagName !== 'BODY' && !getScrollStatus(parent).isScrollable) {
      parent = parent.parentElement;
    }

    scrollParent = parent;
    scrollParent?.addEventListener('scroll', listener);

    mutationObserver = new MutationObserver(() => {
      setValues();
      setTimeout(() => setValues(), 500);
    });
    mutationObserver.observe(element, { attributes: true });

    resizeObserver = new ResizeObserver(() => {
      setValues();
      setTimeout(() => setValues(), 500);
    });
    resizeObserver.observe(element);

    setValues(element);
  };

  // LIFECYCLE HOOKS
  onMounted(() => {
    setListeners();
  });

  onUnmounted(() => {
    removeListeners();
  });

  return {
    x,
    y,
    top,
    right,
    bottom,
    left,
    width,
    height,
  };
};

export default useElementBounding;
