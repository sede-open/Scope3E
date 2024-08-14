import styled from 'styled-components';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';

export const Container = styled(Card)`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 1.5rem 1.125rem 1.25rem 1.125rem;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
`;

export const RankValue = styled(Text).attrs({
  as: 'h2',
  family: exampleBold,
  color: Tundora,
  size: '24px',
})`
  padding-top: 0.25rem;
  padding-bottom: 0.5rem;
`;

export const VariationInfo = styled(Text)`
  font-weight: bold;
`;
