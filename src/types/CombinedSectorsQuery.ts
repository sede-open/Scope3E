/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CombinedSectorsQuery
// ====================================================

export interface CombinedSectorsQuery_sectors {
  id: any;
  name: string;
}

export interface CombinedSectorsQuery_companySectors_sector {
  id: any;
  name: string;
}

export interface CombinedSectorsQuery_companySectors {
  id: any;
  sector: CombinedSectorsQuery_companySectors_sector;
  sectorType: CompanySectorType;
  hasBeenUpdated: boolean | null;
}

export interface CombinedSectorsQuery {
  sectors: CombinedSectorsQuery_sectors[];
  companySectors: CombinedSectorsQuery_companySectors[];
}

export interface CombinedSectorsQueryVariables {
  companyId: any;
}
