<template>
  <div data-component="Cellphone" class="form-field">
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

    <Icon name="Telephone" />

    <TooltipOld
      class="prefix-select"
      trigger="click"
      closeOnTooltipClick
      :spacing="1"
      position="bottom-start"
      :showClose="false"
    >
      <template #default>
        <button type="button" :title="language?.country">
          <Icon v-if="language" :name="language.icon" category="Flag" />
          <Icon name="ArrowDown" size="15px" />
        </button>
      </template>
      <template #tooltip>
        <div role="listbox" aria-label="Prefix">
          <div
            v-for="languageItem in LANGUAGES"
            :key="languageItem.value"
            role="option"
            :aria-selected="isPrefixSelect(languageItem)"
            @click="selectPrefixOption(languageItem)"
          >
            <Icon :name="languageItem.icon" category="Flag" size="30px" />
            {{ languageItem.text }} {{ languageItem.prefix }}
          </div>
        </div>
      </template>
    </TooltipOld>

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

import { formatCellphone } from '@/shared/helpers';
import Icon from '@/stories/components/Icon/Icon.vue';
import type { Flag } from '@/stories/components/Icon/types';
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
  label?: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  disabled?: InputHTMLAttributes['disabled'];
  selectPrefix: (language: LanguageData) => void;
  input?: (payload: Event) => void;
};

const {
  info,
  label = 'Cell phone',
  name,
  required,
  disabled,
  selectPrefix,
  input,
} = defineProps<Props>();

const [model] = defineModel<string>({
  required: true,
  set: value => format(value),
});

const field = useTemplateRef<HTMLInputElement>('field');

type Language = 'pt-BR' | 'pt-PT' | 'en-US';

type LanguageData = {
  icon: Flag;
  text: string;
  country: string;
  language: string;
  value: Language;
  prefix: string;
  phonePlaceholder: string;
  datePlaceholder: string;
};

const LANGUAGES: LanguageData[] = [
  {
    icon: 'Brazil',
    text: 'Brasil',
    country: 'Brazil',
    language: 'Portuguese',
    value: 'pt-BR',
    prefix: '+55',
    phonePlaceholder: '(00) 00000 0000',
    datePlaceholder: 'dd/mm/yyyy',
  },
  {
    icon: 'Portugal',
    text: 'Portugal',
    country: 'Portugal',
    language: 'Portuguese',
    value: 'pt-PT',
    prefix: '+351',
    phonePlaceholder: '(00) 000 0000',
    datePlaceholder: 'dd/mm/yyyy',
  },
  {
    icon: 'UnitedStates',
    text: 'United States',
    country: 'United States',
    language: 'English',
    value: 'en-US',
    prefix: '+1',
    phonePlaceholder: '(000) 000 0000',
    datePlaceholder: 'mm/dd/yyyy',
  },
];

const language = ref<LanguageData>();

const isPrefixSelect = (value: LanguageData) => value.country === language.value?.country;

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
defineExpose({
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/helpers' as *;

[data-component='Cellphone'] {
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

  .prefix-select {
    @include position(absolute, 38px, auto, auto, 42px);

    button {
      @extend %flex-vertical-center;
      column-gap: 2px;
      @include size(50px, 30px);
      padding: 2px;
      border-radius: 4px;
      border: 1px solid var(--field-border-color);
      background-color: transparent;
      box-sizing: border-box;
      cursor: pointer;
      @include transitionAll();

      &:hover,
      &:focus {
        border-color: var(--primary);
      }
    }

    [data-subcomponent='TooltipOldContent'] {
      width: max-content;
      padding: 0;

      [role='listbox'] {
        background-color: #fff;

        [role='option'] {
          @extend %flex-vertical-center;
          padding: 5px;
          cursor: pointer;
          @include transitionAll();

          &:hover {
            background-color: var(--field-border-color);
          }

          [data-component='Icon'] {
            margin-right: 5px;
          }
        }
      }
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
    padding: 0 var(--field-spacing-x) 0 95px;
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
