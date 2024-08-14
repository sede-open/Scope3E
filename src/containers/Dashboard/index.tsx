import { useCallback, useEffect } from 'react';
import {
  useCompanySectorsQuery,
  useUserSolutionInterestsQuery,
} from 'queries/userOnboarding';
import { PageContent } from 'layouts/PageContent';
import { PageWrapper } from 'layouts/PageWrapper';
import { abcdGray } from 'styles/colours';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { SubheaderNavigation } from 'components/SubheaderNavigation';
import CogSpinner from 'components/CogSpinner';
import { CompanyStatus, RoleName, UserStatus } from 'types/globalTypes';
import { useActivateMutation } from 'mutations/activation';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { trackEvent } from 'utils/analytics';
import { COMPANY_ACTIVATED } from 'utils/analyticsEvents';
import { primaryNavLinks, PrimaryRoutes } from '../../constants';
import { ActiveState } from './ActiveState';
import { UserOnboarding } from './UserOnboarding';
import * as selectors from './selectors';

export const Dashboard = () => {
  const { status: userStatus, company, roles } = useAuthenticatedUser();
  const companyId = company?.id;

  if (!companyId) {
    return null;
  }

  const roleNames = roles.map((role) => role.name);

  const [activateUserAndCompany] = useActivateMutation();

  const trackActivationEvent = useCallback(() => {
    trackEvent(COMPANY_ACTIVATED, {
      companyId: company?.id,
    });
  }, [company]);

  useEffect(() => {
    if (userStatus === UserStatus.PENDING) {
      activateUserAndCompany();
    }
    if (company?.status === CompanyStatus.PENDING_USER_ACTIVATION) {
      trackActivationEvent();
    }
  }, [userStatus, company]);

  const {
    data: userSolutionInterestsData,
    loading: isUserSolutionInterestsDataLoading,
  } = useUserSolutionInterestsQuery();

  const {
    data: companySectorsData,
    loading: isCompanySectorsDataLoading,
  } = useCompanySectorsQuery({ companyId });

  const companySectors = companySectorsData?.companySectors || [];

  const solutionInterests =
    userSolutionInterestsData?.userSolutionInterests || [];

  const shouldDisplayOnboarding =
    (roleNames.includes(RoleName.SUPPLIER_EDITOR) &&
      (!companySectors.length || !solutionInterests.length)) ||
    (!roleNames.includes(RoleName.SUPPLIER_EDITOR) &&
      !solutionInterests.length);

  const isLoading =
    isCompanySectorsDataLoading || isUserSolutionInterestsDataLoading;

  return isLoading ? (
    <CogSpinner />
  ) : (
    <>
      <PageWrapper
        background={abcdGray}
        fillHeight={shouldDisplayOnboarding}
        data-testid={selectors.withOnboarding}
      >
        <Header isGhosted={shouldDisplayOnboarding} />
        <SubheaderNavigation
          isGhosted={shouldDisplayOnboarding}
          navLinks={primaryNavLinks}
          selectedLink={PrimaryRoutes.Dashboard}
        />
        <PageContent withSubheader>
          {shouldDisplayOnboarding ? <UserOnboarding /> : <ActiveState />}
        </PageContent>
      </PageWrapper>
      {!shouldDisplayOnboarding && (
        <PageWrapper>
          <Footer />
        </PageWrapper>
      )}
    </>
  );
};
