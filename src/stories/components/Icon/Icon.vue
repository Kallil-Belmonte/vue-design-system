<template>
  <div
    ref="element"
    data-component="Icon"
    :data-category="category"
    :data-name="name"
    v-html="icons[name]"
  ></div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, useTemplateRef, watchEffect } from 'vue';

import { addIcon, icons } from '@/core/state/icons';
import { PROJECT_DOMAIN } from '@/shared/files/consts';
import type { Category, Icons } from './types';

type Props = {
  category?: Category;
  name: Icons;
  size?: string;
  color?: string;
};

const { category = 'UI', name, size = '100%', color = 'inherit' } = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const mounted = ref(true);

const setIcon = async () => {
  const request = new Request(`/icons/${category}/${name}.svg`);
  let svgHTML = '';

  if ('caches' in window) {
    const cache = await caches.open(`${PROJECT_DOMAIN}-icons`);
    let response = await cache.match(request);

    if (!response) {
      await cache.add(request);
      response = await cache.match(request);
    }

    svgHTML = (await response?.text()) || '';
  } else if (!icons.value[name]) {
    const response = await fetch(request);
    svgHTML = await response.text();
  }

  if (svgHTML && mounted.value) {
    addIcon(name, svgHTML);
  }
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setIcon();
});

onUnmounted(() => {
  mounted.value = false;
});

// EXPOSE
defineExpose({
  /** Element ref */
  element,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Icon'] {
  @extend %flex-center;
  @include square(v-bind(size));
  color: v-bind(color);

  svg {
    @include square(100%);
    @include transitionAll();
  }
}
</style>
