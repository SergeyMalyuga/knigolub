export function dateValidator(value: string | null): { kind: string; message: string } | null {
  if (!value) return null;

  const date = new Date(value);
  const isValidDate = date instanceof Date && !isNaN(date.getTime());

  return isValidDate ? null : { kind: 'invalidDate', message: 'Неверная дата' };
}
