import { Svg } from '.';

interface IProps {
  title?: string;
}

export const BuildingOfficeIcon = ({ title }: IProps) => (
  <Svg title={title} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 0V2H7V4H9V20H0V4H2V2H4V0H5ZM16 8C18.2091 8 20 9.79086 20 12C20 13.8636 18.7256 15.4295 17.0008 15.8738L17 20H15L15.0002 15.874C13.2749 15.4301 12 13.8639 12 12C12 9.79086 13.7909 8 16 8ZM7 6H2V18H7V6ZM6 14V16H3V14H6ZM16 10C14.8954 10 14 10.8954 14 12C14 12.7403 14.4022 13.3866 14.9999 13.7324L15 12H17L17.0011 13.7318C17.5983 13.3858 18 12.7398 18 12C18 10.8954 17.1046 10 16 10ZM6 11V13H3V11H6ZM6 8V10H3V8H6Z"
      fill="white"
    />
  </Svg>
);

BuildingOfficeIcon.defaultProps = {
  title: '',
};
