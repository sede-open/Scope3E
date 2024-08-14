import useTranslation from 'next-translate/useTranslation';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Section } from './types';
import * as StyledComponents from './styles';
import * as selectors from '../../selectors';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ReadMoreModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation('companyOverview');
  const sections: Section[] = t(
    'readMoreSections',
    {},
    { returnObjects: true }
  );

  return (
    <Modal
      isFullDisplay
      isWizard
      isOpen={isOpen}
      onClose={onClose}
      closeIconTop="28px"
      closeIconRight="24px"
    >
      <StyledComponents.Container>
        <StyledComponents.ContentSection>
          <StyledComponents.Title>{t('readMoreTitle')}</StyledComponents.Title>
          {sections.map(({ title, description, unorderedList }: Section) => (
            <StyledComponents.Section key={title}>
              <StyledComponents.SectionTitle>
                {title}
              </StyledComponents.SectionTitle>
              <StyledComponents.SectionDescription>
                {description}
              </StyledComponents.SectionDescription>
              {unorderedList && (
                <StyledComponents.UnorderedList>
                  {unorderedList.map((item: string) => (
                    <StyledComponents.ListItem key={item}>
                      {item}
                    </StyledComponents.ListItem>
                  ))}
                </StyledComponents.UnorderedList>
              )}
            </StyledComponents.Section>
          ))}
          <StyledComponents.Actions>
            <Button data-testid={selectors.readMoreOkBtn} onClick={onClose}>
              {t('ok')}
            </Button>
          </StyledComponents.Actions>
        </StyledComponents.ContentSection>
        <StyledComponents.IconSection>
          <Icon size="60%" src="/journey.svg" alt="journey" />
        </StyledComponents.IconSection>
      </StyledComponents.Container>
    </Modal>
  );
};
