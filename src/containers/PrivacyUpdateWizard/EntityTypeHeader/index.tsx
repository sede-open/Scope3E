import useTranslation from 'next-translate/useTranslation';
import { EntityType } from '../types';
import * as StyledComponents from './styledComponents';
import * as selectors from '../selectors';

interface IProps {
  entityType: EntityType;
}

export const EntityTypeHeader = ({ entityType }: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.EntityTypeHeaderContainer>
      <StyledComponents.EntityTypeHeader
        data-testid={selectors.entityTypeHeader}
      >
        {t(`dataPrivacyWizard:${entityType}-entity-type-header`)}
      </StyledComponents.EntityTypeHeader>
      <StyledComponents.EntityTypeDescription
        data-testid={selectors.entityTypeDescription}
      >
        {t(`dataPrivacyWizard:${entityType}-entity-type-description`)}
      </StyledComponents.EntityTypeDescription>
    </StyledComponents.EntityTypeHeaderContainer>
  );
};
