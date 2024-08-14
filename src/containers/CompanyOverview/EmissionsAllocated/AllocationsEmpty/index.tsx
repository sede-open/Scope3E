import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

export const AllocationsEmpty = () => {
  const { t } = useTranslation('companyOverview');
  return (
    <>
      <StyledComponents.Title>
        {t('noEmissionsAllocated')}
      </StyledComponents.Title>
      <StyledComponents.SubTitle>
        {t('hasNotAllocated')}
      </StyledComponents.SubTitle>
    </>
  );
};
