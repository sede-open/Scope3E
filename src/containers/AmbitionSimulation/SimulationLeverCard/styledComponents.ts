import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import {
  White,
  Alto,
  Tundora,
  SilverChalice,
  FunGreen,
  AlizarinCrimson,
} from 'styles/colours';
import { Text } from 'components/Text';

export const Wrapper = styled.form`
  position: relative;
  width: 264px;
  padding: 16px 24px 32px 24px;
  background: ${White};
  border: 1px solid ${Alto};
  overflow: visible;
  height: 345px;
`;

export const CardIcon = styled.div<{ background: string; disabled: boolean }>`
  position: absolute;
  right: -1px;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 49px;
  width: 48px;
  background: ${({ background, disabled }) => (disabled ? Alto : background)};
`;

export const Title = styled(Text)<{ disabled: boolean }>`
  line-height: 28px;
  color: ${ifProp({ disabled: true }, SilverChalice, Tundora)};
`;

export const CurrentFuelWrapper = styled.div`
  width: 216px;
`;

export const PercentageChange = styled.p<{
  decreasedEmissions: boolean;
  disabled: boolean;
}>`
  height: 20px;
  width: 100%;
  margin: 10px 0px 31px 0px;
  text-align: center;
  color: ${ifProp(
    { decreasedEmissions: true, disabled: false },
    FunGreen,
    AlizarinCrimson
  )};
  color: ${ifProp({ disabled: true }, SilverChalice)};
  line-height: 20px;
  font-size: 14px;
  font-weight: bold;
`;

export const SelectWraper = styled.div`
  padding-bottom: 17px;
  width: 216px;
`;

export const SelectLabel = styled.label`
  visibility: hidden;
  width: 0;
  height: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 216px;
  flex-direction: column;
`;
