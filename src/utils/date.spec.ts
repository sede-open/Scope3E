import * as dateHelpers from './date';

describe('date utils', () => {
  describe('max', () => {
    it('should return the date furthest in the future', () => {
      // ARRANGE
      const input = [
        new Date('2019-07-30'),
        new Date('2020-06-20'),
        new Date('1998-12-31'),
      ];

      // ACT
      const actual = dateHelpers.max(...input);

      // ASSERT
      expect(actual).toEqual(new Date('2020-06-20'));
    });

    it('should support being invoked with a single date, and return it', () => {
      // ARRANGE
      const input = new Date('2019-07-30');
      const expected = new Date('2019-07-30');

      // ACT
      const actual = dateHelpers.max(input);

      // ASSERT
      expect(actual).toEqual(expected);
    });
  });

  describe('addDays', () => {
    it('should add the specified number of days to a date', () => {
      // ARRANGE
      const date = new Date('2015-04-01');
      const days = 28;
      const expected = new Date('2015-04-29');

      // ACT
      const actual = dateHelpers.addDays(days)(date);

      // ASSERT
      expect(actual).toEqual(expected);
    });
  });

  describe('addDay', () => {
    it('should add one day to a date', () => {
      // ARRANGE
      const date = new Date('1999-12-31');
      const expected = new Date('2000-01-01');

      // ACT
      const actual = dateHelpers.addDay(date);

      // ASSERT
      expect(actual).toEqual(expected);
    });
  });
  describe('addSeconds', () => {
    it('should add number of seconds to the date', () => {
      const date = new Date('1970-01-01');
      const seconds = 3600;

      const expected = new Date(date.getMilliseconds() + seconds * 1000);
      const actual = dateHelpers.addSeconds(seconds)(date);

      expect(actual).toEqual(expected);
    });
  });

  describe('getSecondsInNumberOfDays', () => {
    it('should return the number of seconds in a day', () => {
      expect(dateHelpers.getSecondsInNumberOfDays(1)).toEqual(86400);
    });

    it('should return the number of seconds in ten days', () => {
      expect(dateHelpers.getSecondsInNumberOfDays(10)).toEqual(864000);
    });
  });
});
