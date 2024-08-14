import { Svg } from '.';

interface IProps {
  title?: string;
}

export const SquaresGraphic = ({ title }: IProps) => (
  <Svg title={title} width="107" height="107" viewBox="0 0 107 107" fill="none">
    <>
      <rect x="72" y="72" width="35" height="35" fill="#339D69" />
      <rect width="72" height="72" fill="#FBCE07" />
    </>
  </Svg>
);

SquaresGraphic.defaultProps = {
  title: '',
};
