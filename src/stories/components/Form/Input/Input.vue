<template>
  <div data-component="Input" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <Tooltip v-if="info?.text" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </Tooltip>
    </div>

    <Icon v-if="icon" :name="icon" />

    <input
      ref="field"
      v-model="model"
      :aria-invalid="!field?.validity?.valid"
      :type="type"
      :name="name"
      :id="name"
      :required="required"
      :pattern="pattern"
      :min="min"
      :max="max"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="input"
    />

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

import { formatDigit, formatText } from '@/shared/helpers';
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Icons } from '@/stories/components/Icon/types';
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
  icon?: Icons;
  label: string;
  type?: InputHTMLAttributes['type'];
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  pattern?: InputHTMLAttributes['pattern'];
  min?: InputHTMLAttributes['min'];
  max?: InputHTMLAttributes['max'];
  minlength?: InputHTMLAttributes['minlength'];
  maxlength?: InputHTMLAttributes['maxlength'];
  placeholder?: InputHTMLAttributes['placeholder'];
  disabled?: InputHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const {
  info,
  icon,
  label,
  type = 'text',
  name,
  required,
  pattern,
  min,
  max,
  minlength,
  maxlength,
  placeholder,
  disabled,
  input,
} = defineProps<Props>();

const [model, modifier] = defineModel<string>({
  required: true,
  set: value => {
    if (modifier.text) return formatText(value);
    if (modifier.digit) return formatDigit(value);
    return value;
  },
});
const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Input'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  position: relative;

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

      ~ input {
        padding-left: calc(var(--field-spacing-x) + var(--field-icon-size) + 10px);
      }
    }
  }

  > [data-component='Icon'] {
    @include square(var(--field-icon-size));
    position: absolute;
    top: 40px;

    svg {
      @include transitionAll();
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

  input {
    font-family: var(--font-primary);
    font-size: var(--font-size);
    display: block;
    @include size(100%, var(--field-height));
    padding: 0 var(--field-spacing-x);
    border-radius: 10px;
    border: 1px solid var(--field-border-color);
    box-sizing: border-box;
    transition: border-color 0.4s ease;

    &::-webkit-input-placeholder,
    &::-webkit-input-placeholder,
    &::-webkit-input-placeholder {
      color: var(--grey-5);
    }

    &::-moz-placeholder,
    &::-moz-placeholder,
    &::-moz-placeholder {
      color: var(--grey-5);
    }

    &:focus {
      border-color: var(--field-active-border-color);
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:user-invalid {
      &,
      &:focus {
        border-color: var(--danger);
      }
    }
  }

  .validation-message {
    color: var(--danger);
    margin: 5px 0 0 5px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &:not(:has(:user-invalid)) {
    .validation-message {
      display: none;
    }
  }
}
</style>
