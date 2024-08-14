import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { CarbonIntensityConfigProvider } from 'context/CarbonIntensityConfigProvider/CarbonIntensityConfigProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { TaskListProvider } from 'context/TaskListProvider/TaskListProvider';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const Providers = ({ children }: IProps) => (
  <AuthenticatedUserProvider>
    <TaskListProvider>
      <CarbonIntensityConfigProvider>
        <ModalProvider>{children}</ModalProvider>
      </CarbonIntensityConfigProvider>
    </TaskListProvider>
  </AuthenticatedUserProvider>
);
