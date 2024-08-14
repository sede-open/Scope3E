import styled from 'styled-components';

import { Text } from 'components/Text';
import { Scorpion } from 'styles/colours';

export const InputSpacer = styled.div`
  margin-top: 1.5rem;
  margin-right: 1.5rem;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 16px;
`;

export const InfoWrapper = styled.div`
  position: absolute;
  right: 2.5rem;
`;

export const FormColumns = styled.div`
  display: flex;
  flex-direction: row;
  column-count: 2;
`;

export const FormColumn = styled.div`
  flex: 1;
  margin-right: 16px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

export const NewCompanyInfo = styled(Text).attrs({
  size: '14px',
  color: Scorpion,
})`
  line-height: 20px;
  margin-bottom: 16px;
`;
