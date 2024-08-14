import { Svg } from '.';

interface IProps {
  title?: string;
}

export const ActiveCarouselRectangle = ({ title }: IProps) => (
  <Svg title={title} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="0.5" y="0.5" width="15" height="15" fill="grey" stroke="#7F7F7F" />
  </Svg>
);

ActiveCarouselRectangle.defaultProps = {
  title: '',
};
