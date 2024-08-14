import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { ModalType } from 'context/ModalProvider/types';
import { TaskListPromptContentType } from 'containers/Modals/TaskListPrompt/types';
import { useModal } from 'effects/useModal';
import { ModalContentType } from 'containers/types';
import { ButtonCard } from 'components/ButtonCard';
import { EmissionsAdvanced } from 'components/Glyphs/EmissionsAdvanced';
import { EmissionsHelp } from 'components/Glyphs/EmissionsHelp';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  emissionType: CorporateEmissionType;
  selectedEmissionYear?: number;
}

export const EmissionPathCards = ({
  emissionType,
  selectedEmissionYear,
}: IProps) => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const openTaskListPrompt = () => {
    openModal({
      modalType: ModalType.TASK_LIST_PROMPT,
      contentProps: {
        contentType: TaskListPromptContentType.UNLOCKED_DASHBOARD,
      },
    });
  };

  const openInexperiencedFlow = () => {
    openModal({
      modalType: ModalType.INEXPERIENCED_USER_FLOW,
      contentProps: {
        emissionType,
        selectedEmissionYear,
      },
    });
  };

  const formType =
    emissionType === CorporateEmissionType.BASELINE
      ? ModalContentType.NEW_BASELINE
      : ModalContentType.NEW_ACTUAL;

  const openAdvancedFlow = () => {
    openModal({
      modalType: ModalType.CORPORATE_EMISSION_FORM,
      contentProps: {
        formType,
        onNewBaselineSuccess: openTaskListPrompt,
        selectedEmissionYear,
      },
    });
  };

  return (
    <StyledComponents.ButtonContainer>
      <StyledComponents.ButtonCardContainer>
        <ButtonCard
          dataTestId={selectors.inexperiencedUserButton}
          title={t('modals:emission-path-select-inexperienced-user-title')}
          subtitle={t(
            'modals:emission-path-select-inexperienced-user-subtitle'
          )}
          icon={<EmissionsHelp />}
          onClick={openInexperiencedFlow}
        />
      </StyledComponents.ButtonCardContainer>
      <StyledComponents.ButtonCardContainer>
        <ButtonCard
          dataTestId={selectors.experiencedUserButton}
          title={t('modals:emission-path-select-advanced-user-title')}
          subtitle={t('modals:emission-path-select-advanced-user-subtitle')}
          icon={<EmissionsAdvanced />}
          onClick={openAdvancedFlow}
        />
      </StyledComponents.ButtonCardContainer>
    </StyledComponents.ButtonContainer>
  );
};

EmissionPathCards.defaultProps = {
  selectedEmissionYear: undefined,
};
