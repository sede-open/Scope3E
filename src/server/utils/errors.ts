// eslint-disable-next-line max-classes-per-file
export const getSanitizedErrorMessage = (regularExpressions: RegExp[]) => (
  error: Error
) =>
  regularExpressions.reduce(
    (acc, expression) => acc.replace(expression, '[redacted]'),
    error.message
  );

export class HttpError extends Error {
  public statusCode?: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class HttpTimeoutError extends HttpError {
  constructor(message: string) {
    super(408, message);
    Object.setPrototypeOf(this, HttpTimeoutError.prototype);
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string) {
    super(401, message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorisationError extends HttpError {
  constructor(message: string) {
    super(403, message);
    Object.setPrototypeOf(this, AuthorisationError.prototype);
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
