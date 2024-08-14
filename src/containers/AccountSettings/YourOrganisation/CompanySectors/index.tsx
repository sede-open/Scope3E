import Dropdown, { FetchDataArgs } from 'components/Dropdown';
import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { Link } from 'components/Link';
import { TextBold, TextNormal } from 'components/Text';
import { QueryContainer } from 'containers/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useDebounce } from 'hooks/useDebounce';
import {
  isValidCompanySectorUpdateData,
  removeNullishCompanySectors,
  UnfilteredUpdateCompanySectorsInput,
  useUpdateCompanySectorsMutation,
} from 'mutations/companySectors';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import {
  allResultsFetched,
  defaultPageSize,
  isValidSearchQuery,
  useSectorsQuery,
} from 'queries/sectors';
import { useEffect, useRef, useState } from 'react';
import { GetMe_me_company_companySectors } from 'types/GetMe';
import {
  CompanySectorType,
  UpdateCompanySectorsInput,
} from 'types/globalTypes';
import { SectorsQuery } from 'types/SectorsQuery';
import { companySectorForSectorType } from 'utils/companySectors';
import { captureException } from 'utils/logging';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { getPlaceholderOption, sectorsToListItems } from 'utils/userOnboarding';
import * as selectors from '../../selectors';
import * as StyledComponents from '../styledComponents';

export const AccountSettingsCompanySectors = () => {
  const { t } = useTranslation();
  const { company, canEditCompanySectors } = useAuthenticatedUser();
  const { companySectors, id: companyId } = company ?? {
    companySectors: [],
    companyId: null,
  };

  if (!companyId) {
    return null;
  }

  const { fetchMore } = useSectorsQuery();

  const getNextSectors = async ({
    search,
    start,
  }: FetchDataArgs): Promise<QueryContainer<SectorsQuery>> => {
    const pageNumber = Math.ceil(start / defaultPageSize) + 1;

    /* Return a null set if all data is loaded */
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

  const firstUpdate = useRef(true);

  const primarySectorDefault = companySectorForSectorType<
    GetMe_me_company_companySectors
  >(CompanySectorType.PRIMARY, companySectors);

  const secondarySectorDefault = companySectorForSectorType<
    GetMe_me_company_companySectors
  >(CompanySectorType.SECONDARY, companySectors);

  const [primarySector, setPrimarySector] = useState({
    label: primarySectorDefault?.name ?? '',
    id: primarySectorDefault?.id,
  });

  const [secondarySector, setSecondarySector] = useState({
    label: secondarySectorDefault?.name ?? '',
    id: secondarySectorDefault?.id,
  });

  const debouncedSectorUpdateEffect = useDebounce([
    primarySector.id,
    secondarySector.id,
  ]);

  const mutationOptions = {
    onError: (err: Error) => {
      captureException(err);
      displayErrorMessage({
        title: t(
          'accountSettings:your-organisation-update-company-sectors-error-title'
        ),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t(
          'accountSettings:your-organisation-update-company-sectors-success-title'
        ),
      });
    },
  };

  const [updateCompanySectors] = useUpdateCompanySectorsMutation(
    mutationOptions
  );

  useEffect(() => {
    debouncedSectorUpdateEffect(async () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      const data: UnfilteredUpdateCompanySectorsInput = {
        companyId,
        sectors: [
          {
            id: primarySector.id,
            sectorType: CompanySectorType.PRIMARY,
          },
          {
            id: secondarySector.id,
            sectorType: CompanySectorType.SECONDARY,
          },
        ],
      };

      if (!isValidCompanySectorUpdateData(data)) {
        return;
      }

      const filteredInput: UpdateCompanySectorsInput = {
        ...data,
        sectors: data.sectors.filter(removeNullishCompanySectors),
      };
      await updateCompanySectors({
        variables: {
          companySectorsInput: filteredInput,
        },
      });
    }, 1000);
  }, [debouncedSectorUpdateEffect]);

  const formatSectorsToListItems = ({ sectors }: SectorsQuery) =>
    sectorsToListItems(sectors);

  return (
    <StyledComponents.YourOrganisationPanelWrapper
      data-testid={selectors.yourOrganisationCompanySectors}
    >
      <StyledComponents.HeaderContainer>
        <TextBold>
          {t('accountSettings:your-organisation-company-sectors-header')}
        </TextBold>
      </StyledComponents.HeaderContainer>
      <StyledComponents.SubHeaderContainer>
        <TextNormal>
          <Trans
            components={[
              <Link
                href={`mailto:${t('common:support-email')}`}
                target="_blank"
              />,
            ]}
            i18nKey="accountSettings:your-organisation-company-sectors-sub-header"
          />
        </TextNormal>
      </StyledComponents.SubHeaderContainer>
      <StyledComponents.PanelBodyContainer flexDirection="column">
        <FormField testIdPrefix={CompanySectorType.PRIMARY}>
          <>
            <InputLabel htmlFor={CompanySectorType.PRIMARY}>
              {t(
                `accountSettings:company-sector-label-${[
                  CompanySectorType.PRIMARY,
                ]}`
              )}
            </InputLabel>
            <Dropdown<SectorsQuery>
              fetchData={getNextSectors}
              dataToListItems={formatSectorsToListItems}
              placeholder={getPlaceholderOption(t)}
              initialSelected={primarySector}
              onSelectedChange={setPrimarySector}
              dataTestIdPrefix={CompanySectorType.PRIMARY}
              dropdownWidth="60%"
              disabled={!canEditCompanySectors}
            />
          </>
        </FormField>

        <FormField testIdPrefix={CompanySectorType.SECONDARY}>
          <>
            <InputLabel htmlFor={CompanySectorType.SECONDARY} isOptional>
              {t(
                `accountSettings:company-sector-label-${[
                  CompanySectorType.SECONDARY,
                ]}`
              )}
            </InputLabel>
            <Dropdown<SectorsQuery>
              fetchData={getNextSectors}
              dataToListItems={formatSectorsToListItems}
              placeholder={getPlaceholderOption(t)}
              initialSelected={secondarySector}
              onSelectedChange={setSecondarySector}
              isNullable
              dataTestIdPrefix={CompanySectorType.SECONDARY}
              dropdownWidth="60%"
              disabled={!canEditCompanySectors}
            />
          </>
        </FormField>
      </StyledComponents.PanelBodyContainer>
    </StyledComponents.YourOrganisationPanelWrapper>
  );
};
