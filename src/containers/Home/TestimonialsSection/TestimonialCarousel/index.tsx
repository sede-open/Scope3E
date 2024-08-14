import CarouselSlider, {
  CustomLeft,
  CustomRight,
} from 'components/CarouselSlider';
import useTranslation from 'next-translate/useTranslation';
import { TestimonialCard } from '../TestimonialCard';

export interface ITestimonialDataProps {
  imagePath: string;
  imageTitle: string;
  testimonialContent: string;
  testimonialSpeaker: string;
  testimonialSpeakerDesignation: string;
  companyLogoPath: string;
  companyLogoAltText: string;
}

interface IProps {
  testimonialData: ITestimonialDataProps[];
}

export const TestimonialCarousel = ({ testimonialData }: IProps) => {
  const { t } = useTranslation();
  const responsive = {
    All: { breakpoint: { max: 3000, min: 0 }, items: 1 },
  };
  return (
    <CarouselSlider
      responsive={responsive}
      slidesToSlide={1}
      showDots
      customRightArrow={<CustomRight />}
      customLeftArrow={<CustomLeft />}
    >
      {testimonialData &&
        testimonialData.map(
          ({
            imagePath,
            imageTitle,
            testimonialContent,
            testimonialSpeaker,
            testimonialSpeakerDesignation,
            companyLogoPath,
            companyLogoAltText,
          }) => (
            <TestimonialCard
              key={imageTitle}
              imageTitle={t(`publicTestimonial:${imageTitle}`)}
              imagePath={imagePath}
              testimonialContent={t(`publicTestimonial:${testimonialContent}`)}
              testimonialSpeaker={t(`publicTestimonial:${testimonialSpeaker}`)}
              testimonialSpeakerDesignation={t(
                `publicTestimonial:${testimonialSpeakerDesignation}`
              )}
              companyLogoPath={companyLogoPath}
              companyLogoAltText={t(`publicTestimonial:${companyLogoAltText}`)}
            />
          )
        )}
    </CarouselSlider>
  );
};
