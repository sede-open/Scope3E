import { useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import CogSpinner from 'components/CogSpinner';
import {
  CompanyRelationshipType,
  CompanyRelationshipRecommendationStatus,
} from 'types/globalTypes';
import { CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations as Recommendation } from 'types/CompanyRelationshipRecommendationsQuery';
import { shuffle } from 'utils/shuffle';
import * as StyledComponents from './styledComponents';
import { useCompanyRelationshipRecommendationsQuery } from './queries';
import { QuickConnectContentType } from './types';
import {
  getNumRecommendationsToDisplay,
  hasRecommendationsToShow,
} from './utils';
import { QuickConnectInvitationGroup } from './QuickConnectInvitationGroup';

export interface IProps {
  filterOn?: CompanyRelationshipType[];
  contentType: QuickConnectContentType;
}

export const QuickConnect = ({ filterOn, contentType }: IProps) => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();
  const { id: companyId } = company ?? {};

  if (!companyId) {
    return null;
  }

  const numRecommendationsToDisplay = getNumRecommendationsToDisplay(
    contentType
  );

  const [suppliers, setSuppliers] = useState<Recommendation[]>([]);
  const [customers, setCustomers] = useState<Recommendation[]>([]);

  const { data, loading } = useCompanyRelationshipRecommendationsQuery({
    companyId,
    relationshipTypes: filterOn ?? [],
    recommendationStatuses: [
      CompanyRelationshipRecommendationStatus.UNACKNOWLEDGED,
    ],
  });

  useMemo(() => {
    if (data) {
      const {
        suppliers: _suppliers,
        customers: _customers,
      } = data.companyRelationshipRecommendations.reduce(
        (
          acc: { suppliers: Recommendation[]; customers: Recommendation[] },
          recommendation
        ) => {
          if (
            recommendation.relationshipType === CompanyRelationshipType.CUSTOMER
          ) {
            acc.customers.push(recommendation);
          } else if (
            recommendation.relationshipType === CompanyRelationshipType.SUPPLIER
          ) {
            acc.suppliers.push(recommendation);
          }

          return acc;
        },
        { suppliers: [], customers: [] }
      );

      setSuppliers(shuffle(_suppliers));
      setCustomers(shuffle(_customers));
    }
  }, [data]);

  if (loading) {
    return (
      <StyledComponents.LoadingSpinnerContainer>
        <CogSpinner />
      </StyledComponents.LoadingSpinnerContainer>
    );
  }

  if (!hasRecommendationsToShow(contentType, suppliers, customers)) {
    return null;
  }

  return (
    <StyledComponents.QuickConnectContainer>
      <StyledComponents.QuickConnectHeaderContainer>
        <StyledComponents.QuickConnectTitle>
          {t(`networkSettings:quick-connect-${contentType}-title`)}
        </StyledComponents.QuickConnectTitle>
      </StyledComponents.QuickConnectHeaderContainer>
      <div>
        {!!suppliers.length &&
          [
            QuickConnectContentType.SUPPLIER,
            QuickConnectContentType.ANY,
          ].includes(contentType) && (
            <StyledComponents.QuickConnectInvitationGroup>
              <QuickConnectInvitationGroup
                recommendations={suppliers}
                numRecommendationsToDisplay={numRecommendationsToDisplay}
                setRecommendations={setSuppliers}
                relationshipType={CompanyRelationshipType.SUPPLIER}
                displayInviteNewCompanyCard={
                  contentType !== QuickConnectContentType.ANY
                }
              />
            </StyledComponents.QuickConnectInvitationGroup>
          )}
        {!!customers.length &&
          [
            QuickConnectContentType.CUSTOMER,
            QuickConnectContentType.ANY,
          ].includes(contentType) && (
            <StyledComponents.QuickConnectInvitationGroup>
              <QuickConnectInvitationGroup
                recommendations={customers}
                numRecommendationsToDisplay={numRecommendationsToDisplay}
                setRecommendations={setCustomers}
                relationshipType={CompanyRelationshipType.CUSTOMER}
                displayInviteNewCompanyCard={
                  contentType !== QuickConnectContentType.ANY
                }
              />
            </StyledComponents.QuickConnectInvitationGroup>
          )}
      </div>
    </StyledComponents.QuickConnectContainer>
  );
};
