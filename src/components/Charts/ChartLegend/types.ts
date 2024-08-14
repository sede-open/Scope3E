import { ReactElement } from 'react';

export enum ChartLegendJustification {
  LEFT = 'flex-start',
  CENTRE = 'center',
  RIGHT = 'flex-end',
}

export type LegenItemType = {
  name: string;
  colour: string;
  infoTooltipContent?: ReactElement | string;
  onClick?: () => void;
  isVisible: boolean;
  ariaLabel?: string;
};

export interface IProps {
  legends: LegenItemType[];
  justifyItems?: ChartLegendJustification;
}
