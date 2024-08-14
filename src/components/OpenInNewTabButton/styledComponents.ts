import styled from 'styled-components';
import Button from 'components/Button';
import { device } from 'styles/variables';

export const LinkTextButton = styled(Button).attrs({
  color: 'text-button',
  target: '_blank',
})`
  display: inline-block;
  margin-left: 8px;
  line-height: 22px;

  @media ${device.mobileL} {
    width: 170px;
  }

  @media ${device.tabletS} {
    width: 100%;
    white-space: nowrap;
  }
`;

export const Container = styled(Button).attrs({
  color: 'text-button',
})`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;

  @media ${device.mobileM} {
    width: 100%;
  }

  @media ${device.tabletS} {
    margin-bottom: 10px;
  }

  @media ${device.laptopS} {
    width: auto;
  }
`;
