import Icon from 'components/Icon';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

type Props = {
  dataTestId: string;
  description?: string;
  children?: React.ReactNode;
};
export const EmptyView = ({ dataTestId, description, children }: Props) => {
  const { t } = useTranslation('companyOverview');
  return (
    <StyledComponents.EmptyViewContainer data-testid={dataTestId}>
      <StyledComponents.EmptyIcon>
        <Icon size={108} alt="Data missing" src="/images/data-missing.svg" />
      </StyledComponents.EmptyIcon>
      <StyledComponents.EmptyTitle>
        <Text as="h4" size="1rem" family={exampleBold} color={Tundora}>
          {t('empty.title')}
        </Text>
      </StyledComponents.EmptyTitle>
      <StyledComponents.EmptyDescriptionContainer>
        <StyledComponents.EmptyViewDescription>
          {description ?? t('empty.privateDesc')}
        </StyledComponents.EmptyViewDescription>
      </StyledComponents.EmptyDescriptionContainer>
      {children}
    </StyledComponents.EmptyViewContainer>
  );
};
