import { escapeNonPrintableChars, VALID_STRING_REGEX } from './utils';

describe('Inputs utils', () => {
  describe('escapeNonPrintableChars', () => {
    it('strips out all non printable characters of the input', () => {
      // What we have in the string: See&nbsp;what's hidden in your string…	or be&ZeroWidthSpace;hind&#xFEFF;
      const INPUT_WITH_NON_PRINTABLE_CHARS =
        "See  what's hidden in your string…	 or be​hind﻿";
      const VALID_VERSION = "See what's hidden in your string or behind";

      expect(INPUT_WITH_NON_PRINTABLE_CHARS).not.toMatch(VALID_STRING_REGEX);
      expect(VALID_VERSION).toMatch(VALID_STRING_REGEX);

      expect(escapeNonPrintableChars(INPUT_WITH_NON_PRINTABLE_CHARS)).toBe(
        VALID_VERSION
      );
    });
  });
});
