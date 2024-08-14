import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import Modal from 'components/Modal';

export interface IExternalLinkDisclaimerModalProps {
  closeModal: () => void;
  externalLink: string;
}

export const ExternalLinkDisclaimerModal = ({
  closeModal,
  externalLink,
}: IExternalLinkDisclaimerModalProps) => {
  return (
    <Modal isOpen onClose={closeModal}>
      <ExternalLinkDisclaimer
        onClose={closeModal}
        externalLink={externalLink}
      />
    </Modal>
  );
};
