import { noop } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import Modal from 'components/Modal';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import { useTribeJWT } from 'effects/useTribeJWT';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { mailTo } from '../../constants';

interface IProps {
  url: string;
  onGoToForumClick?: () => void;
}

export const CommunityBanner = ({ url, onGoToForumClick = noop }: IProps) => {
  const { t } = useTranslation();
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const { wrapTribeLinkWithSSO } = useTribeJWT();

  const onCloseModal = () => {
    setDisclaimerModal(false);
  };

  const onClick = () => {
    onGoToForumClick();
    window.location.href = mailTo;
  };

  return (
    <>
      <StyledComponents.CommunityBannerContent>
        <StyledComponents.CommunityBannerTitle data-testid={selectors.title}>
          {t('community:banner-title')}
        </StyledComponents.CommunityBannerTitle>
        <StyledComponents.CommunityBannerSubTitle
          data-testid={selectors.subTitle}
        >
          {t('community:banner-subtitle')}
        </StyledComponents.CommunityBannerSubTitle>
        <StyledComponents.CommunityBannerCTA
          onClick={onClick}
          data-testid={selectors.cta}
        >
          {t('community:banner-cta')}
        </StyledComponents.CommunityBannerCTA>
      </StyledComponents.CommunityBannerContent>
      <StyledComponents.CommunityBannerImageContainer title="example Digital Team Employees At Work" />
      <Modal isOpen={disclaimerModal} onClose={onCloseModal}>
        <ExternalLinkDisclaimer
          externalLink={url}
          onClose={onCloseModal}
          lazyLink={() => wrapTribeLinkWithSSO(url)}
        />
      </Modal>
    </>
  );
};
