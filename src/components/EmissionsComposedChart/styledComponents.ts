import styled from 'styled-components';
import { White, Alto } from 'styles/colours';

export const ChartLegendContainer = styled.div`
  margin: 25px 10px;
`;

export const ChartContainer = styled.div`
  .recharts-default-legend {
    margin-top: 2rem !important;
  }
  padding-bottom: 1rem;
  background: ${White};
  border: 1px solid ${Alto};
`;
