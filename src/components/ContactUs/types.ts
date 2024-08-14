import { Solutions } from 'containers/PrivateSolutions/types';
import { EmailEnquiry, RegionName } from 'types/globalTypes';

export type EnquiryType = {
  label: string;
  value: EmailEnquiry;
};

export type Region = {
  label: RegionName;
  value: RegionName;
};

export interface IContactUsFormValues {
  name: string;
  email: string;
  company?: string;
  enquiry: EnquiryType[];
  region: Region[] | null;
  message: string;
  consent: boolean;
}

export interface IProps {
  solutionId?: Solutions;
  onClose: () => void;
}
