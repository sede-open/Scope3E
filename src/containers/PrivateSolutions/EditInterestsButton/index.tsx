import useTranslation from 'next-translate/useTranslation';

import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import Button from 'components/Button';
import Icon from 'components/Icon';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const EditInterestsButton = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const openEditInterestsModal = () => {
    openModal({
      modalType: ModalType.EDIT_INTERESTS,
      contentProps: {
        translationPrefix: 'modals',
      },
    });
  };

  return (
    <StyledComponents.ButtonContainer>
      <Button
        color="text-button"
        data-testid={selectors.editInterestsButton}
        onClick={openEditInterestsModal}
      >
        <StyledComponents.ButtonIconContainer>
          <Icon alt={t('common:pen-icon')} src="/images/pen.svg" size={16} />
        </StyledComponents.ButtonIconContainer>

        {t('privateSolutions:edit-interests-button')}
      </Button>
    </StyledComponents.ButtonContainer>
  );
};
