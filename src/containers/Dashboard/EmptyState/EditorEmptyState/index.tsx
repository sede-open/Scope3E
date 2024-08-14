import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { EmissionPathCards } from 'components/EmissionPathCards';

import * as Styled from './styledComponents';
import * as selectors from './selectors';

export const EditorEmptyState = () => {
  const { t } = useTranslation();

  return (
    <Styled.Container data-testid={selectors.emptyStateContainer}>
      <Styled.Title>{t('dashboard:empty-state-heading')}</Styled.Title>
      <Styled.Subtitle>{t('dashboard:empty-state-subheading')}</Styled.Subtitle>

      <EmissionPathCards emissionType={CorporateEmissionType.BASELINE} />
    </Styled.Container>
  );
};
