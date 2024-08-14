export const headerHeight = 72;
export const subheaderHeight = 42;

export const inputUnitWidth = '70px';
export const groupInputWidth = '87px';
export const emailInputUnitWidth = '150px';

export enum Devices {
  MOBILE_S = 'mobileS',
  MOBILE_M = 'mobileM',
  MOBILE_L = 'mobileL',
  TABLET_S = 'tabletS',
  TABLET_NAV = 'tabletNav',
  TABLET_M = 'tabletM',
  LAPTOP_S = 'laptopS',
  LAPTOP_M = 'laptopM',
  LAPTOP_L = 'laptopL',
  DESKTOP = 'desktop',
}

export const screenSize: Record<Devices, number> = {
  [Devices.MOBILE_S]: 320,
  [Devices.MOBILE_M]: 375,
  [Devices.MOBILE_L]: 460,
  [Devices.TABLET_S]: 768,
  [Devices.TABLET_NAV]: 850,
  [Devices.TABLET_M]: 935,
  [Devices.LAPTOP_S]: 1024,
  [Devices.LAPTOP_M]: 1290,
  [Devices.LAPTOP_L]: 1440,
  [Devices.DESKTOP]: 2560,
};

export const device = {
  mobileS: `(min-width: ${screenSize.mobileS}px)`,
  mobileM: `(min-width: ${screenSize.mobileM}px)`,
  mobileL: `(min-width: ${screenSize.mobileL}px)`,
  tabletS: `(min-width: ${screenSize.tabletS}px)`,
  tabletNav: `(min-width: ${screenSize.tabletNav}px)`,
  tabletM: `(min-width: ${screenSize.tabletM}px)`,
  laptopS: `(min-width: ${screenSize.laptopS}px)`,
  laptopM: `(min-width: ${screenSize.laptopM}px)`,
  laptopL: `(min-width: ${screenSize.laptopL}px)`,
  desktop: `(min-width: ${screenSize.desktop}px)`,
  desktopL: `(min-width: ${screenSize.desktop}px)`,
};

export const visuallyHidden = `
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
