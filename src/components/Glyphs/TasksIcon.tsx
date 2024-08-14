import { Svg } from '.';

interface IProps {
  title?: string;
}

export const TasksIcon = ({ title }: IProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" title={title}>
      <path
        d="M6 14V20H0V14H6ZM20 16V18H8V16H20ZM4 16H2V18H4V16ZM6 7V13H0V7H6ZM20 9V11H8V9H20ZM4 9H2V11H4V9ZM6 0V6H0V0H6ZM20 2V4H8V2H20ZM4 2H2V4H4V2Z"
        fill="#404040"
      />
    </Svg>
  );
};

TasksIcon.defaultProps = {
  title: undefined,
};
