<template>
  <div data-component="RangeSlider" class="form-field">
    <div class="label-wrapper" v-if="label || info?.text">
      <label v-if="label" :for="name">{{ label }}</label>
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
        ref="minField"
        v-model="minValue"
        type="number"
        name="min-field"
        :min="min"
        :max="max"
        :disabled="disabled"
        @blur="blurMin"
      />
      <input
        ref="maxField"
        v-model="maxValue"
        type="number"
        name="max-field"
        :min="min"
        :max="max"
        :disabled="disabled"
        @blur="blurMax"
      />
    </div>

    <div class="range">
      <input
        ref="minRange"
        v-model="minValue"
        type="range"
        name="min-range"
        :min="min"
        :max="max"
        :disabled="disabled"
      />
      <input
        ref="maxRange"
        v-model="maxValue"
        type="range"
        name="max-range"
        :min="min"
        :max="max"
        :disabled="disabled"
      />
      <input
        v-model="baseValue"
        class="base"
        type="range"
        :name="name"
        :id="name"
        :required="required"
        :min="min"
        :max="max"
        :disabled="disabled"
        @input="input"
        @blur="blur"
      />

      <div class="bar-wrapper">
        <div class="bar">
          <div ref="minBar" class="min"></div>
          <div ref="maxBar" class="max"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, onMounted, ref, useTemplateRef, watch } from 'vue';

import Icon from '@/stories/components/Icon/Icon.vue';
import Tooltip from '@/stories/components/Tooltip/Tooltip.vue';

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
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  min?: InputHTMLAttributes['min'];
  max?: InputHTMLAttributes['max'];
  disabled?: InputHTMLAttributes['disabled'];
  input?: InputHTMLAttributes['onInput'];
  blur?: InputHTMLAttributes['onBlur'];
};

const {
  info,
  label,
  name,
  required,
  min = 0,
  max = 100,
  disabled,
  input,
  blur,
} = defineProps<Props>();

const [minValue] = defineModel<number, number>('minValue', { required: true });
const [maxValue] = defineModel<number, number>('maxValue', { required: true });

const minField = useTemplateRef<InputHTMLAttributes>('minField');
const maxField = useTemplateRef<InputHTMLAttributes>('maxField');
const minRange = useTemplateRef<InputHTMLAttributes>('minRange');
const maxRange = useTemplateRef<InputHTMLAttributes>('maxRange');
const minBar = useTemplateRef<HTMLDivElement>('minBar');
const maxBar = useTemplateRef<HTMLDivElement>('maxBar');

const baseValue = ref('0');

const blurMin: InputHTMLAttributes['onBlur'] = event => {
  if (disabled) return;

  const { value } = event.target as HTMLInputElement;

  if (Number(value) < Number(min)) {
    minValue.value = Number(min);
  } else if (Number(value) > Number(max)) {
    minValue.value = Number(max);
    maxValue.value = Number(max);
  }
};

const blurMax: InputHTMLAttributes['onBlur'] = event => {
  if (disabled) return;

  const { value } = event.target as HTMLInputElement;

  if (Number(value) > Number(max)) {
    maxValue.value = Number(max);
  } else if (Number(value) < Number(min)) {
    minValue.value = Number(min);
    maxValue.value = Number(min);
  }
};

const updateValues = (valueParam: string | number) => {
  const value = Number(valueParam);

  if (disabled || value < Number(min) || value > Number(max)) return;

  const total = Number(max);
  const range = Number(max) - Number(min);
  const minPercentage = Number(minValue.value) / (total / 100);
  const maxPercentage = Number(maxValue.value) / (total / 100);
  const percentage = Number(value) / (total / 100);
  const half = maxPercentage - (maxPercentage - minPercentage) / 2;
  const width = ((value - Number(min)) / range) * 100;

  const updateMin = () => {
    const minResult = Number(value);
    const maxResult = Number(maxValue.value);

    minValue.value = minResult;
    if (minBar.value) minBar.value.style.width = `${width}%`;

    if (minResult >= maxResult) {
      maxValue.value = minResult;
      if (maxBar.value) maxBar.value.style.width = `${100 - width}%`;
    }
  };

  const updateMax = () => {
    const minResult = Number(minValue.value);
    const maxResult = Number(value);

    maxValue.value = maxResult;
    if (maxBar.value) maxBar.value.style.width = `${100 - width}%`;

    if (maxResult <= minResult) {
      minValue.value = maxResult;
      if (minBar.value) minBar.value.style.width = `${width}%`;
    }
  };

  if (percentage > half) {
    updateMax();
  } else if (percentage < half) {
    updateMin();
  } else if (value === maxValue.value || value + 1 === maxValue.value) {
    updateMin();
  } else if (value === minValue.value) {
    updateMax();
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  updateValues(minValue.value);
  updateValues(maxValue.value);
});

watch(baseValue, newBaseValue => {
  updateValues(newBaseValue);
});

watch(minValue, newMin => {
  updateValues(newMin);
});

watch(maxValue, newMax => {
  updateValues(newMax);
});

// EXPOSE
defineExpose({
  /** MinField ref */
  minField,
  /** MaxField ref */
  maxField,
  /** MinRange ref */
  minRange,
  /** MaxRange ref */
  maxRange,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='RangeSlider'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);

  $dot-size: 20px;
  $dot-half-size: calc($dot-size / 2);

  .label-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 5px;

    label {
      font-weight: 700;
    }

    [data-component='Tooltip'] {
      margin-left: 5px;
    }
  }

  input {
    &:disabled {
      cursor: not-allowed;
    }
  }

  .fields {
    @extend %flex-vertical-center;
    justify-content: space-between;
    margin-bottom: 5px;

    input[type='number'] {
      font-family: var(--font-primary);
      font-size: 14px;
      color: var(--text-color);
      text-align: center;
      @include size(50px, 25px, 8px);
      border: none;
      background-color: var(--grey-3);
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .range {
    @include size(100%, $dot-size);
    position: relative;

    input[type='range'] {
      margin: 0;
      opacity: 0;
      position: absolute;
      inset: 0;

      &:not(:disabled) {
        cursor: pointer;
      }

      &.base {
        z-index: 1;
      }
    }

    .bar-wrapper {
      @include size(100%, $dot-half-size);
      padding: 0 $dot-half-size;
      box-sizing: border-box;
      position: relative;
      top: 50%;
      translate: 0 -50%;

      .bar {
        @include square(100%, 50px);
        padding: 0 $dot-half-size;
        box-sizing: border-box;
        background-color: color.adjust(#43b883, $lightness: 20%);
        position: relative;
        top: 50%;
        translate: 0 -50%;

        .min,
        .max {
          @include size(0, 100%);
          background-color: var(--grey-3);
          position: absolute;
          cursor: pointer;
        }

        .min {
          border-radius: 50px 0 0 50px;
          padding-left: 10px;
          margin-left: -10px;
          left: 0;

          &::before {
            content: '';
            @include square($dot-size, 50%);
            background-color: var(--primary-darker);
            @extend %absolute-vertical-center;
            left: calc(100% - $dot-half-size);
            z-index: 1;
          }
        }

        .max {
          border-radius: 0 50px 50px 0;
          padding-right: 10px;
          margin-right: -10px;
          right: 0;
          left: auto;

          &::after {
            content: '';
            @include square($dot-size, 50%);
            background-color: var(--primary-darker);
            @extend %absolute-vertical-center;
            right: calc(100% - $dot-half-size);
            z-index: 1;
          }
        }
      }
    }
  }

  &:has(input:disabled) {
    .range {
      .bar-wrapper {
        .bar {
          background-color: color.adjust(#43b883, $lightness: 30%);

          .min {
            &::before {
              background-color: color.adjust(#43b883, $lightness: 10%);
            }
          }

          .max {
            &::after {
              background-color: color.adjust(#43b883, $lightness: 10%);
            }
          }
        }
      }
    }
  }
}
</style>
