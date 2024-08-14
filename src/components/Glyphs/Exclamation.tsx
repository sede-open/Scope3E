import { Svg } from '.';

interface IProps {
  title?: string;
}

export const ExclamationIcon = ({ title = 'exclamation' }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <>
      <path
        d="M20 0V20H0V0H20ZM18 2H2V18H18V2ZM10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15C9 14.4477 9.44772 14 10 14ZM11 4V12H9V4H11Z"
        fill="#404040"
      />
    </>
  </Svg>
);
