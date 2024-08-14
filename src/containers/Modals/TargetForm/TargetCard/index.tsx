import { ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AlertIconBlue } from 'components/Glyphs/AlertIconBlue';

import { CarbonIntensityMetricType, TargetType } from 'types/globalTypes';
import { TargetImage, TargetImageSize } from 'components/Glyphs';
import * as StyledComponents from './styledComponents';
import {
  Alert,
  IconContainer,
  TextContainer,
  AlertTitle,
  AlertContent,
} from '../styledComponents';
import * as selectors from '../selectors';
import { FormTargetType, FormValues } from '../types';

interface IProps {
  formKey: keyof FormValues;
  onFormOpen?: () => void;
  form?: ReactNode;
  chart?: ReactNode;
  displayForm?: boolean;
  intensityMetric?: CarbonIntensityMetricType;
}

export const TargetCard = ({
  formKey,
  onFormOpen,
  form,
  chart,
  displayForm,
  intensityMetric,
}: IProps) => {
  const { t } = useTranslation();

  const addBtnSelector =
    formKey === FormTargetType.ABSOLUTE
      ? selectors.addAbsoluteAmbitionBtn
      : selectors.addIntensityAmbitionBtn;

  const getChartTitleMetric = () => {
    if (formKey === FormTargetType.ABSOLUTE) {
      return t('targetForm:absolute-ambition-chart-title-metric');
    }
    if (!intensityMetric) {
      return '';
    }
    return t('targetForm:intensity-ambition-chart-title-metric', {
      intensityMetric: t(`carbonIntensity:${intensityMetric}`),
    });
  };

  return (
    <StyledComponents.Card>
      <StyledComponents.Left>
        <StyledComponents.Title>
          {t(`targetForm:${formKey}-ambition-title`)}
        </StyledComponents.Title>
        <StyledComponents.Subtitle>
          {t(`targetForm:${formKey}-ambition-description`)}
        </StyledComponents.Subtitle>

        {displayForm ? (
          form || (
            <StyledComponents.NoTargetView>
              <TargetImage
                size={TargetImageSize.MEDIUM}
                type={
                  formKey === TargetType.ABSOLUTE.toLowerCase()
                    ? TargetType.ABSOLUTE
                    : TargetType.INTENSITY
                }
              />
              <StyledComponents.TextButton
                data-testid={addBtnSelector}
                onClick={onFormOpen}
              >
                {t(`targetForm:add-${formKey}-ambition-data`)}
              </StyledComponents.TextButton>
            </StyledComponents.NoTargetView>
          )
        ) : (
          <Alert $marginTop="0">
            <IconContainer>
              <AlertIconBlue title="Information icon" />
            </IconContainer>
            <TextContainer>
              <AlertTitle data-testid={selectors.intensityAlert}>
                {t('targetForm:intensity-info-title')}
              </AlertTitle>
              <AlertContent
                data-testid={selectors.intensityAlertMessage}
                $maxWidth="90%"
              >
                {t('targetForm:intensity-info')}
              </AlertContent>
            </TextContainer>
          </Alert>
        )}
      </StyledComponents.Left>
      {displayForm && chart && (
        <StyledComponents.Right>
          <StyledComponents.RightContent>
            <StyledComponents.ChartTitleContainer>
              <StyledComponents.ChartTitle>
                {t(`targetForm:${formKey}-ambition-chart-title`)}{' '}
                {getChartTitleMetric()}
              </StyledComponents.ChartTitle>
            </StyledComponents.ChartTitleContainer>
            {chart}
          </StyledComponents.RightContent>
        </StyledComponents.Right>
      )}
    </StyledComponents.Card>
  );
};

TargetCard.defaultProps = {
  form: undefined,
  chart: undefined,
  onFormOpen: () => {},
  displayForm: true,
  intensityMetric: undefined,
};
