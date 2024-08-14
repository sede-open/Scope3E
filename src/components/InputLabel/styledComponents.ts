import styled from 'styled-components';
import { Text } from 'components/Text';
import { Gray, Tundora } from 'styles/colours';
import { visuallyHidden } from 'styles/variables';
import { exampleBold } from 'styles/fonts';

export const Label = styled.label<{
  width?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  lrgSize?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  width: ${({ width }) => width || 'auto'};
  font-size: ${({ lrgSize }) => (lrgSize ? '24px' : '14px')};
  font-family: ${({ lrgSize }) => (lrgSize ? exampleBold : '')};
  font-weight: ${({ lrgSize }) => (lrgSize ? 'normal' : 'bold')};
  color: ${Tundora};
  line-height: ${({ lrgSize }) => (lrgSize ? '28px' : '16px')};

  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
  `}
  ${({ isHidden }) => isHidden && visuallyHidden};
`;

export const OptionalContainer = styled(Text).attrs({
  color: Gray,
})<{ lrgSize?: boolean }>`
  margin-left: 0.25rem;
  margin-left: ${({ lrgSize }) => (lrgSize ? '8px' : '4px')};
  font-family: ${({ lrgSize }) => (lrgSize ? exampleBold : '')};
  line-height: ${({ lrgSize }) => (lrgSize ? '28px' : '16px')};
  font-size: ${({ lrgSize }) => (lrgSize ? '24px' : '14px')};
`;
