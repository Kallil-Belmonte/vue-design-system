<template>
  <picture ref="element" data-component="Picture">
    <source
      v-for="source in sources"
      :key="source.srcset"
      :srcset="source.srcset"
      :media="source.media"
    />
    <img :src="src" :alt="alt" />
  </picture>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

type Source = Partial<HTMLSourceElement> & {
  srcset: HTMLSourceElement['srcset'];
  media: HTMLSourceElement['media'];
};

type Props = {
  alt: HTMLImageElement['alt'];
  src: HTMLImageElement['src'];
  sources?: Source[];
};

const { alt, src, sources } = defineProps<Props>();

const element = useTemplateRef<HTMLPictureElement>('element');

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>
