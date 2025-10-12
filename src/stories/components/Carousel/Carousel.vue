<template>
  <section ref="element" data-component="Carousel">
    <div class="slider">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :style="getBackgroundStyle(slide)"
        class="slide"
        v-html="slide.content"
        @transitionend="transitionEnd"
      ></div>
    </div>
    <section class="actions">
      <button
        aria-label="Previous"
        title="Previous"
        class="previous"
        type="button"
        :disabled="disabled"
        @click="previous"
      >
        <Icon name="ArrowLeft" />
      </button>

      <div class="slides">
        <button
          v-for="index in Array.from({ length: slides.length }).map((_, i) => i)"
          :key="index"
          :aria-label="`Slide ${index + 1}`"
          :title="`Slide ${index + 1}`"
          :class="currentSlideIndex === index ? 'active' : undefined"
          @click="gotToSlide(index)"
        ></button>
      </div>

      <button
        aria-label="Next"
        title="Next"
        class="next"
        type="button"
        :disabled="disabled"
        @click="next"
      >
        <Icon name="ArrowRight" />
      </button>
    </section>
  </section>
</template>

<script lang="ts" setup>
import Icon from '@/stories/components/Icon/Icon.vue';
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

type Slide = {
  image?: string;
  gradient?: string;
  color?: string;
  content?: string;
};

type Props = {
  duration?: number;
  slides: Slide[];
};

const { duration = 5000, slides } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const currentSlideIndex = ref(0);

const interval = ref<number>();

const disabled = ref(false);

const getWidth = () =>
  element.value?.querySelector('.slider')?.getBoundingClientRect().width as number;

const getSlides = () =>
  Array.from(element.value?.querySelectorAll('.slider .slide') || []) as HTMLDivElement[];

const getFirstSlide = () =>
  element.value?.querySelector('.slider .slide:first-child') as HTMLDivElement;

const getPenultimateSlide = () =>
  element.value?.querySelector(
    '.slider .slide:nth-last-child(2):not(:first-child)',
  ) as HTMLDivElement;

const getLastSlide = () =>
  element.value?.querySelector('.slider .slide:last-child') as HTMLDivElement;

const maxTranslate = computed(() => getWidth() * (slides.length - 1));

const getBackgroundStyle = (slide: Slide) => {
  if (slide.image) return `background-image: url(${slide.image});`;
  if (slide.gradient) return `background-image: ${slide.gradient};`;
  if (slide.color) return `background-color: ${slide.color};`;
};

const startTransitions = () => {
  interval.value = setInterval(next, duration);
};

const previous = () => {
  disabled.value = true;

  clearInterval(interval.value);

  // Move last slide before first slide
  if (!getFirstSlide().style.translate) {
    getLastSlide().style.translate = `-${getWidth() * slides.length}px`;
  }

  setTimeout(() => {
    getSlides().forEach(item => {
      const translate = Number(item.style.translate.replace('px', ''));
      item.style.translate = `${translate + getWidth()}px`;
      item.style.transition = 'translate 0.4s ease';
    });

    if (currentSlideIndex.value) currentSlideIndex.value -= 1;
    else currentSlideIndex.value = slides.length - 1;

    startTransitions();
  });
};

const next = () => {
  disabled.value = true;

  clearInterval(interval.value);

  // Move first slide after last slide
  if (getLastSlide().style.translate === `-${maxTranslate.value}px`) {
    getFirstSlide().style.removeProperty('transition');
    getFirstSlide().style.translate = `${getWidth()}px`;
  }

  setTimeout(() => {
    getSlides().forEach(item => {
      const translate = Number(item.style.translate.replace('px', ''));
      item.style.translate = `${translate - getWidth()}px`;
      item.style.transition = 'translate 0.4s ease';
    });

    if (currentSlideIndex.value === slides.length - 1) currentSlideIndex.value = 0;
    else currentSlideIndex.value += 1;

    startTransitions();
  });
};

const gotToSlide = (index: number) => {
  const translate = getWidth() * index;

  clearInterval(interval.value);

  getSlides().forEach(item => {
    item.style.translate = `${translate ? `-${translate}px` : '0'}`;
    item.style.transition = 'translate 0.4s ease';
  });

  currentSlideIndex.value = index;
  startTransitions();
};

const transitionEnd = () => {
  disabled.value = false;

  if (getFirstSlide().style.translate === '0px') {
    getSlides().forEach(item => {
      item.style.removeProperty('translate');
      item.style.removeProperty('transition');
    });
  }

  if (getFirstSlide().style.translate === `${maxTranslate.value}px`) {
    getFirstSlide().style.translate = `-${getWidth()}px`;
  }

  if (
    getLastSlide().style.translate === `-${maxTranslate.value}px` &&
    getPenultimateSlide().style.translate !== `-${maxTranslate.value}px`
  ) {
    getSlides().forEach(item => item.style.removeProperty('transition'));
    getPenultimateSlide().style.translate = `-${maxTranslate.value}px`;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  startTransitions();
});

onUnmounted(() => {
  clearInterval(interval.value);
});

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Carousel'] {
  .slider {
    display: flex;
    flex-direction: row;
    @include size(100%, 300px);
    overflow: hidden;
    margin: 0 auto;

    .slide {
      flex-shrink: 0;
      @include size(100%, 300px);
      background-color: #ddd;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px auto 0;

    .previous,
    .next {
      color: #9c9c9c;
      @include square(20px);
      padding: 0;
      border: none;
      background-color: transparent;

      &:not(:disabled) {
        cursor: pointer;
      }

      &:hover {
        color: var(--primary);
      }
    }

    .slides {
      display: flex;
      gap: 10px;

      button {
        @include square(8px, 50%);
        padding: 0;
        border: none;
        background-color: #9c9c9c;
        cursor: pointer;

        &.active {
          background-color: var(--primary);
        }
      }
    }
  }
}
</style>
