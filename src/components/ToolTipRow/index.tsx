import useTranslation from 'next-translate/useTranslation';
import { Text } from 'components/Text';
import { formatInteger } from 'utils/number';
import * as StyledComponents from './styledComponents';

export interface IProps {
  background: string;
  borderBackground: string;
  color: string;
  value?: number | string;
  minValue?: number;
  label: string;
  dataTestId?: string;
  content?: string;
  minContent?: string;
  translationUnitLabel?: string;
  minDataTestId?: string;
}

const UnitLabel = ({ translationLabel }: { translationLabel: string }) => {
  const { t } = useTranslation();
  return <>{` ${t(translationLabel)}`}</>;
};

export const DEFAULT_VALUE = '-';
const getDisplayValue = (value?: number | string): number | string => {
  if (!value) {
    return DEFAULT_VALUE;
  }
  if (value === ' ') {
    return '';
  }
  return `${formatInteger(Math.round(Number(value) * 100) / 100)}`;
};

export const ToolTipRow = ({
  background,
  borderBackground,
  color,
  value,
  label,
  dataTestId,
  translationUnitLabel,
  content,
  minContent,
  minValue,
  minDataTestId,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledComponents.Container>
        <StyledComponents.Dot
          background={background}
          borderBackground={borderBackground}
        />{' '}
        <Text color={color} size="14px">
          {t(label)}
        </Text>
      </StyledComponents.Container>
      <StyledComponents.Value data-testid={dataTestId}>
        {t(content)}
        {getDisplayValue(value)}
        {translationUnitLabel && (
          <UnitLabel translationLabel={translationUnitLabel} />
        )}
      </StyledComponents.Value>
      {minContent && (
        <StyledComponents.Value data-testid={minDataTestId}>
          {t(minContent)}
          {getDisplayValue(minValue)}
          {translationUnitLabel && (
            <UnitLabel translationLabel={translationUnitLabel} />
          )}
        </StyledComponents.Value>
      )}
    </>
  );
};

ToolTipRow.defaultProps = {
  value: undefined,
  minValue: undefined,
  content: undefined,
  minContent: undefined,
  dataTestId: undefined,
  minDataTestId: undefined,
  translationUnitLabel: undefined,
};
