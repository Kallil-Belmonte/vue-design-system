/**
 * @function formatters
 */

export const formatText = (value: string) =>
  typeof value === 'string' ? value.replace(/[^a-zÀ-ÿ\s]/gi, '').replace(/\s+/g, ' ') : value;

export const formatDigit = (value: string) =>
  typeof value === 'string' ? value.replace(/\D/g, '') : value;

export const removeAccent = (text: string) =>
  typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
