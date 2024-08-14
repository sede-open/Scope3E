import Button from 'components/Button';
import { EditInterestsButton } from 'containers/PrivateSolutions/EditInterestsButton';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { PrimaryRoutes } from '../../../constants';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  translationPrefix: string;
  id: string;
  hasEditDetails?: boolean;
  hasViewAllNavBtn?: boolean;
  hasSubtitle?: boolean;
}

export const SolutionsGridHeader = ({
  translationPrefix,
  id,
  hasEditDetails,
  hasViewAllNavBtn,
  hasSubtitle,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.GridHeaderContainer>
      <StyledComponents.GridTitle>
        {t(`${translationPrefix}:${id}-title`)}
      </StyledComponents.GridTitle>
      {hasEditDetails && <EditInterestsButton />}
      {hasViewAllNavBtn && (
        <Link href={PrimaryRoutes.Solutions} passHref>
          <Button
            as="a"
            color="text-button"
            data-testid={selectors.viewAllSolutionsBtn}
          >
            {t('privateSolutions:view-all-button')}
          </Button>
        </Link>
      )}
      {hasSubtitle && (
        <StyledComponents.GridSubtitle>
          {' '}
          {t(`${translationPrefix}:${id}-subtitle`)}
        </StyledComponents.GridSubtitle>
      )}
    </StyledComponents.GridHeaderContainer>
  );
};

SolutionsGridHeader.defaultProps = {
  hasEditDetails: false,
  hasViewAllNavBtn: false,
  hasSubtitle: false,
};
