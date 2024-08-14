import { Text } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { CompanyOverviewQuery_companyProfile as CompanyProfile } from 'types/CompanyOverviewQuery';
import { TargetPrivacyType } from 'types/globalTypes';
import { Invite } from './Invite';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export interface IProps {
  showInvite: boolean;
  companyProfile: CompanyProfile;
}

export const CompanySummary = ({ showInvite, companyProfile }: IProps) => {
  const { t } = useTranslation('companyOverview');
  const {
    name,
    duns,
    dnbRegion,
    dnbCountryIso,
    estimatedNumberOfEmployees,
    estimatedUsdOfRevenue,
    absoluteTargetType,
    sectors,
  } = companyProfile;

  const concatCompanyProfileData = () => {
    const getTargetTypeText = () => {
      switch (absoluteTargetType) {
        case TargetPrivacyType.PRIVATE:
          return t('privateTarget');
        case TargetPrivacyType.PUBLIC:
          return t('publicTarget');
        case TargetPrivacyType.SCIENCE_BASED_INITIATIVE:
          return t('scienceBasedInitiativeTarget');
        default:
          return null;
      }
    };

    const location =
      dnbRegion && dnbCountryIso ? `${dnbRegion}, ${dnbCountryIso}` : null;
    const numberOfEmployees =
      estimatedNumberOfEmployees &&
      t('estimatedEmployees', {
        number: estimatedNumberOfEmployees.toLocaleString(),
      });
    const usdOfRevenue =
      estimatedUsdOfRevenue &&
      t('usdEstimatedRevenue', {
        number: estimatedUsdOfRevenue.toLocaleString(),
      });

    return [location, numberOfEmployees, usdOfRevenue, getTargetTypeText()]
      .filter(Boolean)
      .join(' · ');
  };
  return (
    <StyledComponents.MainContainer>
      <div>
        <StyledComponents.Container>
          <Text
            as="h1"
            size="2rem"
            family={exampleBold}
            color={Tundora}
            data-testid={selectors.companyName}
          >
            {name}
          </Text>
        </StyledComponents.Container>
        {sectors.length > 0 && (
          <StyledComponents.Container>
            <Text
              size="1rem"
              family={exampleBold}
              color={Tundora}
              data-testid={selectors.companySectors}
            >
              {sectors.join(' · ')}
            </Text>
          </StyledComponents.Container>
        )}

        <Text
          size="1rem"
          color={Tundora}
          data-testid={selectors.companySummary}
        >
          {concatCompanyProfileData()}
        </Text>
      </div>
      {showInvite && <Invite companyName={name} companyDuns={duns} />}
    </StyledComponents.MainContainer>
  );
};
