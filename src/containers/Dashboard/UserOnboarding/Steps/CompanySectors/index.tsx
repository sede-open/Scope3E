import useTranslation from 'next-translate/useTranslation';

import Dropdown, { FetchDataArgs } from 'components/Dropdown';
import { CompanySectorType } from 'types/globalTypes';
import { SectorsQuery } from 'types/SectorsQuery';
import {
  ChangeCompanySector,
  CompanySectorsState,
  sectorsToListItems,
  getPlaceholderOption,
} from 'utils/userOnboarding';
import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { DropdownListItem } from 'components/Dropdown/DropdownList';
import { QueryContainer } from 'containers/types';
import {
  useSectorsQuery,
  defaultPageSize,
  allResultsFetched,
  isValidSearchQuery,
} from 'queries/sectors';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../../selectors';

interface IProps {
  navigateBackFn: (() => void) | null;
  navigateForwardFn: () => void;
  onChange: ({ sectorType, value }: ChangeCompanySector) => void;
  state: CompanySectorsState;
}

export const CompanySectors = ({
  navigateBackFn,
  navigateForwardFn,
  onChange,
  state,
}: IProps) => {
  const { t } = useTranslation();

  const { fetchMore } = useSectorsQuery();
  const getNextSectors = async ({
    search,
    start,
  }: FetchDataArgs): Promise<QueryContainer<SectorsQuery>> => {
    const pageNumber = Math.ceil(start / defaultPageSize) + 1;

    if (allResultsFetched(start, defaultPageSize)) {
      return {
        data: {
          sectors: [],
        },
        loading: false,
      };
    }

    const searchTerm = isValidSearchQuery(search) ? search : null;

    return fetchMore({
      variables: {
        pageNumber: search ? 1 : pageNumber,
        pageSize: defaultPageSize,
        searchTerm,
      },
    });
  };

  const formatSectorsToListItems = ({ sectors }: SectorsQuery) =>
    sectorsToListItems(sectors);

  const primarySectorValue = {
    id: state[CompanySectorType.PRIMARY].id,
    label: state[CompanySectorType.PRIMARY].name,
  };

  const secondarySectorValue = {
    id: state[CompanySectorType.SECONDARY].id,
    label: state[CompanySectorType.SECONDARY].name,
  };

  return (
    <>
      <StyledComponents.UserOnboardingCardSectors>
        <StyledComponents.StepTitle>
          {t('userOnboarding:company-sectors-title')}
        </StyledComponents.StepTitle>
        <StyledComponents.StepIntro>
          {t('userOnboarding:company-sectors-intro')}
        </StyledComponents.StepIntro>

        <FormField testIdPrefix={CompanySectorType.PRIMARY}>
          <>
            <InputLabel htmlFor={CompanySectorType.PRIMARY}>
              {t(
                `userOnboarding:company-sector-label-${[
                  CompanySectorType.PRIMARY,
                ]}`
              )}
            </InputLabel>
            <Dropdown<SectorsQuery>
              fetchData={getNextSectors}
              dataToListItems={formatSectorsToListItems}
              placeholder={getPlaceholderOption(t)}
              initialSelected={primarySectorValue}
              onSelectedChange={(item: DropdownListItem) => {
                onChange({
                  value: item,
                  sectorType: CompanySectorType.PRIMARY,
                });
              }}
              dataTestIdPrefix={CompanySectorType.PRIMARY}
            />
          </>
        </FormField>

        <FormField testIdPrefix={CompanySectorType.SECONDARY}>
          <>
            <InputLabel htmlFor={CompanySectorType.SECONDARY} isOptional>
              {t(
                `userOnboarding:company-sector-label-${[
                  CompanySectorType.SECONDARY,
                ]}`
              )}
            </InputLabel>
            <Dropdown<SectorsQuery>
              fetchData={getNextSectors}
              dataToListItems={formatSectorsToListItems}
              placeholder={getPlaceholderOption(t)}
              initialSelected={secondarySectorValue}
              onSelectedChange={(item: DropdownListItem) => {
                onChange({
                  value: item,
                  sectorType: CompanySectorType.SECONDARY,
                });
              }}
              isNullable
              dataTestIdPrefix={CompanySectorType.SECONDARY}
            />
          </>
        </FormField>

        <StyledComponents.StepNavigation>
          {navigateBackFn !== null && (
            <StyledComponents.BackButton onClick={navigateBackFn}>
              {t('userOnboarding:step-back-button')}
            </StyledComponents.BackButton>
          )}

          <StyledComponents.NextButton
            data-testid={selectors.submitButton}
            disabled={!primarySectorValue.id}
            onClick={navigateForwardFn}
          >
            {t('userOnboarding:company-sectors-submit')}
          </StyledComponents.NextButton>
        </StyledComponents.StepNavigation>
      </StyledComponents.UserOnboardingCardSectors>
    </>
  );
};
