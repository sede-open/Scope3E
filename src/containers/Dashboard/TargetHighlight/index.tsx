import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import { getGrossEmissions, getNetEmissions } from 'utils/emissions';
import { Text } from 'components/Text';
import { Scorpion, Tundora } from 'styles/colours';
import Button from 'components/Button';
import { exampleBold } from 'styles/fonts';

import { TargetImage, TargetImageSize } from 'components/Glyphs/Target';
import { TargetType } from 'types/globalTypes';
import { TargetStatus } from './TargetStatus';
import { getTargetDisplayValues } from './utils';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  baseline: Emission;
  mostRecentEmission?: Emission;
  target?: Target | null;
}

export const TargetHighlight = ({
  baseline,
  target,
  mostRecentEmission,
}: IProps) => {
  const { canEditSupplyDashboard } = useAuthenticatedUser();
  const { t } = useTranslation();

  const { openModal } = useModal();

  let targetYear;
  if (target != null) {
    targetYear =
      target.scope3Year && target.scope3Year > target.scope1And2Year
        ? target.scope3Year
        : target.scope1And2Year;
  }

  const {
    value: targetValue,
    formattedValue,
    unit: targetUnit,
  } = getTargetDisplayValues({ baseline, target, targetYear, t });

  const mostRecentEmissionValue = target?.includeCarbonOffset
    ? getNetEmissions(mostRecentEmission)
    : getGrossEmissions(mostRecentEmission);

  const openAddModal = useCallback(() => {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });
  }, []);

  return (
    <StyledComponents.Container>
      <TargetImage size={TargetImageSize.LARGE} type={TargetType.ABSOLUTE} />
      <StyledComponents.Information>
        <Text data-testid={selectors.highlightYear} color={Scorpion}>
          {t('dashboard:highlight-your-target-ambition', {
            year: targetYear || '',
          })}
        </Text>
        <StyledComponents.EmissionValue
          as="h2"
          data-testid={selectors.highlightTargetEmission}
          family={exampleBold}
          size="24px"
          color={Tundora}
        >
          {formattedValue}
          <StyledComponents.Units as="span" color={Tundora}>
            {targetUnit}
          </StyledComponents.Units>
        </StyledComponents.EmissionValue>

        {target && mostRecentEmissionValue && (
          <TargetStatus
            mostRecentEmissionValue={mostRecentEmissionValue}
            targetAmbition={Number(targetValue)}
          />
        )}

        {!target && canEditSupplyDashboard && (
          <Button
            data-testid={selectors.highlightAddTargetBtn}
            type="button"
            color="primary"
            size="small"
            width="9.75rem"
            onClick={openAddModal}
          >
            {t('dashboard:highlight-target-add-target')}
          </Button>
        )}
      </StyledComponents.Information>
    </StyledComponents.Container>
  );
};

TargetHighlight.defaultProps = {
  emission: undefined,
};
