import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import { EnquiryEmail, EnquiryEmailVariables } from 'types/EnquiryEmail';

export const ENQUIRY_EMAIL_MUTATION = gql`
  mutation EnquiryEmail($input: EnquiryEmailInput!) {
    enquiryEmail(input: $input)
  }
`;

export const useEnquiryEmail = (
  options: MutationHookOptions<EnquiryEmail, EnquiryEmailVariables> = {}
) =>
  useMutation<EnquiryEmail, EnquiryEmailVariables>(ENQUIRY_EMAIL_MUTATION, {
    ...options,
  });
