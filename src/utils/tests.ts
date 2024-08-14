import { act, fireEvent, within } from '@testing-library/react';
import { QueryContainer } from 'containers/types';
import selectEvent from 'react-select-event';
import { CompanySectorType } from 'types/globalTypes';

export const getSerialisedExpects = (expectFns: any) =>
  expectFns.reduce(async (acc: any, expectFn: any) => {
    await acc;
    return expectFn();
  }, Promise.resolve());

export const getSelectCompanySectors = async ({
  findByLabelText,
  findByTestId,
  submitButton,
}: {
  findByLabelText: any;
  findByTestId: any;
  submitButton: HTMLElement;
}) => {
  const primarySectorInput = await findByLabelText('Primary sector');
  const primarySectorInputContainer = await findByTestId(
    `${CompanySectorType.PRIMARY}-field-container`
  );
  const secondarySectorInput = await findByLabelText('Secondary sector', {
    exact: false,
  });
  const secondarySectorInputContainer = await findByTestId(
    `${CompanySectorType.SECONDARY}-field-container`
  );

  const constructionMaterialsLabel = 'Construction Materials';
  const chemicalsLabel = 'Chemicals';
  const oilGasLabel = 'Oil and Gas';

  selectEvent.openMenu(secondarySectorInput);

  // Secondary
  expect(
    await within(secondarySectorInputContainer).findByText(
      constructionMaterialsLabel
    )
  ).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(
      await within(secondarySectorInputContainer).findByText(
        constructionMaterialsLabel
      )
    );
  });
  expect(submitButton).toBeDisabled();

  // Primary
  selectEvent.openMenu(primarySectorInput);
  expect(
    await within(primarySectorInputContainer).queryByText(
      constructionMaterialsLabel
    )
  ).not.toBeInTheDocument();
  expect(
    await within(primarySectorInputContainer).queryByText(chemicalsLabel)
  ).not.toBeInTheDocument();
  await act(async () => {
    fireEvent.click(
      await within(primarySectorInputContainer).findByText(oilGasLabel)
    );
  });
  expect(submitButton).not.toBeDisabled();
  selectEvent.openMenu(primarySectorInput);
  await act(async () => {
    fireEvent.click(await within(primarySectorInputContainer).findByText('--'));
  });
  expect(submitButton).toBeDisabled();
  selectEvent.openMenu(primarySectorInput);
  await act(async () => {
    fireEvent.click(
      await within(primarySectorInputContainer).findByText(oilGasLabel)
    );
  });
};

export const createQueryContainer = <T>(
  overrides: Partial<QueryContainer<T>> & { data: T }
): QueryContainer<T> => ({
  loading: false,
  ...overrides,
});
