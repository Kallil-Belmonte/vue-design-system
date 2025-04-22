import type { SBType } from 'storybook/internal/types';

const has = (property: any) => property !== undefined;

/**
 * @function setArgs
 * @description Retorna o objeto referente aos argumentos dos arquivos de stories.
 * @see Args {@link https://storybook.js.org/docs/react/api/arg-types}
 * @see Controls {@link https://storybook.js.org/docs/react/essentials/controls#annotation}
 */

type TArgsParams = {
  name: string;
  description: string;
  type: string;
  required?: SBType['required'];
  defaultValue?: any;
  category?: string;
  subcategory?: string;
  control: 'boolean' | 'text' | 'number' | 'color' | 'object' | 'radio' | 'select' | false;
  options?: string[] | number[];
};

type TArgs = {
  name: TArgsParams['name'];
  type: SBType;
  description: TArgsParams['description'];
  table: {
    category: TArgsParams['category'];
    subcategory: TArgsParams['subcategory'];
    defaultValue: { summary: TArgsParams['defaultValue'] };
    type: { summary: TArgsParams['type'] };
  };
  control: TArgsParams['control'];
  options?: TArgsParams['options'];
};

const setArgs = ({
  name,
  description,
  type,
  required = false,
  defaultValue,
  category,
  subcategory,
  control,
  options,
}: TArgsParams) => {
  const args: TArgs = {
    name,
    type: { name: 'string', required },
    description,
    table: {
      category,
      subcategory,
      defaultValue: { summary: defaultValue },
      type: { summary: type },
    },
    control,
  };

  if (has(options)) {
    args.options = options;
  }

  return args;
};

export default setArgs;
