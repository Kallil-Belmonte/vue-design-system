<template>
  <div data-component="Cellphone" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label || text('Cell phone') }}</label>
      <Popover v-if="info" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #popover>
          {{ info.text }}
        </template>
      </Popover>
    </div>

    <Icon name="Telephone" />

    <div class="prefix-select">
      <button
        type="button"
        :title="language?.country"
        @click="openPrefixSelect"
        @focusout="closePrefixSelect"
      >
        <Icon v-if="language" :name="language.icon" category="Flag" />
        <Icon name="ArrowDown" size="15px" />
      </button>
      <div role="listbox" :aria-label="text('Prefix')" v-show="showPrefixSelect">
        <div
          v-for="languageItem in LANGUAGES"
          :key="languageItem.value"
          role="option"
          :aria-selected="isPrefixSelect(languageItem)"
          @click="selectPrefixOption(languageItem)"
        >
          <Icon :name="languageItem.icon" category="Flag" size="33px" />
          {{ languageItem.text }} {{ languageItem.prefix }}
        </div>
      </div>
    </div>

    <input
      ref="field"
      v-model="model"
      :aria-invalid="!field?.validity?.valid"
      type="tel"
      :name="name"
      :id="name"
      :required="required"
      :minlength="language?.phonePlaceholder.length"
      :maxlength="language?.phonePlaceholder.length"
      :placeholder="language?.phonePlaceholder"
      :disabled="disabled"
      @input="input"
    />
    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, onMounted, ref, useTemplateRef } from 'vue';

import text from '@/core/languages/text';
import { type LanguageData, LANGUAGES } from '@/shared/files/consts';
import type { Position } from '@/shared/files/types';
import { formatCellphone } from '@/shared/helpers';
import Icon from '../Icon/Icon.vue';
import Popover from '../Popover/Popover.vue';

type Props = {
  info?: { text: string; maxWidth?: string; position?: Position };
  label?: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  disabled?: InputHTMLAttributes['disabled'];
  selectPrefix: (language: LanguageData) => void;
  input?: (payload: Event) => void;
};

const { info, label, name, required, disabled, selectPrefix, input } = defineProps<Props>();

const [model] = defineModel<string>({
  required: true,
  set: value => format(value),
});

const field = useTemplateRef<HTMLInputElement>('field');

const showPrefixSelect = ref(false);
const language = ref<LanguageData>();

const isPrefixSelect = (value: LanguageData) => value.country === language.value?.country;

const openPrefixSelect = () => {
  showPrefixSelect.value = true;
};

const closePrefixSelect = () => {
  setTimeout(() => {
    showPrefixSelect.value = false;
  }, 100);
};

const selectPrefixOption = (value: LanguageData) => {
  language.value = value;
  selectPrefix(value);
};

const format = (value: string) => formatCellphone(value, language.value?.country || 'Brazil');

const setData = () => {
  const hasPrefix = model.value.startsWith('+');

  if (hasPrefix) {
    language.value = LANGUAGES.find(({ prefix }) => prefix === model.value.slice(0, 3));
    model.value = format(model.value.slice(3));
  } else {
    language.value = LANGUAGES[0];
    selectPrefix(LANGUAGES[0]);
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setData();
});

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Cellphone'].form-field {
  .prefix-select {
    position: absolute;
    top: 38px;
    left: 42px;
    cursor: pointer;

    button,
    [role='listbox'],
    [data-component='Icon'][data-category='flag'] svg {
      border-radius: 4px;
    }

    button,
    [role='listbox'] {
      border: 1px solid $field-border-color;
    }

    button {
      @extend %flex-vertical-center;
      column-gap: 5px;
      @include size(50px, 30px);
      padding: 2px;
      @include transitionAll();

      &:hover,
      &:focus {
        border-color: $primary;
      }
    }

    [role='listbox'] {
      width: max-content;
      max-width: 295px;
      background-color: #fff;
      position: absolute;
      top: 33px;
      z-index: 1;

      [role='option'] {
        @extend %flex-vertical-center;
        padding: 5px;
        @include transitionAll();

        &:hover {
          background-color: $field-border-color;
        }

        [data-component='Icon'] {
          margin-right: 5px;
        }
      }
    }
  }

  input {
    padding-left: 95px;
  }
}
</style>
