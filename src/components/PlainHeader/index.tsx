import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SethLogo } from 'components/Glyphs/SethLogo';
import * as StyledComponents from './styledComponents';

export const PlainHeader = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <StyledComponents.Header>
      <StyledComponents.ResponsiveContainer>
        <Link locale={locale} href="/">
          <StyledComponents.LogoContainer>
            <SethLogo title={t('handleInvitation:logo-alt')} />
          </StyledComponents.LogoContainer>
        </Link>
      </StyledComponents.ResponsiveContainer>
    </StyledComponents.Header>
  );
};
