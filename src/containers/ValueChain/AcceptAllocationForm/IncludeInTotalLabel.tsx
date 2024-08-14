import useTranslation from 'next-translate/useTranslation';

import { formatInteger } from 'utils/number';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  currentTotalScope3EmissionsForYear: number;
  isDisabled: boolean;
  year: number;
}

export const IncludeInTotalLabel = ({
  currentTotalScope3EmissionsForYear,
  isDisabled,
  year,
}: IProps) => {
  const { t } = useTranslation();

  return isDisabled ? (
    <>
      <StyledComponents.DisabledAddToTotalLabelWrapper>
        {t('valueChain:accept-allocation-include-in-total-disabled')}
      </StyledComponents.DisabledAddToTotalLabelWrapper>
      <StyledComponents.DisabledAddToTotalMessage
        data-testid={selectors.includeInTotalRadioSublabelDisabled}
      >
        {t('valueChain:accept-allocation-add-to-emissions-sublabel-disabled', {
          year,
        })}
      </StyledComponents.DisabledAddToTotalMessage>
    </>
  ) : (
    <>
      {t('valueChain:accept-allocation-include-in-total')}
      <StyledComponents.AddToTotalSublabel
        data-testid={selectors.includeInTotalRadioSublabel}
      >
        {t('valueChain:accept-allocation-add-to-emissions-sublabel', {
          emissions: formatInteger(currentTotalScope3EmissionsForYear),
        })}
      </StyledComponents.AddToTotalSublabel>
    </>
  );
};
