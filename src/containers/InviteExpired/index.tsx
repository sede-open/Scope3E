import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { SquaresGraphic } from 'components/Glyphs/SquaresGraphic';
import { Link } from 'components/Link';

import { mailTo } from '../../constants';
import * as StyledComponents from './styledComponents';

export const InviteExpired = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.Container>
      <StyledComponents.SquaresContainer>
        <SquaresGraphic />
      </StyledComponents.SquaresContainer>
      <StyledComponents.Content>
        <StyledComponents.Title>
          {t('inviteExpired:title')}
        </StyledComponents.Title>
        <StyledComponents.Paragraph>
          <Trans
            i18nKey="inviteExpired:paragraph"
            components={{
              link: <Link href={mailTo} />,
            }}
          />
        </StyledComponents.Paragraph>
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};
