import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { Alto, abcdGray, Scorpion, White } from 'styles/colours';
import { groupInputWidth } from 'styles/variables';

export const GroupInput = styled.div<{
  prefix?: string;
  disabled: boolean;
  size: string | undefined;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  max-width: ${({ size }) => (size === 'small' ? '200px' : '100%')};
  *:focus,
  *:hover {
    outline: none;
    border-color: ${({ disabled }) => (disabled ? Alto : Scorpion)};
  }
  background: ${({ disabled }) => (disabled ? abcdGray : White)};

  ${ifProp(
    'prefix',
    css`
    ::before {
      content: '${prop('prefix')}';
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${groupInputWidth};
      height: 100%;
      background: ${abcdGray};
      color: ${Scorpion};
    }
  `
  )}
`;
