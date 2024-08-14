import { CompanyLocationIcon } from 'components/Glyphs/CompanyLocationIcon';
import { CompanyNameIcon } from 'components/Glyphs/CompanyNameIcon';
import { Link } from 'components/Link';
import { TextBold, TextNormal } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import * as selectors from '../../selectors';
import * as StyledComponents from '../styledComponents';

export const CompanyDetails = () => {
  const { t } = useTranslation();
  const user = useAuthenticatedUser();
  const companyId = user.company?.id;
  if (!companyId) {
    return null;
  }

  return (
    <StyledComponents.YourOrganisationPanelWrapper
      data-testid={selectors.yourOrganisationCompanyDetails}
    >
      <StyledComponents.HeaderContainer>
        <TextBold>
          {t('accountSettings:your-organisation-company-details-header')}
        </TextBold>
      </StyledComponents.HeaderContainer>
      <StyledComponents.SubHeaderContainer>
        <TextNormal>
          <Trans
            components={[
              <Link
                href={`mailto:${t('common:support-email')}`}
                target="_blank"
              />,
            ]}
            i18nKey="accountSettings:your-organisation-company-details-sub-header"
          />
        </TextNormal>
      </StyledComponents.SubHeaderContainer>
      <StyledComponents.PanelBodyContainer>
        <CompanyNameIcon />
        <StyledComponents.InformationContainer>
          <StyledComponents.IconHeadings>
            {t('accountSettings:company-name')}
          </StyledComponents.IconHeadings>
          <StyledComponents.IconContent data-testid={selectors.userCompanyName}>
            {user.company?.name}
          </StyledComponents.IconContent>
        </StyledComponents.InformationContainer>
        <CompanyLocationIcon />
        <StyledComponents.InformationContainer>
          <StyledComponents.IconHeadings>
            {t('accountSettings:company-location')}
          </StyledComponents.IconHeadings>
          <StyledComponents.IconContent
            data-testid={selectors.userCompanyLocation}
          >
            {user.company?.location}
          </StyledComponents.IconContent>
        </StyledComponents.InformationContainer>
      </StyledComponents.PanelBodyContainer>
    </StyledComponents.YourOrganisationPanelWrapper>
  );
};
