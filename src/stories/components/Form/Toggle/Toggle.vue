<template>
  <div data-component="Toggle">
    <label :for="name">
      {{ label }} <span>{{ optionText }}</span>

      <TooltipOld v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </TooltipOld>

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

type ToggleOption = { text?: string; value: string | number | boolean };

type Props = {
  info?: {
    text: string;
    maxWidth?: string;
    position?: Position;
  };
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
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Toggle'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);
  font-weight: 700;

  &:not(:has(:disabled)) {
    label,
    input {
      cursor: pointer;
    }
  }

  label {
    @extend %flex-vertical-center;
    width: 100%;

    > [data-component='Icon'] {
      background-color: var(--grey-2);
      border-radius: 6px;
      margin-right: 5px;
      @include transitionAll();

      svg {
        @include square(70%);
        fill: var(--grey-6);
      }
    }

    span {
      font-weight: 400;
      margin-left: 5px;
    }

    [data-component='TooltipOld'] {
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
        background-color: var(--grey-2);

        &,
        &::after {
          border-radius: 50px;
          @include transitionAll();
        }

        &::after {
          content: '';
          @include square(22px);
          background-color: var(--grey-6);
          @extend %absolute-vertical-center;
        }
      }
    }

    &:has(:checked) {
      > [data-component='Icon'] {
        background-color: color.adjust(#43b883, $lightness: 15%);

        svg {
          fill: var(--primary);
        }
      }

      .input-wrapper {
        .toggle {
          background-color: color.adjust(#43b883, $lightness: 15%);

          &::after {
            translate: 100% -50%;
            background-color: var(--primary);
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
    color: var(--danger);
    margin: 5px 0 0 0;
  }

  &:not(:has(:user-invalid)) {
    .validation-message {
      display: none;
    }
  }
}
</style>
