import { act, fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';

import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as modalSelectors from 'components/Modal/selectors';
import * as taskListMocks from 'mocks/taskList';
import * as meMocks from 'mocks/me';

import commonNamespace from '../../../../locales/en/common.json';
import taskListNamespace from '../../../../locales/en/taskList.json';

import * as selectors from './selectors';
import { TaskListPromptContentType } from './types';
import { IProps, TaskListPrompt } from '.';

const closeModal = jest.fn();

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <I18nProvider
        namespaces={{
          common: commonNamespace,
          taskList: taskListNamespace,
        }}
      >
        <AuthenticatedUserProvider>
          <TaskListPrompt
            contentType={null}
            closeModal={closeModal}
            {...overrides}
          />
        </AuthenticatedUserProvider>
      </I18nProvider>
    </MockedProvider>
  );

describe('TaskListPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when displaying the "Unlocked dashboard" content', () => {
    it('should display the check glyph', async () => {
      const { findByTestId } = setup(
        {
          contentType: TaskListPromptContentType.UNLOCKED_DASHBOARD,
        },
        [meMocks.getGetMeMock()]
      );

      expect(await findByTestId(selectors.checkIcon)).toBeInTheDocument();
    });

    it('should display the correct heading text', async () => {
      const { findByText } = setup(
        {
          contentType: TaskListPromptContentType.UNLOCKED_DASHBOARD,
        },
        [meMocks.getGetMeMock()]
      );

      expect(
        await findByText('You’ve unlocked your dashboard view')
      ).toBeInTheDocument();
    });
  });

  describe('when displaying the "Welcome back" content', () => {
    it('should not display the check glyph', async () => {
      const { queryByTestId } = setup(
        {
          contentType: TaskListPromptContentType.WELCOME_BACK,
        },
        [meMocks.getGetMeMock()]
      );

      await waitFor(() => {
        expect(queryByTestId(selectors.checkIcon)).not.toBeInTheDocument();
      });
    });

    it('should display the correct heading text', async () => {
      const { findByText } = setup(
        {
          contentType: TaskListPromptContentType.WELCOME_BACK,
        },
        [meMocks.getGetMeMock()]
      );

      expect(await findByText('Welcome back')).toBeInTheDocument();
    });
  });

  describe.each`
    suppressTaskListPrompt | not
    ${true}                | ${''}
    ${false}               | ${' not'}
  `(
    'when the task list prompt has$not previously been dismissed',
    ({ suppressTaskListPrompt }: { suppressTaskListPrompt: boolean }) => {
      describe.each`
        buttonSelector                | buttonDescription
        ${selectors.acceptButton}     | ${'accept button'}
        ${modalSelectors.closeButton} | ${'modal close button'}
      `(
        'when the $buttonDescription is clicked',
        ({ buttonSelector }: { buttonSelector: string }) => {
          it('should call closeModal()', async () => {
            const { findByTestId } = setup({}, [
              meMocks.getGetMeMock({
                preferences: {
                  suppressTaskListPrompt,
                },
              }),
              taskListMocks.suppressTaskListMutationMock,
            ]);

            const button = await findByTestId(buttonSelector);

            act(() => {
              fireEvent.click(button);
            });

            await waitFor(() => {
              expect(closeModal).toHaveBeenCalled();
            });
          });
        }
      );
    }
  );

  describe('when the task list prompt has not previously been dismissed', () => {
    it('should call the suppressTaskList mutation when the modal is dismissed', async () => {
      const newData = jest.fn();
      const { findByTestId } = setup({}, [
        meMocks.getGetMeMock(),
        taskListMocks.suppressTaskListMutationSpyMock(newData),
      ]);

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.acceptButton));
      });

      await waitFor(() => {
        expect(newData).toHaveBeenCalled();
      });
    });
  });

  describe('when the task list prompt has previously been dismissed', () => {
    it('should not call the suppressTaskList mutation when the modal is dismissed', async () => {
      const newData = jest.fn();
      const { findByTestId } = setup({}, [
        meMocks.getGetMeMock({
          preferences: {
            suppressTaskListPrompt: true,
          },
        }),
        taskListMocks.suppressTaskListMutationSpyMock(newData),
      ]);

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.acceptButton));
      });

      await waitFor(() => {
        expect(newData).not.toHaveBeenCalled();
      });
    });
  });
});
