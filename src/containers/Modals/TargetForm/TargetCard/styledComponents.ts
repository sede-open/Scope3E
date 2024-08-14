import styled from 'styled-components';
import { Alto, Tundora, White, Silver, Gray } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const Card = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
  margin-bottom: 8px;
`;

export const Subtitle = styled(Text).attrs({
  as: 'p',
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
  margin-bottom: 24px;
`;

export const Content = styled.div`
  border-width: 1px 0;
  border-color: ${Silver};
  border-style: solid;
`;

export const IllustrationPlaceholder = styled.div`
  height: 52px;
  width: 52px;
  border-radius: 50%;
  background-color: ${Alto};
  margin-right: 16px;
`;

export const NoTargetView = styled.div`
  border-width: 1px 0;
  border-color: ${Silver};
  border-style: solid;
  display: flex;
  align-items: center;
  padding: 18px 0;
`;

export const TextButton = styled(Text).attrs({
  as: 'button',
  size: '14px',
  color: Tundora,
})`
  line-height: 22px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 1rem;
`;

export const Left = styled.div`
  width: min(744px, 70%);
  background-color: ${White};
  padding: 32px 48px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${Alto};
  width: min(384px, 30%);
  background-color: ${White};
  flex-grow: 1;
`;

export const RightContent = styled.div`
  width: 100%;
`;

export const ChartTitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChartTitle = styled(Text).attrs({
  as: 'h4',
  size: '16px',
  color: Tundora,
  family: exampleBold,
})`
  line-height: 24px;
  text-align: center;
  margin-bottom: 60px;
  max-width: 238px;
  align-self: center;
`;

export const InfoContainer = styled.div`
  background-color: ${Alto};
  border: 1px solid ${Gray};
  display: flex;
  padding: 10px 12px;
`;

export const Icon = styled.div`
  margin-right: 10px;
`;

export const Info = styled.div``;
