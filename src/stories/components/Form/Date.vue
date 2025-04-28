<template>
  <div data-component="Date" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <Popover v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #popover>
          {{ info.text }}
        </template>
      </Popover>
    </div>

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
      :placeholder="inputPlaceholder"
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

import { location } from '@/core/state/user';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/shared/files/consts';
import type { Position } from '@/shared/files/types';
import { formatDateInput, isMobile } from '@/shared/helpers';
import Icon from '../Icon/Icon.vue';
import Popover from '../Popover/Popover.vue';

const { values } = Object;

type Props = {
  info?: { text: string; maxWidth?: string; position?: Position };
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  min?: string;
  max?: string;
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

const inputPlaceholder = computed(() => {
  const language = values(LANGUAGES).find(
    item => item.country === location.value?.country || item.value === DEFAULT_LANGUAGE,
  );
  return language?.datePlaceholder;
});

// EXPOSE
defineExpose({ field });
</script>
