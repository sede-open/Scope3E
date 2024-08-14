import { IProps as ICorporateEmissionFormProps } from 'containers/Modals/CorporateEmissionForm';
import { IProps as IEditInterestProps } from 'containers/Modals/EditInterests';
import { IProps as IEmissionPathSelectProps } from 'containers/Modals/EmissionPathSelect';
import { IExternalLinkDisclaimerModalProps } from 'containers/Modals/ExternalLinkDisclaimerModal/ExternalLinkDisclaimerModal';
import { IProps as IInexperiencedEmissionsWizardProps } from 'containers/Modals/InexperiencedEmissionsWizard';
import { IProps as IDataPrivacyInfoPromptProps } from 'containers/Modals/MissingDataPrivacyInfoPrompt';
import { IProps as ITaskListPromptProps } from 'containers/Modals/TaskListPrompt';

export enum ModalType {
  NULL,
  EDIT_INTERESTS,
  EMISSION_PATH_SELECT,
  TASK_LIST_PROMPT,
  INEXPERIENCED_USER_FLOW,
  AMBITION_SIMULATION_PROMPT,
  TARGET_FORM,
  CORPORATE_EMISSION_FORM,
  REMOVE_EMISSION_FORM,
  IEA_INFO,
  EXTERNAL_LINK_DISCLAIMER,
  EMISSION_ALLOCATION,
  NEW_CONNECTION,
  MISSING_DATA_PRIVACY_INFO_PROMPT,
  INVITATION_SENT,
}

export enum CloseModalType {
  LATER = 'LATER',
}

export type EditInterestsContentProps = Omit<IEditInterestProps, 'closeModal'>;
export type TaskListPromptContentProps = Omit<
  ITaskListPromptProps,
  'closeModal'
>;
export type MissingDataPrivacyInfoPromptContentProps = Omit<
  IDataPrivacyInfoPromptProps,
  'closeModal'
>;
export type InexperiencedEmissionsWizardProps = Omit<
  IInexperiencedEmissionsWizardProps,
  'closeModal'
>;
export type CorporateEmissionFormProps = Omit<
  ICorporateEmissionFormProps,
  'closeModal'
>;
export type EmissionPathSelectProps = Omit<
  IEmissionPathSelectProps,
  'closeModal'
>;

export type ExternalLinkDisclaimerModalProps = Omit<
  IExternalLinkDisclaimerModalProps,
  'closeModal'
>;

interface INull {
  modalType: ModalType.NULL;
}

interface IEditInterests {
  modalType: ModalType.EDIT_INTERESTS;
  contentProps: EditInterestsContentProps;
}

interface ITaskListPrompt {
  modalType: ModalType.TASK_LIST_PROMPT;
  contentProps: TaskListPromptContentProps;
}

interface IMissingDataPrivacyInfoPrompt {
  modalType: ModalType.MISSING_DATA_PRIVACY_INFO_PROMPT;
  contentProps: MissingDataPrivacyInfoPromptContentProps;
}

interface IEmissionPathSelect {
  modalType: ModalType.EMISSION_PATH_SELECT;
  contentProps: EmissionPathSelectProps;
}

interface IInexperiencedEmissionsWizard {
  modalType: ModalType.INEXPERIENCED_USER_FLOW;
  contentProps: InexperiencedEmissionsWizardProps;
}

interface IAmbitionSimulationPrompt {
  modalType: ModalType.AMBITION_SIMULATION_PROMPT;
}

interface ITargetForm {
  modalType: ModalType.TARGET_FORM;
}

interface ICorporateEmissionForm {
  modalType: ModalType.CORPORATE_EMISSION_FORM;
  contentProps: CorporateEmissionFormProps;
}

interface IRemoveEmissionForm {
  modalType: ModalType.REMOVE_EMISSION_FORM;
}

interface IIEAPopupSelector {
  modalType: ModalType.IEA_INFO;
}

interface IExternalLinkDisclaimer {
  modalType: ModalType.EXTERNAL_LINK_DISCLAIMER;
  contentProps: ExternalLinkDisclaimerModalProps;
}

interface IEmissionAllocation {
  modalType: ModalType.EMISSION_ALLOCATION;
  onClose?: (type?: CloseModalType) => void;
}

interface INewConnection {
  modalType: ModalType.NEW_CONNECTION;
  onClose?: (type?: CloseModalType) => void;
}

interface IInvitationSent {
  modalType: ModalType.INVITATION_SENT;
}

export type ModalState =
  | INull
  | IEditInterests
  | ITaskListPrompt
  | IEmissionPathSelect
  | IInexperiencedEmissionsWizard
  | IAmbitionSimulationPrompt
  | IMissingDataPrivacyInfoPrompt
  | ITargetForm
  | ICorporateEmissionForm
  | IRemoveEmissionForm
  | IIEAPopupSelector
  | IEmissionAllocation
  | INewConnection
  | IExternalLinkDisclaimer
  | IInvitationSent;

export interface IModalContext {
  modalState: ModalState | null;
  openModal: (modalState: ModalState) => void;
  closeModal: () => void;
}
