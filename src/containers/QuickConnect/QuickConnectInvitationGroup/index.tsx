import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';
import { CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations as Recommendation } from 'types/CompanyRelationshipRecommendationsQuery';
import { CompanyRelationshipType } from 'types/globalTypes';
import { dropElement } from 'utils/dropElement';
import { InviteNewCompanyCard } from '../InviteNewCompanyCard';
import { QuickConnectCard } from '../QuickConnectCard';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';
import { getColorTypeForGroupType } from './utils';

export interface IProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
  numRecommendationsToDisplay: number;
  relationshipType: CompanyRelationshipType;
  displayInviteNewCompanyCard: boolean;
}

export const QuickConnectInvitationGroup = ({
  recommendations,
  setRecommendations,
  numRecommendationsToDisplay,
  relationshipType,
  displayInviteNewCompanyCard,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledComponents.QuickConnectSubtitle>
        {t(
          `networkSettings:quick-connect-${relationshipType.toLowerCase()}-subtitle`
        )}
      </StyledComponents.QuickConnectSubtitle>

      <StyledComponents.QuickConnectCardContainer
        data-testid={`${selectors.quickConnectCardContainer}-${relationshipType}`}
      >
        {recommendations
          .slice(0, numRecommendationsToDisplay)
          .map(
            ({ name, id, duns, companyId, sector, region, country }, index) => {
              return (
                <QuickConnectCard
                  id={id}
                  name={name}
                  region={region}
                  sector={sector}
                  country={country}
                  duns={duns}
                  recommendedCompanyId={companyId}
                  key={`recommendation-${id}`}
                  deleteCard={() => {
                    setRecommendations(() =>
                      dropElement(recommendations, index)
                    );
                  }}
                  color={getColorTypeForGroupType(relationshipType)}
                  relationshipType={relationshipType}
                />
              );
            }
          )}
        {displayInviteNewCompanyCard && (
          <InviteNewCompanyCard relationshipType={relationshipType} />
        )}
      </StyledComponents.QuickConnectCardContainer>
    </>
  );
};
