import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFlags } from 'launchdarkly-react-client-sdk';

import { getCurrentYear } from 'utils/date';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { CorporateEmissionType } from 'types/globalTypes';
import RedirectTo from 'components/RedirectTo';
import { TaskListPromptContentType } from 'containers/Modals/TaskListPrompt/types';

import { CarbonIntensity } from '../CarbonIntensity';
import { EmissionsOverview } from '../EmissionsOverview';
import { EmissionsTrendline } from '../EmissionsTrendline';
import { EmptyState } from '../EmptyState';
import { LastYearHighlight } from '../LastYearHighlight';
import { RankHighlight } from '../RankHighlight';
import { ReductionRank } from '../ReductionRank';
import { TargetHighlight } from '../TargetHighlight';
import { CompanyRelationshipsInvitesToast } from '../CompanyRelationshipsInvitesToast';
import { useDashboardData } from '../queries';
import { Scope3Dashboard } from '../Scope3Dashboard';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import {
  hasDataPrivacyModalBeenSnoozedToday,
  shouldRenderTaskListPrompt,
} from './utils';
import { getSelectMoreOption } from '../EmissionsOverview/utils';

export const ActiveState = () => {
  const [selectedEmissionYear, selectEmissionYear] = useState<
    number | undefined
  >();
  const { query } = useRouter();
  const { isDataPrivacyInfoWizardEnabled } = useFlags();

  const { modalState, openModal } = useModal();

  useEffect(() => {
    if (modalState?.modalType === ModalType.NULL) {
      selectEmissionYear(undefined);
    }
  }, [modalState]);

  const {
    canEditSupplyDashboard,
    canViewSupplyDashboard,
    company,
    preferences,
    firstName,
    canSubmitDataPrivacyInfo,
  } = useAuthenticatedUser();

  const companyId = company?.id || '';

  if ((!canEditSupplyDashboard && !canViewSupplyDashboard) || !company) {
    return <RedirectTo url="/forbidden" />;
  }

  const { data, loading: isDashboardDataLoading } = useDashboardData(
    {
      companyId,
    },
    { fetchPolicy: query.refetch ? 'network-only' : 'cache-and-network' }
  );

  const emissions = data?.corporateEmissions ?? [];
  const baseline = emissions.find(
    (e: Emission) => e.type === CorporateEmissionType.BASELINE
  );
  const hasEmissions = emissions.length > 0;

  const lastYear = getCurrentYear() - 1;
  const lastYearEmission = emissions.find((e: Emission) => e.year === lastYear);
  const mostRecentEmission = emissions[emissions.length - 1];

  // emissions for year prior to last year
  const historicEmission = emissions[emissions.length - 2];

  useEffect(() => {
    if (
      shouldRenderTaskListPrompt(
        !!preferences?.suppressTaskListPrompt,
        modalState,
        hasEmissions
      )
    ) {
      openModal({
        modalType: ModalType.TASK_LIST_PROMPT,
        contentProps: {
          contentType: TaskListPromptContentType.WELCOME_BACK,
        },
      });
    }
  }, [hasEmissions]);

  useEffect(() => {
    const hasUserSubmittedAllPrivacyData =
      data?.companyDataPrivacyCompleteness?.isComplete ?? true;

    if (
      !shouldRenderTaskListPrompt(
        !!preferences?.suppressTaskListPrompt,
        modalState,
        hasEmissions
      ) &&
      !hasDataPrivacyModalBeenSnoozedToday() &&
      canSubmitDataPrivacyInfo &&
      !hasUserSubmittedAllPrivacyData &&
      isDataPrivacyInfoWizardEnabled
    ) {
      openModal({
        modalType: ModalType.MISSING_DATA_PRIVACY_INFO_PROMPT,
        contentProps: {
          name: firstName,
        },
      });
    }
  }, [isDashboardDataLoading, firstName, hasEmissions]);

  const selectMoreOption = getSelectMoreOption({
    openModal,
    selectedEmissionYear,
  });

  if (isDashboardDataLoading || !data) {
    return null;
  }

  return (
    <StyledComponents.StyledWrapper data-testid={selectors.wrapper}>
      <CompanyRelationshipsInvitesToast />

      {!hasEmissions && <EmptyState />}

      {hasEmissions && (
        <>
          <StyledComponents.Highlights>
            <LastYearHighlight
              lastYear={lastYear}
              lastYearEmission={lastYearEmission}
              selectEmissionYear={selectEmissionYear}
              historicEmission={historicEmission}
            />
            <StyledComponents.HighlightSpacer />
            {baseline && (
              <TargetHighlight
                target={data?.target}
                baseline={baseline}
                mostRecentEmission={mostRecentEmission}
              />
            )}
            <StyledComponents.HighlightSpacer />
            <RankHighlight lastYear={lastYear} />
          </StyledComponents.Highlights>
          <EmissionsOverview
            loading={isDashboardDataLoading}
            emissions={emissions}
            target={data?.target}
            selectMoreOption={selectMoreOption}
          />
          <Scope3Dashboard emissions={emissions} companyId={companyId} />

          <StyledComponents.Columns>
            <StyledComponents.Column>
              {company && baseline && (
                <CarbonIntensity emissions={emissions} baseline={baseline} />
              )}
            </StyledComponents.Column>
            <StyledComponents.HighlightSpacer />
            <StyledComponents.Column>
              <EmissionsTrendline
                emissions={emissions}
                loading={isDashboardDataLoading}
              />
            </StyledComponents.Column>
          </StyledComponents.Columns>
          {company && <ReductionRank />}
        </>
      )}
    </StyledComponents.StyledWrapper>
  );
};
