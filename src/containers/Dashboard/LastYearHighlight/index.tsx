import useTranslation from 'next-translate/useTranslation';

import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { Text } from 'components/Text';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import { Scorpion, Tundora } from 'styles/colours';
import Button from 'components/Button';
import { exampleBold } from 'styles/fonts';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { getNetEmissions } from 'utils/emissions';
import { CorporateEmissionType } from 'types/globalTypes';

import { Co2World } from 'components/Glyphs/Co2World';
import { EmissionPercentageChange } from './EmissionPercentageChange';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { getEmissionDisplayValue } from './utils';

export interface IProps {
  lastYear: number;
  lastYearEmission?: Emission;
  historicEmission?: Emission;
  selectEmissionYear: (value: number) => void;
}

export const LastYearHighlight = ({
  lastYear,
  lastYearEmission,
  selectEmissionYear,
  historicEmission,
}: IProps) => {
  const { canEditSupplyDashboard } = useAuthenticatedUser();
  const { t } = useTranslation();

  const {
    formattedValue: emissionValue,
    unit: emissionUnit,
  } = getEmissionDisplayValue({
    emission: lastYearEmission,
    t,
  });
  const historicYearEmissionValue = getNetEmissions(historicEmission);

  const { openModal } = useModal();

  const openEmissionPathSelect = () => {
    selectEmissionYear(lastYear);

    openModal({
      modalType: ModalType.EMISSION_PATH_SELECT,
      contentProps: {
        emissionType: CorporateEmissionType.ACTUAL,
        selectedEmissionYear: lastYear,
      },
    });
  };

  return (
    <StyledComponents.Container>
      <Co2World />
      <StyledComponents.Information>
        <Text color={Scorpion}>
          {t('dashboard:highlight-last-year-your-emission', { year: lastYear })}
        </Text>
        <StyledComponents.EmissionValue
          as="h2"
          data-testid={selectors.lastYearEmission}
          family={exampleBold}
          size="24px"
          color={Tundora}
        >
          {emissionValue}
          <StyledComponents.Units as="span" color={Tundora}>
            {emissionUnit}
          </StyledComponents.Units>
        </StyledComponents.EmissionValue>

        {lastYearEmission && historicEmission && (
          <EmissionPercentageChange
            lastYearEmissionValue={Number(getNetEmissions(lastYearEmission))}
            historicYearEmissionValue={historicYearEmissionValue}
            historicYear={historicEmission?.year}
          />
        )}

        {!lastYearEmission && canEditSupplyDashboard && (
          <Button
            data-testid={selectors.lastYearAddButton}
            type="button"
            size="small"
            color="primary"
            width="9.75rem"
            onClick={openEmissionPathSelect}
          >
            {t('dashboard:highlight-last-year-add-emission')}
          </Button>
        )}
      </StyledComponents.Information>
    </StyledComponents.Container>
  );
};

LastYearHighlight.defaultProps = {
  lastYearEmission: undefined,
  historicEmission: undefined,
};
