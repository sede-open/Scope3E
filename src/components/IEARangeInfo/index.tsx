import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const IEARangeInfo = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Wrapper data-testid={selectors.modalContainer}>
      <StyledComponents.Title
        color={Tundora}
        size="32px"
        family={exampleBold}
        as="h1"
      >
        {t('ieaRange:iea-heading')}
      </StyledComponents.Title>
      <StyledComponents.TextContainer>
        <StyledComponents.Paragraph>
          <Trans
            i18nKey="ieaRange:iea-message-part[0]"
            components={{
              iEALink: (
                <StyledComponents.StyledExternalLink
                  link={t('ieaRange:iea-message-link')}
                >
                  {t('ieaRange:iea-message-link-text')}
                </StyledComponents.StyledExternalLink>
              ),
            }}
          />
          {t('ieaRange:iea-message-part[1]')}
        </StyledComponents.Paragraph>

        <StyledComponents.Footer>
          {t('ieaRange:iea-last-updated-on')}{' '}
          <StyledComponents.ColoredText>
            {t('ieaRange:iea-date')}
          </StyledComponents.ColoredText>
          {t('ieaRange:iea-note')}
        </StyledComponents.Footer>
      </StyledComponents.TextContainer>
    </StyledComponents.Wrapper>
  );
};
