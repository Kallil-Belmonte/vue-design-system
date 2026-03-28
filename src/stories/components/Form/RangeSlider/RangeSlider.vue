<template>
  <div ref="element" data-component="range-slider" :class="{ disabled }">
    <div class="label-wrapper" v-if="label || info?.text">
      <p v-if="label" class="label">{{ label }}</p>
      <Tooltip v-if="info?.text" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </Tooltip>
    </div>

    <div class="fields">
      <input
        v-model="minField"
        type="number"
        name="min-field"
        :min="min"
        :max="max"
        :disabled="disabled"
        @blur="blurMin"
      />
      <input
        v-model="maxField"
        type="number"
        name="max-field"
        :min="min"
        :max="max"
        :disabled="disabled"
        @blur="blurMax"
      />
    </div>

    <div class="slider-wrapper">
      <div ref="slider" class="slider" @mousedown="startDrag" @touchstart="startDrag">
        <div class="track"></div>

        <div
          class="thumb"
          :style="{ left: minPercent + '%' }"
          @mousedown.stop="startDragThumb('min')"
          @touchstart.stop="startDragThumb('min')"
        ></div>

        <div
          class="range"
          :style="{
            width: maxPercent - minPercent + '%',
            left: minPercent + '%',
          }"
        ></div>

        <div
          class="thumb"
          :style="{ left: maxPercent + '%' }"
          @mousedown.stop="startDragThumb('max')"
          @touchstart.stop="startDragThumb('max')"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  type InputHTMLAttributes,
  onBeforeUnmount,
  ref,
  useTemplateRef,
  watch,
} from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import Tooltip from '@/stories/components/Tooltip/Tooltip.vue';

type Thumb = 'min' | 'max';

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

type Props = {
  info?: {
    text: string;
    maxWidth?: string;
    position?: Position;
  };
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const { info, label, min = 0, max = 100, disabled } = defineProps<Props>();

const [minValue] = defineModel<number, number>('minValue', { required: true });
const [maxValue] = defineModel<number, number>('maxValue', { required: true });

const element = useTemplateRef<HTMLDivElement>('element');
const slider = useTemplateRef<HTMLDivElement>('slider');

const minField = ref(minValue.value);
const maxField = ref(maxValue.value);
const activeThumb = ref<Thumb>('min');

const minPercent = computed(() => ((minValue.value - min) / (max - min)) * 100);

const maxPercent = computed(() => ((maxValue.value - min) / (max - min)) * 100);

const blurMin: InputHTMLAttributes['onBlur'] = event => {
  if (disabled) return;

  const { value } = event.target as HTMLInputElement;

  if (!value) {
    minField.value = minValue.value;
    return;
  }

  if (Number(value) < minValue.value) {
    if (Number(value) < Number(min)) {
      minField.value = Number(min);
      minValue.value = Number(min);
    } else {
      minValue.value = Number(value);
    }
  } else if (Number(value) > maxValue.value) {
    if (Number(value) > Number(max)) {
      minValue.value = Number(max);
      maxValue.value = Number(max);
    } else {
      minValue.value = Number(value);
      maxValue.value = Number(value);
    }
  } else {
    minValue.value = Number(value);
  }
};

const blurMax: InputHTMLAttributes['onBlur'] = event => {
  if (disabled) return;

  const { value } = event.target as HTMLInputElement;

  if (!value) {
    maxField.value = maxValue.value;
    return;
  }

  if (Number(value) > maxValue.value) {
    if (Number(value) > Number(max)) {
      maxField.value = Number(max);
      maxValue.value = Number(max);
    } else {
      maxValue.value = Number(value);
    }
  } else if (Number(value) < minValue.value) {
    if (Number(value) < Number(min)) {
      minValue.value = Number(min);
      maxValue.value = Number(min);
    } else {
      minValue.value = Number(value);
      maxValue.value = Number(value);
    }
  } else {
    maxValue.value = Number(value);
  }
};

const getClientX = (event: MouseEvent | TouchEvent) => {
  if ((event as TouchEvent).touches) return (event as TouchEvent).touches[0].clientX;
  return (event as MouseEvent).clientX;
};

const updateValueFromPosition = (clientX: number) => {
  const { width = 0, left = 0 } = slider.value?.getBoundingClientRect() || {};

  let percent = (clientX - left) / width;
  percent = Math.max(0, Math.min(1, percent));

  const value = Math.round(min + percent * (max - min));

  if (activeThumb.value === 'min') {
    minValue.value = Math.min(value, maxValue.value);
  } else {
    maxValue.value = Math.max(value, minValue.value);
  }
};

const move = (event: MouseEvent | TouchEvent) => {
  updateValueFromPosition(getClientX(event));
};

const removeListeners = () => {
  window.removeEventListener('mousemove', move);
  window.removeEventListener('mouseup', removeListeners);
  window.removeEventListener('touchmove', move);
  window.removeEventListener('touchend', removeListeners);
};

const addListeners = () => {
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', removeListeners);
  window.addEventListener('touchmove', move);
  window.addEventListener('touchend', removeListeners);
};

const startDrag = (event: MouseEvent | TouchEvent) => {
  if (disabled) return;
  const { width = 0, left = 0 } = slider.value?.getBoundingClientRect() || {};

  const clickX = getClientX(event);
  const percent = (clickX - left) / width;
  const value = min + percent * (max - min);

  if (
    value < minValue.value ||
    Math.abs(value - minValue.value) < Math.abs(value - maxValue.value)
  ) {
    activeThumb.value = 'min';
  } else {
    activeThumb.value = 'max';
  }

  updateValueFromPosition(clickX);
  addListeners();
};

const startDragThumb = (thumb: Thumb) => {
  if (disabled) return;
  activeThumb.value = thumb;
  addListeners();
};

// LIFECYCLE HOOKS
watch(minValue, newMinValue => {
  minField.value = newMinValue;
});

watch(maxValue, newMaxValue => {
  maxField.value = newMaxValue;
});

onBeforeUnmount(() => {
  removeListeners();
});

// EXPOSE
defineExpose({
  /** Element ref */
  element,
  /** Slider ref */
  slider,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='range-slider'] {
  --thumb-size: 18px;

  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);

  .label-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 5px;

    .label {
      font-weight: 700;
      margin: 0;

      + {
        [data-component='Tooltip'] {
          margin-left: 5px;
        }
      }
    }
  }

  .fields {
    @extend %flex-vertical-center;
    justify-content: space-between;

    input[type='number'] {
      appearance: textfield;
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      font-family: var(--font-primary);
      font-size: 14px;
      color: var(--text-color);
      text-align: center;
      @include size(50px, 25px, 8px);
      border: none;
      background-color: var(--grey-3);

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .slider-wrapper {
    padding: 0 calc(var(--thumb-size) / 2);

    .slider {
      @include size(100%, 30px);
      position: relative;

      .track,
      .range,
      .thumb {
        cursor: pointer;
      }

      .range,
      .thumb {
        background-color: var(--primary);
      }

      .track {
        @include size(100%, 6px);
        border-radius: 3px;
        background-color: var(--grey-3);
        @extend %absolute-vertical-center;
      }

      .range {
        height: 6px;
        border-radius: 3px;

        @extend %absolute-vertical-center;
      }

      .thumb {
        @include square(var(--thumb-size));
        border-radius: 50%;
        touch-action: none;
        @extend %absolute-center;
      }
    }
  }

  &.disabled {
    .slider-wrapper {
      .slider {
        .track,
        .range,
        .thumb {
          cursor: not-allowed;
        }

        .range,
        .thumb {
          background-color: color.adjust(#43b883, $lightness: 20%);
        }
      }
    }
  }
}
</style>
