import useTranslation from 'next-translate/useTranslation';

import { Scorpion } from 'styles/colours';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const OnTargetLabel = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.Value
      data-testid={selectors.onTargetLabel}
      color={Scorpion}
    >
      {t('common:tooltip-on-target')}
    </StyledComponents.Value>
  );
};
