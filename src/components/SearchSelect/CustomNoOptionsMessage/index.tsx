import useTranslation from 'next-translate/useTranslation';

import * as Styled from './styledComponents';

export const CustomNoOptionsMessage = () => {
  const { t } = useTranslation();

  return (
    <Styled.NoResultsMessage>
      {t('form:form-no-results')}
    </Styled.NoResultsMessage>
  );
};
