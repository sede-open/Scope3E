import { getEmissionYears } from 'utils/emissions';
import { getYearOptionsWithEmissionsData } from './utils';

jest.mock('utils/emissions');

describe('getYearOptionsWithEmissionsData', () => {
  it('should return a list of options, filtering out years which do not have historical emissions data', () => {
    ((getEmissionYears as unknown) as jest.Mock).mockImplementation(() => [
      2020,
      2019,
      2018,
      2017,
      2016,
      2015,
    ]);

    const emissionsData = [
      {
        id: 'emission-0',
        year: 2020,
        scope1: 12342,
        scope2: 11,
        scope3: 0,
        offset: 0,
      },
      {
        id: 'emission-1',
        year: 2018,
        scope1: 345,
        scope2: 11,
        scope3: 0,
        offset: 0,
      },
      {
        id: 'emission-2',
        year: 1967,
        scope1: 1,
        scope2: 11,
        scope3: 0,
        offset: 0,
      },
    ];

    const expected = [2020, 2018];

    expect(getYearOptionsWithEmissionsData(emissionsData)).toEqual(expected);
  });
});
