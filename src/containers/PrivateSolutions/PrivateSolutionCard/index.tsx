import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { trackEvent } from 'utils/analytics';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { PRIVATE_SOLUTIONS_SELECTED_EVENT } from 'utils/analyticsEvents';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  solutionId: string;
}

export const PrivateSolutionCard = ({ solutionId }: IProps) => {
  const { t } = useTranslation();
  const { company: userCompany } = useAuthenticatedUser();
  const companyName = userCompany?.name;

  const solutionTitle = t(`privateSolutions:${solutionId}-card-title`);

  const handleClick = () => {
    trackEvent(PRIVATE_SOLUTIONS_SELECTED_EVENT, {
      title: solutionTitle,
      company: companyName ?? '',
      sector:
        companySectorsPrimarySectorName(userCompany?.companySectors) ?? '',
    });
  };

  return (
    <StyledComponents.Wrapper data-testid={selectors.cardWrapper}>
      <Link href={`/solutions/${solutionId}`} passHref>
        <StyledComponents.ButtonAnchor
          data-testid={selectors.buttonAnchor}
          onClick={handleClick}
          title={solutionTitle}
        >
          <StyledComponents.HoverContainer>
            <StyledComponents.Image
              src={`/images/PrivateSolutions/${solutionId}.png`}
              role="img"
              aria-label={t(`solutionDetail:${solutionId}-img-alt`)}
              data-testid={selectors.cardSrcPath}
            />
          </StyledComponents.HoverContainer>
          <StyledComponents.TextContainer>
            <StyledComponents.Title data-testid={selectors.cardTitle}>
              {solutionTitle}
            </StyledComponents.Title>
            <StyledComponents.Subtext data-testid={selectors.cardSubtext}>
              {t(`privateSolutions:${solutionId}-card-subtext`)}
            </StyledComponents.Subtext>
          </StyledComponents.TextContainer>
        </StyledComponents.ButtonAnchor>
      </Link>
    </StyledComponents.Wrapper>
  );
};
