import { Svg } from '.';

interface IProps {
  title?: string;
  width: string;
  height: string;
}

export const CarouselSquare = ({ title, width, height }: IProps) => (
  <Svg
    title={title}
    width={width}
    height={height}
    viewBox="0 0 35 35"
    fill="none"
  >
    <rect width="35" height="35" fill="#FBCE07" />
  </Svg>
);

CarouselSquare.defaultProps = {
  title: '',
};
