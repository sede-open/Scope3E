import { Text } from 'components/Text';

import styled from 'styled-components';

export const Container = styled.div`
  width: 840px;
  max-width: 100%;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const Subtitle = styled(Text)`
  padding-top: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-top: 2rem;
`;
