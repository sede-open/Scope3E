import { EmailSource } from 'containers/GetInTouch/GetInTouchForm/types';
import { EmailEnquiry } from 'types/globalTypes';

export interface ISendEmailPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  commsConsent: boolean;
  termsConsent: boolean;
  enquiry: EmailEnquiry;
  source: EmailSource;
}

export type SendEmaildOptions = {
  onCompleted?: () => void;
  onError?: (err: Error) => void;
};

export const useSendEmail = (
  url: string,
  { onCompleted, onError }: SendEmaildOptions = {}
) => {
  const sendEmail = async (payload: ISendEmailPayload) => {
    const formData = JSON.stringify(payload);

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,

        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data: ISendEmailPayload = await res.json();

      if (onCompleted) {
        onCompleted();
      }

      return data;
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }

    return undefined;
  };

  return [sendEmail] as const;
};
