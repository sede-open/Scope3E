import styled from 'styled-components';
import { Festival } from 'styles/colours';
import Button from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

export const CtaContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin-top: 16px;

    &:last-child {
      margin-left: 16px;
      &:focus {
        background-color: ${Festival};
      }
    }
  }
`;

export const CtaButton = styled(Button)`
  max-height: 48px;
  max-width: auto;
  white-space: nowrap;
  line-height: 26px;
`;
