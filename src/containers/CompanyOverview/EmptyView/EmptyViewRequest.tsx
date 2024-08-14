import useTranslation from 'next-translate/useTranslation';
import gql from 'graphql-tag';
import * as StyledComponents from './styledComponents';
import { useDataShareRequestMutation } from '../queries';
import { EmptyView } from '.';
import { emptyViewRequest } from '../selectors';

type Props = {
  companyId: string;
  hasRequestedToShareData: boolean;
};
export const EmptyViewRequest = ({
  companyId,
  hasRequestedToShareData,
}: Props) => {
  const { t } = useTranslation('companyOverview');
  const [sendDataShareRequest, { loading }] = useDataShareRequestMutation({
    variables: {
      targetCompanyId: companyId,
    },
    update(cache) {
      cache.writeFragment({
        id: cache.identify({ __typename: 'CompanyProfile', id: companyId }),
        fragment: gql`
          fragment CompanyProfileUpdated on CompanyProfile {
            dataShareRequestSent
          }
        `,
        data: {
          dataShareRequestSent: true,
        },
      });
    },
  });

  const handleClick = () => {
    sendDataShareRequest();
  };

  return (
    <EmptyView
      dataTestId={emptyViewRequest}
      description={t('empty.requestDesc')}
    >
      <StyledComponents.ActionButton
        disabled={hasRequestedToShareData || loading}
        onClick={handleClick}
      >
        {hasRequestedToShareData ? t('empty.requestSent') : t('empty.request')}
      </StyledComponents.ActionButton>
    </EmptyView>
  );
};
