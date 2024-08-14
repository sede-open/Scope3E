import Button from 'components/Button';
import { NewTab } from 'components/Glyphs/NewTab';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import * as StyledComponents from './styledComponents';

type Props = {
  imageSrc: string;
  quote: string;
  name: string;
  position: string;
  link: string;
};
export const TestimonialCard = ({
  imageSrc,
  quote,
  name,
  position,
  link,
}: Props) => {
  const { t } = useTranslation('publicSolutions');
  return (
    <StyledComponents.Wrapper>
      <StyledComponents.TestimonialCardContainer>
        <StyledComponents.AvatarContainer>
          <StyledComponents.Avatar src={imageSrc} alt="avatar" />
        </StyledComponents.AvatarContainer>
        <StyledComponents.QuoteContainer>
          <StyledComponents.DoubleQuote>“</StyledComponents.DoubleQuote>
          <StyledComponents.QuoteText>{quote}</StyledComponents.QuoteText>
          <StyledComponents.DoubleQuoteEnd>”</StyledComponents.DoubleQuoteEnd>
          <StyledComponents.PostScriptumContainer>
            <StyledComponents.NameSurname>{name}</StyledComponents.NameSurname>
            <StyledComponents.PositionTitle>
              {position}
            </StyledComponents.PositionTitle>
          </StyledComponents.PostScriptumContainer>
        </StyledComponents.QuoteContainer>
      </StyledComponents.TestimonialCardContainer>
      <StyledComponents.ButtonsContainer>
        <StyledComponents.ButtonContainer>
          <Link href={link} passHref>
            <StyledComponents.ReadMoreButton>
              <StyledComponents.ReadMoreSpan>
                {t('readMoreStory')}
              </StyledComponents.ReadMoreSpan>
              <NewTab />
            </StyledComponents.ReadMoreButton>
          </Link>
        </StyledComponents.ButtonContainer>
        <StyledComponents.ButtonContainer>
          <Link href="/stories" passHref>
            <Button color="redesign-primary-outline">
              {t('seeAllStories')}
            </Button>
          </Link>
        </StyledComponents.ButtonContainer>
      </StyledComponents.ButtonsContainer>
    </StyledComponents.Wrapper>
  );
};
