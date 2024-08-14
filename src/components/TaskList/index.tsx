import { ModalContentType } from 'containers/types';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { CorporateEmissionType } from 'types/globalTypes';
import { TaskListQuery } from 'types/TaskListQuery';
import { trackEvent } from 'utils/analytics';
import {
  TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED,
  TASK_LIST_AMBITION_TASK_CLICKED,
  TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED,
  TASK_LIST_BASELINE_TASK_CLICKED,
  TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED,
  TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED,
  TASK_LIST_LAST_YEAR_TASK_CLICKED,
  TASK_LIST_PRIVACY_SHARING_CLICKED,
} from 'utils/analyticsEvents';
import { getCurrentYear } from 'utils/date';
import { displaySuccessMessage } from 'utils/toast';
import { taskListTabRoutes, TASK_IDS } from './constants';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { Task } from './Task';
import { Tasks } from './types';
import { getTaskCompletion } from './utils';

interface IProps {
  isLoading: boolean;
  taskListData: TaskListQuery | undefined;
}

export const TaskList = ({ isLoading, taskListData }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isNetworkPageEnabled } = useFlags();
  const { closeModal, openModal } = useModal();
  // Task completeness
  const TASK_COMPLETION = getTaskCompletion({
    isLoading,
    taskListData,
  });

  // Task actions
  const onAreasOfInterestClick = () => {
    openModal({
      modalType: ModalType.EDIT_INTERESTS,
      contentProps: {
        translationPrefix: 'modals',
      },
    });

    trackEvent(TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED);
  };

  const onNewBaselineSuccess = () => {
    displaySuccessMessage({
      title: t('common:save-toast-success'),
    });

    closeModal();
  };

  const onBaselineClick = useCallback(() => {
    if (TASK_COMPLETION[Tasks.BASELINE]) {
      openModal({
        modalType: ModalType.CORPORATE_EMISSION_FORM,
        contentProps: {
          formType: ModalContentType.EDIT_BASELINE,
          onNewBaselineSuccess,
        },
      });
    } else {
      openModal({
        modalType: ModalType.EMISSION_PATH_SELECT,
        contentProps: {
          emissionType: CorporateEmissionType.BASELINE,
        },
      });
    }

    trackEvent(TASK_LIST_BASELINE_TASK_CLICKED);
  }, [TASK_COMPLETION[Tasks.BASELINE]]);

  const onAmbitionClick = () => {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });

    trackEvent(TASK_LIST_AMBITION_TASK_CLICKED);
  };

  const onLastYearClick = useCallback(() => {
    const lastYear = getCurrentYear() - 1;

    if (TASK_COMPLETION[Tasks.LAST_YEAR_EMISSIONS]) {
      openModal({
        modalType: ModalType.CORPORATE_EMISSION_FORM,
        contentProps: {
          formType: ModalContentType.EDIT_ACTUAL,
          onNewBaselineSuccess,
          selectedEmissionYear: lastYear,
        },
      });
    } else {
      openModal({
        modalType: ModalType.EMISSION_PATH_SELECT,
        contentProps: {
          emissionType: CorporateEmissionType.ACTUAL,
          selectedEmissionYear: lastYear,
        },
      });
    }

    trackEvent(TASK_LIST_LAST_YEAR_TASK_CLICKED);
  }, [TASK_COMPLETION[Tasks.LAST_YEAR_EMISSIONS]]);

  const onConnectToCustomersClick = () => {
    trackEvent(TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED);
    if (isNetworkPageEnabled) {
      router.push(taskListTabRoutes.NetworkSettingsCustomer);
    } else {
      router.push(taskListTabRoutes.AccountSettingsCustomer);
    }
  };

  const onAllocateEmissionsToCustomerClick = () => {
    trackEvent(TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED);
    router.push(taskListTabRoutes.ValueChainAllocateToCustomer);
  };

  const onConnectToSuppliersClick = () => {
    trackEvent(TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED);
    if (isNetworkPageEnabled) {
      router.push(taskListTabRoutes.NetworkSettingsSupplier);
    } else {
      router.push(taskListTabRoutes.AccountSettingsSupplier);
    }
  };

  const onPrivacySharingClick = () => {
    trackEvent(TASK_LIST_PRIVACY_SHARING_CLICKED);
    router.push(taskListTabRoutes.PrivacySharing);
  };

  return (
    <StyledComponents.Container data-testid={selectors.taskListContainer}>
      <StyledComponents.Header>
        <StyledComponents.HeaderIllustration
          title={t('taskList:illustration')}
        />
        <div>
          <StyledComponents.Heading>
            {t('taskList:heading')}
          </StyledComponents.Heading>
          <StyledComponents.Intro>{t('taskList:intro')}</StyledComponents.Intro>
        </div>
      </StyledComponents.Header>

      <StyledComponents.TaskList>
        <Task
          dataTestId={selectors.getTaskTestId(
            TASK_IDS[Tasks.AREAS_OF_INTEREST]
          )}
          isComplete={TASK_COMPLETION[Tasks.AREAS_OF_INTEREST]}
          heading={t(`taskList:${TASK_IDS[Tasks.AREAS_OF_INTEREST]}-heading`)}
          isLoading={isLoading}
          onClick={onAreasOfInterestClick}
        />

        <Task
          dataTestId={selectors.getTaskTestId(TASK_IDS[Tasks.BASELINE])}
          description={t(`taskList:${TASK_IDS[Tasks.BASELINE]}-description`)}
          heading={t(`taskList:${TASK_IDS[Tasks.BASELINE]}-heading`)}
          isComplete={TASK_COMPLETION[Tasks.BASELINE]}
          isLoading={isLoading}
          onClick={onBaselineClick}
        />

        <Task
          dataTestId={selectors.getTaskTestId(TASK_IDS[Tasks.AMBITION])}
          description={t(`taskList:${TASK_IDS[Tasks.AMBITION]}-description`)}
          heading={t(`taskList:${TASK_IDS[Tasks.AMBITION]}-heading`)}
          isComplete={TASK_COMPLETION[Tasks.AMBITION]}
          isDisabled={!TASK_COMPLETION[Tasks.BASELINE]}
          isLoading={isLoading}
          onClick={onAmbitionClick}
        />

        <Task
          dataTestId={selectors.getTaskTestId(
            TASK_IDS[Tasks.LAST_YEAR_EMISSIONS]
          )}
          description={t(
            `taskList:${TASK_IDS[Tasks.LAST_YEAR_EMISSIONS]}-description`
          )}
          heading={t(`taskList:${TASK_IDS[Tasks.LAST_YEAR_EMISSIONS]}-heading`)}
          isComplete={TASK_COMPLETION[Tasks.LAST_YEAR_EMISSIONS]}
          isDisabled={!TASK_COMPLETION[Tasks.BASELINE]}
          isLoading={isLoading}
          onClick={onLastYearClick}
        />

        <Task
          dataTestId={selectors.getTaskTestId(
            TASK_IDS[Tasks.CUSTOMER_RELATIONSHIPS]
          )}
          description={t(
            `taskList:${TASK_IDS[Tasks.CUSTOMER_RELATIONSHIPS]}-description`
          )}
          heading={t(
            `taskList:${TASK_IDS[Tasks.CUSTOMER_RELATIONSHIPS]}-heading`
          )}
          isComplete={TASK_COMPLETION[Tasks.CUSTOMER_RELATIONSHIPS]}
          isLoading={isLoading}
          onClick={onConnectToCustomersClick}
        />

        <Task
          dataTestId={selectors.getTaskTestId(
            TASK_IDS[Tasks.CUSTOMER_ALLOCATIONS]
          )}
          description={t(
            `taskList:${TASK_IDS[Tasks.CUSTOMER_ALLOCATIONS]}-description`
          )}
          heading={t(
            `taskList:${TASK_IDS[Tasks.CUSTOMER_ALLOCATIONS]}-heading`
          )}
          isComplete={TASK_COMPLETION[Tasks.CUSTOMER_ALLOCATIONS]}
          isDisabled={!TASK_COMPLETION[Tasks.CUSTOMER_RELATIONSHIPS]}
          isLoading={isLoading}
          onClick={onAllocateEmissionsToCustomerClick}
        />
        <Task
          dataTestId={selectors.getTaskTestId(
            TASK_IDS[Tasks.SUPPLIER_RELATIONSHIPS]
          )}
          description={t(
            `taskList:${TASK_IDS[Tasks.SUPPLIER_RELATIONSHIPS]}-description`
          )}
          heading={t(
            `taskList:${TASK_IDS[Tasks.SUPPLIER_RELATIONSHIPS]}-heading`
          )}
          isComplete={TASK_COMPLETION[Tasks.SUPPLIER_RELATIONSHIPS]}
          isLoading={isLoading}
          onClick={onConnectToSuppliersClick}
        />
        <Task
          dataTestId={selectors.getTaskTestId(TASK_IDS[Tasks.PRIVACY_SHARING])}
          description={t(
            `taskList:${TASK_IDS[Tasks.PRIVACY_SHARING]}-description`
          )}
          heading={t(`taskList:${TASK_IDS[Tasks.PRIVACY_SHARING]}-heading`)}
          isComplete={TASK_COMPLETION[Tasks.PRIVACY_SHARING]}
          isLoading={isLoading}
          onClick={onPrivacySharingClick}
        />
      </StyledComponents.TaskList>
    </StyledComponents.Container>
  );
};
