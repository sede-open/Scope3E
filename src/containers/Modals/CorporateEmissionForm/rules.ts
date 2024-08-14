import {
  MAX_VERIFICATION_FILE_SIZE,
  ONE_BILLION,
  ONE_TRILLION,
  VERIFICATION_FILE_MIMETYPE,
} from '../../../constants';

export const maxPDFSize = (value: any) =>
  value && value[0] && value[0].size < MAX_VERIFICATION_FILE_SIZE;

export const notPDFMimetype = (value: any) =>
  value && value[0] && value[0].type === VERIFICATION_FILE_MIMETYPE;

export const lessThanOrEqualToBillion = (value: number) => value <= ONE_BILLION;

export const moreOrEqualTo = (minValue?: number | null) => (
  value?: number | string | null
) =>
  typeof minValue !== 'number' ||
  typeof value !== 'number' ||
  value >= minValue;

export const lessThanOrEqualToTrillion = (value: number) =>
  value <= ONE_TRILLION;

export const getNotLessThanEmissionAllocations = (
  emissionAllocationsForYear: number
) => (value: number) => value >= emissionAllocationsForYear;
