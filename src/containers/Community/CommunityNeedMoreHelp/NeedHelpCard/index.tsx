import { useState } from 'react';

import Modal from 'components/Modal';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import { useTribeJWT } from 'effects/useTribeJWT';
import { trackEvent } from 'utils/analytics';
import { isexampleDomain } from 'utils/url';
import { isMailToString } from 'utils/isMailToString';
import { NEED_MORE_HELP_COMMUNITY_CARD_SELECT_EVENT } from 'utils/analyticsEvents';
import Icon from 'components/Icon';
import * as selectors from 'containers/Community/CommunityNeedMoreHelp/selectors';
import { ICommunityCard } from 'containers/Community/types';
import * as StyledComponents from '../../styledComponents';
import {
  getCommunityNeedHelpCardId,
  getCommunityNeedHelpImageSrc,
} from '../utils';

interface IProps {
  card: ICommunityCard;
}

export const NeedHelpCard = ({
  card: { title, imgAlt, subTitle, linkText, id, url },
}: IProps) => {
  const { wrapTribeLinkWithSSO } = useTribeJWT();
  const [disclaimerModal, setDisclaimerModal] = useState(false);

  const openDisclaimer = () => {
    setDisclaimerModal(true);
  };

  const onCloseModal = () => {
    setDisclaimerModal(false);
  };

  const handleClick = () => {
    trackEvent(NEED_MORE_HELP_COMMUNITY_CARD_SELECT_EVENT, {
      title,
      id: getCommunityNeedHelpCardId(id),
    });
    if (isMailToString(url) || isexampleDomain(url)) {
      window.open(url);
    } else {
      openDisclaimer();
    }
  };

  const cardId = getCommunityNeedHelpCardId(id);
  const cardImage = getCommunityNeedHelpImageSrc(id);
  return (
    <StyledComponents.Container
      key={cardId}
      data-testid={selectors.communityNeedHelpCard}
    >
      <StyledComponents.Link
        data-testid={selectors.communityNeedHelpCardLink}
        as="a"
        onClick={handleClick}
        title={title}
      >
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
            {id !== 2 && (
              <StyledComponents.NewTabIcon src="/new-tab.svg" title={title} />
            )}
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
