import { CarouselSquare } from 'components/Glyphs/CarouselSquare';
import * as StyledComponents from './styledComponents';

interface IProps {
  imagePath: string;
  imageTitle: string;
  testimonialContent: string;
  testimonialSpeaker: string;
  testimonialSpeakerDesignation: string;
  companyLogoPath: string;
  companyLogoAltText: string;
}

export const TestimonialCard = ({
  imagePath,
  imageTitle,
  testimonialContent,
  testimonialSpeaker,
  testimonialSpeakerDesignation,
  companyLogoPath,
  companyLogoAltText,
}: IProps) => (
  <StyledComponents.MainContainer>
    <StyledComponents.MainImage src={imagePath} alt={imageTitle} />
    <StyledComponents.ChangelogSquareContainer>
      <CarouselSquare width="70" height="70" />
    </StyledComponents.ChangelogSquareContainer>
    <StyledComponents.TextWrapper>
      <StyledComponents.TextContainer>
        <StyledComponents.ContentText title={testimonialContent}>
          {testimonialContent}
        </StyledComponents.ContentText>
        <StyledComponents.SpeakerText>
          {testimonialSpeaker}
        </StyledComponents.SpeakerText>
        <StyledComponents.SpeakerDesignationText>
          {testimonialSpeakerDesignation}
        </StyledComponents.SpeakerDesignationText>
        <StyledComponents.LogoImage
          src={companyLogoPath}
          alt={companyLogoAltText}
        />
      </StyledComponents.TextContainer>
    </StyledComponents.TextWrapper>
  </StyledComponents.MainContainer>
);
