import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useTaskList } from 'effects/useTaskList';
import Modal from 'components/Modal';

import { displayErrorMessage } from 'utils/toast';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { useSuppressTaskListPrompt } from './mutations';
import { TaskListPromptContentType } from './types';

export interface IProps {
  contentType: TaskListPromptContentType | null;
  closeModal: () => void;
}

export const TaskListPrompt = ({ contentType, closeModal }: IProps) => {
  const { t } = useTranslation();

  const { preferences } = useAuthenticatedUser();
  const isTaskListPromptSuppressed = preferences?.suppressTaskListPrompt;

  const { setIsTaskListOpen } = useTaskList();

  const [isIconChecked, setIsIconChecked] = useState(false);

  useEffect(() => {
    const iconCheckedTimeout = setTimeout(() => {
      setIsIconChecked(true);
    });

    return () => {
      clearTimeout(iconCheckedTimeout);
    };
  }, []);

  const mutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('common:toast-error-title'),
        subtitle: t('common:toast-error-title'),
      });
    },
  };

  const [suppressTaskListPrompt] = useSuppressTaskListPrompt(mutationOptions);

  const handleClose = async () => {
    if (!isTaskListPromptSuppressed) {
      await suppressTaskListPrompt();
    }

    closeModal();
  };

  const handleAccept = async () => {
    if (!isTaskListPromptSuppressed) {
      await suppressTaskListPrompt();
    }

    setIsTaskListOpen(true);

    closeModal();
  };

  const isUnlockedDashboardContentType =
    contentType === TaskListPromptContentType.UNLOCKED_DASHBOARD;

  const headerText = isUnlockedDashboardContentType
    ? t('taskList:task-list-modal-heading-unlocked-dashboard')
    : t('taskList:task-list-modal-heading-welcome-back');

  return (
    <Modal isOpen onClose={handleClose}>
      <StyledComponents.Container data-testid={selectors.taskListModal}>
        {isUnlockedDashboardContentType && (
          <StyledComponents.StyledTaskListCheck
            dataTestId={selectors.checkIcon}
            isChecked={isIconChecked}
            title={t('taskList:item-check-icon-completed')}
          />
        )}
        <div>
          <StyledComponents.Header>{headerText}</StyledComponents.Header>
          <StyledComponents.Description>
            {t('taskList:task-list-modal-description')}
          </StyledComponents.Description>

          <StyledComponents.StyledButton
            color="primary"
            data-testid={selectors.acceptButton}
            onClick={handleAccept}
          >
            {t('taskList:task-list-modal-accept')}
          </StyledComponents.StyledButton>
        </div>
      </StyledComponents.Container>
    </Modal>
  );
};
