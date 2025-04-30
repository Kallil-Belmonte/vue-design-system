/**
 * @function formatters
 */

type ArrayFormat = [number, string];

const format = (value: string[], arrayFormat: ArrayFormat[]) => {
  arrayFormat.forEach((item: ArrayFormat) => {
    const [index, stringToInsert] = item;
    if (value[index]) value.splice(index, 0, stringToInsert);
  });
  return value.join('');
};

export const formatText = (value: string) =>
  typeof value === 'string' ? value.replace(/[^a-zÀ-ÿ\s]/gi, '').replace(/\s+/g, ' ') : value;

export const formatDigit = (value: string) =>
  typeof value === 'string' ? value.replace(/\D/g, '') : value;

export const formatDateInput = (value: string) => {
  if (typeof value === 'string') {
    const result = value.replace(/\D/g, '').split('').slice(0, 8);
    return format(result, [
      [2, '/'],
      [5, '/'],
    ]);
  }

  return value;
};

export const formatCellphone = (cellphone: string, country: string) => {
  if (typeof cellphone === 'string') {
    let result = cellphone.replace(/\D/g, '').split('');

    if (country === 'United States') {
      result = result.slice(0, 10);
      return format(result, [
        [0, '('],
        [4, ')'],
        [5, ' '],
        [9, ' '],
      ]);
    }

    if (country === 'Portugal') {
      result = result.slice(0, 9);
      return format(result, [
        [0, '('],
        [3, ')'],
        [4, ' '],
        [8, ' '],
      ]);
    }

    // Brazil
    result = result.slice(0, 11);
    return format(result, [
      [0, '('],
      [3, ')'],
      [4, ' '],
      [10, ' '],
    ]);
  }

  return cellphone;
};

export const removeAccent = (text: string) =>
  typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
