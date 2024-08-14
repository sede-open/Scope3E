export const FIELD_KEYS = {
  ACTIONS: 'actions',
  ACTION_TYPE: 'action',
  DECLINE_REASON: 'reason',
} as const;

export enum DECLINE_REASON_OPTIONS {
  UNAUTHORISED = 'unauthorised',
  ALTERNATIVE_ENTITY = 'alternative-entity',
  ADDRESS_INCORRECT = 'address-incorrect',
  COMPANY_INCORRECT = 'company-incorrect',
  DECLINE_JOIN = 'decline-join',
}

export enum ACTION_IDS {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

export type DeclineReasonOptionType = {
  label: string;
  value: DECLINE_REASON_OPTIONS;
};
export interface IHandleInvitationFormValues {
  [FIELD_KEYS.ACTION_TYPE]: ACTION_IDS;
  [FIELD_KEYS.DECLINE_REASON]: DeclineReasonOptionType;
}

export enum ContentType {
  HANDLE_INVITATION_FORM = 'HANDLE_INVITATION_FORM',
  ACCEPTED_CONFIRMATION = 'ACCEPTED_CONFIRMATION',
  DECLINED_CONFIRMATION = 'DECLINED_CONFIRMATION',
}

export interface ContentState {
  contentType: ContentType;
}
