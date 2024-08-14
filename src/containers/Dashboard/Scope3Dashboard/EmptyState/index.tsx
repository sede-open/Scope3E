import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Button from 'components/Button';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  title: string;
  subtext: string;
}

export const EmptyState = ({ title, subtext }: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Wrapper data-testid={selectors.emptyStateWrapper}>
      <StyledComponents.Title data-testid={selectors.emptyStateTitle}>
        {title}
      </StyledComponents.Title>
      <StyledComponents.Subtext data-testid={selectors.emptyStateSubtext}>
        {subtext}
      </StyledComponents.Subtext>
      <StyledComponents.EmptyStateCtaContainer>
        <Link href="/value-chain" passHref>
          <Button data-testid={selectors.emptyStateCTA} as="a">
            {t('scope3Dashboard:empty-button')}
          </Button>
        </Link>
      </StyledComponents.EmptyStateCtaContainer>
    </StyledComponents.Wrapper>
  );
};
