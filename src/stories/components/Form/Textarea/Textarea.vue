<template>
  <div data-component="Textarea" class="form-field">
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

    <textarea
      ref="field"
      v-model="model"
      :aria-invalid="!field?.validity?.valid"
      :name="name"
      :id="name"
      :rows="rows"
      :cols="cols"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="input"
    ></textarea>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type TextareaHTMLAttributes, useTemplateRef } from 'vue';

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
  name: TextareaHTMLAttributes['name'];
  required?: TextareaHTMLAttributes['required'];
  minlength?: TextareaHTMLAttributes['minlength'];
  maxlength?: TextareaHTMLAttributes['maxlength'];
  placeholder?: TextareaHTMLAttributes['placeholder'];
  rows?: TextareaHTMLAttributes['rows'];
  cols?: TextareaHTMLAttributes['cols'];
  disabled?: TextareaHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const {
  info,
  label,
  name,
  required,
  minlength,
  maxlength,
  placeholder,
  rows = '4',
  cols,
  disabled,
  input,
} = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLTextAreaElement>('field');

// EXPOSE
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Textarea'] {
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
    }
  }

  .label-wrapper + [data-component='Icon'] {
    left: var(--field-spacing-x);
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

  textarea {
    font-family: var(--font-primary);
    font-size: var(--font-size);
    display: block;
    width: 100%;
    padding: var(--field-spacing-x);
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
