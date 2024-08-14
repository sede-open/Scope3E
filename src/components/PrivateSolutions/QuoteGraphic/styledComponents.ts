import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';

export const QuoteContainer = styled.div`
  max-width: 360px;
  margin: 60px 60px 60px 90px;
`;

export const Quote = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 24px;
`;

export const QuoteName = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const QuoteRole = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 20px;
  font-weight: 400;
`;

export const GraphicContainer = styled.div`
  position: relative;
`;

export const ChangelogSquareContainer = styled.div`
  display: block;
  position: absolute;
  height: 35px;
  top: 140px;
`;

export const ChangelogSquaresContainer = styled.div`
  display: block;
  position: absolute;
  right: 0;
  height: 107px;
  top: -16px;
`;
