import styled from 'styled-components';

import { Gray } from 'styles/colours';
import { Card } from 'components/Card';
import { Text } from 'components/Text';

export const ContentWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2.5rem 2rem 0;
  height: 494px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 17px;
  width: 100%;
`;

export const InfoText = styled(Text)`
  color: ${Gray};
  font-size: 12px;
  margin-top: auto;
  margin-left: 10px;
`;

export const LinkContainer = styled.div`
  margin: 5px 0px 30px 10px;
`;
