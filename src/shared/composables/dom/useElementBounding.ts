import { getScrollStatus } from '@/shared/helpers';
import { onMounted, onUnmounted, ref, type Ref, type ShallowRef } from 'vue';

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

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes') {
        setValues(mutation.target as Element);
      }
    });
  });

  const listener = () => {
    setValues();
  };

  const setListeners = () => {
    if (elementRef.value) {
      window.addEventListener('resize', listener);
      observer.observe(elementRef.value, { attributes: true });

      let parent = elementRef.value?.parentElement;

      while (
        parent?.tagName !== 'BODY' &&
        !getScrollStatus(parent).hasScrollbar &&
        parent?.parentElement
      ) {
        parent = parent.parentElement;
      }

      parent?.addEventListener('scroll', listener);
    } else {
      window.removeEventListener('resize', listener);
    }
  };

  // LIFECYCLE HOOKS
  onMounted(() => {
    setTimeout(() => {
      setValues();
    }, 500);
    setListeners();
  });

  onUnmounted(() => {
    setValues(null);
    setListeners();
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
