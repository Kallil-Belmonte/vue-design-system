<template>
  <div data-component="RangeSlider" class="form-field">
    <div class="label-wrapper">
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

    <div class="field">
      <input
        ref="minField"
        v-model="minValue"
        type="range"
        name="min-range"
        :min="min"
        :max="max"
      />
      <input
        ref="maxField"
        v-model="maxValue"
        type="range"
        name="max-range"
        :min="min"
        :max="max"
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
      />

      <div class="bar">
        <div ref="minBar" class="min"></div>
        <div ref="maxBar" class="max"></div>
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
};

const { info, label, name, required, min = 0, max = 100, disabled, input } = defineProps<Props>();

const [minValue] = defineModel<number, number>('minValue', { required: true });
const [maxValue] = defineModel<number, number>('maxValue', { required: true });

const minField = useTemplateRef<InputHTMLAttributes>('minField');
const maxField = useTemplateRef<InputHTMLAttributes>('maxField');
const minBar = useTemplateRef<HTMLDivElement>('minBar');
const maxBar = useTemplateRef<HTMLDivElement>('maxBar');

const baseValue = ref('0');

const updateValues = (valueParam: string | number) => {
  const value = Number(valueParam);
  const total = Number(max);
  const minPercentage = Number(minValue.value) / (total / 100);
  const maxPercentage = Number(maxValue.value) / (total / 100);
  const percentage = Number(value) / (total / 100);
  const half = maxPercentage - (maxPercentage - minPercentage) / 2;

  const updateMin = () => {
    const min = Number(value);
    const max = Number(maxValue.value);
    const percentage = min / (total / 100);

    minValue.value = Number(value);
    if (minBar.value) minBar.value.style.width = `${percentage}%`;

    if (min >= max) {
      maxValue.value = Number(value);
      if (maxBar.value) maxBar.value.style.width = `${100 - percentage}%`;
    }
  };

  const updateMax = () => {
    const min = Number(minValue.value);
    const max = Number(value);
    const percentage = max / (total / 100);

    maxValue.value = Number(value);
    if (maxBar.value) maxBar.value.style.width = `${100 - percentage}%`;

    if (max <= min) {
      minValue.value = Number(value);
      if (minBar.value) minBar.value.style.width = `${percentage}%`;
    }
  };

  if (percentage >= half) updateMax();
  else updateMin();
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
});
</script>
''

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='RangeSlider'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);

  .label-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 5px;

    label {
      font-weight: 700;
    }

    [data-component='Tooltip'] {
      margin-left: 5px;
    }

    + [data-component='Icon'] {
      color: var(--grey-4);
      left: var(--field-spacing-x);
    }
  }

  &:has(:user-invalid) {
    .label-wrapper + [data-component='Icon'] {
      color: var(--danger);
    }
  }

  &:has(:focus:not(:user-invalid)) {
    .label-wrapper + [data-component='Icon'] {
      color: var(--primary);
    }
  }

  .field {
    @include size(100%, 20px);
    position: relative;

    input[type='range'] {
      margin: 0;
      opacity: 0;
      cursor: pointer;
      position: absolute;
      inset: 0;

      &.base {
        z-index: 1;
      }
    }

    .bar {
      @include size(100%, 10px, 50px);
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
        left: 0;

        &::before {
          content: '';
          @include square(20px, 50%);
          background-color: var(--primary-darker);
          @extend %absolute-vertical-center;
          left: 100%;
          z-index: 1;
        }
      }

      .max {
        border-radius: 0 50px 50px 0;
        right: 0;
        left: auto;

        &::after {
          content: '';
          @include square(20px, 50%);
          background-color: var(--primary-darker);
          @extend %absolute-vertical-center;
          right: 100%;
          z-index: 1;
        }
      }
    }
  }
}
</style>
