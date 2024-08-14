import { CorporateEmissionType } from 'types/globalTypes';
import { getYAxisHighestPoint } from './charts';

describe('charts utils', () => {
  describe('getYAxisHighestPoint()', () => {
    it('should return emission value if that is the highest', () => {
      const actualEmissions = [
        {
          year: 2018,
          grossEmissions: 130,
          netEmissions: 130,
          exampleShare: 2,
          type: CorporateEmissionType.BASELINE,
        },
        {
          year: 2019,
          grossEmissions: 122,
          netEmissions: 110,
          exampleShare: 3,
          type: CorporateEmissionType.ACTUAL,
        },
      ];
      const ieaData = [
        { year: 2018, iea: [90, 120] },
        { year: 2019, iea: [95, 125] },
      ];
      const result = getYAxisHighestPoint({ actualEmissions, ieaData });

      expect(result).toBe(130);
    });

    it('should return IEA value if that is the highest', () => {
      const actualEmissions = [
        {
          year: 2018,
          actualEmissions: 130,
          exampleShare: 2,
          type: CorporateEmissionType.BASELINE,
        },
        {
          year: 2019,
          actualEmissions: 122,
          exampleShare: 3,
          type: CorporateEmissionType.ACTUAL,
        },
      ];
      const ieaData = [
        { year: 2018, iea: [90, 120] },
        { year: 2019, iea: [105, 135] },
      ];
      const result = getYAxisHighestPoint({ actualEmissions, ieaData });

      expect(result).toBe(135);
    });

    it('should return target value if that is the highest', () => {
      const targetData = [
        { year: 2018, totalTargetEmission: 150 },
        { year: 2019, totalTargetEmission: 111 },
      ];
      const ieaData = [
        { year: 2018, iea: [90, 120] },
        { year: 2019, iea: [105, 135] },
      ];
      const result = getYAxisHighestPoint({ targetData, ieaData });

      expect(result).toBe(150);
    });
  });
});
