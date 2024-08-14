import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { LoginButton } from 'components/LoginButton';
import { DecorativeSquares } from 'components/DecorativeSquares';
import { Footer } from 'components/Footer';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <StyledComponents.Container>
        <StyledComponents.Header>
          <StyledComponents.LogoContainer
            src="seth-logo.svg"
            title="Supply Chains Logo"
            alt="Supply Chains Logo"
          />
        </StyledComponents.Header>
        <StyledComponents.Body>
          <StyledComponents.BodyHeader>
            <DecorativeSquares />
            <StyledComponents.BodyContent>
              <StyledComponents.BodyLoginTitle>
                {t('login:login-header')}
              </StyledComponents.BodyLoginTitle>
              <StyledComponents.BodyLoginSubtitle>
                {t('login:login-subtitle')}
              </StyledComponents.BodyLoginSubtitle>
              <LoginButton
                dataTestId={selectors.loginWithAkamaiButton}
                buttonText={t('publicNavigation:user-login-btn')}
              />
              <StyledComponents.BodySignUp>
                <StyledComponents.BodyNewToHubPrompt>
                  {t('login:login-new-user-prompt')}
                </StyledComponents.BodyNewToHubPrompt>

                <Link href="/contact-us" passHref>
                  <StyledComponents.NavButton
                    as="a"
                    data-testid={selectors.getInTouchLink}
                  >
                    {t('login:contact-us')}
                  </StyledComponents.NavButton>
                </Link>
              </StyledComponents.BodySignUp>
            </StyledComponents.BodyContent>
          </StyledComponents.BodyHeader>
        </StyledComponents.Body>
      </StyledComponents.Container>
      <Footer isPublicRoute />
    </>
  );
};
