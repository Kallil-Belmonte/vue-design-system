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

export const removeAccent = (text: string) =>
  typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
