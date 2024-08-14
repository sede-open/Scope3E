import Button from 'components/Button';
import styled from 'styled-components';
import { FunGreen } from 'styles/colours';
import { device } from 'styles/variables';

export const FooterContainer = styled.footer`
  min-height: 120px;

  @media ${device.tabletM} {
    padding: 4px 28px 8px 28px;
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    flex: 1;
  }

  @media ${device.tabletM} {
    align-items: center;
    > div {
      width: auto;
    }
  }
`;

export const NavButton = styled(Button).attrs({
  as: 'a',
  color: 'text-button',
})`
  margin-left: 12px;
  line-height: 26px;
  display: block;
  padding: 8px;

  &:hover,
  &:focus,
  &:active {
    color: ${FunGreen};
  }

  @media ${device.tabletM} {
    display: inline-block;
    padding: 0;
  }
`;

export const SecondaryBorderlessButton = styled(Button).attrs({
  as: 'a',
  color: 'redesign-secondary-borderless',
})`
  margin-left: 4px;
  display: block;
  width: max-content;
  @media ${device.tabletM} {
    display: inline-block;
  }
`;
