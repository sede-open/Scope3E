import { RadioInputGroup } from 'components/Form/RadioInputGroup';
import styled from 'styled-components';

export const CheckboxContainer = styled.div<{ hasError: boolean }>`
  margin-top: 24px;
  > * {
    &:last-child {
      margin-bottom: 0;
    }
  }

  ${({ hasError }) =>
    hasError &&
    `   border-left: 1px;
        border-color: red;
        border-style: solid;
        border-right: 0;
        border-bottom: 0;
        border-top: 0;
        padding-left: 16px;
  `}
`;

export const SubLabel = styled.div<{ marginBottom?: string }>`
  margin-top: 24px;
  font-weight: bold;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`;

export const PublicRadioInputGroup = styled(RadioInputGroup)`
  > * {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
