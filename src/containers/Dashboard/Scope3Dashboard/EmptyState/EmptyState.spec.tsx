import { render } from '@testing-library/react';
import { EmptyState } from '.';

import * as selectors from './selectors';

const testTitle = 'Test title';
const testSubtext = 'Testy mctest test, tests tests for testing purposes';

describe('EmptyState', () => {
  it('should render title and subtitle passed as props', async () => {
    const { getByTestId, findByTestId } = render(
      <EmptyState title={testTitle} subtext={testSubtext} />
    );

    expect(getByTestId(selectors.emptyStateWrapper)).toBeInTheDocument();
    expect(await findByTestId(selectors.emptyStateTitle)).toHaveTextContent(
      testTitle
    );
    expect(await findByTestId(selectors.emptyStateSubtext)).toHaveTextContent(
      testSubtext
    );
  });

  it('should render supply chain nav cta to with route to supply chains', async () => {
    const { getByTestId } = render(
      <EmptyState title={testTitle} subtext={testSubtext} />
    );

    expect(getByTestId(selectors.emptyStateWrapper)).toBeInTheDocument();
    expect(getByTestId(selectors.emptyStateCTA)).toHaveAttribute(
      'href',
      '/value-chain'
    );
  });
});
