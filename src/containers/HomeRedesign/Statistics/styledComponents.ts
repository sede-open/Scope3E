import { Text } from 'components/Text';
import styled from 'styled-components';
import { White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const StatisticsBackground = styled.section`
  width: 100%;
  min-height: 298px;
  background-image: url('/images/PublicSite/ocean.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 52px 0;
  display: flex;
  gap: 32px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const StatisticsBlock = styled.div`
  text-align: center;
  max-width: 278px;
`;

export const StatisticsNumber = styled(Text).attrs({
  size: '4rem',
  family: exampleBold,
  color: White,
})`
  margin-bottom: 12px;
  @media ${device.tabletM} {
    margin-bottom: 20px;
  }
`;

export const StatisticsMetric = styled(Text).attrs({
  size: '1.1875rem',
  family: exampleBold,
  color: White,
})``;
