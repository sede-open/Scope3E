import * as StyledComponents from './styledComponents';

type EmissionSummaryRow = {
  name: string;
  total: string;
  dataTestId: string;
};

export interface IProps {
  unit: string;
  totalRow: EmissionSummaryRow;
  detailRows?: EmissionSummaryRow[];
  isBaselineTotal?: boolean;
}

export const ScopeSummary = ({
  unit,
  totalRow,
  detailRows,
  isBaselineTotal,
}: IProps) => (
  <StyledComponents.ScopeSummaryContainer isBaselineTotal={isBaselineTotal}>
    <StyledComponents.ScopeSummaryRow>
      <StyledComponents.ScopeSummaryTitle>
        {totalRow.name}
      </StyledComponents.ScopeSummaryTitle>
      <StyledComponents.ScopeSummaryTitle data-testid={totalRow.dataTestId}>
        {totalRow.total} {unit}
      </StyledComponents.ScopeSummaryTitle>
    </StyledComponents.ScopeSummaryRow>

    {detailRows &&
      detailRows.map((detailRow) => (
        <StyledComponents.ScopeSummaryRow key={detailRow.name}>
          <StyledComponents.ScopeSummaryInfo>
            {detailRow.name}
          </StyledComponents.ScopeSummaryInfo>
          <StyledComponents.ScopeSummaryInfo data-testid={detailRow.dataTestId}>
            {detailRow.total} {unit}
          </StyledComponents.ScopeSummaryInfo>
        </StyledComponents.ScopeSummaryRow>
      ))}
  </StyledComponents.ScopeSummaryContainer>
);
