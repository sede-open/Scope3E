import { InfoToolTip } from 'components/InfoToolTip';
import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styles';

export const NotApplicable = () => {
  const { t } = useTranslation('companyOverview');
  return (
    <StyledComponents.Container>
      <InfoToolTip
        offset={{
          right: 90,
          left: 0,
          top: 0,
          bottom: 0,
        }}
        cross={false}
        ariaLabel="not-applicable"
        id="not-applicable"
        title={t('notApplicable')}
      >
        {t('naTooltip')}
      </InfoToolTip>
    </StyledComponents.Container>
  );
};
