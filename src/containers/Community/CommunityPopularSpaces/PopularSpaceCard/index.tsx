import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import Modal from 'components/Modal';

import { useTribeJWT } from 'effects/useTribeJWT';
import { trackEvent } from 'utils/analytics';
import { isexampleDomain } from 'utils/url';

import { COMMUNITY_SPACE_CARD_SELECT_EVENT } from 'utils/analyticsEvents';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import * as selectors from 'containers/Community/CommunityPopularSpaces/selectors';
import { ICommunityCard } from 'containers/Community/types';

import * as StyledComponents from './styledComponents';
import {
  getCommunitySpaceCardId,
  getCommunitySpaceCardImageSrc,
} from '../utils';

interface PopularSpaceCardProps {
  card: ICommunityCard;
}

export const PopularSpaceCard = ({
  card: { title, imgAlt, subTitle, id, url },
}: PopularSpaceCardProps) => {
  const { t } = useTranslation();
  const { wrapTribeLinkWithSSO } = useTribeJWT();
  const [disclaimerModal, setDisclaimerModal] = useState(false);

  const openDisclaimer = () => {
    setDisclaimerModal(true);
  };

  const onCloseModal = () => {
    setDisclaimerModal(false);
  };

  const handleClick = () => {
    trackEvent(COMMUNITY_SPACE_CARD_SELECT_EVENT, {
      title,
      id: getCommunitySpaceCardId(id),
    });
    if (!isexampleDomain(url)) {
      openDisclaimer();
    } else {
      window.open(url);
    }
  };

  const cardId = getCommunitySpaceCardId(id);
  const cardImage = getCommunitySpaceCardImageSrc(id);
  return (
    <StyledComponents.Container key={cardId}>
      <StyledComponents.Link
        data-testid={selectors.communitySpaceCardLink}
        as="a"
        onClick={handleClick}
        title={title}
      >
        <StyledComponents.ImageContainer>
          <StyledComponents.Image
            src={cardImage}
            role="img"
            aria-label={imgAlt}
          />
        </StyledComponents.ImageContainer>
        <StyledComponents.TextWrapper>
          <StyledComponents.TitleText title={title}>
            {title}
          </StyledComponents.TitleText>

          <StyledComponents.SubTitleText title={subTitle}>
            {subTitle}
          </StyledComponents.SubTitleText>

          <StyledComponents.ExploreMoreContainer>
            <StyledComponents.NewTabIcon src="/new-tab.svg" title={title} />
            <StyledComponents.ExploreMoreText>
              {t('community:explore-this-space')}
            </StyledComponents.ExploreMoreText>
          </StyledComponents.ExploreMoreContainer>
        </StyledComponents.TextWrapper>
      </StyledComponents.Link>
      <Modal isOpen={disclaimerModal} onClose={onCloseModal}>
        <ExternalLinkDisclaimer
          externalLink={url}
          onClose={onCloseModal}
          lazyLink={() => wrapTribeLinkWithSSO(url)}
        />
      </Modal>
    </StyledComponents.Container>
  );
};
