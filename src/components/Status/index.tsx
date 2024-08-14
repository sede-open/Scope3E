import { LinkButton } from 'components/Link';
import { CompanyRelationshipDisplayStatus } from 'containers/AccountSettings/CompanyRelationships/types';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';
import { IProps } from './types';

export const Status = ({
  status,
  statusControls,
  statusSuffix,
  translationNamespace,
}: IProps) => {
  const { t } = useTranslation();
  const translatedStatus = t(`${translationNamespace}:status-${status}`);
  const withStatusControls = statusControls !== null;

  const { openModal } = useModal();

  return (
    <StyledComponents.StatusContainer>
      {status === CompanyRelationshipDisplayStatus.INVITATION_SENT ? (
        <LinkButton
          onClick={() => {
            openModal({
              modalType: ModalType.INVITATION_SENT,
            });
          }}
          color={StyledComponents.statusToColour[status]}
        >
          {translatedStatus} {statusSuffix && statusSuffix}
        </LinkButton>
      ) : (
        <StyledComponents.StatusText
          status={status}
          withStatusControls={withStatusControls}
        >
          {translatedStatus} {statusSuffix && statusSuffix}
        </StyledComponents.StatusText>
      )}
      {statusControls}
    </StyledComponents.StatusContainer>
  );
};
