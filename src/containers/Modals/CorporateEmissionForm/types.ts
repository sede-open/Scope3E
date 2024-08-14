import { OptionType } from 'components/SingleSelect';
import { ModalContentType } from 'containers/types';
import { CorporateEmissionFormQuery } from 'types/CorporateEmissionFormQuery';
import { Scope2Type } from 'types/globalTypes';
import { EmissionPrivacyType } from './DataPubliclyAvailable';

export interface IProps {
  closeModal: () => void;
  onNewActualSuccess?: () => void;
  onNewBaselineSuccess: () => void;
  formType: ModalContentType | null;
  selectedEmissionYear?: number;
  emissionsFormData: CorporateEmissionFormQuery | undefined;
}

export enum CARBON_INTENSITY_FIELD_KEYS {
  METRIC = 'type',
  VALUE = 'value',
}

export enum FIELD_KEYS {
  YEAR = 'year',
  SCOPE_1 = 'scope1',
  SCOPE_2 = 'scope2',
  SCOPE_3 = 'scope3',
  SCOPE_2_TYPE = 'scope2Type',
  OFFSET = 'offset',
  HEADCOUNT = 'headCount',
  VERIFICATION_FILE = 'verificationFile',
  CARBON_INTENSITIES = 'carbonIntensities',
  PRIVACY_TYPE = 'privacyType',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE = 'typeOfDataPubliclyAvailable',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2 = 'typeOfDataPubliclyAvailableScope1And2',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3 = 'typeOfDataPubliclyAvailableScope3',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET = 'typeOfDataPubliclyAvailableOffset',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY = 'typeOfDataPubliclyAvailableIntensity',
  PUBLIC_LINK = 'publicLink',
}

export type CarbonIntensityValues = {
  [CARBON_INTENSITY_FIELD_KEYS.METRIC]?: OptionType | null;
  [CARBON_INTENSITY_FIELD_KEYS.VALUE]?: number | string;
};

export type FormValues = {
  year?: {
    value?: number;
    label: string;
  };
  scope1?: number;
  scope2?: number;
  scope3?: number | null;
  scope2Type?: Scope2Type;
  offset?: number | null;
  headCount?: number | null;
  verificationFile?: null;
  carbonIntensities: CarbonIntensityValues[];
  privacyType?: EmissionPrivacyType;
  typeOfDataPubliclyAvailable: any;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]: boolean;
  [FIELD_KEYS.PUBLIC_LINK]: string;
};
