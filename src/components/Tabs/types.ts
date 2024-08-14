import { ReactElement } from 'react';

export enum TabSize {
  SMALL,
  LARGE,
}

export enum TabsAlignment {
  CENTER,
  LEFT,
  FLEX_GROW,
}

export interface ITabProps {
  align?: TabsAlignment;
  isSelected: boolean;
  size?: TabSize;
}

export interface IProps {
  align?: TabsAlignment;
  children: ReactElement<ITabProps> | ReactElement<ITabProps>[];
  size?: TabSize;
  marginBottom?: string;
  isNavbar: boolean;
}

export interface TabListProps {
  align: TabsAlignment;
  marginBottom?: string;
}
