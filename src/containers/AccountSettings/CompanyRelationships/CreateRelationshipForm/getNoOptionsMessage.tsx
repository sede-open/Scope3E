import { ReactElement } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  openInviteCompanyModal: () => void;
}

export const InviteText = ({ openInviteCompanyModal }: IProps) => (
  <StyledComponents.NoCompanyResultsParagraph>
    <Trans
      i18nKey="companyRelationships:form-no-results"
      components={[
        <StyledComponents.NoCompanyResultsButton
          data-testid={selectors.noResultsInviteButton}
          onClick={openInviteCompanyModal}
        >
          invite to join
        </StyledComponents.NoCompanyResultsButton>,
      ]}
    />
  </StyledComponents.NoCompanyResultsParagraph>
);

export const getNoOptionsMessage = (inviteText: ReactElement) => () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.NoCompanyResultsContainer>
      <StyledComponents.NoCompanyResultsParagraph>
        {t('form:form-no-results')}
      </StyledComponents.NoCompanyResultsParagraph>
      {inviteText}
    </StyledComponents.NoCompanyResultsContainer>
  );
};
