import { NavLink } from 'components/SubheaderNavigation';
import { Flags, getFeatureFlag } from 'utils/featureFlags';

export const mailToReport =
  'mailto:support@example.com?subject=Report%20Inappropriate%20Content%20/%20Behaviour&body=First%20Name%3A%0D%0A%0D%0A%0D%0ALast%20Name%3A%0D%0A%0D%0A%0D%0AEnquire%20About%3A';
export const mailToContactUs =
  'mailto:support@example.com?subject=Request%20to%20Terminate%20SETH%20Account%20(Changes%20to%20Terms)&body=First%20Name%3A%0D%0A%0D%0A%0D%0ALast%20Name%3A%0D%0A%0D%0A%0D%0AEnquire%20About%3A';
export const mailTo =
  'mailto:support@example.com?subject=Customer%20queries%20and%20support&body=First%20Name%3A%0D%0A%0D%0A%0D%0ALast%20Name%3A%0D%0A%0D%0A%0D%0AEnquire%20About%3A';
export const DATA_PRIVACY_NOTICE_LINK =
  'https://www.example.com/privacy/b2b-notice.html';
export const example_COOKIES_POLICY_LINK =
  'https://www.example.com/cookie-policy.html';
export const ZENDESK_SUPPLYCHAINS_HELPCENTRE_LINK =
  'https://helpcentre.supplychains.example.com/hc';

export const example_TARGET_YEAR = 2035;

export const DEFAULT_CHART_END_YEAR = 2040;

export const IEA_START_YEAR = 2014;

export const IEA_BELOW_2_DEGREES_SCENARIO: { [key: number]: number } = {
  2015: 0.981325740178918,
  2020: 0.904851880183651,
  2025: 0.894846745749108,
  2030: 0.812888691088075,
  2035: 0.774402251870676,
  2040: 0.71884044119239,
  2045: 0.655242435375798,
  2050: 0.589119947800228,
  2055: 0.382319765381074,
};

export const IEA_2_DEGREES_SCENARIO: { [key: number]: number } = {
  2015: 0.990494133381286,
  2020: 0.952014523365911,
  2025: 0.949595856516524,
  2030: 0.859579436430187,
  2035: 0.841485770804096,
  2040: 0.847733716913355,
  2045: 0.831872278050261,
  2050: 0.852399977396532,
  2055: 0.828508171439709,
};

export const EU_TARGET_REDUCTION_UP_TO_2015 = -1;
export const EU_TARGET_REDUCTION_AFTER_2015 = -1.5;

export enum PrimaryRoutes {
  Dashboard = '/dashboard',
  ValueChain = '/value-chain',
  AmbitionSimulation = '/ambition-simulation',
  Solutions = '/solutions',
  Community = '/community',
}

export const shouldDisplayCommunityPage = getFeatureFlag(
  Flags.IS_COMMUNITY_PAGE_ENABLED
);

export const primaryNavLinks: NavLink[] = [
  { label: 'common:dashboard', link: PrimaryRoutes.Dashboard },
  { label: 'common:value-chain', link: PrimaryRoutes.ValueChain },
  {
    label: 'common:ambition-simulation',
    link: PrimaryRoutes.AmbitionSimulation,
  },
  { label: 'common:solutions', link: PrimaryRoutes.Solutions },
  ...(shouldDisplayCommunityPage
    ? [{ label: 'common:community', link: PrimaryRoutes.Community }]
    : []),
];

export enum AdminDashboardRoutes {
  UsersDashboard = '/admin-dashboard/users',
  CompaniesDashboard = '/admin-dashboard/companies',
}

export const adminDashboardNavLinks: NavLink[] = [
  {
    label: 'common:users-dashboard',
    link: AdminDashboardRoutes.UsersDashboard,
  },
  {
    label: 'common:companies-dashboard',
    link: AdminDashboardRoutes.CompaniesDashboard,
  },
];

export const MAX_VERIFICATION_FILE_SIZE = 20971520;
export const VERIFICATION_FILE_MIMETYPE = 'application/pdf';

export const INPUT_DEFAULT_PLACEHOLDER = '--';

export const ONE_MILLION = 1_000_000;
export const ONE_BILLION = 1_000_000_000;
export const HUNDRED_MILLION = 100_000_000;
export const ONE_TRILLION = 1_000_000_000_000;

export const REDIRECT_SESSION_KEY = 'redirect';

export const HUBSPOT_WHITELIST = [
  'hrayr.petrosyan.web@gmail.com',
  'petrosyanhrayr95@gmail.com',
  'matthew.bridges@theagilehub.net',
  'matthew.bridges+123@theagilehub.net',
  'sitashah0607@gmail.com',
  'sita1996@hotmail.com',
  'sita1996+96@hotmail.com',
  'akanksha.dutta@theagilehub.net',
  'ryan.suarez@example.com',
];
