import { Svg } from '.';

interface IProps {
  title?: string;
}

export const RightCarouselArrow = ({ title }: IProps) => (
  <Svg title={title} width="11" height="21" viewBox="0 0 11 21" fill="none">
    <path
      d="M0.375 2.32547L8.22 10.9535L0.408 18.7745L1.823 20.1885L10.982 11.0185L1.855 0.980469L0.375 2.32547Z"
      fill="#404040"
    />
  </Svg>
);

RightCarouselArrow.defaultProps = {
  title: '',
};
