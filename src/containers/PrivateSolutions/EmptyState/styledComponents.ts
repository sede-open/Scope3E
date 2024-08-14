import styled from 'styled-components';
import { White, Alto, Tundora, Scorpion } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const HeaderTitle = styled(Text).attrs({
  family: exampleBold,
  size: '32px',
  color: Tundora,
})`
  line-height: 40px;
  margin-bottom: 8px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: ${White};
  padding: 48px 0;
  margin: 30px 0 96px 0;
  border: 1px solid ${Alto};
`;

export const Title = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  max-width: 360px;
`;

export const Subtext = styled(Text).attrs({
  color: Scorpion,
})`
  line-height: 20px;
  max-width: 360px;
`;
