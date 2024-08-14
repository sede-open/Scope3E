import { Svg } from '.';

interface IProps {
  title?: string;
}

export const BarChartIcon = ({ title }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 22V20H3V8H10V14H14V2H21V20H22V22H2ZM8 10H5V20H8V10ZM14 16H10V20H14V16ZM19 4H16V20H19V4Z"
      fill="#595959"
    />
  </Svg>
);

BarChartIcon.defaultProps = {
  title: '',
};
