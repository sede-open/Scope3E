import { ModalState, ModalType } from 'context/ModalProvider/types';
import { IProps as ICorporateEmissionFormProps } from 'containers/Modals/CorporateEmissionForm';
import { ModalContentType } from 'containers/types';

export interface IModalContentMixin {
  [key: string]: {
    modalType: ModalState['modalType'];
    contentProps: Partial<ICorporateEmissionFormProps>;
  };
}

export const getSelectMoreOption = ({
  openModal,
  selectedEmissionYear,
}: {
  openModal: (modalState: ModalState) => void;
  selectedEmissionYear: number | undefined;
}) => (
  value:
    | ModalType.TARGET_FORM
    | ModalType.REMOVE_EMISSION_FORM
    | ModalContentType
) => {
  if (value === ModalType.TARGET_FORM) {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });
  } else if (value === ModalType.REMOVE_EMISSION_FORM) {
    openModal({
      modalType: ModalType.REMOVE_EMISSION_FORM,
    });
  } else {
    openModal({
      modalType: ModalType.CORPORATE_EMISSION_FORM,
      contentProps: {
        formType: value,
        onNewBaselineSuccess: () => {},
        selectedEmissionYear,
      },
    });
  }
};

export const getMoreDropdownOptions = (t: any) => [
  {
    label: t('dashboard:emissions-overview-more-options-ambition'),
    value: ModalType.TARGET_FORM,
  },
  {
    label: t('dashboard:emissions-overview-more-options-emissions'),
    value: ModalContentType.EDIT_ACTUAL,
  },
  {
    label: t('dashboard:emissions-overview-more-options-baseline'),
    value: ModalContentType.EDIT_BASELINE,
  },
  {
    label: t('dashboard:emissions-overview-more-options-remove'),
    value: ModalType.REMOVE_EMISSION_FORM,
  },
];
