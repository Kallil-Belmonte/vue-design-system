<template>
  <div data-component="Password" class="form-field">
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

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, ref, useTemplateRef } from 'vue';

import type { Position } from '@/shared/files/types';
import Icon from '../Icon/Icon.vue';
import type { Icons } from '../Icon/types';
import Popover from '../Popover/Popover.vue';

type Props = {
  info?: { text: string; maxWidth?: string; position?: Position };
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  pattern?: InputHTMLAttributes['pattern'];
  minlength?: InputHTMLAttributes['minlength'];
  maxlength?: InputHTMLAttributes['maxlength'];
  placeholder?: InputHTMLAttributes['placeholder'];
  disabled?: InputHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const { info, label, name, required, pattern, minlength, maxlength, placeholder, disabled, input } =
  defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

const type = ref('password');
const eyeIcon = ref<Icons>('EyeClosed');
const eyeIconColor = ref('#e0e0e0');

const switchVisibility = () => {
  type.value = type.value === 'password' ? 'text' : 'password';
  eyeIcon.value = eyeIcon.value === 'Eye' ? 'EyeClosed' : 'Eye';
  eyeIconColor.value = eyeIcon.value === 'Eye' ? '#8fa1fe' : '#e0e0e0';
};

// EXPOSE
defineExpose({ field });
</script>
