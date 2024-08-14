import { Svg } from '.';

interface IProps {
  title?: string;
  fill?: string;
}

export const MailIcon = ({ title, fill = '#000000' }: IProps) => (
  <Svg title={title} width="48" height="48" viewBox="-14 -16 48 48" fill={fill}>
    <>
      <path
        d="M20 0V16H0V0H20ZM2 3.283V14H18V3.284L9.99991 10.4544L2 3.283ZM16.435 2H3.566L10 7.768L16.435 2Z"
        fill={fill}
      />
    </>
  </Svg>
);

MailIcon.defaultProps = {
  title: '',
};
