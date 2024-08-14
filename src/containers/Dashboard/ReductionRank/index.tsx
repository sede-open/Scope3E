import { useCallback, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { getCurrentYear } from 'utils/date';
import { Flags, getFeatureFlag } from 'utils/featureFlags';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { useReductionRank } from 'containers/Dashboard/queries';
import { InputLabel } from 'components/InputLabel';
import { Text } from 'components/Text';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { ToggleOption } from 'components/ToggleOption';

import { trackEvent } from 'utils/analytics';
import {
  RANKING_TABLE_SECTOR_SELECTED,
  RANKING_TABLE_VERIFICATION_SELECTED,
  RANKING_TABLE_YEAR_SELECTED,
} from 'utils/analyticsEvents';
import {
  companySectorsPrimarySectorName,
  companySectorsSecondarySectorName,
} from 'utils/companySectors';
import { ReductionRankTable } from './ReductionRankTable';
import {
  doesRankHaveSector,
  doesRankHaveVerification,
  getConditionalFilter,
  getSelectOption,
  getYearOption,
  getYearOptions,
} from './utils';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

const YEAR_SELECT_ID = 'year';
const SECTOR_SELECT_ID = 'sector';
const VERIFICATION_SELECT_ID = 'verification';
export const VERIFICATION_SELECT_TOGGLE_ID = 'verification-select-toggle';

export const ReductionRank = () => {
  const isRankingTableSectorFilterEnabled = getFeatureFlag(
    Flags.IS_RANKING_TABLE_SECTOR_FILTER_ENABLED
  );

  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  if (!company) {
    return null;
  }

  const { companySectors = [] } = company;

  const { id: companyId, name: companyName } = company;

  const previousYear = getCurrentYear() - 1;
  const [selectedYear, setSelectedYear] = useState<OptionType>(
    getYearOption(previousYear)
  );

  const onSelectYear = (yearOption: OptionType) => {
    setSelectedYear(yearOption);

    trackEvent(RANKING_TABLE_YEAR_SELECTED, {
      companyName,
      companyId,
      yearRange: String(yearOption.label),
    });
  };

  const { data, refetch, loading } = useReductionRank({
    year: selectedYear.value as number,
    companyId,
  });

  useEffect(() => {
    refetch({
      year: selectedYear.value as number,
      companyId,
    });
  }, [selectedYear]);

  const ranks = data?.corporateEmissionRanks ?? [];

  // Sector filter state
  const companySectorNames = [
    companySectorsPrimarySectorName(companySectors),
    companySectorsSecondarySectorName(companySectors),
  ].filter((companySector) => !!companySector);

  const sectorSelectAllValue = t('emissionRankTable:sector-select-value-all');
  const sectorOptions = [sectorSelectAllValue, ...companySectorNames].map(
    getSelectOption
  );

  const [selectedSector, setSelectedSector] = useState<OptionType>(
    getSelectOption(sectorSelectAllValue)
  );
  const onSelectSector = (sectorOption: OptionType) => {
    setSelectedSector(sectorOption);

    trackEvent(RANKING_TABLE_SECTOR_SELECTED, {
      companyName,
      companyId,
      sector: String(sectorOption.label),
    });
  };

  // Verification filter state
  const verificationSelectAllValue = t(
    'emissionRankTable:verification-select-value-all'
  );
  const verificationSelectVerifiedValue = t(
    'emissionRankTable:verification-select-value-verified'
  );
  const verificationOptions = [
    verificationSelectAllValue,
    verificationSelectVerifiedValue,
  ].map(getSelectOption);

  const [selectedVerification, setSelectedVerification] = useState<
    OptionType | undefined
  >(getSelectOption(verificationSelectAllValue));

  const toggleSelectedVerification = useCallback(() => {
    const selectedVerificationOption = verificationOptions.find(
      ({ value }) => value !== selectedVerification?.value
    );

    setSelectedVerification(selectedVerificationOption);

    trackEvent(RANKING_TABLE_VERIFICATION_SELECTED, {
      companyName,
      companyId,
      selectedOption: String(selectedVerificationOption?.label),
    });
  }, [selectedVerification]);

  const filteredRanks = ranks
    .filter(
      getConditionalFilter(
        selectedSector.value !== sectorSelectAllValue,
        doesRankHaveSector(selectedSector.value as string)
      )
    )
    .filter(
      getConditionalFilter(
        selectedVerification?.value !== verificationSelectAllValue,
        doesRankHaveVerification
      )
    );

  const ToggleOptionMenu = () => (
    <StyledComponents.ToggleOptionMenu>
      <ToggleOption
        id={VERIFICATION_SELECT_TOGGLE_ID}
        isChecked={
          selectedVerification?.value === verificationSelectVerifiedValue
        }
        onChange={toggleSelectedVerification}
        title={t('emissionRankTable:verification-select-toggle-option-title')}
        text={t(
          'emissionRankTable:verification-select-toggle-option-description'
        )}
      />
    </StyledComponents.ToggleOptionMenu>
  );

  return (
    <StyledComponents.Wrapper data-testid={selectors.rankTable}>
      <StyledComponents.Header>
        <Text as="h2" family={exampleBold} color={Tundora} size="24px">
          {t('emissionRankTable:title')}
        </Text>

        <StyledComponents.ControlsContainer>
          <StyledComponents.SelectContainer
            data-testid={selectors.rankTableYearSelect}
          >
            <InputLabel htmlFor={YEAR_SELECT_ID} isHidden>
              {t('emissionRankTable:year-select-label')}
            </InputLabel>
            <SingleSelect
              inputId={YEAR_SELECT_ID}
              name={YEAR_SELECT_ID}
              onChange={onSelectYear}
              options={getYearOptions()}
              selectedPrefix={t('emissionRankTable:year-selected-prefix')}
              value={selectedYear}
            />
          </StyledComponents.SelectContainer>

          {isRankingTableSectorFilterEnabled && (
            <StyledComponents.SelectContainer
              data-testid={selectors.rankTableSectorSelect}
            >
              <InputLabel htmlFor={SECTOR_SELECT_ID} isHidden>
                {t('emissionRankTable:sector-select-label')}
              </InputLabel>
              <SingleSelect
                inputId={SECTOR_SELECT_ID}
                name={SECTOR_SELECT_ID}
                onChange={onSelectSector}
                options={sectorOptions}
                selectedPrefix={t('emissionRankTable:sector-selected-prefix')}
                value={selectedSector}
              />
            </StyledComponents.SelectContainer>
          )}

          <StyledComponents.SelectContainer
            data-testid={selectors.rankTableVerificationSelect}
          >
            <InputLabel htmlFor={VERIFICATION_SELECT_ID} isHidden>
              {t('emissionRankTable:verification-select-label')}
            </InputLabel>
            <SingleSelect
              components={{
                MenuList: ToggleOptionMenu,
              }}
              inputId={VERIFICATION_SELECT_ID}
              name={VERIFICATION_SELECT_ID}
              onChange={() => {}}
              options={verificationOptions}
              selectedPrefix={t(
                'emissionRankTable:verification-selected-prefix'
              )}
              value={selectedVerification}
            />
          </StyledComponents.SelectContainer>
        </StyledComponents.ControlsContainer>
      </StyledComponents.Header>
      <StyledComponents.TableContainer>
        <ReductionRankTable
          ranks={filteredRanks}
          companyName={companyName}
          isLoading={loading}
        />
      </StyledComponents.TableContainer>
    </StyledComponents.Wrapper>
  );
};
