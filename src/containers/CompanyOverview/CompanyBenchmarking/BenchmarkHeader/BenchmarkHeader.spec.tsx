import { fireEvent, render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';
import { container } from 'components/Modal/selectors';
import companyOverviewNamespace from '../../../../../locales/en/companyOverview.json';
import { BenchmarkHeader } from '.';
import * as selectors from '../selectors';

const setup = (mocks: any = []) => {
  return render(
    <I18nProvider
      namespaces={{
        companyOverview: companyOverviewNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <BenchmarkHeader onSelect={jest.fn()} />
      </MockedProvider>
    </I18nProvider>
  );
};
describe('BenchmarkHeader', () => {
  it('opens and closes the read more modal', async () => {
    const { findByTestId, queryByTestId } = setup();

    expect(queryByTestId(container)).not.toBeInTheDocument();

    const readMoreBtn = await findByTestId(selectors.readMoreBtn);
    fireEvent.click(readMoreBtn);
    expect(queryByTestId(container)).toBeInTheDocument();

    fireEvent.click(await findByTestId(selectors.readMoreOkBtn));
    expect(queryByTestId(container)).not.toBeInTheDocument();
  });
});
