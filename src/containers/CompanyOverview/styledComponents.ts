import styled from 'styled-components';
import { Alto, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';

export const CompanyOverviewContainer = styled.div`
  margin-top: 88px;
`;

export const CompanySummary = styled.section`
  margin-bottom: 72px;
`;

export const DataCharts = styled.section`
  margin-bottom: 60px;
`;

export const EmissionsOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 524px;
  margin-bottom: 86px;
`;

export const SecondaryChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  min-height: 494px;

  > div {
    width: 100%;
  }
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 12px;
`;

export const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ChartContainer = styled.div`
  background-color: ${White};
  border: 1px solid ${Alto};
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const ChartTitle = styled(Text).attrs({
  as: 'h2',
  size: '1.5rem',
  family: exampleBold,
  color: Tundora,
})`
  margin-bottom: 16px;
`;

export const EmptyViewContainer = styled.div`
  height: 524px;
  margin-bottom: 64px;
`;
