import { MouseEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Text } from 'components/Text';
import { Tundora, Scorpion } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import Button from 'components/Button';
import { ButtonSpacer } from 'components/ButtonSpacer';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  onClose: () => void;
  externalLink: string;
  lazyLink?: (() => string) | null;
}

export const ExternalLinkDisclaimer = ({
  onClose,
  externalLink,
  lazyLink,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div data-testid={selectors.container}>
      <StyledComponents.TextWrapper>
        <StyledComponents.Header as="h1" color={Tundora} family={exampleBold}>
          {t('common:disclaimer-heading')}
        </StyledComponents.Header>
        <Text as="span" color={Scorpion} size="16px">
          {t('common:disclaimer-content')}
        </Text>
      </StyledComponents.TextWrapper>
      <StyledComponents.ButtonContainer>
        <StyledComponents.StyledButton
          as="a"
          href={externalLink}
          target="_blank"
          type="button"
          color="primary"
          data-testid={selectors.continueButton}
          /* Tried to type the Mouse Event with either HTMLButtonElement, or HTML Anchor element, but Styled Component <Button as="a"> won't play nice */
          onClick={(event: MouseEvent<any>) => {
            if (typeof lazyLink === 'function') {
              event.preventDefault();
              window.open(lazyLink(), '_blank');
            }
            onClose();
          }}
        >
          {t('common:continue')}
        </StyledComponents.StyledButton>
        <ButtonSpacer />
        <Button
          color="secondary"
          data-testid={selectors.cancelButton}
          onClick={onClose}
          width="5rem"
        >
          {t('common:cancel')}
        </Button>
      </StyledComponents.ButtonContainer>
    </div>
  );
};

ExternalLinkDisclaimer.defaultProps = {
  lazyLink: null,
};
