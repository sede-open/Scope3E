import Modal from 'components/Modal';
import { IEARangeInfo } from 'components/IEARangeInfo';

import { IProps } from './types';

export const IEAInfoPopup = ({ closeModal }: IProps) => (
  <Modal isOpen onClose={closeModal}>
    <IEARangeInfo />
  </Modal>
);
