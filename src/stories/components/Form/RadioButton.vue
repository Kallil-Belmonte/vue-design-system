<template>
  <div data-component="RadioButton">
    <div class="title-wrapper">
      <p class="title">{{ title }}</p>
      <Popover v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #popover>
          {{ info.text }}
        </template>
      </Popover>
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

import type { Position } from '@/shared/files/types';
import Icon from '../Icon/Icon.vue';
import Popover from '../Popover/Popover.vue';

type Props = {
  info?: { text: string; maxWidth?: string; position?: Position };
  title: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  disabled?: InputHTMLAttributes['disabled'];
  radios: { label: string; value: string }[];
  change?: (value: string, event: Event) => void;
};

const { info, title, name, required, disabled, radios, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='RadioButton'] {
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .title-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 8px;

    .title {
      font-weight: 700;
      margin: 0;
    }

    [data-component='Popover'] {
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
      border: 2px solid $primary;
      margin: 0;
      position: relative;

      &::after {
        content: '';
        @include square(0, 50%);
        background-color: $primary;
        @extend %absolute-center;
        @include transitionAll(0.2s);
      }

      &:checked {
        border-color: $primary;

        &::after {
          @include square(70%);
        }
      }

      &:user-invalid {
        border-color: $danger;
      }

      &:disabled {
        opacity: 0.5;
      }
    }
  }

  .validation-message {
    color: $danger;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
