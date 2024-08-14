import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold, exampleBook } from 'styles/fonts';
import { Tundora } from 'styles/colours';

export const GridHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-flow: wrap;
  justify-content: space-between;
  margin-bottom: 38px;
`;

export const GridBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin: 24px 0 96px 0;
`;

export const GridTitle = styled(Text).attrs({
  family: exampleBold,
  size: '32px',
  color: Tundora,
  as: 'h1',
})`
  line-height: 40px;
  margin-bottom: 8px;
`;

export const GridSubtitle = styled(Text).attrs({
  family: exampleBook,
  size: '14px',
  color: Tundora,
  as: 'p',
})`
  width: 100%;
`;
