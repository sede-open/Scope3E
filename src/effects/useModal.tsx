import { useContext } from 'react';

import { ModalContext } from 'context/ModalProvider/ModalContext';

export const useModal = () => useContext(ModalContext);
