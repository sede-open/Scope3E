import styled from 'styled-components';
import { White, Tundora, Scorpion, Alto } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const BenchmarkHeaderContainer = styled.div`
  background-color: ${White};
  padding: 48px;
  border: 1px solid ${Alto};
`;

export const BenchmarkTitle = styled(Text).attrs({
  as: 'h2',
  size: '1.5rem',
  family: exampleBold,
  color: Tundora,
})`
  margin-bottom: 8px;
`;

export const BenchmarkSubtitle = styled(Text).attrs({
  as: 'h4',
  size: '1rem',
  weight: 'bold',
  color: Tundora,
})`
  margin-bottom: 8px;
`;

export const BenchmarkDescriptionSection = styled.div`
  flex: 2;
`;

export const BenchmarkDescription = styled(Text).attrs({
  size: '0.875rem',
  color: Scorpion,
})``;

export const BenchmarkHeaderFlex = styled.div`
  display: flex;
  gap: 64px;
`;

export const IntensityDropdownLabel = styled(Text).attrs({
  size: '0.875rem',
  weight: 'bold',
  color: Tundora,
})`
  margin-bottom: 8px;
`;

export const IntensityDropdownSection = styled.div`
  flex: 1;
`;
