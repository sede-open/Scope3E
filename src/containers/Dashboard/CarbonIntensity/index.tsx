import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';
import { getIntensityTarget } from 'utils/targets';
import { Spinner } from 'components/Spinner';
import { EmptyComponent } from 'components/EmptyComponent';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';

import { IProps } from './types';
import { CarbonIntensityGraph } from '../../../components/CarbonIntensityGraph';
import * as StyledComponents from './styledComponents';
import { useTargetsData } from './queries';
import * as selectors from './selectors';

export const CarbonIntensity = ({ emissions, baseline }: IProps) => {
  const { company } = useAuthenticatedUser();

  const { t } = useTranslation();
  const { openModal } = useModal();

  const openAddModal = useCallback(() => {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });
  }, []);

  if (!company) {
    return null;
  }

  const { data, loading } = useTargetsData({ companyId: company.id });

  if (loading) {
    return <Spinner />;
  }

  const target = getIntensityTarget(data?.targets);

  return (
    <div>
      <StyledComponents.Header>
        <Text as="h2" family={exampleBold} color={Tundora} size="24px">
          {t('carbonIntensity:dashboard-graph-title')}
        </Text>
      </StyledComponents.Header>
      <StyledComponents.Container>
        {target ? (
          <CarbonIntensityGraph
            target={target}
            emissions={emissions}
            baselineYear={baseline.year}
          />
        ) : (
          <EmptyComponent
            dataTestId={selectors.intensityTargetEmptyState}
            title={t('carbonIntensity:graph-empty-state-title')}
            message={t('carbonIntensity:graph-empty-state-message')}
            ctaText={t('carbonIntensity:graph-empty-state-cta')}
            ctaClick={openAddModal}
          />
        )}
      </StyledComponents.Container>
    </div>
  );
};
