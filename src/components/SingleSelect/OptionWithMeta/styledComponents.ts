import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora, Gallery, SilverChalice } from 'styles/colours';
import { ifProp } from 'styled-tools';

export const OptionContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 5px 18px 8px 16px;
  cursor: pointer;
  min-width: 268px;

  background: ${ifProp({ isSelected: true }, SilverChalice, 'transparent')};

  &:hover {
    background: ${ifProp({ isSelected: true }, SilverChalice, Gallery)};
  }
`;

export const Label = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Meta = styled(Text).attrs({
  size: '12px',
  color: Tundora,
})`
  line-height: 14px;
`;
