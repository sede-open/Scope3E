import useTranslation from 'next-translate/useTranslation';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { getIconTitle } from './utils';
import { ConditionalButton } from './ConditionalButton';

interface IProps {
  dataTestId: string;
  description?: string;
  heading: string;
  isComplete?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Task = ({
  dataTestId,
  description,
  heading,
  isComplete = false,
  isDisabled = false,
  isLoading = false,
  onClick,
}: IProps) => {
  const { t } = useTranslation();

  const iconTitle = getIconTitle({
    t,
    isComplete,
    isDisabled,
    isLoading,
  });

  return (
    <StyledComponents.TaskListItem data-testid={dataTestId}>
      <StyledComponents.IconContainer
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        <StyledComponents.CheckIcon
          dataTestId={selectors.taskCheckIcon}
          isChecked={isComplete}
          isHidden={isDisabled || isLoading}
          title={iconTitle}
        />
      </StyledComponents.IconContainer>

      <div>
        <ConditionalButton
          isClickable={!isLoading && !isDisabled}
          onClick={onClick}
          dataTestId={selectors.getButtonTestId(dataTestId)}
        >
          <StyledComponents.TaskHeading>{heading}</StyledComponents.TaskHeading>
        </ConditionalButton>
        {description && !isLoading && !isComplete && (
          <StyledComponents.TaskDescription
            data-testid={selectors.taskDescription}
          >
            {description}
          </StyledComponents.TaskDescription>
        )}
      </div>
    </StyledComponents.TaskListItem>
  );
};

Task.defaultProps = {
  description: undefined,
  isComplete: false,
  isDisabled: false,
  isLoading: false,
  onClick: undefined,
};
