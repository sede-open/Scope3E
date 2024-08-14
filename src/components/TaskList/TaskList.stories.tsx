import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';
import { boolean } from '@storybook/addon-knobs';

import * as taskListMocks from 'mocks/taskList';
import taskListNamespace from '../../../locales/en/taskList.json';
import { TaskList } from '.';

export default {
  title: 'TaskList',
  component: TaskList,
};

export const taskList = () => (
  <MockedProvider
    mocks={[taskListMocks.getTaskListQueryMock({})]}
    addTypename={false}
  >
    <I18nProvider lang="en" namespaces={{ taskList: taskListNamespace }}>
      <TaskList
        isLoading={boolean('isLoading', false)}
        taskListData={undefined}
      />
    </I18nProvider>
  </MockedProvider>
);
