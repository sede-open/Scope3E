import useTranslation from 'next-translate/useTranslation';
import CarouselSlider from 'components/CarouselSlider';
import { ReactPortal } from 'components/ReactPortal';
import { carouselInnerId } from 'components/CarouselSlider/selectors';
import { RightCarouselArrow } from 'components/Glyphs/RightCarouselArrow';
import { LeftCarouselArrow } from 'components/Glyphs/LeftCarouselArrow';
import { PrivateSolutionCard } from '../../../containers/PrivateSolutions/PrivateSolutionCard';
import { Solutions } from '../../../containers/PrivateSolutions/types';
import * as StyledComponents from './styledComponents';

interface IProps {
  translationPrefix: string;
  id: string;
  solutions: Solutions[];
}

const CustomRight = ({ onClick }: any) => {
  return (
    <ReactPortal targetNode={document.getElementById(carouselInnerId)}>
      <StyledComponents.CustomisedRightButton onClick={onClick}>
        <RightCarouselArrow />
      </StyledComponents.CustomisedRightButton>
    </ReactPortal>
  );
};

const CustomLeft = ({ onClick }: any) => {
  return (
    <ReactPortal targetNode={document.getElementById(carouselInnerId)}>
      <StyledComponents.CustomisedLeftButton onClick={onClick}>
        <LeftCarouselArrow />
      </StyledComponents.CustomisedLeftButton>
    </ReactPortal>
  );
};

export const AlternativeSolutionsGrid = ({
  translationPrefix,
  id,
  solutions,
}: IProps) => {
  const { t } = useTranslation();
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 1290 },
      items: 3,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1289, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1023, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      <StyledComponents.GridContainer>
        <StyledComponents.GridHeaderContainer data-testid={id}>
          <StyledComponents.GridTitle>
            {t(`${translationPrefix}:${id}-title`)}
          </StyledComponents.GridTitle>
        </StyledComponents.GridHeaderContainer>

        <StyledComponents.GridBody>
          <CarouselSlider
            responsive={responsive}
            slidesToSlide={3}
            customRightArrow={<CustomRight />}
            customLeftArrow={<CustomLeft />}
          >
            {solutions.map((solutionId) => (
              <PrivateSolutionCard key={solutionId} solutionId={solutionId} />
            ))}
          </CarouselSlider>
        </StyledComponents.GridBody>
      </StyledComponents.GridContainer>
    </>
  );
};
