import { CorporateEmissionAccessInput } from 'types/globalTypes';

export const getCorporateEmissionAccessMock = (
  attributes?: CorporateEmissionAccessInput
) => ({
  scope1And2: false,
  scope3: false,
  carbonIntensity: false,
  carbonOffsets: false,
  publicLink: null,
  ...attributes,
});
