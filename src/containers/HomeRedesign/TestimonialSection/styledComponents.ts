import Button from 'components/Button';
import { Text } from 'components/Text';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { FunGreen, Tundora, White } from 'styles/colours';
import { exampleBold, exampleBook } from 'styles/fonts';
import { device } from 'styles/variables';

export const TestimonialBackground = styled.section`
  width: 100%;
  background-color: ${FunGreen};
  height: 100%;
  padding: 58px 0;
`;

export const TestimonialTitle = styled(Text).attrs({
  as: 'h3',
  color: White,
  size: '1.625rem',
  family: exampleBold,
})`
  margin-left: 24px;
  margin-bottom: 20px;
  @media ${device.tabletM} {
    margin-left: 130px;
  }
`;

export const CarouselContainer = styled.div`
  height: 100%;
`;

export const DotItem = styled.li<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: 1px solid ${ifProp('$active', White, 'transparent')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.button`
  all: unset;
  background-color: ${White};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
`;

export const TestimonialCardContainer = styled.div`
  display: flex;
  padding: 0 24px;

  @media ${device.tabletM} {
    padding: 0 130px;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  padding: 16px 8px;

  @media ${device.tabletS} {
    padding: 30px 20px;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  max-width: 98px;

  @media ${device.tabletS} {
    max-width: 144px;
  }
`;

export const QuoteContainer = styled.div``;

export const DoubleQuote = styled(Text).attrs({
  color: White,
  size: '2rem',
  family: exampleBold,
})`
  height: 50px;
  @media ${device.tabletS} {
    font-size: 4rem;
  }
`;

export const DoubleQuoteEnd = styled(DoubleQuote)`
  text-align: end;
`;

export const QuoteText = styled(Text).attrs({
  color: White,
  size: '1.5rem',
  family: exampleBook,
})`
  padding: 0 20px;
  @media ${device.tabletS} {
    padding: 0 40px;
  }
`;
export const PostScriptumContainer = styled.div`
  margin-top: -40px;
`;

export const PositionTitle = styled(Text).attrs({
  color: White,
  size: '1.1875rem',
})`
  margin-bottom: 20px;
  padding: 0 20px;
  @media ${device.tabletS} {
    padding: 0 40px;
  }
`;

export const NameSurname = styled(PositionTitle)`
  font-weight: bold;
  margin-bottom: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-left: 0;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 68px;

  @media ${device.tabletS} {
    padding-left: 260px;
    justify-content: start;
    flex-direction: row;
  }

  @media ${device.tabletM} {
    padding-left: 360px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SeeAllButton = styled(Button).attrs({
  color: 'redesign-primary-outline',
})`
  width: 200px;
`;

export const ReadMoreButton = styled(Button).attrs({
  color: 'redesign-secondary',
})`
  border: 3px solid transparent;
  &:focus,
  &:hover,
  &:active {
    color: ${Tundora};
    border: 3px solid ${White};
    background-color: ${FunGreen};

    path {
      stroke: ${Tundora};
    }
  }
`;

export const ReadMoreSpan = styled.span`
  margin-right: 12px;
`;

export const Wrapper = styled.div`
  width: 100%;
`;
