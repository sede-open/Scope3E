import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipType } from 'types/globalTypes';

import { formatInteger } from 'utils/number';

import * as selectors from '../selectors';
import { getAllocatingCompanyTypeSuffix } from '../utils';
import * as StyledComponents from './styledComponents';

interface IProps {
  colCount: number;
  totalAvailable?: number;
  totalAllocated: number;
  allocatingCompaniesCount: number;
  allocatingCompanyType: CompanyRelationshipType;
}

export const TotalRow = ({
  colCount,
  totalAvailable,
  totalAllocated,
  allocatingCompaniesCount,
  allocatingCompanyType,
}: IProps) => {
  const { t } = useTranslation();
  const isOverAllocated =
    totalAvailable !== undefined && totalAllocated > totalAvailable;
  const formattedTotalAvailable =
    Number(totalAvailable) > 0 ? formatInteger(Number(totalAvailable)) : 0;
  const allocatingCompanyTypeSuffix = getAllocatingCompanyTypeSuffix(
    allocatingCompanyType,
    t
  );

  return (
    <>
      <StyledComponents.TotalCell $fontWeight="700">
        {t('valueChain:table-total-title', {
          count: allocatingCompaniesCount,
          allocatingCompanyType: allocatingCompanyTypeSuffix,
        })}
      </StyledComponents.TotalCell>
      <StyledComponents.TotalCell
        colSpan={colCount - 1}
        data-testid={selectors.totalAllocatedCell}
        isOverAllocated={isOverAllocated}
      >
        {formatInteger(totalAllocated)} {t('common:unit-mt-co2')}
        {isOverAllocated && (
          <StyledComponents.OverAllocatedMessageContainer
            data-testid={selectors.totalAllocatedOverAllocatedMessage}
          >
            {t('valueChain:table-total-overallocated', {
              totalAvailable: formattedTotalAvailable,
            })}
          </StyledComponents.OverAllocatedMessageContainer>
        )}
      </StyledComponents.TotalCell>
    </>
  );
};

TotalRow.defaultProps = {
  totalAvailable: undefined,
};
