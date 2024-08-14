import {
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  Scope2SourceValues,
} from '../../types';

export type FormValues = {
  [FIELD_KEYS.EMISSION_SOURCES]: Scope2SourceValues[];
};
