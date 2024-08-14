import useTranslation from 'next-translate/useTranslation';

import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { AlizarinCrimson } from 'styles/colours';
import Button from 'components/Button';
import { Text } from 'components/Text';
import { ModalForm } from 'components/ModalForm';

import { useDeleteEmissionAllocationMutation } from '../../mutations';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  id: string;
  onClose: () => void;
}

export const DeleteAllocationForm = ({ id, onClose }: IProps) => {
  const { t } = useTranslation();

  const deleteMutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:form-toast-subtitle-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('valueChain:delete-form-toast-title-success'),
        subtitle: t('valueChain:delete-form-toast-subtitle-success'),
      });
      onClose();
    },
  };

  const [
    deleteEmissionAllocation,
    { loading: isDeleteEmissionAllocationLoading },
  ] = useDeleteEmissionAllocationMutation(deleteMutationOptions);

  const onDeleteEmissionAllocation = async () => {
    await deleteEmissionAllocation({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  return (
    <ModalForm
      dataTestId={selectors.deleteEmissionAllocationForm}
      isLoading={false}
      title={t('valueChain:delete-form-title')}
      onSubmit={onDeleteEmissionAllocation}
    >
      <StyledComponents.TextContainer>
        <Text as="p">{t('valueChain:delete-form-text[0]')}</Text>
        <Text as="p" color={AlizarinCrimson}>
          {t('valueChain:delete-form-text[1]')}
        </Text>
      </StyledComponents.TextContainer>

      <StyledComponents.StyledCTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.deleteEmissionAllocationCancel}
          disabled={isDeleteEmissionAllocationLoading}
          onClick={onClose}
        >
          {t('valueChain:delete-form-cancel')}
        </Button>
        <Button
          width="auto"
          type="button"
          color="primary"
          data-testid={selectors.deleteEmissionAllocationSubmit}
          disabled={isDeleteEmissionAllocationLoading}
          onClick={onDeleteEmissionAllocation}
        >
          {t('valueChain:delete-form-submit')}
        </Button>
      </StyledComponents.StyledCTAContainer>
    </ModalForm>
  );
};
