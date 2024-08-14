import { Svg } from '.';

interface IProps {
  title?: string;
}

export const ConfirmationSquaresGraphic = ({ title }: IProps) => (
  <Svg title={title} width="107" height="107" viewBox="0 0 107 107" fill="none">
    <>
      <rect x="72" y="72" width="35" height="35" fill="#99CEB4" />
      <rect width="72" height="72" fill="#008443" />
      <path
        d="M59.1211 21.968L29.6623 53.8828L15.0011 39.7586L21.1103 33.4205L29.297 41.3035L52.6554 15.9996L59.1211 21.968Z"
        fill="white"
      />
    </>
  </Svg>
);

ConfirmationSquaresGraphic.defaultProps = {
  title: '',
};
