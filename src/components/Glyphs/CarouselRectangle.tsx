import { Svg } from '.';

interface IProps {
  title?: string;
}

export const CarouselRectangle = ({ title }: IProps) => (
  <Svg title={title} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      fill="white"
      stroke="#D9D9D9"
    />
  </Svg>
);

CarouselRectangle.defaultProps = {
  title: '',
};
