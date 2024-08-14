import useTranslation from 'next-translate/useTranslation';

import { Card } from 'components/Card';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';

interface IProps {
  year: number;
}

export const EmptyView = ({ year }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card data-testid={selectors.customersEmptyView}>
      <StyledComponents.EmptyViewTextContainer>
        <StyledComponents.EmptyViewHeading>
          {t('valueChain:customers-empty-heading', { year })}
        </StyledComponents.EmptyViewHeading>
        <StyledComponents.EmptyViewText>
          {t('valueChain:customers-empty-text')}
        </StyledComponents.EmptyViewText>
      </StyledComponents.EmptyViewTextContainer>
    </Card>
  );
};
