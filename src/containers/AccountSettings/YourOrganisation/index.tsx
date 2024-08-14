import { CompanyDetails } from './CompanyDetails';
import { CompanyPrivacy } from './CompanyPrivacy';
import { AccountSettingsCompanySectors as CompanySectors } from './CompanySectors';
import { CompanyTeamMembers } from './CompanyTeamMembers';

export const YourOrganisation = () => (
  <>
    <CompanyDetails />
    <CompanyPrivacy />
    <CompanySectors />
    <CompanyTeamMembers />
  </>
);
