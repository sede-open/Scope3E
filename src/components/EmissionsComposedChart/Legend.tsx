import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  CongressBlue,
  FunGreen,
  SandyBeach,
  MorningGlory,
} from 'styles/colours';

import { InfoTooltipBody, InfoTooltipHeader } from 'components/InfoToolTip';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';

export interface IProps {
  shouldShowGrossEmissions: boolean;
}

const getTooltipContent = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => (
  <>
    <InfoTooltipHeader>{title}</InfoTooltipHeader>
    <InfoTooltipBody>{body}</InfoTooltipBody>
  </>
);

export const Legend = ({ shouldShowGrossEmissions }: IProps) => {
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
      name: t('emissionsOverviewChart:legend-label-net-emission'),
      colour: CongressBlue,
      isVisible: true,
      infoTooltipContent: getTooltipContent({
        title: t('emissionsOverviewChart:legend-net-emission-info-title'),
        body: t('emissionsOverviewChart:legend-net-emission-info-message'),
      }),
      ariaLabel: t(
        'emissionsOverviewChart:legend-net-emission-info-aria-label'
      ),
    },
    {
      name: t('emissionsOverviewChart:legend-label-target-data'),
      colour: FunGreen,
      isVisible: true,
      infoTooltipContent: getTooltipContent({
        title: t('emissionsOverviewChart:legend-target-info-title'),
        body: t('emissionsOverviewChart:legend-target-info-message'),
      }),
      ariaLabel: t('emissionsOverviewChart:legend-target-info-aria-label'),
    },
    {
      name: t('emissionsOverviewChart:legend-label-iea'),
      colour: SandyBeach,
      isVisible: true,
      onClick: toggleIEAModal,
    },
  ];

  if (shouldShowGrossEmissions === true) {
    legends.unshift({
      name: t('emissionsOverviewChart:legend-label-gross-emission'),
      colour: MorningGlory,
      isVisible: true,
      infoTooltipContent: getTooltipContent({
        title: t('emissionsOverviewChart:legend-gross-emission-info-title'),
        body: t('emissionsOverviewChart:legend-gross-emission-info-message'),
      }),
      ariaLabel: t(
        'emissionsOverviewChart:legend-gross-emission-info-aria-label'
      ),
    });
  }

  return <ChartLegend legends={legends} />;
};
