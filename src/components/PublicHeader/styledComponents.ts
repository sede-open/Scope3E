import styled from 'styled-components';
import { FunGreen, White } from 'styles/colours';
import Button from 'components/Button';
import { device } from 'styles/variables';

export const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 4px 16px;
  margin: 0 auto;
  transition: all 150ms linear;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  z-index: 6;
  background-color: ${White};

  @media ${device.tabletS} {
    align-items: center;
  }
  @media ${device.tabletM} {
    background-color: transparent;
  }
  @media ${device.laptopS} {
    padding: 24px;
  }
  @media ${device.laptopL} {
    margin: 0 auto;
  }
`;

export const LogoContainer = styled.a`
  width: 300px;
  @media ${device.laptopS} {
    width: 327px;
  }
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media ${device.tabletM} {
    width: auto;
  }
`;

export const NavBarContainer = styled.div`
  display: none;
  @media ${device.tabletM} {
    display: flex;
    align-items: center;
  }
`;

export const CtaContainer = styled.div`
  display: none;

  > * {
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media ${device.tabletM} {
    margin-top: 0;
    display: flex;
    flex-direction: row;
  }
`;

export const CtaButton = styled(Button)`
  max-height: 48px;
  max-width: 132px;
  white-space: nowrap;
  line-height: 26px;
`;

export const MenuIcon = styled.button<{ open: boolean }>`
  background: ${(props) =>
    props.open ? "url('/cross-white.svg')" : "url('/burger-menu-white.svg')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  outline: none;
  border: none;
  height: 35px;
  width: 35px;
  background-color: ${FunGreen};
  border-radius: 50%;

  @media ${device.mobileM} {
    height: 40px;
    width: 40px;
  }
`;

export const MenuIconContainer = styled.div`
  display: flex;
  @media ${device.tabletM} {
    display: none;
  }
`;

export const BurgerMenuContainer = styled.div`
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  @media ${device.tabletM} {
    display: none;
  }
`;

export const CtaContainerForTablet = styled.div`
  display: none;
  right: 20px;
  position: absolute;

  @media ${device.tabletM} {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 0px;
    > * {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  @media ${device.tabletNav} {
    display: none;
  }
`;
