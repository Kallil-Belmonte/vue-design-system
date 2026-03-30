<template>
  <div data-component="Date" class="form-field">
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

    <div class="field-wrapper">
      <Icon name="Calendar" />

      <input
        ref="field"
        v-model="model"
        :aria-invalid="!field?.validity?.valid"
        type="text"
        :name="name"
        :id="name"
        :required="required"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="change"
      />
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

import { formatDateInput } from '@/shared/helpers';
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
  min?: string;
  max?: string;
  placeholder?: InputHTMLAttributes['placeholder'];
  disabled?: InputHTMLAttributes['disabled'];
  change?: InputHTMLAttributes['onChange'];
};

const { info, label, name, required, min, max, disabled, change } = defineProps<Props>();

const [model] = defineModel<string>({
  required: true,
  set: value => formatDateInput(value),
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

[data-component='Date'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  position: relative;

  .label-wrapper {
    @extend %flex-vertical-center;
    gap: 5px;
    margin-bottom: 5px;

    label {
      font-weight: 700;
    }
  }

  .field-wrapper {
    position: relative;

    [data-component='Icon'] {
      color: var(--grey-4);
      @include square(var(--field-icon-size));
      position: absolute;
      top: 16px;
      left: var(--field-spacing-x);

      svg {
        @include transitionAll();
      }

      + input {
        padding-left: calc(var(--field-spacing-x) + var(--field-icon-size) + 10px);
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
      @include placeholder-color(var(--grey-5));

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
  }

  &:has(:user-invalid) {
    .field-wrapper {
      [data-component='Icon'] {
        color: var(--danger);
      }
    }
  }

  &:has(:focus:not(:user-invalid)) {
    .field-wrapper {
      [data-component='Icon'] {
        color: var(--primary);
      }
    }
  }

  .validation-message {
    color: var(--danger);
    margin: 5px 0 0 0;

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
