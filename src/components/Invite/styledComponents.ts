import styled from 'styled-components';

import { Alto, abcdGray } from 'styles/colours';

export const InviteContainer = styled.article`
  background: ${abcdGray};
  border: 1px solid ${Alto};
  margin: 0 1.5rem 1rem;
  padding: 1.5rem;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`;

export const InviteTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
`;

export const InviterContainer = styled.div`
  align-items: flex-start;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.875rem;
`;

export const InviterInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;
