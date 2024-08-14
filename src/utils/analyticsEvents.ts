export const SUPPLIER_LOGIN_EVENT = 'Supplier login';
export const EMISSION_FORM_OPENED_EVENT = 'Emission form is opened';
export const BASELINE_SUCCESS_MODAL_DISMISSED =
  'I will do later is clicked after adding a baseline';
export const TARGET_FORM_DISMISSED = 'Target form is dismissed';
export const EMISSION_CREATED_EVENT = 'Emission is created and saved';
export const REGISTER_EVENT = 'Join us button clicked';
export const FOOTER_CONTACT_US_EVENT = 'Contact us button clicked';
export const FOOTER_SETH_MAIL_TO_EVENT = 'Seth Email contact us button clicked';
export const FOOTER_TERMS_EVENT = 'Terms of Use button clicked';
export const FOOTER_LEGAL_DISCLAIMER_EVENT = 'Terms of Use button clicked';
export const FOOTER_DATA_PRIVACY_EVENT = 'Data privacy button clicked';
export const FOOTER_ACCEPTABLE_USE_EVENT = 'Acceptable use button clicked';
export const HEADER_NAVIGATION_EVENT = 'Header navigation button is clicked';
export const FOOTER_NAVIGATION_EVENT = 'Footer navigation button is clicked';
export const HOME_PAGE_GET_IN_TOUCH_EVENT_START =
  'Home content get in touch clicked - Start';
export const HOME_PAGE_GET_IN_TOUCH_EVENT_END =
  'Home content get in touch clicked - End';
export const HOME_PAGE_FIND_OUT_MORE_EVENT =
  'Home content find out more clicked';
export const SOLUTIONS_SELECTED_EVENT = 'Solutions is selected';
export const BURGER_MENU_GET_IN_TOUCH_EVENT =
  'Burger menu get in touch button clicked';
export const HOME_VISIT_example_BUTTON = 'Home visit example button clicked';
export const FOOTER_CARD_BTN_EVENT = 'Footer card get in touch button clicked';
export const VALUE_CHAIN_SELECT_YEAR = 'Supply chain year changed';
export const GET_IN_TOUCH_FORM_SUBMIT = 'Get in touch form send button clicked';
export const PAGE_NOT_FOUND_BTN = '404 homepage navigation button clicked';
export const TARGET_FORM_SUBMIT = 'Ambition target form submit button clicked';
export const BAR_CHART_SELECT = 'Bar chart button selected';
export const COMPOSED_CHART_SELECT = 'Composed chart button selected';
export const ONBOARDING_JOURNEY_SUBMITTED = 'User onboarding submitted';
export const ONBOARDING_JOURNEY_NAVIGATED_BACK =
  'User onboarding navigated back';
export const ONBOARDING_JOURNEY_NAVIGATED_FORWARD =
  'User onboarding navigated forward';
export const EDIT_USER_DETAILS_SUBMITTED =
  'Account settings edit user details submitted';
export const PRIVATE_SOLUTIONS_SELECTED_EVENT = 'Private solution selected';
export const SUBJECT_GET_IN_TOUCH_PUBLIC =
  'Subjects selected by the user in get in touch form';
export const RANKING_TABLE_YEAR_SELECTED = 'Recuction rank table year selected';
export const RANKING_TABLE_SECTOR_SELECTED =
  'Recuction rank table sector filter changed';
export const RANKING_TABLE_VERIFICATION_SELECTED =
  'Recuction rank table data verification filter changed';
export const SAVE_BASELINE_EXPERIENCED_FLOW = 'Baseline data is saved';
export const SHARE_AMBITION_EXPERIENCED_FLOW =
  'Share your ambition button is clicked';
export const EDIT_SOLUTION_INTERESTS_SUBMITTED =
  'Private solutions edit interests submitted';
export const ALLOCATE_EMISSION_FORM_ALLOCATION_METHOD =
  'Allocation method in the allocate emission form';
export const EMISSION_PATH_SELECT_OPENED = 'Emission path select opened';
export const INEXPERIENCED_FLOW_START = 'Inexperienced flow selection';
export const EXPERIENCED_FLOW_START = 'Experienced flow selection';
export const INEXPERIENCED_FLOW_ADD = 'Inexperienced add flow selection';
export const EXPERIENCED_FLOW_ADD = 'Experienced add flow selection';
export const INEXPERIENCED_FLOW_CANCEL = 'Cancel clicked (inexperienced flow)';
export const INEXPERIENCED_FLOW_CANCEL_CONFIRM =
  'Cancel confirmed (inexperienced flow)';
export const INEXPERIENCED_FLOW_CANCEL_DISMISS =
  'Dismiss cancel confirmation (inexperienced flow)';
export const INEXPERIENCED_FLOW_NEXT = 'Next clicked (inexperienced flow)';
export const INEXPERIENCED_FLOW_BACK = 'Back clicked (inexperienced flow)';
export const CONTACT_US_FORM_SUBMISSION = 'Contact us form is submitted';
export const TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED =
  'Areas of interest Task List Task clicked';
export const TASK_LIST_BASELINE_TASK_CLICKED =
  'Baseline Task List Task clicked';
export const TASK_LIST_AMBITION_TASK_CLICKED =
  'Ambition Task List Task clicked';
export const TASK_LIST_LAST_YEAR_TASK_CLICKED =
  'Last year Task List Task clicked';
export const TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED =
  'Connect To Customer Task List Task clicked';
export const TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED =
  'Connect To Supplier Task List Task clicked';
export const TASK_LIST_PRIVACY_SHARING_CLICKED =
  'Share your historical public data Task List Task clicked';
export const TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED =
  'Allocate Emission To Customer Task List clicked';
export const HOME_PAGE_EXPLORE_FEATURE_SECTION =
  'Home Page Explore Feature Section is selected';
export const FOOTER_HELP_CENTRE_EVENT =
  'Footer card help center button clicked';
export const HANDLE_INVITATION_FORM_SUBMISSION =
  'Handle invitation form submitted';
export const NEW_COMPANY_INVITED =
  'Submit button clicked on invite supplier form - company successfully invited';
export const NEW_COMPANY_REVIEWED =
  'Companies review action selected on companies admin dashboard';
export const COMPANY_ACTIVATED =
  'Company activated - user logged into dashboard';
export const NEW_COMPANY_INVITE_RETRIGGERED =
  'Resend invite button clicked - retrigger invite email';
export const TEAM_MEMBER_REMOVED =
  'Team member has been removed from a company';
export const TEAM_MEMBER_INVITE_RESENT = 'Team member has resent an invite';
export const DISCOVER_COMMUNITY_CARD_SELECT_EVENT =
  'Discover the community card is selected';
export const NEED_MORE_HELP_COMMUNITY_CARD_SELECT_EVENT =
  'Need more help community card selected';
export const COMMUNITY_SPACE_CARD_SELECT_EVENT =
  'Community space card event is selected';
export const COMMUNITY_SHOW_MORE_SPACES_BUTTON =
  'Show more spaces in the community page is clicked';
export const TASK_LIST_HEADER_BUTTON_CLICKED = 'Task List in nav bar clicked';
export const NETWORK_SETTING_HEADER_BUTTON_CLICKED =
  'Network Setting in nav bar clicked';
export const COMMUNITY_BANNER_GO_TO_FORUM_BUTTON =
  'User clicked Go to forum button in Community Banner';
export const BUILD_YOUR_SUPPLY_CHAIN_BUTTON_CLICKED =
  'User clicked the Start Building Your Network button';
export const INVITE_YOUR_SUPPLIER_NETWORK_BUTTON_CLICKED =
  'User clicked the Start Creating Your Supplier Network button';
export const INVITE_YOUR_CUSTOMER_NETWORK_BUTTON_CLICKED =
  'User clicked the Start Creating Your Customer Network button';
export const DATA_SHARE_REQUEST_BUTTON_CLICKED =
  'Data share request button clicked';

export type AnalyticsEventType =
  | typeof TASK_LIST_HEADER_BUTTON_CLICKED
  | typeof NETWORK_SETTING_HEADER_BUTTON_CLICKED
  | typeof SUPPLIER_LOGIN_EVENT
  | typeof EMISSION_FORM_OPENED_EVENT
  | typeof BASELINE_SUCCESS_MODAL_DISMISSED
  | typeof TARGET_FORM_DISMISSED
  | typeof EMISSION_CREATED_EVENT
  | typeof REGISTER_EVENT
  | typeof FOOTER_CONTACT_US_EVENT
  | typeof FOOTER_SETH_MAIL_TO_EVENT
  | typeof FOOTER_TERMS_EVENT
  | typeof FOOTER_LEGAL_DISCLAIMER_EVENT
  | typeof HEADER_NAVIGATION_EVENT
  | typeof FOOTER_NAVIGATION_EVENT
  | typeof HOME_PAGE_GET_IN_TOUCH_EVENT_START
  | typeof HOME_PAGE_GET_IN_TOUCH_EVENT_END
  | typeof HOME_PAGE_FIND_OUT_MORE_EVENT
  | typeof SOLUTIONS_SELECTED_EVENT
  | typeof BURGER_MENU_GET_IN_TOUCH_EVENT
  | typeof BURGER_MENU_GET_IN_TOUCH_EVENT
  | typeof HOME_VISIT_example_BUTTON
  | typeof FOOTER_CARD_BTN_EVENT
  | typeof VALUE_CHAIN_SELECT_YEAR
  | typeof GET_IN_TOUCH_FORM_SUBMIT
  | typeof PAGE_NOT_FOUND_BTN
  | typeof BAR_CHART_SELECT
  | typeof COMPOSED_CHART_SELECT
  | typeof FOOTER_DATA_PRIVACY_EVENT
  | typeof FOOTER_ACCEPTABLE_USE_EVENT
  | typeof TARGET_FORM_SUBMIT
  | typeof ONBOARDING_JOURNEY_SUBMITTED
  | typeof ONBOARDING_JOURNEY_NAVIGATED_BACK
  | typeof ONBOARDING_JOURNEY_NAVIGATED_FORWARD
  | typeof EDIT_USER_DETAILS_SUBMITTED
  | typeof PRIVATE_SOLUTIONS_SELECTED_EVENT
  | typeof SUBJECT_GET_IN_TOUCH_PUBLIC
  | typeof RANKING_TABLE_YEAR_SELECTED
  | typeof RANKING_TABLE_SECTOR_SELECTED
  | typeof RANKING_TABLE_VERIFICATION_SELECTED
  | typeof SAVE_BASELINE_EXPERIENCED_FLOW
  | typeof SHARE_AMBITION_EXPERIENCED_FLOW
  | typeof INEXPERIENCED_FLOW_START
  | typeof EXPERIENCED_FLOW_START
  | typeof INEXPERIENCED_FLOW_ADD
  | typeof EXPERIENCED_FLOW_ADD
  | typeof INEXPERIENCED_FLOW_NEXT
  | typeof INEXPERIENCED_FLOW_BACK
  | typeof INEXPERIENCED_FLOW_CANCEL
  | typeof INEXPERIENCED_FLOW_CANCEL_CONFIRM
  | typeof INEXPERIENCED_FLOW_CANCEL_DISMISS
  | typeof EDIT_SOLUTION_INTERESTS_SUBMITTED
  | typeof ALLOCATE_EMISSION_FORM_ALLOCATION_METHOD
  | typeof CONTACT_US_FORM_SUBMISSION
  | typeof TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED
  | typeof EMISSION_PATH_SELECT_OPENED
  | typeof TASK_LIST_BASELINE_TASK_CLICKED
  | typeof TASK_LIST_AMBITION_TASK_CLICKED
  | typeof TASK_LIST_LAST_YEAR_TASK_CLICKED
  | typeof TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED
  | typeof TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED
  | typeof TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED
  | typeof HOME_PAGE_EXPLORE_FEATURE_SECTION
  | typeof FOOTER_HELP_CENTRE_EVENT
  | typeof HANDLE_INVITATION_FORM_SUBMISSION
  | typeof NEW_COMPANY_INVITED
  | typeof NEW_COMPANY_REVIEWED
  | typeof COMPANY_ACTIVATED
  | typeof NEW_COMPANY_INVITE_RETRIGGERED
  | typeof TEAM_MEMBER_REMOVED
  | typeof TEAM_MEMBER_INVITE_RESENT
  | typeof DISCOVER_COMMUNITY_CARD_SELECT_EVENT
  | typeof NEED_MORE_HELP_COMMUNITY_CARD_SELECT_EVENT
  | typeof COMMUNITY_SPACE_CARD_SELECT_EVENT
  | typeof COMMUNITY_SHOW_MORE_SPACES_BUTTON
  | typeof TASK_LIST_PRIVACY_SHARING_CLICKED
  | typeof COMMUNITY_BANNER_GO_TO_FORUM_BUTTON
  | typeof INVITE_YOUR_SUPPLIER_NETWORK_BUTTON_CLICKED
  | typeof INVITE_YOUR_CUSTOMER_NETWORK_BUTTON_CLICKED
  | typeof BUILD_YOUR_SUPPLY_CHAIN_BUTTON_CLICKED
  | typeof DATA_SHARE_REQUEST_BUTTON_CLICKED;
