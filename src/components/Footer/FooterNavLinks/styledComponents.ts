import styled from 'styled-components';
import Button from 'components/Button';
import { Gray } from 'styles/colours';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;

  > * {
    margin-bottom: 0;

    &:last-child {
      margin-top: 20px;
      white-space: nowrap;
    }
  }
`;

export const NavButton = styled(Button).attrs({ color: 'text-button' })`
  line-height: 26px;
  display: inline-block;
  :focus {
    color: ${Gray};
  }
`;
