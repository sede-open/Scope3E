import { ReactNode, useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { useUserSolutionInterestsQuery } from 'queries/userOnboarding';
import { getSolutionDetailRecommendedSolutions } from 'containers/PrivateSolutions/utils';
import { Solutions } from 'containers/PrivateSolutions/types';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import { ContactUs } from 'components/ContactUs';

import { SolutionsGrid } from '../SolutionsGrid';
import { PrimaryRoutes } from '../../../constants';
import * as selectors from '../../../containers/PrivateSolutions/SolutionDetail/selectors';
import { SolutionHighlightCard } from '../SolutionHighlightCard';

import * as StyledComponents from './styledComponents';
import { SolutionsGridHeader } from '../SolutionsGridHeader';

interface IProps {
  hasToolTip?: boolean;
  solutionDetail: ReactNode;
  solutionId: Solutions;
}

export const SolutionDetailContainer = ({
  hasToolTip,
  solutionDetail,
  solutionId,
}: IProps) => {
  const { t } = useTranslation();

  const [isContactModalOpen, setContactModal] = useState(false);
  const toggleContactModal = useCallback(() => {
    setContactModal(!isContactModalOpen);
  }, [isContactModalOpen]);
  const { data: userSolutionInterestsData } = useUserSolutionInterestsQuery();

  const selectedSolutionInterestsData =
    userSolutionInterestsData?.userSolutionInterests || [];
  const solutionData = getSolutionDetailRecommendedSolutions(
    selectedSolutionInterestsData,
    solutionId
  );

  return (
    <StyledComponents.Wrapper data-testid={selectors.solutionDetail}>
      {isContactModalOpen && (
        <Modal isOpen onClose={toggleContactModal}>
          <ContactUs onClose={toggleContactModal} solutionId={solutionId} />
        </Modal>
      )}
      <Link href={PrimaryRoutes.Solutions} passHref>
        <StyledComponents.BackButton as="a" data-testid={selectors.backBtn}>
          <StyledComponents.IconContainer>
            <Icon
              alt={t('solutionDetail:arrow-left')}
              src="/arrow-left.svg"
              size={12}
            />
          </StyledComponents.IconContainer>
          {t('solutionDetail:back-btn')}
        </StyledComponents.BackButton>
      </Link>
      <StyledComponents.ContentHeader>
        <StyledComponents.TitleContainer>
          <StyledComponents.Divider />
          <StyledComponents.Title>
            {t(`solutionDetail:${solutionId}-title`)}
          </StyledComponents.Title>
          <StyledComponents.Subtext>
            {t(`solutionDetail:${solutionId}-subtext`)}
          </StyledComponents.Subtext>
        </StyledComponents.TitleContainer>
        <StyledComponents.Image
          data-testid={selectors.solutionImage}
          src={`/images/PrivateSolutions/${solutionId}.png`}
          role="img"
          alt={t(`solutionDetail:${solutionId}-img-alt`)}
        />
      </StyledComponents.ContentHeader>
      <StyledComponents.ColumnLayout>
        <StyledComponents.DetailContainer>
          {solutionDetail}
          <StyledComponents.Disclaimer>
            {t('solutionDetail:recommendation-disclaimer')}
          </StyledComponents.Disclaimer>
        </StyledComponents.DetailContainer>
        <SolutionHighlightCard
          hasToolTip={hasToolTip}
          solutionId={solutionId}
          toggleContactModal={toggleContactModal}
        />
      </StyledComponents.ColumnLayout>
      <StyledComponents.SolutionGridWrapper>
        <SolutionsGridHeader
          translationPrefix="solutionDetail"
          id={selectors.alternativeSolutionsGrid}
          hasViewAllNavBtn
        />
        <SolutionsGrid solutions={solutionData} />
      </StyledComponents.SolutionGridWrapper>
    </StyledComponents.Wrapper>
  );
};

SolutionDetailContainer.defaultProps = {
  hasToolTip: false,
};
