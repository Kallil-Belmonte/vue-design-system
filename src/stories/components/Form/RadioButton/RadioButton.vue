<template>
  <div data-component="RadioButton" class="form-field">
    <div class="title-wrapper">
      <p class="title">{{ title }}</p>
      <Tooltip v-if="info?.text" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </Tooltip>
    </div>

    <div v-for="radio in radios" :key="radio.label" class="item">
      <label :for="radio.value">{{ radio.label }}</label>
      <input
        ref="field"
        v-model="model"
        :aria-invalid="!field?.validity?.valid"
        type="radio"
        :name="name"
        :id="radio.value"
        :value="radio.value"
        :required="required"
        :disabled="disabled"
        @change="(event: Event) => change?.((event.target as HTMLInputElement).value, event)"
      />
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

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

type Radio = { label: string; value: string };

type Props = {
  info?: {
    text: string;
    maxWidth?: string;
    position?: Position;
  };
  title: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  disabled?: InputHTMLAttributes['disabled'];
  radios: Radio[];
  change?: (value: string, event: Event) => void;
};

const { info, title, name, required, disabled, radios, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='RadioButton'] {
  font-family: var(--font-primary);
  font-size: var(--font-size);
  color: var(--text-color);

  .title-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 5px;

    .title {
      font-weight: 700;
      margin: 0;
    }

    [data-component='Tooltip'] {
      margin-left: 5px;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &:not(:has(:disabled)) {
      label,
      input {
        cursor: pointer;
      }
    }

    input {
      appearance: none;
      @include square(18px, 50%);
      border: 2px solid var(--primary);
      margin: 0;
      position: relative;

      &::after {
        content: '';
        @include square(0, 50%);
        background-color: var(--primary);
        @extend %absolute-center;
        @include transitionAll(0.2s);
      }

      &:checked {
        border-color: var(--primary);

        &::after {
          @include square(9px);
        }
      }

      &:user-invalid {
        border-color: var(--danger);
      }

      &:disabled {
        opacity: 0.5;
      }
    }
  }

  .validation-message {
    color: var(--danger);

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
