import styled from 'styled-components';
import { Alto, abcdGray } from 'styles/colours';

export const InviteContainer = styled.article`
  background: ${abcdGray};
  border: 1px solid ${Alto};
  margin: 0 1.5rem 1rem;
  padding: 32px;
  display: flex;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`;

export const IconContainer = styled.div`
  margin-right: 16px;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
`;

export const InviteTitle = styled.span`
  font-weight: 700;
`;

export const InviterContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  margin-left: 16px;
`;

export const CTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > * {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;
