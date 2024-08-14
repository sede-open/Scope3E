import { FunGreen, SilverChalice } from 'styles/colours';

import * as StyledComponents from './styledComponents';

interface IProps {
  className?: string;
  dataTestId?: string;
  isChecked?: boolean;
  title?: string;
}

export const TaskListCheck = ({
  className,
  dataTestId,
  isChecked = false,
  title,
}: IProps) => {
  const fillColor = isChecked ? FunGreen : SilverChalice;

  return (
    <StyledComponents.StyledSvg
      className={className}
      dataTestId={dataTestId}
      fill="none"
      height="20"
      isChecked={isChecked}
      title={title}
      viewBox="0 0 20 20"
      width="20"
    >
      <StyledComponents.TransitionPath
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.5586 5.58914L7.51773 11.6304L5.70037 9.83089L4.29289 11.2518L7.52392 14.4523L14.9728 7.00335L13.5586 5.58914Z"
        fill={fillColor}
      />
    </StyledComponents.StyledSvg>
  );
};

TaskListCheck.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  isChecked: false,
  title: undefined,
};
