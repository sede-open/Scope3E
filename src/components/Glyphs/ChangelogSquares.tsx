import { Svg } from '.';

interface IProps {
  title?: string;
}

export const ChangelogSquares = ({ title }: IProps) => (
  <Svg title={title} width="107" height="107" viewBox="0 0 107 107" fill="none">
    <>
      <rect x="72" width="35" height="35" fill="#339D69" />
      <rect y="35" width="72" height="72" fill="#FBCE07" />
    </>
  </Svg>
);

ChangelogSquares.defaultProps = {
  title: '',
};
