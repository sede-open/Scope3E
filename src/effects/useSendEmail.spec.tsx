import { fireEvent, render, waitFor } from '@testing-library/react';
import { EmailSource } from 'containers/GetInTouch/GetInTouchForm/types';
import { useState } from 'react';
import { EmailEnquiry } from 'types/globalTypes';
import {
  ISendEmailPayload,
  SendEmaildOptions,
  useSendEmail,
} from './useSendEmail';

const url = '/hello';
const payload = {
  name: 'test from',
  email: 'test@from.there',
  message: 'testbody',
  company: 'testcompany',
  enquiry: EmailEnquiry.JOIN,
  commsConsent: true,
  termsConsent: true,
  source: EmailSource.Email,
};

const setup = (sendEmaildOptions?: Partial<SendEmaildOptions>) => {
  const TestComponent = () => {
    const [sendEmail] = useSendEmail(url, sendEmaildOptions);
    const [sendEmailResult, setSendEmailResult] = useState<
      ISendEmailPayload | undefined
    >();

    const onClick = async () => {
      const result = await sendEmail(payload);
      setSendEmailResult(result);
    };

    return (
      <>
        <button data-testid="button" type="button" onClick={onClick}>
          click me
        </button>
        <div data-testid="send-email-result">
          {sendEmailResult && sendEmailResult.message}
        </div>
      </>
    );
  };

  return render(<TestComponent />);
};

describe('useSendEmail', () => {
  describe('when send email is successful', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => payload,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return file data', async () => {
      const { getByTestId, queryByText, findByTestId } = setup();

      expect(queryByText(payload.message)).not.toBeInTheDocument();

      fireEvent.click(getByTestId('button'));

      expect((await findByTestId('send-email-result')).textContent).toBe(
        payload.message
      );

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: 'POST',
        })
      );

      const {
        body,
      } = ((global.fetch as unknown) as jest.Mock).mock.calls[0][1];
      expect(body).toContain(payload.message);
    });

    describe('when onCompleted callback is provided', () => {
      it('should return call onCompleted', async () => {
        const onCompleted = jest.fn();

        const { getByTestId } = setup({ onCompleted });

        fireEvent.click(getByTestId('button'));

        await waitFor(() => expect(onCompleted).toHaveBeenCalled());
      });
    });
  });

  describe('when send email fails', () => {
    const errorMessage = 'test error message';
    const error = new Error(errorMessage);
    beforeEach(() => {
      global.fetch = jest.fn();
      ((window.fetch as unknown) as jest.Mock).mockRejectedValue(error);
    });

    it('should return undefined', async () => {
      const { getByTestId, queryByText } = setup();

      fireEvent.click(getByTestId('button'));

      await waitFor(() =>
        expect(queryByText(payload.message)).not.toBeInTheDocument()
      );
    });

    describe('when onError callback is provided', () => {
      it('should return call onError', async () => {
        const onError = jest.fn();
        const { getByTestId } = setup({ onError });

        fireEvent.click(getByTestId('button'));

        await waitFor(() =>
          expect(expect(onError).toHaveBeenCalledWith(error))
        );
      });
    });
  });
});
