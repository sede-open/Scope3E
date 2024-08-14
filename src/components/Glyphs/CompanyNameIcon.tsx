import { Svg } from '.';

interface IProps {
  title?: string;
}

export const CompanyNameIcon = ({ title }: IProps) => (
  <Svg title={title} width="48" height="49" viewBox="0 0 48 49" fill="none">
    <>
      <rect width="48" height="49" fill="#F7F7F7" />
      <path
        d="M19 14V16H21V18H23V34H14V18H16V16H18V14H19ZM30 22C32.2091 22 34 23.7909 34 26C34 27.8636 32.7256 29.4295 31.0008 29.8738L31 34H29L29.0002 29.874C27.2749 29.4301 26 27.8639 26 26C26 23.7909 27.7909 22 30 22ZM21 20H16V32H21V20ZM20 28V30H17V28H20ZM30 24C28.8954 24 28 24.8954 28 26C28 26.7403 28.4022 27.3866 28.9999 27.7324L29 26H31L31.0011 27.7318C31.5983 27.3858 32 26.7398 32 26C32 24.8954 31.1046 24 30 24ZM20 25V27H17V25H20ZM20 22V24H17V22H20Z"
        fill="#404040"
      />
    </>
  </Svg>
);

CompanyNameIcon.defaultProps = {
  title: '',
};
