import { createContext } from 'react';

import { IModalContext } from './types';

export const ModalContext = createContext<IModalContext>({
  modalState: null,
  openModal: () => {},
  closeModal: () => {},
});
