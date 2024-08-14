import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';
import * as taskListSelectors from 'components/TaskList/selectors';
import { useTaskListQuery } from 'containers/TaskListContainer/queries';
import { TaskListProvider } from 'context/TaskListProvider/TaskListProvider';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { USER_COMPANY_ID } from 'mocks/constants';
import { Header } from '.';
import * as navMenuSelectors from './NavMenu/selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('containers/TaskListContainer/queries');

(useAuthenticatedUser as jest.Mock).mockReturnValue({
  id: '4',
  firstName: 'Hello',
  lastName: 'Bye',
  company: {
    id: USER_COMPANY_ID,
    name: 'Test Inc.',
  },
});

describe('Header', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });

  const setup = () => {
    return render(
      <MockedProvider>
        <TaskListProvider>
          <Header />
        </TaskListProvider>
      </MockedProvider>
    );
  };

  it('should display current user name', () => {
    ((useTaskListQuery as unknown) as jest.Mock).mockReturnValue(() => ({
      data: null,
      loading: true,
    }));
    const { getByTestId } = setup();
    const element = getByTestId(navMenuSelectors.navUserName);
    expect(element.textContent).toBe('Hello Bye');
  });

  it('clicking the Task List nav item button should toggle Task List visibility', () => {
    ((useTaskListQuery as unknown) as jest.Mock).mockReturnValue(() => ({
      data: null,
      loading: true,
    }));

    const { getByTestId, queryByTestId } = setup();

    const taskListButton = getByTestId(navMenuSelectors.taskListButton);

    expect(
      queryByTestId(taskListSelectors.taskListContainer)
    ).not.toBeInTheDocument();

    fireEvent.click(taskListButton);

    expect(
      queryByTestId(taskListSelectors.taskListContainer)
    ).toBeInTheDocument();

    fireEvent.click(taskListButton);

    expect(
      queryByTestId(taskListSelectors.taskListContainer)
    ).not.toBeInTheDocument();
  });
});
