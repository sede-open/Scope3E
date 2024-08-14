import { Svg } from '.';

interface IProps {
  title?: string;
}

export const ChangelogSquare = ({ title }: IProps) => (
  <Svg title={title} width="35" height="35" viewBox="0 0 35 35" fill="none">
    <rect width="35" height="35" fill="#FBCE07" />
  </Svg>
);

ChangelogSquare.defaultProps = {
  title: '',
};
