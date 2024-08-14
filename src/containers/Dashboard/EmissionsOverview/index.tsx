import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { BAR_CHART_SELECT, COMPOSED_CHART_SELECT } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import { ModalContentType } from 'containers/types';
import { SimpleDropdown } from 'components/SimpleDropdown';
import { BarChartIcon } from 'components/Glyphs/BarChart';
import { ComposedChartIcon } from 'components/Glyphs/ComposedChart';

import { EmissionsComposedChart } from '../../../components/EmissionsComposedChart';
import { EmissionsBarChart } from '../../../components/EmissionsBarChart';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { getMoreDropdownOptions } from './utils';

export interface IProps {
  emissions: Emission[];
  loading: boolean;
  selectMoreOption: (value: ModalType.TARGET_FORM | ModalContentType) => void;
  target?: Target | null;
}

enum ChartType {
  COMPOSED,
  BAR,
}

export const EmissionsOverview = ({
  emissions,
  loading,
  selectMoreOption,
  target,
}: IProps) => {
  const {
    canEditSupplyDashboard,
    canViewSupplyDashboard,
    company,
  } = useAuthenticatedUser();
  const { t } = useTranslation();
  const [selectedChartType, setSelectedChartType] = useState<ChartType>(
    ChartType.COMPOSED
  );

  const { openModal } = useModal();

  const openEmissionPathSelect = () => {
    openModal({
      modalType: ModalType.EMISSION_PATH_SELECT,
      contentProps: {
        emissionType: CorporateEmissionType.ACTUAL,
      },
    });
  };

  const selectBarChart = useCallback(() => {
    setSelectedChartType(ChartType.BAR);

    trackEvent(BAR_CHART_SELECT, {
      companyName: company?.name,
    });
  }, [selectedChartType]);

  const selectComposedChart = useCallback(() => {
    setSelectedChartType(ChartType.COMPOSED);

    trackEvent(COMPOSED_CHART_SELECT, {
      companyName: company?.name,
    });
  }, [selectedChartType]);

  const isBarChartSelected = selectedChartType === ChartType.BAR;
  const isComposedChartSelected = selectedChartType === ChartType.COMPOSED;

  return (
    <StyledComponents.OverviewContainer
      data-testid={selectors.emissionsOverview}
    >
      <StyledComponents.StyledHeaderRow>
        <StyledComponents.Title>
          {t('dashboard:emissions-overview-heading')}
        </StyledComponents.Title>
        <StyledComponents.ButtonContainer>
          {canEditSupplyDashboard && (
            <StyledComponents.FlexWrapper
              data-testid={selectors.dashboardEmissionActions}
            >
              <StyledComponents.AddEmissionsButtton
                width="auto"
                height="auto"
                onClick={openEmissionPathSelect}
                data-testid={selectors.primaryActionBtn}
              >
                {t('dashboard:emissions-overview-primary-action-btn')}
              </StyledComponents.AddEmissionsButtton>
              <SimpleDropdown
                name={t('common:edit-data')}
                options={getMoreDropdownOptions(t)}
                onSelect={selectMoreOption}
              />
            </StyledComponents.FlexWrapper>
          )}
          {(canViewSupplyDashboard || canEditSupplyDashboard) && (
            <StyledComponents.ToggleBtnContainer>
              <StyledComponents.ToggleChartBtn
                onClick={selectBarChart}
                isSelectedChart={isBarChartSelected}
                data-testid={selectors.toggleBarChartBtn}
              >
                <BarChartIcon
                  title={t('dashboard:emissions-overview-bar-chart')}
                />
              </StyledComponents.ToggleChartBtn>
              <StyledComponents.ToggleChartBtn
                onClick={selectComposedChart}
                isSelectedChart={isComposedChartSelected}
                data-testid={selectors.toggleComposedChartBtn}
              >
                <ComposedChartIcon
                  title={t('dashboard:emissions-overview-composed-chart')}
                />
              </StyledComponents.ToggleChartBtn>
            </StyledComponents.ToggleBtnContainer>
          )}
        </StyledComponents.ButtonContainer>
      </StyledComponents.StyledHeaderRow>
      <StyledComponents.ContentWrapper>
        {!loading &&
          (isBarChartSelected ? (
            <EmissionsBarChart emissions={emissions} target={target} />
          ) : (
            <EmissionsComposedChart emissions={emissions} target={target} />
          ))}
      </StyledComponents.ContentWrapper>
    </StyledComponents.OverviewContainer>
  );
};

EmissionsOverview.defaultProps = {
  target: undefined,
};
