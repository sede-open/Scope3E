import { notificationIconSvg } from 'components/Header/NavMenu/selectors';
import { AlizarinCrimson, Red80 } from 'styles/colours';
import { Svg } from '.';

export const Notification = ({
  fill = AlizarinCrimson,
  stroke = Red80,
}: {
  fill?: string;
  stroke?: string;
}) => {
  return (
    <Svg
      dataTestId={notificationIconSvg}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      title="Notification"
    >
      <rect x="2" y="2" width="16" height="16" rx="8" fill={fill} />
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke={stroke} />
      <path
        d="M9.50781 11.7852L9.08008 7.42578V5.41016H10.8613V7.42578L10.4395 11.7852H9.50781ZM9.15039 14V12.3535H10.7969V14H9.15039Z"
        fill="white"
      />
    </Svg>
  );
};
