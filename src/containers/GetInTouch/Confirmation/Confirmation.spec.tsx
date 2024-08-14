import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import { solutionsCard } from 'components/SolutionsDisplay/selectors';
import * as selectors from 'containers/GetInTouch/selectors';

import publicSolutionsNamespace from '../../../../locales/en/publicSolutions.json';

import { Confirmation } from '.';

const setup = () =>
  render(
    <I18nProvider
      namespaces={{
        publicSolutions: publicSolutionsNamespace,
      }}
    >
      <Confirmation />
    </I18nProvider>
  );

describe('Confirmation page', () => {
  it('should render the page graphic', () => {
    const { getByTestId } = setup();
    expect(getByTestId(selectors.pageGraphic)).toBeInTheDocument();
  });

  it('should render three solutionsCards', () => {
    const { getAllByTestId } = setup();
    expect(getAllByTestId(solutionsCard)).toHaveLength(3);
  });
});
