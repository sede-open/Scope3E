import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';

import Icon from 'components/Icon';
import { Text } from 'components/Text';

import * as StyledComponents from './styledComponents';

interface IProps {
  year: number;
  onAddEmissions: (year: number) => void;
}

export const NoEmissionsMessage = ({ year, onAddEmissions }: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.MissingEmissionsMessageContainer>
      <Icon alt="Information icon" src="/info-blue.svg" size="24px" />
      <StyledComponents.MissingEmissionsMessageTitle>
        {t('valueChain:pending-allocation-missing-emissions-title', { year })}
      </StyledComponents.MissingEmissionsMessageTitle>
      <Text as="p">
        <Trans
          i18nKey="valueChain:pending-allocation-missing-emissions-message"
          components={[
            <StyledComponents.MissingEmissionsMessageButton
              onClick={() => onAddEmissions(year)}
              type="button"
            >
              add emissions
            </StyledComponents.MissingEmissionsMessageButton>,
          ]}
        />
      </Text>
    </StyledComponents.MissingEmissionsMessageContainer>
  );
};
