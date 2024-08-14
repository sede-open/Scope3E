export const stubSetExtras = jest.fn();
export const stubSetUser = jest.fn();

export const withScope = jest.fn().mockImplementation(fn => {
  fn({
    setExtras: stubSetExtras,
    setUser: stubSetUser,
  });
});

export const captureException = jest.fn();
export const captureMessage = jest.fn();

export const { Severity } = jest.requireActual('@sentry/browser');
