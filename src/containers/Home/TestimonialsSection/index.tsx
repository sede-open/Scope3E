import useTranslation from 'next-translate/useTranslation';
import * as selectors from 'containers/Home/selectors';
import * as StyledComponents from './styledComponents';
import {
  TestimonialCarousel,
  ITestimonialDataProps,
} from './TestimonialCarousel';

interface IProps {
  testimonialData: ITestimonialDataProps[];
}

export const TestimonialsSection = ({ testimonialData }: IProps) => {
  const { t } = useTranslation();
  return (
    <div data-testid={selectors.homeTestimonialSection}>
      <StyledComponents.TestimonialTextContainer>
        <StyledComponents.TextContainer>
          <StyledComponents.TitleContainer>
            <StyledComponents.Title>
              {t('publicHome:testimonials-section-title')}
            </StyledComponents.Title>
          </StyledComponents.TitleContainer>
          <StyledComponents.SubTextContainer>
            <StyledComponents.Subtext>
              {t('publicHome:testimonials-section-subtext')}
            </StyledComponents.Subtext>
          </StyledComponents.SubTextContainer>
        </StyledComponents.TextContainer>
      </StyledComponents.TestimonialTextContainer>
      <StyledComponents.MainContainer>
        <TestimonialCarousel testimonialData={testimonialData} />
      </StyledComponents.MainContainer>
    </div>
  );
};
