import { v4 as uuidV4 } from 'uuid';
import useTranslation from 'next-translate/useTranslation';
import { TransText } from 'utils/TransText';

import { SquaresGraphic } from 'components/Glyphs/SquaresGraphic';
import { Link } from 'components/Link';

import { mailTo } from '../../constants';
import * as StyledComponents from './styledComponents';

export const UsedInviteToken = () => {
  const { t } = useTranslation();
  const paragraphs = t(
    'usedInviteToken:paragraphs',
    {},
    { returnObjects: true }
  );

  return (
    <StyledComponents.Container>
      <StyledComponents.SquaresContainer>
        <SquaresGraphic />
      </StyledComponents.SquaresContainer>
      <StyledComponents.Content>
        <StyledComponents.Title>
          {t('usedInviteToken:title')}
        </StyledComponents.Title>
        {paragraphs.map((content: string) => (
          <StyledComponents.Paragraph key={uuidV4()}>
            <TransText
              components={{
                link: <Link href={mailTo} />,
              }}
              text={content}
            />
          </StyledComponents.Paragraph>
        ))}
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};
