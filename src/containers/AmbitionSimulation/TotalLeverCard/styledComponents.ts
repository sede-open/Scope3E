import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { White, Alto, Scorpion, SilverChalice } from 'styles/colours';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  width: 264px;
  height: 580px;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  background: ${White};
  padding-top: 24px;
  padding-bottom: 24px;
  border: 1px solid ${Alto};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  padding-right: 24px;
`;

export const ProgressWrapper = styled.div`
  padding-bottom: 44px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  padding-left: 16px;
`;

export const TotalEmissions = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
`;

export const Value = styled(Text)<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${ifProp({ disabled: true }, SilverChalice, Scorpion)};
`;

export const FindOutMoreSection = styled(Button).attrs({
  color: 'text-button',
})`
  display: flex;
  flex-direction: row;
  text-align: left;
`;

export const ContactButton = styled(Button)`
  margin-top: 28px;
`;

export const FindMoreLink = styled(Button).attrs({
  color: 'text-button',
  target: '_blank',
})`
  line-height: 22px;
  margin: 26px 0px 0px 8px;
`;

export const IconContainer = styled.div`
  margin-top: 9px;
`;
