import { moreOrEqualTo } from './rules';

describe('CorporateEmissionForm rules', () => {
  describe(moreOrEqualTo.name, () => {
    describe('when min value is less than value', () => {
      const minValue = 9;
      const value = minValue + 1;

      it('should return true', () => {
        const result = moreOrEqualTo(minValue)(value);
        expect(result).toBe(true);
      });
    });

    describe('when min value is greater than value', () => {
      const minValue = 9;
      const value = minValue - 1;

      it('should return false', () => {
        const result = moreOrEqualTo(minValue)(value);
        expect(result).toBe(false);
      });
    });

    describe.each`
      minValue
      ${undefined}
      ${null}
    `(
      'when min value to compare to minValue is $minValue',
      ({ minValue }: { minValue?: null }) => {
        it('should return true', () => {
          const result = moreOrEqualTo(minValue)(1);
          expect(result).toBe(true);
        });
      }
    );

    describe.each`
      value
      ${undefined}
      ${null}
      ${'string'}
    `(
      'when min value to compare to value is $value',
      ({ value }: { value?: null }) => {
        it('should return true', () => {
          const result = moreOrEqualTo(0)(value);
          expect(result).toBe(true);
        });
      }
    );
  });
});
