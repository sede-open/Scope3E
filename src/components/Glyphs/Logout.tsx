import { Svg } from '.';

interface IProps {
  title?: string;
}

export const Logout = ({ title }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.92037 4 4.55396 7.05371 4.06189 11L13.466 11L10.5296 7.70346L12.0231 6.37318L17.0351 12L11.984 17.0586L10.5687 15.6454L13.209 13L4.06189 13.001C4.55454 16.9468 7.92071 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
      fill="#404040"
    />
  </Svg>
);

Logout.defaultProps = {
  title: '',
};
