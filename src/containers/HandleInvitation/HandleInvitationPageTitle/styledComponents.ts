import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { Link } from 'components/Link';

export const ContentWrapper = styled.div<{ isRequired: boolean }>`
  margin-bottom: ${({ isRequired }) => (isRequired ? '100px' : '0')};

  @media ${device.tabletS} {
    margin-bottom: ${({ isRequired }) => (isRequired ? '200px' : '0')};
  }

  @media ${device.laptopS} {
    margin-bottom: ${({ isRequired }) => (isRequired ? '350px' : '0')};
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 18px;
  max-width: 343px;

  @media ${device.tabletS} {
    margin-bottom: 12px;
    max-width: 535px;
  }

  @media ${device.laptopS} {
    max-width: 576px;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
  color: Tundora,
})`
  letter-spacing: -0.8px;
  font-weight: normal;
  line-height: 34px;

  @media ${device.tabletS} {
    font-size: 36px;
    letter-spacing: -1.3px;
    line-height: 43px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    letter-spacing: -2px;
    line-height: 58px;
  }
`;

export const SubtitleContainer = styled.div`
  max-width: 475px;
  margin-bottom: 16px;

  > * {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ${device.tabletS} {
    margin-bottom: 0;
  }

  @media ${device.laptopS} {
    max-width: 620px;

    > * {
      margin: 30px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const Subtitle = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 21px;

  @media ${device.tabletS} {
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const MailtoLink = styled(Link)`
  white-space: nowrap;
`;
