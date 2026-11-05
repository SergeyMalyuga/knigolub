import {ErrorResponse} from '@knigolub/shared';

/**
 * Нормализует любую ошибку к типу ErrorResponse.
 *
 * @param error - Любая ошибка (HTTP, Error, строка, null и т.д.).
 * @returns Нормализованный объект ErrorResponse.
 *
 * @example
 * ```typescript
 * catchError((error: unknown) => {
 *   const normalized = normalizeError(error);
 *   return of(actions.failure({ error: normalized }));
 * })
 * ```
 */
export function normalizeError(error: unknown): ErrorResponse {
  if (isErrorResponse(error)) {
    return error;
  } else if (error instanceof Error) {
    return {message: error.message};
  }
  return {message: 'Неизвестная ошибка'};
}

function isErrorResponse(body: unknown): body is ErrorResponse {
  return body !== null
    && typeof body === 'object'
    && 'message' in body
    && typeof body.message === 'string';
}
