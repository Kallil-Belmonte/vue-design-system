<template>
  <div ref="element" data-component="Select" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <Tooltip v-if="info && model" :maxWidth="info.maxWidth" :position="info.position">
        <template #default>
          <Icon name="Info" size="18px" color="#cbcbcb" />
        </template>
        <template #tooltip>
          {{ info.text }}
        </template>
      </Tooltip>
    </div>

    <template v-if="isMobile()">
      <select
        ref="field"
        v-model="model"
        :aria-invalid="!field?.validity?.valid"
        :id="name"
        :name="name"
        :required="required"
        :disabled="disabled"
      >
        <option value="select" disabled>Select</option>
        <option
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          @click="event => change?.(option, event)"
        >
          {{ option.text }}
        </option>
      </select>
    </template>
    <template v-else>
      <div class="field-wrapper" :tabindex="disabled ? -1 : 0">
        <Tooltip
          ref="tooltip"
          trigger="click"
          closeOnTooltipClick
          position="bottom"
          maxWidth="none"
          spacing="0px"
        >
          <template #default>
            <input
              ref="field"
              v-model="model"
              :aria-invalid="!field?.validity?.valid"
              type="text"
              :name="name"
              :id="name"
              :required="required"
              placeholder="Select"
              :disabled="disabled"
              @input="search"
            />
            <Button
              mode="contain"
              variant="blank"
              :icon="{ name: 'ArrowDown', size: '15px' }"
              :disabled="disabled"
              @focus="setValue"
            />
          </template>
          <template #tooltip>
            <ul role="listbox" aria-label="Options">
              <li
                v-for="option in filteredOptions"
                :key="option.value"
                role="option"
                :tabindex="disabled || option.disabled ? -1 : 0"
                :aria-selected="isSelected(option)"
                :aria-disabled="option.disabled"
                @keyup.enter="event => select(option, event)"
                @click="event => select(option, event)"
              >
                {{ option.text }}
              </li>
            </ul>
          </template>
        </Tooltip>
      </div>
    </template>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  type InputHTMLAttributes,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watchEffect,
} from 'vue';

import { useElementBounding } from '@/shared/composables';
import { isEqual, isMobile, removeAccent } from '@/shared/helpers';
import Button from '@/stories/components/Button/Button.vue';
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

type SelectOption = {
  text: string;
  value: any;
  disabled?: boolean;
};

type Props = {
  info?: { text: string; maxWidth?: string; position?: Position };
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  value: any;
  options: SelectOption[];
  disabled?: InputHTMLAttributes['disabled'];
  change: (option: SelectOption, event: KeyboardEvent | FocusEvent | MouseEvent) => void;
};

const {
  info,
  label,
  name,
  required,
  value: valueProp,
  options,
  disabled: disabledProp,
  change,
} = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const tooltip = useTemplateRef<{ element: HTMLDivElement; tooltip: HTMLElement }>('tooltip');

const field = useTemplateRef<HTMLInputElement | HTMLSelectElement>('field');

const fieldRect = useElementBounding(field);

const model = ref<string>('');
const filteredOptions = ref<Props['options']>([]);

const fieldWidth = computed(() => `${fieldRect.width.value}px`);

const disabled = computed(() => disabledProp || !options.length);

const isSelected = (option: SelectOption) => option.text === model.value;

const format = (text: string) => removeAccent(text.toLowerCase());

const select = (option: SelectOption, event: KeyboardEvent | FocusEvent | MouseEvent) => {
  if (option.disabled) return;
  change(option, event);
};

const search = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  filteredOptions.value = options.filter(option => format(option.text).includes(format(value)));
};

const updateModel = () => {
  const option = options.find(item => isEqual(item.value, valueProp));
  model.value = option?.text || '';
};

const updateFilteredOptions = () => {
  filteredOptions.value = options;
};

const setValue = (event: FocusEvent | MouseEvent) => {
  const option = options.find(item => format(item.text) === format(model.value)) || {
    text: '',
    value: undefined,
  };
  change(option, event);
  updateModel();
  updateFilteredOptions();
};

const documentListener = (event: MouseEvent) => {
  if (!tooltip.value?.element.contains(event.target as HTMLElement)) {
    setValue(event);
  }
};

// LIFECYCLE HOOKS
watchEffect(() => {
  updateModel();
});

watchEffect(() => {
  updateFilteredOptions();
});

onMounted(() => {
  document.addEventListener('click', documentListener);
});

onUnmounted(() => {
  document.removeEventListener('click', documentListener);
});

// EXPOSE
defineExpose({
  /** Element ref */
  element,
  /** Field ref */
  field,
});
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='Select'].form-field {
  .field-wrapper {
    input {
      padding: 0 35px 0 var(--field-spacing-x);
    }

    [data-component='Button'] {
      transition: rotate 0.3s ease;
      @include position(absolute, 18px, 15px);
    }

    &:has([data-subcomponent='PopoverContent']:popover-open) {
      [data-component='Button'] {
        rotate: 180deg;
      }
    }

    [data-subcomponent='PopoverContent'] {
      padding: 0;
      border-radius: 0;
      box-shadow: none;
      background-color: transparent;

      [role='listbox'] {
        width: v-bind(fieldWidth);
        max-height: 202px;
        border-radius: 4px;
        border: 1px solid var(--field-border-color);
        overflow-y: auto;

        [role='option'] {
          @extend %flex-vertical-center;
          height: 40px;
          padding: 5px;
          background-color: #fff;
          cursor: pointer;
          @include transitionAll();
          margin: 0;

          &:hover,
          &[aria-selected='true'] {
            background-color: var(--field-border-color);
          }

          &[aria-disabled='true'] {
            pointer-events: none;
            background-color: #fafafa;
          }
        }
      }
    }
  }
}
</style>
