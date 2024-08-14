import styled from 'styled-components';
import Button from 'components/Button';
import { Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { ifProp, prop } from 'styled-tools';

export const Nav = styled.nav<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  max-width: 100%;
`;

export const NavList = styled.ul<{ $direction: string; $isBurger: boolean }>`
  display: flex;
  flex-direction: ${prop('$direction')};
  list-style-type: none;
  margin: 0;
  padding: 0;

  > * {
    margin-right: 0;

    &:last-child {
      margin-right: ${ifProp('$isBurger', '0px', '17px')};
    }
  }
`;

export const NavItem = styled.li<{ $isBurger: boolean; $footer: boolean }>`
  display: flex;
  justify-content: ${ifProp('$footer', 'start', 'center')};
  margin-left: ${ifProp('$isBurger', '0px', '8px')};

  @media ${device.tabletM} {
    justify-content: center;
  }
`;

export const NavLink = styled(Button)<{
  $isActive?: boolean;
  $dark?: boolean;
  $footer: boolean;
}>`
  border-bottom: 3px solid
    ${(props) => {
      if (!props.$isActive || props.$footer) {
        return 'transparent';
      }
      return props.$dark ? Tundora : White;
    }};
  color: ${ifProp('$dark', Tundora, White)};
  display: flex;
  line-height: 26px;
  max-height: 48px;
  text-decoration: none;
  padding: 8px;
  font-size: 1rem;
  white-space: nowrap;
  font-family: ${exampleBold};

  :hover {
    border-bottom: 3px solid ${ifProp('$dark', Tundora, White)};
    color: ${ifProp('$dark', Tundora, White)};
    outline: none;
  }

  @media ${device.tabletM} {
    padding: 16px;
  }
`;
