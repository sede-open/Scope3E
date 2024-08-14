import { minSearchLength } from './constants';

export const isValidSearchQuery = (search?: string) =>
  search && search.length >= minSearchLength;

export const allResultsFetched = (
  lastPageLen: number,
  expectedPageSize: number
) => lastPageLen % expectedPageSize !== 0;
