const NON_PRINTABLE_CHARS_REGEX = /[^ -~]+/g;
export const VALID_STRING_REGEX = /^[ -~]+$/g;

export const PATTERNS = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  exampleEmail: /@example.com$/,
};

export const escapeNonPrintableChars = (str: string) =>
  str.replace(NON_PRINTABLE_CHARS_REGEX, '');
