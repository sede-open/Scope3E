import styled from 'styled-components';

import { Text } from 'components/Text';
import {
  Tundora,
  Scorpion,
  Alto,
  FunGreen,
  CongressBlue,
} from 'styles/colours';
import { SearchSelectOptionTagType } from '../types';

const TagColour = {
  [SearchSelectOptionTagType.PRIMARY]: FunGreen,
  [SearchSelectOptionTagType.SECONDARY]: CongressBlue,
};

export const Label = styled(Text).attrs({
  size: '14px',
  color: Tundora,
  as: 'div',
})`
  line-height: 20px;
  font-weight: bold;
`;

export const Meta = styled(Text).attrs({
  size: '12px',
  as: 'div',
  color: Scorpion,
})`
  line-height: 14px;
  margin-bottom: 5px;
`;

export const Tag = styled(Text).attrs<{
  type: SearchSelectOptionTagType;
}>({
  size: '12px',
  as: 'div',
})`
  line-height: 14px;
  color: ${({ type }: { type: SearchSelectOptionTagType }) => TagColour[type]};
`;

export const Container = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: ${Alto};
  }
`;
