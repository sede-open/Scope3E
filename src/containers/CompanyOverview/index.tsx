import { BackButton } from 'components/BackButton';
import CogSpinner from 'components/CogSpinner';
import RedirectTo from 'components/RedirectTo';
import { UnexpectedError } from 'containers/UnexpectedError';
import useTranslation from 'next-translate/useTranslation';
import { EmissionsOverview } from './EmissionsOverview';
import { CarbonIntensityOverview } from './CarbonIntensityOverview';
import { CompanyBenchmarking } from './CompanyBenchmarking';
import { CompanySummary } from './CompanySummary';
import { EmissionsAllocated } from './EmissionsAllocated';
import { useCompanyOverviewQuery } from './queries';
import * as StyledComponents from './styledComponents';
import { EmptyView } from './EmptyView';
import { EmptyViewInvite } from './EmptyView/EmptyViewInvite';
import { EmptyViewRequest } from './EmptyView/EmptyViewRequest';
import * as selectors from './selectors';

export interface IProps {
  companyId: string;
}

export const CompanyOverview = ({ companyId }: IProps) => {
  const { t } = useTranslation('companyOverview');
  const { data, loading, error } = useCompanyOverviewQuery({ companyId });

  if (loading) {
    return <CogSpinner />;
  }

  if (error) {
    return <UnexpectedError errorMessage={error.message} />;
  }

  if (!data || !data.companyProfile || !data.companyProfile.isActive) {
    return <RedirectTo url="/404" />;
  }

  const {
    isPublic,
    companyPrivacy,
    activeRelationship,
    name,
    duns,
    dataShareRequestSent,
    invitationPending,
  } = data.companyProfile;
  const showCharts = isPublic;
  const showInviteAndShare =
    !isPublic &&
    !activeRelationship &&
    (companyPrivacy?.customerNetwork || companyPrivacy?.supplierNetwork);
  const showRequest = !isPublic;
  const showInvite = isPublic && !activeRelationship && !invitationPending;

  const getEmptyView = () => {
    if (showInviteAndShare) {
      return (
        <EmptyViewInvite
          companyId={companyId}
          companyName={name}
          companyDuns={duns}
          hasRequestedToShareData={dataShareRequestSent}
          disabled={invitationPending}
        />
      );
    }
    if (showRequest) {
      return (
        <EmptyViewRequest
          companyId={companyId}
          hasRequestedToShareData={dataShareRequestSent}
        />
      );
    }
    return <EmptyView dataTestId={selectors.emptyViewPrivate} />;
  };

  return (
    <StyledComponents.CompanyOverviewContainer
      data-testid={selectors.companyOverviewPage}
    >
      <StyledComponents.BackButtonContainer>
        <BackButton backNavigationText={t('back')} />
      </StyledComponents.BackButtonContainer>
      <StyledComponents.CompanySummary>
        <CompanySummary
          showInvite={showInvite}
          companyProfile={data.companyProfile}
        />
      </StyledComponents.CompanySummary>
      {showCharts || data.emissionsAllocatedToMyCompany.length ? (
        <StyledComponents.DataCharts data-testid={selectors.chartsContainer}>
          <StyledComponents.EmissionsOverviewContainer>
            <EmissionsOverview
              emissions={data.corporateEmissions}
              target={data.targets?.absolute[0]}
              emptyView={getEmptyView()}
            />
          </StyledComponents.EmissionsOverviewContainer>
          <StyledComponents.SecondaryChartsContainer>
            <CarbonIntensityOverview
              target={data.targets?.intensity[0]}
              emissions={data.corporateEmissions}
              emptyView={getEmptyView()}
            />
            <EmissionsAllocated
              emissionAllocations={data.emissionsAllocatedToMyCompany}
            />
          </StyledComponents.SecondaryChartsContainer>
        </StyledComponents.DataCharts>
      ) : (
        <StyledComponents.EmptyViewContainer
          data-testid={selectors.emptyViewContainer}
        >
          {getEmptyView()}
        </StyledComponents.EmptyViewContainer>
      )}
      <CompanyBenchmarking companyId={companyId} />
    </StyledComponents.CompanyOverviewContainer>
  );
};
