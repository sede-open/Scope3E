import { Status } from 'components/Status';
import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipDisplayStatus } from '../types';
import * as StyledComponents from './styledComponents';

interface IProps {
  canEditSupplyDashboard: boolean;
  reSendInvite: (relationshipId: any) => void;
  status: CompanyRelationshipDisplayStatus;
}

/**
 * @deprecated
 * Can be removed once is-network-page-enabled flag is deleted
 */
export const RelationshipStatus = ({
  canEditSupplyDashboard,
  reSendInvite,
  status,
}: IProps) => {
  const { t } = useTranslation();
  const shouldDisplayResend =
    canEditSupplyDashboard &&
    status === CompanyRelationshipDisplayStatus.INVITATION_DECLINED;
  const onReSend = shouldDisplayResend ? reSendInvite : () => {};

  return (
    <Status
      status={status}
      statusControls={
        shouldDisplayResend ? (
          <>
            {' / '}
            <StyledComponents.ReSend onClick={onReSend}>
              {t('companyRelationships:status-re-send')}
            </StyledComponents.ReSend>
          </>
        ) : null
      }
      translationNamespace="companyRelationships"
    />
  );
};
