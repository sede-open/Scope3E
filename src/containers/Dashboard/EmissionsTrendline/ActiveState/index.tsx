import useTranslation from 'next-translate/useTranslation';

import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { displayErrorMessage } from 'utils/toast';
import { EmissionsTrendData, getEmissionsTrend } from 'utils/trendline';
import { OpenInNewTabButton } from 'components/OpenInNewTabButton';

import { TrendlineChart } from './TrendlineChart';
import * as StyledComponents from './styledComponents';

interface IProps {
  emissions: Emission[];
  loading: Boolean;
}

export const ActiveState = ({ emissions, loading }: IProps) => {
  const { t } = useTranslation();

  try {
    const emissionsTrend: EmissionsTrendData[] = getEmissionsTrend(emissions);

    return (
      <StyledComponents.ContentWrapper data-testid="emissions-trendline-active">
        {!loading && (
          <TrendlineChart
            historicalEmissions={emissions}
            emissionsTrend={emissionsTrend}
          />
        )}
        <StyledComponents.InfoContainer>
          <StyledComponents.InfoText>
            {t('dashboard:emissions-trendline-disclaimer')}
          </StyledComponents.InfoText>
        </StyledComponents.InfoContainer>
        <StyledComponents.LinkContainer>
          <OpenInNewTabButton
            href="/trendline-calculation"
            text={t('dashboard:emissions-trendline-read-more')}
          />
        </StyledComponents.LinkContainer>
      </StyledComponents.ContentWrapper>
    );
  } catch ({ message }) {
    displayErrorMessage({ title: message });
    return null;
  }
};
