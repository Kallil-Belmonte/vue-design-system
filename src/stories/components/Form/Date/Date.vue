<template>
  <div data-component="Date" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <TooltipOld v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </TooltipOld>
    </div>

    <Icon v-if="showCalendarIcon" name="Calendar" />
    <input
      ref="field"
      v-model="model"
      :aria-invalid="!field?.validity?.valid"
      :type="inputType"
      :name="name"
      :id="name"
      :required="required"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="change"
    />

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, type InputHTMLAttributes, useTemplateRef } from 'vue';

import { formatDateInput, isMobile } from '@/shared/helpers';
import Icon from '@/stories/components/Icon/Icon.vue';
import TooltipOld from '@/stories/components/TooltipOld/TooltipOld.vue';

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
  label: string;
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
  set: value => {
    if (isMobile()) return value;
    return formatDateInput(value);
  },
});

const field = useTemplateRef<HTMLInputElement>('field');

const inputType = computed(() => (isMobile() ? 'date' : 'text'));

const showCalendarIcon = computed(() => inputType.value === 'text');

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
    margin-bottom: 5px;

    label {
      font-weight: 700;
    }

    [data-component='TooltipOld'] {
      margin-left: 5px;
    }

    + [data-component='Icon'] {
      color: var(--grey-4);
      left: var(--field-spacing-x);

      + input {
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
