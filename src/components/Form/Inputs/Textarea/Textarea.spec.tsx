import { render, fireEvent } from '@testing-library/react';
import { VALID_STRING_REGEX } from '../../utils';
import { Textarea } from '.';

describe('Textarea', () => {
  it('sanitises the textarea input once non printable chars on input', async () => {
    const TEST_ID = 'textarea-test-id';
    // What we have in the string: See&nbsp;what's hidden in your string…	or be&ZeroWidthSpace;hind&#xFEFF;
    const INPUT_WITH_NON_PRINTABLE_CHARS =
      "See  what's hidden in your string…	 or be​hind﻿";

    const handleChange = jest.fn();
    const { findByTestId } = render(
      <Textarea
        id="textarea-id"
        name="textarea-name"
        dataTestId={TEST_ID}
        maxLength={256}
        onChange={handleChange}
        value=""
      />
    );

    await fireEvent.input(await findByTestId(TEST_ID), {
      target: { value: INPUT_WITH_NON_PRINTABLE_CHARS },
    });

    // The first argument of the first call to the function was a Valid string;
    expect(handleChange.mock.calls[0][0]).toMatch(VALID_STRING_REGEX);
  });
});
