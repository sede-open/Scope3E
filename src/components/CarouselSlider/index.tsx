import { ReactNode } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';

import { RightCarouselArrow } from 'components/Glyphs/RightCarouselArrow';
import { LeftCarouselArrow } from 'components/Glyphs/LeftCarouselArrow';
import { CarouselRectangle } from 'components/Glyphs/CarouselRectangle';
import { ActiveCarouselRectangle } from 'components/Glyphs/ActiveCarouselRectangle';
import * as StyledComponents from './styledComponents';
import * as carouselSliderSelectors from './selectors';

interface IProps {
  children: ReactNode;
  slidesToSlide?: number;
  showDots?: boolean;
  responsive: ResponsiveType;
  customRightArrow?: React.ReactElement<any> | null;
  customLeftArrow?: React.ReactElement<any> | null;
  arrows?: boolean;
  customDot?: React.ReactElement<any> | null;
}

export const CustomRight = ({ onClick }: any) => (
  <StyledComponents.CustomisedRightButton onClick={onClick}>
    <RightCarouselArrow />
  </StyledComponents.CustomisedRightButton>
);

export const CustomLeft = ({ onClick }: any) => (
  <StyledComponents.CustomisedLeftButton onClick={onClick}>
    <LeftCarouselArrow />
  </StyledComponents.CustomisedLeftButton>
);

const CustomDot = ({ onClick, active }: any) => (
  <li style={{ marginRight: '8px' }} className={active ? 'active' : 'inactive'}>
    <StyledComponents.CustomisedDots onClick={onClick}>
      {active ? <ActiveCarouselRectangle /> : <CarouselRectangle />}
    </StyledComponents.CustomisedDots>
  </li>
);

const CarouselSlider = ({
  children,
  slidesToSlide,
  showDots,
  responsive,
  customRightArrow,
  customLeftArrow,
  arrows = true,
  customDot = <CustomDot />,
}: IProps) => {
  return (
    <div data-testid={carouselSliderSelectors.carousel}>
      <div id={carouselSliderSelectors.carouselInnerId}>
        <Carousel
          infinite
          responsive={responsive}
          arrows={arrows}
          renderArrowsWhenDisabled
          renderButtonGroupOutside
          showDots={showDots}
          slidesToSlide={slidesToSlide}
          swipeable
          customRightArrow={customRightArrow}
          customLeftArrow={customLeftArrow}
          customDot={customDot}
        >
          {children}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSlider;

CarouselSlider.defaultProps = {
  slidesToSlide: 1,
  showDots: false,
};
