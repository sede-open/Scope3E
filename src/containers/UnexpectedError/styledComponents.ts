import styled from 'styled-components';

import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';
import { device } from 'styles/variables';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-start;
  max-width: 900px;
  margin: 48px auto 48px auto;

  @media ${device.laptopS} {
    margin: 48px auto 48px auto;
  }

  @media ${device.laptopL} {
    margin: 48px auto 48px auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;
  padding: 0 18px 0 16px;

  @media ${device.laptopS} {
    padding: 0 18px 0 14px;
  }

  @media ${device.laptopL} {
    padding: 0 18px 0 50px;
  }
`;

export const SquaresContainer = styled.div`
  display: none;

  @media ${device.laptopS} {
    display: block;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
  color: Tundora,
})`
  margin-bottom: 16px;
  font-size: 26px;
  line-height: 33px;
  letter-spacing: -1px;

  @media ${device.laptopS} {
    font-size: 36px;
    line-height: 43px;
    letter-spacing: -1px;
  }

  @media ${device.laptopL} {
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -2px;
    margin-bottom: 24px;
  }
`;

export const Paragraph = styled(Text).attrs({
  color: Tundora,
})`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 21px;

  @media ${device.laptopS} {
    line-height: 24px;
    margin-bottom: 24px;
  }

  @media ${device.laptopL} {
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 30px;
  }
`;
