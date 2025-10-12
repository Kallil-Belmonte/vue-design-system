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
import { computed, onMounted, ref, useTemplateRef } from 'vue';

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

const { duration = 3000, slides } = defineProps<Props>();

const element = useTemplateRef<HTMLElement>('element');

const disabled = ref(false);

const getWidth = () => element.value?.querySelector('.slider')?.getBoundingClientRect().width || 0;

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

const maxTranslate = computed(() => getWidth() * (getSlides().length - 1));

const getBackgroundStyle = (slide: Slide) => {
  if (slide.image) return `background-image: url(${slide.image});`;
  if (slide.gradient) return `background-image: ${slide.gradient};`;
  if (slide.color) return `background-color: ${slide.color};`;
};

const previous = () => {
  disabled.value = true;

  if (!getFirstSlide().style.translate) {
    getLastSlide().style.translate = `-${getWidth() * getSlides().length}px`;
  }

  setTimeout(() => {
    getSlides().forEach(item => {
      const translate = Number(item.style.translate.replace('px', ''));
      item.style.translate = `${translate + getWidth()}px`;
      item.style.transition = 'translate 0.4s ease';
    });
  });
};

const next = () => {
  disabled.value = true;

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
  });
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

const startTransitions = () => {
  setInterval(next, duration);
};

// LIFECYCLE HOOKS
onMounted(() => {
  startTransitions();
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
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px auto 0;

    button {
      color: #9c9c9c;
      @include square(20px);
      padding: 0;
      border: none;
      background-color: transparent;

      &:not(:disabled) {
        cursor: pointer;
      }
    }
  }
}
</style>
