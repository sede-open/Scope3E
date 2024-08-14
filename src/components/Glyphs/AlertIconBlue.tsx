import { Svg } from '.';

interface IProps {
  title?: string;
}

export const AlertIconBlue = ({ title }: IProps) => (
  <Svg title={title} width="26" height="24" viewBox="0 0 26 24" fill="none">
    <path
      d="M23.2174 2V22H2.40576V2H23.2174ZM21.1362 4H4.48692V20H21.1362V4ZM13.8521 10.002V15H15.9295V17H9.68721V15H11.771V12.002L10.7262 12.002V10.002H13.8521ZM12.2913 6C13.1533 6 13.8521 6.67157 13.8521 7.5C13.8521 8.32843 13.1533 9 12.2913 9C11.4292 9 10.7304 8.32843 10.7304 7.5C10.7304 6.67157 11.4292 6 12.2913 6Z"
      fill="#003C88"
    />
  </Svg>
);

AlertIconBlue.defaultProps = {
  title: '',
};
