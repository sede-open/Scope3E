import { TaskListPromptContentType } from 'containers/Modals/TaskListPrompt/types';
import { ModalState, ModalType } from 'context/ModalProvider/types';
import { getSecondsInNumberOfDays } from 'utils/date';
import {
  LocalStorageKeys,
  getItem as getLocalStorageItem,
} from 'utils/localStorage';

export const shouldRenderTaskListPrompt = (
  isSuppressed: boolean,
  modalState: ModalState | null,
  userHasEmissions: boolean
) => {
  const isUnlockedTaskListPromptActive =
    modalState?.modalType === ModalType.TASK_LIST_PROMPT &&
    modalState?.contentProps?.contentType ===
      TaskListPromptContentType.UNLOCKED_DASHBOARD;

  return !isUnlockedTaskListPromptActive && !isSuppressed && userHasEmissions;
};

export const hasDataPrivacyModalBeenSnoozedToday = () => {
  const modalSnoozed = getLocalStorageItem(
    LocalStorageKeys.DATA_PRIVACY_MODAL_SNOOZED_ON
  );

  const today = new Date().getTime();

  if (!modalSnoozed) {
    return false;
  }

  const snoozedAt = parseInt(modalSnoozed, 10);

  const oneDayInMs = getSecondsInNumberOfDays(1) * 1000;

  return snoozedAt + oneDayInMs > today;
};
