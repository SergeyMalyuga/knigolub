import {ValidationResult} from '@angular/forms/signals';

export function messageValidator(value: string): ValidationResult {
  const isValidString = value.trim().length > 0;
  return isValidString ? null : {kind: 'invalidMessage', message: 'Пустая строка'};
}
