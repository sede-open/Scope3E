import { ChartIcon } from 'components/Glyphs/ChartIcon';
import { ConfigurationPage } from 'components/Glyphs/ConfigurationPage';
import { Logout } from 'components/Glyphs/Logout';
import { NetworkIcon } from 'components/Glyphs/NetworkIcon';
import { Notification } from 'components/Glyphs/Notification';
import { SettingsIcon } from 'components/Glyphs/SettingsIcon';
import { TasksIcon } from 'components/Glyphs/TasksIcon';
import Icon from 'components/Icon';
import { SimpleDropdown } from 'components/SimpleDropdown';
import { Spinner } from 'components/Spinner';
import { Text } from 'components/Text';
import { TaskListContainer } from 'containers/TaskListContainer';
import { useNetworkSummaryQuery } from 'containers/ValueChain/NeworkSummary/queries';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { usePendingTasks } from 'effects/usePendingTasks';
import { useTaskList } from 'effects/useTaskList';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Orange40, TahitiGold } from 'styles/colours';
import { trackEvent } from 'utils/analytics';
import {
  NETWORK_SETTING_HEADER_BUTTON_CLICKED,
  TASK_LIST_HEADER_BUTTON_CLICKED,
} from 'utils/analyticsEvents';
import useClickedOutside from 'effects/useOnOuterClick';
import { useRef } from 'react';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  firstName: string;
  isAdminPage: boolean;
  lastName: string;
}

export const NavMenu = ({ firstName, isAdminPage, lastName }: IProps) => {
  const { replace } = useRouter();
  const { t } = useTranslation();
  const { isNetworkPageEnabled } = useFlags();
  const {
    canViewUsersAdminDashboard,
    canViewSupplyDashboard,
    company,
  } = useAuthenticatedUser();

  const { data, loading: isLoadingNetwork } = useNetworkSummaryQuery();
  const hasNetworkNotification = Boolean(
    data?.networkSummary?.numPendingInvitations
  );
  const { hasPendingTask, loading } = usePendingTasks();
  const {
    isTaskListOpen,
    toggleIsTaskListOpen,
    setIsTaskListOpen,
  } = useTaskList();

  const shouldDisplayExtendedNavOptions =
    canViewSupplyDashboard && canViewUsersAdminDashboard;

  const onExtendedNavOptionSelect = (value: any) => {
    replace(value);
  };

  const tasksListRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const tasksBtnRef = useRef() as React.MutableRefObject<HTMLLIElement>;
  useClickedOutside(() => {
    setIsTaskListOpen(false);
  }, [tasksListRef, tasksBtnRef]);

  return (
    <StyledComponents.StyledList data-testid={selectors.navMenu}>
      {!isAdminPage && (
        <StyledComponents.StyledItem
          data-testid={selectors.taskListItem}
          ref={tasksBtnRef}
        >
          <StyledComponents.StyledButton
            data-testid={selectors.taskListButton}
            isActive={isTaskListOpen}
            onClick={() => {
              toggleIsTaskListOpen();
              trackEvent(TASK_LIST_HEADER_BUTTON_CLICKED, {
                companyId: company?.id,
                companyName: company?.name,
              });
            }}
          >
            {loading && !hasPendingTask ? (
              <Spinner />
            ) : (
              <>
                <span>
                  {hasPendingTask && (
                    <StyledComponents.NotificationContainer>
                      <Notification fill={TahitiGold} stroke={Orange40} />
                    </StyledComponents.NotificationContainer>
                  )}
                  <TasksIcon title={t('common:task-title')} />
                </span>
                <Text size="0.75rem">{t('common:task-title')}</Text>
              </>
            )}
          </StyledComponents.StyledButton>

          {isTaskListOpen && (
            <StyledComponents.TaskListContainer ref={tasksListRef}>
              <TaskListContainer />
            </StyledComponents.TaskListContainer>
          )}
        </StyledComponents.StyledItem>
      )}

      {!isAdminPage && isNetworkPageEnabled && (
        <StyledComponents.StyledItem
          onClick={() => {
            trackEvent(NETWORK_SETTING_HEADER_BUTTON_CLICKED, {
              companyId: company?.id,
              companyName: company?.name,
            });
          }}
        >
          <Link href="/network" passHref>
            <StyledComponents.StyledAnchor>
              {isLoadingNetwork ? (
                <Spinner />
              ) : (
                <>
                  {hasNetworkNotification && (
                    <StyledComponents.NotificationContainer>
                      <Notification />
                    </StyledComponents.NotificationContainer>
                  )}
                  <NetworkIcon title={t('common:network-settings')} />
                  <Text size="0.75rem">{t('common:network-settings')}</Text>
                </>
              )}
            </StyledComponents.StyledAnchor>
          </Link>
        </StyledComponents.StyledItem>
      )}
      {!isAdminPage && (
        <StyledComponents.StyledItem>
          <Link href="/account-settings/personal-preferences" passHref>
            <StyledComponents.StyledAnchor>
              <SettingsIcon title={t('common:account-settings')} />
              <Text size="0.75rem">{t('common:account-settings')}</Text>
            </StyledComponents.StyledAnchor>
          </Link>
        </StyledComponents.StyledItem>
      )}
      <StyledComponents.StyledItem>
        <StyledComponents.Greeting>
          <StyledComponents.Salutation>
            {t('common:header-greeting')}
          </StyledComponents.Salutation>
          <StyledComponents.UserName data-testid={selectors.navUserName}>
            {`${firstName} ${lastName}`}
          </StyledComponents.UserName>
        </StyledComponents.Greeting>
      </StyledComponents.StyledItem>
      {shouldDisplayExtendedNavOptions ? (
        <>
          <StyledComponents.StyledItem>
            {' '}
            <StyledComponents.DropdownContainer>
              <SimpleDropdown
                name={<Icon src="/down-arrow.svg" alt="Open menu" size={20} />}
                buttonColour="secondary-borderless"
                options={[
                  {
                    label: (
                      <StyledComponents.OptionContainer>
                        <ConfigurationPage title="Configuration Page Icon" />
                        SETH Administration
                      </StyledComponents.OptionContainer>
                    ),
                    value: '/admin-dashboard/users',
                  },
                  {
                    label: (
                      <StyledComponents.OptionContainer>
                        <ChartIcon title="Chart icon" />
                        Hub Dashboards
                      </StyledComponents.OptionContainer>
                    ),
                    value: '/dashboard',
                  },
                  {
                    label: (
                      <StyledComponents.OptionContainer>
                        <Logout title="Log out arrow icon" />
                        Log out
                      </StyledComponents.OptionContainer>
                    ),
                    value: '/auth/logout',
                  },
                ]}
                onSelect={onExtendedNavOptionSelect}
                dropdownMenuStyles={{ left: '-160px' }}
              />
            </StyledComponents.DropdownContainer>
          </StyledComponents.StyledItem>
        </>
      ) : (
        <>
          <StyledComponents.StyledItem>
            <StyledComponents.StyledAnchor
              href="/auth/logout"
              title={t('common:logout')}
            >
              <Logout title={t('common:logout')} />
            </StyledComponents.StyledAnchor>
          </StyledComponents.StyledItem>
        </>
      )}
    </StyledComponents.StyledList>
  );
};
