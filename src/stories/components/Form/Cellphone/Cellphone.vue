<template>
  <div data-component="Cellphone" class="form-field">
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
      <Icon name="Telephone" />

      <Tooltip
        class="prefix-select"
        animation="fade"
        trigger="click"
        closeOnTooltipClick
        spacing="1px"
        position="bottom-start"
        :showClose="false"
      >
        <template #default>
          <button type="button" :title="countryData?.country">
            <Icon v-if="countryData" :name="countryData.icon" category="Flag" />
            <Icon name="ArrowDown" size="15px" />
          </button>
        </template>
        <template #tooltip>
          <div role="listbox" aria-label="Prefix">
            <div
              v-for="countryItem in COUNTRIES_DATA"
              :key="countryItem.value"
              role="option"
              :aria-selected="isPrefixSelect(countryItem)"
              @click="selectPrefixOption(countryItem)"
            >
              <Icon :name="countryItem.icon" category="Flag" size="30px" />
              {{ countryItem.text }} {{ countryItem.prefix }}
            </div>
          </div>
        </template>
      </Tooltip>

      <input
        ref="field"
        v-model="model"
        :aria-invalid="!field?.validity?.valid"
        type="tel"
        :name="name"
        :id="name"
        :required="required"
        :minlength="countryData?.phonePlaceholder.length"
        :maxlength="countryData?.phonePlaceholder.length"
        :placeholder="countryData?.phonePlaceholder"
        :disabled="disabled"
        @input="input"
      />
    </div>

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
  disabled?: InputHTMLAttributes['disabled'];
  selectPrefix: (language: CountryData) => void;
  input?: InputHTMLAttributes['onInput'];
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

type CountryData = {
  icon: Flag;
  text: string;
  country: string;
  language: string;
  value: Language;
  prefix: string;
  phonePlaceholder: string;
  datePlaceholder: string;
};

const COUNTRIES_DATA: CountryData[] = [
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

const countryData = ref<CountryData>();

const isPrefixSelect = (value: CountryData) => value.country === countryData.value?.country;

const selectPrefixOption = (value: CountryData) => {
  countryData.value = value;
  model.value = '';
  selectPrefix(value);
};

const format = (value: string) => formatCellphone(value, countryData.value?.country || 'Brazil');

const setData = () => {
  const hasPrefix = model.value.startsWith('+');

  if (hasPrefix) {
    countryData.value = COUNTRIES_DATA.find(({ prefix }) => prefix === model.value.slice(0, 3));
    model.value = format(model.value.slice(3));
  } else {
    countryData.value = COUNTRIES_DATA[0];
    selectPrefix(COUNTRIES_DATA[0]);
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

  --prefix-width: 50px;

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

    > [data-component='Icon'] {
      color: var(--grey-4);
      @include square(var(--field-icon-size));
      position: absolute;
      top: 16px;
      left: var(--field-spacing-x);

      svg {
        @include transitionAll();
      }
    }

    .prefix-select {
      @include position(absolute, 10px, auto, auto, 42px);

      button {
        @extend %flex-vertical-center;
        column-gap: 2px;
        @include size(var(--prefix-width), 30px);
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

      > [popover] {
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

    input {
      font-family: var(--font-primary);
      font-size: var(--font-size);
      display: block;
      @include size(100%, var(--field-height));
      padding: 0 var(--field-spacing-x) 0
        calc(var(--field-spacing-x) + var(--field-icon-size) + var(--prefix-width) + 10px);
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
        }
      }
    }
  }

  &:has(:user-invalid) {
    .field-wrapper {
      [data-component='Icon'] {
        color: var(--danger);
      }
    }
  }

  &:has(:focus:not(:user-invalid)) {
    .field-wrapper {
      [data-component='Icon'] {
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
