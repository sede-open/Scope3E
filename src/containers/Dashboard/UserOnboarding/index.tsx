import useTranslation from 'next-translate/useTranslation';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  useSolutionInterestsQuery,
  useCompanySectorsQuery,
  useCompanyRelationshipsOnboardingQuery,
} from 'queries/userOnboarding';
import CogSpinner from 'components/CogSpinner';
import { Steps } from './Steps';
import { getFilteredIncomingInvitations } from './utils';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const UserOnboarding = () => {
  const { t } = useTranslation();
  const { firstName, company: userCompany } = useAuthenticatedUser();

  const { id: companyId } = userCompany || {};

  if (!firstName || !companyId) {
    return null;
  }

  const {
    data: solutionInterestsData,
    loading: isSolutionInterestsDataLoading,
  } = useSolutionInterestsQuery();
  const solutionInterests = solutionInterestsData?.solutionInterests || [];

  const {
    data: companySectorsData,
    loading: isCompanySectorsDataLoading,
  } = useCompanySectorsQuery({ companyId });
  const companySectors = companySectorsData?.companySectors || [];

  const {
    data: invitationsData,
    loading: isInvitationsDataLoading,
  } = useCompanyRelationshipsOnboardingQuery({
    variables: { companyId },
  });

  const invitations = getFilteredIncomingInvitations(invitationsData);

  const isLoading =
    isSolutionInterestsDataLoading ||
    isCompanySectorsDataLoading ||
    isInvitationsDataLoading;

  return (
    <>
      <StyledComponents.OnboardingHeader
        data-testid={selectors.headerContainer}
      >
        <StyledComponents.OnboardingPrimaryHeading>
          {t('userOnboarding:new-user-welcome-heading', { name: firstName })}
        </StyledComponents.OnboardingPrimaryHeading>
        <StyledComponents.OnboardingIntro>
          {t('userOnboarding:new-user-welcome-intro[0]')}
          <br />
          {t('userOnboarding:new-user-welcome-intro[1]')}
        </StyledComponents.OnboardingIntro>
      </StyledComponents.OnboardingHeader>
      <StyledComponents.UserOnboardingCard data-testid={selectors.container}>
        {isLoading ? (
          <CogSpinner />
        ) : (
          <Steps
            companySectors={companySectors}
            solutionInterests={solutionInterests}
            invitations={invitations}
          />
        )}
      </StyledComponents.UserOnboardingCard>
    </>
  );
};
