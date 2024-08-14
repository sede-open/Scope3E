import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { Alto, Scorpion, SilverChalice, Tundora, White } from 'styles/colours';

import { Text } from 'components/Text';
import { CheckboxInput } from 'components/Form/Inputs/Checkbox/styledComponents';

export const Checkbox = styled.div<{
  isChecked: boolean;
}>`
  background: ${White} no-repeat 50% 50%;
  border: 1px solid ${ifProp({ isChecked: true }, Scorpion, SilverChalice)};
  content: '';
  display: block;
  height: 1.5rem;
  width: 1.5rem;
  transition: all 0.2s linear;

  ${CheckboxInput}:focus {
    box-shadow: 0 0 0 1px ${Scorpion};
  }

  ${({ isChecked }) =>
    isChecked &&
    `
      background: ${White} url(/checkbox-tick.svg) no-repeat 50% 50%;
    `}
`;

export const Label = styled.label<{
  isChecked: boolean;
}>`
  cursor: pointer;
  display: flex;
  flex: 1;
  position: relative;
  padding: 16px 14px 16px;
  border: 1px solid ${ifProp({ isChecked: true }, Scorpion, Alto)};

  &:hover {
    border: 1px solid ${ifProp({ isChecked: true }, Scorpion, SilverChalice)};
    ${Checkbox} {
      border: 1px solid ${ifProp({ isChecked: true }, Scorpion, SilverChalice)};
    }
  }
`;

export const Inner = styled.div`
  display: flex;
  flex: 1;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 17px;
  max-width: 60px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: 17px;
`;

export const Title = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Subtitle = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;
