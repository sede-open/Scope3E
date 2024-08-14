import useTranslation from 'next-translate/useTranslation';

import { InputLabel } from 'components/InputLabel';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { trackEvent } from 'utils/analytics';
import { VALUE_CHAIN_SELECT_YEAR } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const YEAR_ID = 'value-chain-year';

interface IProps {
  selectedYear: OptionType;
  setSelectedYear: (year: OptionType) => void;
  yearOptions: OptionType[];
}

export const YearSelect = ({
  selectedYear,
  setSelectedYear,
  yearOptions,
}: IProps) => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();

  const onChange = (yearOption: OptionType) => {
    trackEvent(VALUE_CHAIN_SELECT_YEAR, {
      year: yearOption.value as number,
      companyName: company?.name as string,
    });

    setSelectedYear(yearOption);
  };

  return (
    <StyledComponents.YearSelectContainer>
      <InputLabel htmlFor={YEAR_ID} isHidden>
        {t('valueChain:year-label')}
      </InputLabel>
      <SingleSelect
        dataTestId={selectors.yearSelect}
        inputId={YEAR_ID}
        isDisabled={yearOptions.length === 1}
        name={YEAR_ID}
        onChange={onChange}
        options={yearOptions}
        value={selectedYear}
      />
    </StyledComponents.YearSelectContainer>
  );
};
