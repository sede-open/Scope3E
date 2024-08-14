import Button from 'components/Button';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Scorpion } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as selectors from '../../selectors';
import { CardContainer, TextContainer, Title } from './styledComponents';

interface CreateNetworkCardHeaderProps {
  canEditCompanyRelationships: boolean;
  relationshipType: CompanyRelationshipType;
  openInviteCompanyModal: () => void;
}

export const CreateNetworkCardHeader = ({
  canEditCompanyRelationships,
  relationshipType,
  openInviteCompanyModal,
}: CreateNetworkCardHeaderProps) => {
  const { t } = useTranslation();
  const relationshipTypeKey = relationshipType.toLowerCase();
  const title = t(`companyRelationships:create-${relationshipTypeKey}-title`);
  return (
    <CardContainer>
      <Title family={exampleBold}>{title}</Title>
      <TextContainer>
        <Text color={Scorpion}>
          {t(`companyRelationships:create-${relationshipTypeKey}-subtitle-1`)}
        </Text>
        <Text color={Scorpion}>
          <Trans
            components={[
              <Link
                href="/network/getting-started"
                target="_blank"
                rel="noreferrer"
                aria-label={t('common:getting-started-network-link-aria-label')}
              />,
            ]}
            i18nKey={`companyRelationships:create-${relationshipTypeKey}-subtitle-2`}
          />
        </Text>
      </TextContainer>

      {canEditCompanyRelationships && (
        <Button
          onClick={openInviteCompanyModal}
          data-testid={selectors.newInviteFormButton}
        >
          {t(
            `companyRelationships:create-${relationshipTypeKey}-invite-button`
          )}
        </Button>
      )}
    </CardContainer>
  );
};
