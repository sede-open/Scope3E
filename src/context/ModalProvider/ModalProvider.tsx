import { InvitationSentModal } from 'containers/AccountSettings/CompanyRelationships/OutgoingRelationships/InvitationSentModal';
import { AmbitionSimulationPrompt } from 'containers/Modals/AmbitionSimulationPrompt';
import { CorporateEmissionFormContainer } from 'containers/Modals/CorporateEmissionForm';
import { EditInterests } from 'containers/Modals/EditInterests';
import { EmissionPathSelect } from 'containers/Modals/EmissionPathSelect';
import { ExternalLinkDisclaimerModal } from 'containers/Modals/ExternalLinkDisclaimerModal/ExternalLinkDisclaimerModal';
import { IEAInfoPopup } from 'containers/Modals/IEAInfoPopup';
import { InexperiencedEmissionsWizard } from 'containers/Modals/InexperiencedEmissionsWizard';
import { MissingDataPrivacyInfoPrompt } from 'containers/Modals/MissingDataPrivacyInfoPrompt';
import { PrivacySharingModal } from 'containers/Modals/PrivacySharing';
import { RemoveEmissionForm } from 'containers/Modals/RemoveEmissionForm';
import { TargetFormContainer } from 'containers/Modals/TargetForm';
import { TaskListPrompt } from 'containers/Modals/TaskListPrompt';
import React, { ReactNode, useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalState, ModalType } from './types';

interface IProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const closeModal = () => {
    setModalState(null);
  };

  const openModal = (newState: ModalState) => {
    setModalState(newState);
  };

  return (
    <ModalContext.Provider value={{ closeModal, modalState, openModal }}>
      {children}

      {modalState?.modalType === ModalType.EDIT_INTERESTS && (
        <EditInterests
          closeModal={closeModal}
          hasIntroText={modalState?.contentProps.hasIntroText}
          translationPrefix={modalState?.contentProps.translationPrefix}
        />
      )}

      {modalState?.modalType === ModalType.EMISSION_PATH_SELECT && (
        <EmissionPathSelect
          closeModal={closeModal}
          emissionType={modalState?.contentProps.emissionType}
          selectedEmissionYear={modalState?.contentProps.selectedEmissionYear}
        />
      )}

      {modalState?.modalType === ModalType.TASK_LIST_PROMPT && (
        <TaskListPrompt
          closeModal={closeModal}
          contentType={modalState?.contentProps.contentType}
        />
      )}

      {modalState?.modalType === ModalType.MISSING_DATA_PRIVACY_INFO_PROMPT && (
        <MissingDataPrivacyInfoPrompt
          closeModal={closeModal}
          name={modalState.contentProps.name}
        />
      )}

      {modalState?.modalType === ModalType.INEXPERIENCED_USER_FLOW && (
        <InexperiencedEmissionsWizard
          closeModal={closeModal}
          emissionType={modalState?.contentProps.emissionType}
          selectedEmissionYear={modalState?.contentProps.selectedEmissionYear}
        />
      )}

      {modalState?.modalType === ModalType.AMBITION_SIMULATION_PROMPT && (
        <AmbitionSimulationPrompt closeModal={closeModal} />
      )}

      {modalState?.modalType === ModalType.TARGET_FORM && (
        <TargetFormContainer closeModal={closeModal} />
      )}

      {modalState?.modalType === ModalType.CORPORATE_EMISSION_FORM && (
        <CorporateEmissionFormContainer
          closeModal={closeModal}
          onNewBaselineSuccess={modalState?.contentProps.onNewBaselineSuccess}
          onNewActualSuccess={modalState?.contentProps.onNewActualSuccess}
          formType={modalState?.contentProps.formType}
          selectedEmissionYear={modalState?.contentProps.selectedEmissionYear}
        />
      )}

      {modalState?.modalType === ModalType.REMOVE_EMISSION_FORM && (
        <RemoveEmissionForm closeModal={closeModal} />
      )}

      {modalState?.modalType === ModalType.IEA_INFO && (
        <IEAInfoPopup closeModal={closeModal} />
      )}

      {modalState?.modalType === ModalType.INVITATION_SENT && (
        <InvitationSentModal closeModal={closeModal} />
      )}

      {modalState?.modalType === ModalType.EXTERNAL_LINK_DISCLAIMER && (
        <ExternalLinkDisclaimerModal
          closeModal={closeModal}
          externalLink={modalState?.contentProps.externalLink}
        />
      )}

      {(modalState?.modalType === ModalType.EMISSION_ALLOCATION ||
        modalState?.modalType === ModalType.NEW_CONNECTION) && (
        <PrivacySharingModal
          closeModal={(type) => {
            closeModal();
            if (type && modalState?.onClose) {
              modalState.onClose(type);
            }
          }}
          modalType={modalState.modalType}
        />
      )}
    </ModalContext.Provider>
  );
};
