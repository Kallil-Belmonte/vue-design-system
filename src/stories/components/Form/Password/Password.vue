<template>
  <div data-component="Password" class="form-field">
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
      <Icon name="Key" />

      <input
        ref="field"
        v-model="model"
        :aria-invalid="!field?.validity?.valid"
        :type="type"
        :name="name"
        :id="name"
        :required="required"
        :pattern="pattern"
        :minlength="minlength"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="input"
      />

      <Icon :name="eyeIcon" :color="eyeIconColor" @click="switchVisibility" />
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, ref, useTemplateRef } from 'vue';

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
  label?: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  pattern?: InputHTMLAttributes['pattern'];
  minlength?: InputHTMLAttributes['minlength'];
  maxlength?: InputHTMLAttributes['maxlength'];
  placeholder?: InputHTMLAttributes['placeholder'];
  disabled?: InputHTMLAttributes['disabled'];
  input?: InputHTMLAttributes['onInput'];
};

const {
  info,
  label = 'Password',
  name,
  required,
  pattern,
  minlength,
  maxlength,
  placeholder,
  disabled,
  input,
} = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

const type = ref('password');
const eyeIcon = ref<Icons>('EyeClosed');
const eyeIconColor = ref('#e0e0e0');

const switchVisibility = () => {
  type.value = type.value === 'password' ? 'text' : 'password';
  eyeIcon.value = eyeIcon.value === 'Eye' ? 'EyeClosed' : 'Eye';
  eyeIconColor.value =
    eyeIcon.value === 'Eye'
      ? getComputedStyle(document.documentElement).getPropertyValue('--primary')
      : '#e0e0e0';
};

// EXPOSE
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Password'] {
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
      @include square(var(--field-icon-size));
      position: absolute;
      top: 16px;

      svg {
        @include transitionAll();
      }

      &[data-name='Key'] {
        color: var(--grey-4);
        left: var(--field-spacing-x);

        + input {
          padding-left: calc(var(--field-spacing-x) + var(--field-icon-size) + 10px);
        }
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

          + [data-component='Icon'][data-name='Eye'] {
            color: var(--danger);
          }
        }
      }

      ~ [data-component='Icon'] {
        right: var(--field-spacing-x);
        cursor: pointer;
      }
    }
  }

  &:has(:user-invalid) {
    .field-wrapper {
      [data-component='Icon'][data-name='Key'] {
        color: var(--danger);
      }
    }
  }

  &:has(:focus:not(:user-invalid)) {
    .field-wrapper {
      [data-component='Icon'][data-name='Key'] {
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
