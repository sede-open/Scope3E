import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { abcdGray, Tundora, White } from 'styles/colours';
import Button from 'components/Button';

export const Container = styled.div<{
  isWizard?: boolean;
  isFullDisplay?: boolean;
  isLoading?: boolean;
}>`
  padding: ${ifProp({ isWizard: true, isFullDisplay: false }, 0, '2.5rem') &&
  ifProp(
    { isWizard: false, isFullDisplay: true },
    '4rem 10rem 7.5rem 10rem',
    '0'
  )};
  margin: ${ifProp({ isWizard: false, isFullDisplay: false }, '2.5rem', '0')};
  width: ${ifProp({ isFullDisplay: true }, '100vw', 'auto')};
  min-height: ${ifProp({ isFullDisplay: true }, '100vh', 'auto')};
  background-color: ${ifProp({ isFullDisplay: true }, abcdGray, White)};
  display: ${ifProp({ isFullDisplay: true }, 'flex', '')};
  justify-content: ${ifProp({ isFullDisplay: true }, 'center', '')};
`;

export const CloseIconContainer = styled(Button).attrs({
  color: 'text-button',
  type: 'button',
})<{
  hasProgressBar?: boolean;
  isFullDisplay?: boolean;
  top?: string;
  right?: string;
}>`
  cursor: pointer;
  position: absolute;
  :focus {
    outline: ${Tundora} solid 1px;
    background: ${abcdGray};
  }
  right: ${(props) => {
    if (props.right) {
      return props.right;
    }
    return props.isFullDisplay ? '9rem' : '1rem';
  }};
  top: ${(props) => {
    if (props.top) {
      return props.top;
    }
    if (props.hasProgressBar && !props.isFullDisplay) {
      return '21px';
    }
    if (!props.hasProgressBar && props.isFullDisplay) {
      return '4rem';
    }
    return '1rem';
  }};
  &:hover {
    background: ${abcdGray};
  }
`;
