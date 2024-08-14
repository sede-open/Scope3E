import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CannonPink, FunGreen, SandyBeach } from 'styles/colours';
import { ChartLegendJustification } from 'components/Charts/ChartLegend/types';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';

export const CarbonIntensityLegend = () => {
  const { t } = useTranslation();

  const { openModal, closeModal, modalState } = useModal();

  const toggleIEAModal = useCallback(() => {
    if (modalState?.modalType === ModalType.IEA_INFO) {
      closeModal();
    } else {
      openModal({
        modalType: ModalType.IEA_INFO,
      });
    }
  }, [openModal, closeModal, modalState]);

  const legends = [
    {
      name: t('carbonIntensity:legend-label-intensity'),
      colour: CannonPink,
      isVisible: true,
    },
    {
      name: t('carbonIntensity:legend-label-target'),
      colour: FunGreen,
      isVisible: true,
    },
    {
      name: t('carbonIntensity:legend-label-iea'),
      colour: SandyBeach,
      isVisible: true,
      onClick: toggleIEAModal,
    },
  ];

  return (
    <ChartLegend
      legends={legends}
      justifyItems={ChartLegendJustification.LEFT}
    />
  );
};
