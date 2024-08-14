import styled from 'styled-components';

import Button from 'components/Button';
import { Gray } from 'styles/colours';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const StyledButton = styled(Button)`
  padding: 0px 24px 0px 24px;
`;

export const NoCompanyResultsContainer = styled.div`
  padding: 0.625rem 1rem;
`;

export const NoCompanyResultsParagraph = styled.p`
  color: ${Gray};
  font-size: 0.875rem;
`;

export const NoCompanyResultsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
`;

export const TooltipContainer = styled.div`
  margin-bottom: 0.5rem;
`;
