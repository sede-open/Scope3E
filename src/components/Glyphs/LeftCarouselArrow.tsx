import { Svg } from '.';

interface IProps {
  title?: string;
}

export const LeftCarouselArrow = ({ title }: IProps) => (
  <Svg title={title} width="11" height="21" viewBox="0 0 11 21" fill="none">
    <path
      d="M10.625 18.6745L2.78 10.0465L10.592 2.22553L9.177 0.811531L0.0180005 9.98153L9.145 20.0195L10.625 18.6745Z"
      fill="#404040"
    />
  </Svg>
);

LeftCarouselArrow.defaultProps = {
  title: '',
};
