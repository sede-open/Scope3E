import useTranslation from 'next-translate/useTranslation';
import { Co2World } from 'components/Glyphs/Co2World';
import {
  SummaryType,
  getEmissionDisplayValue,
  getFormattedFieldValue,
  isFieldPopulated,
} from './utils';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  fieldValues: SummaryType;
}

export const SummaryCard = ({ fieldValues }: IProps) => {
  const { t } = useTranslation();
  const isScope1Populated = isFieldPopulated(fieldValues.scope1);
  const isScope2Populated = isFieldPopulated(fieldValues.scope2);
  const isScope3Populated = isFieldPopulated(fieldValues.scope3);
  const isOffsetPopulated = isFieldPopulated(fieldValues.offset);
  const isFormActive =
    isScope1Populated ||
    isScope2Populated ||
    isScope3Populated ||
    isOffsetPopulated;

  const {
    formattedValue: netEmissionValue,
    unit: emissionUnit,
  } = getEmissionDisplayValue({
    value: fieldValues,
    t,
    isFormActive,
  });

  return (
    <StyledComponents.Container>
      <StyledComponents.TotalContainer>
        <Co2World />
        <StyledComponents.Information>
          <StyledComponents.TotalTitle>
            {t('corporateEmissionForm:summary-total-card-title')}
          </StyledComponents.TotalTitle>
          <StyledComponents.ValueContainer>
            <StyledComponents.EmissionValue data-testid={selectors.total}>
              {netEmissionValue}
            </StyledComponents.EmissionValue>
            <StyledComponents.Units
              data-testid={selectors.totalUnits}
              isFieldPopulated
            >
              {emissionUnit}
            </StyledComponents.Units>
          </StyledComponents.ValueContainer>
        </StyledComponents.Information>
      </StyledComponents.TotalContainer>

      <StyledComponents.FieldContainer
        data-testid={selectors.scope1}
        isFieldPopulated={isScope1Populated}
      >
        <StyledComponents.Title
          data-testid={selectors.scope1Title}
          isFieldPopulated={isScope1Populated}
        >
          {t('corporateEmissionForm:summary-scope1')}
        </StyledComponents.Title>
        <StyledComponents.UnitContainer>
          <StyledComponents.FieldTotal
            data-testid={selectors.scope1Total}
            isFieldPopulated={isScope1Populated}
          >
            {getFormattedFieldValue(fieldValues.scope1, isScope1Populated)}
          </StyledComponents.FieldTotal>
          <StyledComponents.Units
            data-testid={selectors.scope1Units}
            isFieldPopulated={isScope1Populated}
          >
            {t('common:unit-mt-co2')}
          </StyledComponents.Units>
        </StyledComponents.UnitContainer>
      </StyledComponents.FieldContainer>

      <StyledComponents.FieldContainer
        data-testid={selectors.scope2}
        isFieldPopulated={isScope2Populated}
      >
        <StyledComponents.Title
          data-testid={selectors.scope2Title}
          isFieldPopulated={isScope2Populated}
        >
          {t('corporateEmissionForm:summary-scope2')}
        </StyledComponents.Title>
        <StyledComponents.UnitContainer>
          <StyledComponents.FieldTotal
            data-testid={selectors.scope2Total}
            isFieldPopulated={isScope2Populated}
          >
            {getFormattedFieldValue(fieldValues.scope2, isScope2Populated)}
          </StyledComponents.FieldTotal>
          <StyledComponents.Units
            data-testid={selectors.scope2Units}
            isFieldPopulated={isScope2Populated}
          >
            {t('common:unit-mt-co2')}
          </StyledComponents.Units>
        </StyledComponents.UnitContainer>
      </StyledComponents.FieldContainer>

      <StyledComponents.FieldContainer
        data-testid={selectors.scope3}
        isFieldPopulated={isScope3Populated}
      >
        <StyledComponents.Title
          data-testid={selectors.scope3Title}
          isFieldPopulated={isScope3Populated}
        >
          {t('corporateEmissionForm:summary-scope3')}
        </StyledComponents.Title>
        <StyledComponents.UnitContainer>
          <StyledComponents.FieldTotal
            data-testid={selectors.scope3Total}
            isFieldPopulated={isScope3Populated}
          >
            {getFormattedFieldValue(fieldValues.scope3, isScope3Populated)}
          </StyledComponents.FieldTotal>
          <StyledComponents.Units
            data-testid={selectors.scope3Units}
            isFieldPopulated={isScope3Populated}
          >
            {t('common:unit-mt-co2')}
          </StyledComponents.Units>
        </StyledComponents.UnitContainer>
      </StyledComponents.FieldContainer>

      <StyledComponents.FieldContainer
        data-testid={selectors.offsets}
        isFieldPopulated={isOffsetPopulated}
      >
        <StyledComponents.Title
          data-testid={selectors.offsetsTitle}
          isFieldPopulated={isOffsetPopulated}
        >
          {t('corporateEmissionForm:summary-offsets')}
        </StyledComponents.Title>
        <StyledComponents.UnitContainer>
          <StyledComponents.FieldTotal
            data-testid={selectors.offsetsTotal}
            isFieldPopulated={isOffsetPopulated}
          >
            {getFormattedFieldValue(fieldValues.offset, isOffsetPopulated)}
          </StyledComponents.FieldTotal>
          <StyledComponents.Units
            data-testid={selectors.offsetsUnits}
            isFieldPopulated={isOffsetPopulated}
          >
            {t('common:unit-mt-co2')}
          </StyledComponents.Units>
        </StyledComponents.UnitContainer>
      </StyledComponents.FieldContainer>
    </StyledComponents.Container>
  );
};
