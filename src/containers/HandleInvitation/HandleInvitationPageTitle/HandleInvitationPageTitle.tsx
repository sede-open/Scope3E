import useTranslation from 'next-translate/useTranslation';
import { TransText } from 'utils/TransText';
import { mailTo } from '../../../constants';
import { ContentType } from '../types';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  type: ContentType;
}

export const HandleInvitationPageTitle = ({ type }: IProps) => {
  const { t } = useTranslation();
  const isFormContentType = type === ContentType.HANDLE_INVITATION_FORM;
  return (
    <StyledComponents.ContentWrapper isRequired={!isFormContentType}>
      <StyledComponents.TitleContainer data-testid={selectors.pageTitle}>
        <StyledComponents.Title>
          {t(`handleInvitation:${type}-title`)}
        </StyledComponents.Title>
      </StyledComponents.TitleContainer>

      <StyledComponents.SubtitleContainer>
        <StyledComponents.Subtitle>
          {t(`handleInvitation:${type}-subtitle`)}
        </StyledComponents.Subtitle>

        {!isFormContentType && (
          <StyledComponents.Subtitle>
            <TransText
              text={t('handleInvitation:contact-info')}
              components={{
                sethMail: <StyledComponents.MailtoLink href={mailTo} />,
              }}
            />
          </StyledComponents.Subtitle>
        )}
      </StyledComponents.SubtitleContainer>
    </StyledComponents.ContentWrapper>
  );
};
