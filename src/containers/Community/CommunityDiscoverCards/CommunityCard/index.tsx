import { useState } from 'react';

import Modal from 'components/Modal';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import { useTribeJWT } from 'effects/useTribeJWT';
import { trackEvent } from 'utils/analytics';
import { isexampleDomain } from 'utils/url';
import { DISCOVER_COMMUNITY_CARD_SELECT_EVENT } from 'utils/analyticsEvents';
import { ICommunityCard } from 'containers/Community/types';
import {
  getCardId,
  getCardImageSrc,
} from 'containers/Community/CommunityDiscoverCards/utils';
import Icon from 'components/Icon';
import * as selectors from 'containers/Community/CommunityDiscoverCards/selectors';
import * as StyledComponents from '../../styledComponents';

interface IProps {
  card: ICommunityCard;
}

export const CommunityCard = ({
  card: { id, title, url, imgAlt, subTitle, linkText },
}: IProps) => {
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const { wrapTribeLinkWithSSO } = useTribeJWT();

  const openDisclaimer = () => {
    setDisclaimerModal(true);
  };

  const onCloseModal = () => {
    setDisclaimerModal(false);
  };

  const handleClick = () => {
    trackEvent(DISCOVER_COMMUNITY_CARD_SELECT_EVENT, {
      title,
      id: getCardId(id),
    });

    if (!isexampleDomain(url)) {
      openDisclaimer();
    } else {
      window.open(url);
    }
  };

  const cardImage = getCardImageSrc(id);
  const cardId = getCardId(id);
  return (
    <StyledComponents.Container
      key={cardId}
      data-testid={selectors.communityCard}
    >
      <StyledComponents.Link
        data-testid={selectors.communityCardLink}
        as="a"
        onClick={handleClick}
        title={title}
      >
        {' '}
        <StyledComponents.CardIcon>
          <Icon src={cardImage} alt={imgAlt} />
        </StyledComponents.CardIcon>
        <StyledComponents.TextWrapper>
          <StyledComponents.TitleText title={title}>
            {title}
          </StyledComponents.TitleText>

          <StyledComponents.SubTitleText title={subTitle}>
            {subTitle}
          </StyledComponents.SubTitleText>

          <StyledComponents.ReadMoreContainer>
            <StyledComponents.NewTabIcon src="/new-tab.svg" title={title} />
            <StyledComponents.ReadMoreText title={linkText}>
              {linkText}
            </StyledComponents.ReadMoreText>
          </StyledComponents.ReadMoreContainer>
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
