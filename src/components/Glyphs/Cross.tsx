import { Svg } from '.';

interface IProps {
  title?: string;
}

export const Cross = ({ title }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.8873 8.09998L16.3023 9.51398L13.4123 12.403L16.3023 15.292L14.8873 16.707L11.9983 13.817L9.10931 16.707L7.69531 15.292L10.5843 12.403L7.69531 9.51398L9.10931 8.09998L11.9983 10.989L14.8873 8.09998Z"
      fill="#595959"
    />
  </Svg>
);

Cross.defaultProps = {
  title: '',
};
