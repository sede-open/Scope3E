import styled from 'styled-components';
import { Scorpion, Tundora, White } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${White};
  border-right: none;
  max-width: 100%;
  width: 45%;
  padding: 48px 48px 24px 48px;
`;

export const Title = styled(Text).attrs({
  color: Scorpion,
})`
  line-height: 20px;
  align-items: center;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 28px;
`;

export const Label = styled(Text).attrs({
  color: Tundora,
  as: 'h1',
  size: '32px',
  family: exampleBold,
})<{ hasScope3Emissions: boolean }>`
  line-height: 40px;
  align-items: center;
  padding: ${({ hasScope3Emissions }) =>
    hasScope3Emissions ? '0 4px 0 24px' : '0 4px 0 0'};
`;

export const Unit = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 20px;
  align-items: center;
  font-weight: bold;
`;

export const ChartLegendContainer = styled.div`
  margin: 20px 10px;
`;
