import * as Sentry from '@sentry/browser';
import { captureException, captureMessage, Severity } from './logging';
import { stubSetExtras, stubSetUser } from '../../__mocks__/@sentry/browser';

describe('logging util', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('captureException', () => {
    it('should supply the provided error to Sentry.captureException and supply event data to Sentry', () => {
      // ARRANGE
      const error = new Error('Some error');
      const eventData = {
        foo: 'bar',
      };

      // ACT
      captureException(error, { eventData });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetExtras).toHaveBeenCalledTimes(1);
      expect(stubSetExtras).toHaveBeenCalledWith(eventData);

      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });

    it('should supply the provided error to Sentry.captureException and supply the user ID to Sentry', () => {
      // ARRANGE
      const error = new Error('Some error');
      const userId = '3';

      // ACT
      captureException(error, { eventData: { userId } });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      // expect(stubSetUser).toHaveBeenCalledTimes(1);
      // expect(stubSetUser).toHaveBeenCalledWith({ id: '3' });

      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });

    it('should supply the provided error to Sentry.captureException and supply both event data and the user ID to Sentry', () => {
      // ARRANGE
      const error = new Error('Some error');
      const userId = '3';
      const eventData = {
        foo: 'bar',
        userId,
      };

      // ACT
      captureException(error, { eventData, userId });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetExtras).toHaveBeenCalledTimes(1);
      expect(stubSetExtras).toHaveBeenCalledWith(eventData);
      expect(stubSetUser).toHaveBeenCalledTimes(1);
      expect(stubSetUser).toHaveBeenCalledWith({ id: userId });

      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });

    it('should support the absence of the optional options argument', () => {
      // ARRANGE
      const error = new Error('Some error');

      // ACT
      captureException(error);

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetUser).toHaveBeenCalledTimes(0);
      expect(stubSetExtras).toHaveBeenCalledTimes(0);

      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });
  });

  describe('captureMessage', () => {
    it('should supply the provided message, log level and meta data to Sentry.captureMessage', () => {
      // ARRANGE
      const message = 'Some message';
      const eventData = {
        foo: 'bar',
      };

      // ACT
      captureMessage(message, {
        eventData,
        level: Severity.Fatal,
      });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetExtras).toHaveBeenCalledTimes(1);
      expect(stubSetExtras).toHaveBeenCalledWith(eventData);

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        message,
        Severity.Fatal
      );
    });

    it('should supply the provided message, log level and user ID to Sentry.captureMessage', () => {
      // ARRANGE
      const message = 'Some message';
      const userId = '5';

      // ACT
      captureMessage(message, {
        level: Severity.Fatal,
        userId,
      });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetUser).toHaveBeenCalledTimes(1);
      expect(stubSetUser).toHaveBeenCalledWith({ id: '5' });

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        message,
        Severity.Fatal
      );
    });

    it('should support the absence of the log level argument and default to Severity.Info.', () => {
      // ARRANGE
      const message = 'Some message';
      const eventData = {
        foo: 'bar',
      };

      // ACT
      captureMessage(message, {
        eventData,
      });

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetExtras).toHaveBeenCalledTimes(1);
      expect(stubSetExtras).toHaveBeenCalledWith(eventData);

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        message,
        Severity.Info
      );
    });

    it('should support the absence of the optional meta data argument', () => {
      // ARRANGE
      const message = 'Some message';

      // ACT
      captureMessage(message);

      // ASSERT
      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      expect(Sentry.withScope).toHaveBeenCalledWith(expect.any(Function));

      expect(stubSetExtras).toHaveBeenCalledTimes(0);

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        message,
        Severity.Info
      );
    });
  });
});
