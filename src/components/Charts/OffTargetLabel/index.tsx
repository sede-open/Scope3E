import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import { AlizarinCrimson, Scorpion } from 'styles/colours';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const OffTargetLabel = ({
  target,
  actual,
}: {
  target: number;
  actual: number;
}) => {
  const { t } = useTranslation();
  const percentage = Math.round(((actual - target) * 100) / target);
  return (
    <StyledComponents.Value
      data-testid={selectors.offTargetLabel}
      color={Scorpion}
    >
      <Text size="12px" as="span" color={AlizarinCrimson}>
        {percentage}
        {'% '}
      </Text>
      {t('common:tooltip-off-target')}
    </StyledComponents.Value>
  );
};
