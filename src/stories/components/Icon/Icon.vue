<template>
  <div ref="element" data-component="Icon" :data-category="category" :data-name="name">
    <Icon />
  </div>
</template>

<script lang="ts" setup>
import { type Component, computed, defineAsyncComponent, useTemplateRef } from 'vue';

import type { Category, Icons } from './types';

type Props = {
  category?: Category;
  name: Icons;
  size?: string;
  color?: string;
};

const { category = 'UI', name, size = '100%', color = 'inherit' } = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const iconCache = new Map<string, Component>();

const iconLoaders = import.meta.glob<Component>('../../../assets/icons/**/*.svg', {
  query: '?component',
  import: 'default',
});

const Icon = computed(() => {
  const path = `../../../assets/icons/${category}/${name}.svg`;

  if (!iconCache.has(path)) {
    const loader = iconLoaders[path];
    if (!loader) return null;
    iconCache.set(path, defineAsyncComponent(loader));
  }

  return iconCache.get(path);
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
