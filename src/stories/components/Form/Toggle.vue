<template>
  <div data-component="Toggle">
    <label :for="name">
      <Icon v-if="icon" :name="icon" size="30px" /> {{ label }} <span>{{ text(optionText) }}</span>

      <Popover v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #popover>
          {{ info.text }}
        </template>
      </Popover>

      <div class="input-wrapper">
        <input
          ref="field"
          v-model="model"
          type="checkbox"
          :aria-invalid="!field?.validity?.valid"
          :name="name"
          :id="name"
          :required="required"
          :true-value="trueOption.value"
          :false-value="falseOption.value"
          :disabled="disabled"
          @change="change"
        />
        <div class="toggle"></div>
      </div>
    </label>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, computed, useTemplateRef } from 'vue';

import text from '@/core/languages/text';
import type { Position } from '@/shared/files/types';
import Icon from '../Icon/Icon.vue';
import type { Icons } from '../Icon/types';
import Popover from '../Popover/Popover.vue';

type ToggleOption = { text?: string; value: string | number | boolean };

type Props = {
  icon?: Icons;
  info?: { text: string; maxWidth?: string; position?: Position };
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  trueOption: ToggleOption;
  falseOption: ToggleOption;
  disabled?: InputHTMLAttributes['disabled'];
  change?: InputHTMLAttributes['onChange'];
};

const { info, label, name, required, trueOption, falseOption, disabled, change } =
  defineProps<Props>();

const [model] = defineModel<ToggleOption['value']>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

const optionText = computed(() => {
  const trueText = trueOption.text || 'Yes';
  const falseText = falseOption.text || 'No';
  return model.value === trueOption.value ? trueText : falseText;
});

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Toggle'] {
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:not(:has(:disabled)) {
    label,
    input {
      cursor: pointer;
    }
  }

  label {
    @extend %flex-vertical-center;
    font-weight: 700;
    width: 100%;

    > [data-component='Icon'] {
      background-color: $grey-2;
      border-radius: 6px;
      margin-right: 5px;
      @include transitionAll();

      svg {
        @include square(70%);
        fill: $grey-6;
      }
    }

    span {
      font-weight: 400;
      margin-left: 5px;
    }

    [data-component='Popover'] {
      margin-left: 5px;
    }

    .input-wrapper {
      display: inline-block;
      @include size(40px, 22px);
      margin-left: auto;
      position: relative;

      input,
      .toggle {
        @extend %absolute-center;
        width: 100%;
      }

      input {
        appearance: none;
        height: 100%;
        margin: 0;
        z-index: 1;
      }

      .toggle {
        height: 15px;
        background-color: $grey-2;

        &,
        &::after {
          border-radius: 50px;
          @include transitionAll();
        }

        &::after {
          content: '';
          @include square(22px);
          background-color: $grey-6;
          @extend %absolute-vertical-center;
        }
      }
    }

    &:has(:checked) {
      > [data-component='Icon'] {
        background-color: color.adjust($primary, $lightness: 15%);

        svg {
          fill: $primary;
        }
      }

      .input-wrapper {
        .toggle {
          background-color: color.adjust($primary, $lightness: 15%);

          &::after {
            translate: 100% -50%;
            background-color: $primary;
          }
        }
      }
    }

    &:has(:disabled) {
      &,
      input {
        cursor: not-allowed;
      }

      > [data-component='Icon'],
      .input-wrapper .toggle {
        opacity: 0.5;
      }
    }
  }

  .validation-message {
    width: 100%;
    color: $danger;
    margin: 5px 0 0 0;
  }

  &:not(:has(:user-invalid)) {
    .validation-message {
      display: none;
    }
  }
}
</style>
