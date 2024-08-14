import { ComponentType } from 'react';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { ModalContentType } from 'containers/types';

export enum FormType {
  ACCEPT_ALLOCATION,
  ALLOCATE_EMISSIONS,
  CORPORATE_EMISSION,
  DELETE_ALLOCATION,
  REQUEST_ALLOCATION,
}

interface CorporateEmissionFormProps {
  corporateEmissionFormType: ModalContentType;
  selectedEmissionYear?: number;
}

interface AcceptAllocationFormProps {
  allocation: EmissionAllocationsQuery_emissionAllocations;
  isEditing: boolean;
}

interface AllocateEmissionsFormProps {
  isEditing: boolean;
  selectedYear: number;
  allocation?: EmissionAllocationsQuery_emissionAllocations;
}

interface RequestAllocationsFormProps {
  isEditing: boolean;
  selectedYear: number;
  allocation?: EmissionAllocationsQuery_emissionAllocations;
}

interface DeleteAllocationFormProps {
  id: string;
}

export interface ModalState {
  isOpen: boolean;
  formType?: FormType;
  acceptAllocationFormProps?: AcceptAllocationFormProps;
  allocateEmissionsFormProps?: AllocateEmissionsFormProps;
  corporateEmissionFormProps?: CorporateEmissionFormProps;
  deleteAllocationFormProps?: DeleteAllocationFormProps;
  requestAllocationFormProps?: RequestAllocationsFormProps;
}

export interface GetTableRows {
  emissionAllocations: EmissionAllocationsQuery_emissionAllocations[];
  RowActions: ComponentType<{
    allocation: EmissionAllocationsQuery_emissionAllocations;
  }>;
  hasEditPermission: boolean;
  t: any;
  isCompanyOverviewEnabled: boolean;
}
