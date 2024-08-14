import styled from 'styled-components';
import { Alto, White } from 'styles/colours';

export const ChartContainer = styled.div`
  .recharts-default-legend {
    margin-top: 32px !important;
  }
  padding-bottom: 20px;
  background: ${White};
  border: 1px solid ${Alto};
`;

export const ChartLegendContainer = styled.div`
  margin: 25px 10px;
`;
