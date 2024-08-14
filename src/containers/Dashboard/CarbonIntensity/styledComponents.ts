import styled from 'styled-components';
import { Alto, White } from 'styles/colours';

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 57px;
  border-radius: 4px;
`;

export const Container = styled.div`
  margin-top: 1rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  background: ${White};
  height: 494px;
  border: 1px solid ${Alto};
`;
