import { render } from '@testing-library/react';
import { PageNotFoundError } from '.';
import * as selectors from './selectors';

describe('PageNotFoundError', () => {
  it('should render the redirect to homepage btn', () => {
    const { getByTestId } = render(<PageNotFoundError />);

    expect(getByTestId(selectors.redirectBtn)).toBeInTheDocument();

    expect(getByTestId(selectors.redirectBtn)).toHaveAttribute('href', '/');
  });
});
