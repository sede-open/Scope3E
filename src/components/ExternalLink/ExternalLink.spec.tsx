import { fireEvent, render, waitFor } from '@testing-library/react';
import * as disclaimerSelectors from 'components/ExternalLinkDisclaimer/selectors';

import { ExternalLink, IProps } from '.';

const link = 'iamexternallink.com';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    link,
    children: 'children',
    ...overrides,
  };
  return render(<ExternalLink {...props} />);
};

describe('ExternalLink', () => {
  it('should open the Disclaimer when clicked', async () => {
    const { getByTestId, findByTestId, queryByTestId } = setup();

    expect(queryByTestId(disclaimerSelectors.container)).toBeNull();
    fireEvent.click(getByTestId('external-link-btn'));
    expect(
      await findByTestId(disclaimerSelectors.container)
    ).toBeInTheDocument();
  });

  it('should be able to close the Disclaimer', async () => {
    const { getByTestId, findByTestId, queryByTestId } = setup();

    expect(queryByTestId(disclaimerSelectors.container)).toBeNull();
    fireEvent.click(getByTestId('external-link-btn'));
    expect(
      await findByTestId(disclaimerSelectors.container)
    ).toBeInTheDocument();
    fireEvent.click(getByTestId(disclaimerSelectors.cancelButton));
    await waitFor(() =>
      expect(queryByTestId(disclaimerSelectors.container)).toBeNull()
    );
  });

  it('should allow the user to access external link via Disclaimer', async () => {
    const { getByTestId, findByTestId } = setup();

    fireEvent.click(getByTestId('external-link-btn'));
    expect(
      await findByTestId(disclaimerSelectors.continueButton)
    ).toHaveAttribute('href', link);
  });
});
