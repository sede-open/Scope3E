# abcd project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## ENVIRONMENTS

We have these available environments (with their corresponding ENVIRONMENT variable values):

1. Local - local
1. Development - [dev](./chart/values-example-dev.yaml)
1. Staging - staging [staging](./chart/values-example-staging.yaml)
1. Pre-Production - preprod [prod](./chart/values-example-preprod.yaml)
1. Production - prod [prod](./chart/values-example-prod.yaml)

These are set within `.env` locally or via charts in kubernetes.

Please note that preprod setup should be as close to prod environment as possible and should ALWAYS share the same feature flags.

## Adding text and translations

If any text needs to be added to the application, please add new files (or update existing ones) to `locales` directory.

For a page to access any translation, you will need to update `i18n.js`.

## Pages

When adding a page, it must be wrapped in createPage HOC with a prop of publicPage to be passed. This will setup auth and guards on the page.

## Unit tests

```
yarn test:unit
```

Our Jest unit tests use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and aim to provide coverage of our components by testing the functionality rather than implementation of our application.

Where queries and mutations take place, we use a [mocked Apollo Provider](./node_modules/@apollo/client/testing) and feed in [mocks](./mocks/) of the request and data returned by the API.

Where we need to test an app-level context which performs a query, such as the [AuthenticatedUserContext](./src/context/AuthenticatedUserProvider/AuthenticatedUserProvider.tsx), we can wrap the component being tested in its provider and a `MockedProvider` and pass in mocks for the query:

```
<MockedProvider mocks=[meMocks.getGetMeMock()]>
  <AuthenticatedUserProvider>
    <ComponentBeingTested />
  </AuthenticatedUserProvider>
</MockedProvider>
```

The `AuthenticatedUserProvider` is then able to perform its query against the mocked provider, allowing us to test app-level context behaviour for a specific component or user journey.

## Cypress - end to end testing

[Cypress.io](https://www.cypress.io/).

Ensure you have a locally generated schema as it is used for API mocking:

```
yarn apollo:generate
```

## GraphQl types

1. Write your query or mutation with `gql` tag

1. Run `yarn apollo:generate` to generate types for your queries and mutations (for now, it will pick up `schema.graphql` within `abcd-api` directory as the basis for types)

1. Import and use those generated types with `useMutation` and `useQuery`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Storybook

We have a simple Storybook config to allow isolated component development. This is only configured for local development currently.

Stories can be added alongside component src code using `*.story.tsx`.

To run locally:

```
yarn storybook
```

## API Requests

All API requests are being [proxied](./src/server/proxy.ts). Proxy is created using [express-http-proxy](https://www.npmjs.com/package/express-http-proxy).

Body size limit of 25mb was added. If the app needs to handle any file uploads bigger than that, you will need to update this value. Otherwise, you will receive a `503` error code as the proxy won't be able to handle the request.

## SEO

If any new public website pages are added, the [sitemap](./src/pages/sitemap.xml/index.tsx) should be updated to add those urls.

## Solution Cards / Stories

There are instances of solution cards on the Public Homepage, Public Confirmation page and Public Stories page.

### **Public Stories Page**

In order to update the data to include recently added solutions, please update the `solution-cards` within [publicSolutions.json](./locales/en/publicSolutions.json), adding new solutions to the bottom of the array.

### **Public Homepage and Confirmation page**

The public Homepage and Confirmation page will display the three most recently-added (bottom three) solutions from publicSolutions.json.

### **Images**

The images that are paired with the solution articles are stored in [Public](./public/images/PublicSite/SolutionImages/). New images added should follow the same naming pattern, pairing the name with the solution's ID, e.g. _Solution[28].png_.

### **Private Solutions Pages**

Private Solutions Pages use dynamic routing (`/solutions/[solution]`). To add a new solution, a new member must be added to the [Solutions enum](./src/containers/PrivateSolutions/types.ts).

Private Solution Detail components make use of the [DetailContentBlock](./src/components/PrivateSolutions/SolutionDetailContainer) component, which takes `contentItems` as an array of translation content, which it will map over and render using the appropriate component for each item, depending on its `type` property. It also takes an optional `components` object, which will be passed to a `TransText` component, allowing interpolated components within the translation content. See [ContentBlockType](.src/components/PrivateSolutions/DetailContentBlock/types.ts) for a list of supported content types.

## Feature Flags

You can locate the `featureFlags.ts` file within the src/utils directory.

To add a feature flag, please follow the guidance below:

1. Declare a variable and the desired environments, for example:

```javascript
const isDashboardEnabled = (environment: string) =>
  isEnvironmentLocal(environment) || isEnvironmentDevelopment(environment);
```

2. Add a member to the `Flags` enum, for example: `IS_DASHBOARD_ENABLED`.

3. Add the above to the `FEATURE_FLAG_PREDICATES` variable, for example: `[Flags.IS_DASHBOARD_ENABLED]: isDashboardEnabled`. The feature flag will now be available to call and use.

4. By importing and calling `getFeatureFlag`, you are now able to declare a variable and use this as a boolean condition to control features based on the environments selected, for example:

```javascript
const isDashboardEnabled = getFeatureFlag(Flags.IS_DASHBOARD_ENABLED);
```

5. **Please add a comment where flags are used which highlight the highest-level Jira ticket number related to the flag. This will ensure it is clear what should be affected by the flag when it is to be removed, for example: `// abcd-1234 Dashboard`**

### Launch Darkly

[Lauch Darkly](https://launchdarkly.com/) is a feature flagging software. There are 2 ways to access flags in the application, the first is clientside, inside components. The `useFlags()` hook returns all flags for that user.
In Server side rendered pages the launchDarklyServerClient.ts is used to retrieve flags. An example of this is:

```javascript
const launchDarklyClient = await getClient();
const demoLogo = await launchDarklyClient.variation(
  'demo-logo',
  { key: 'global-key' },
  false
);
```

For jest testing launch darkly provide an npm package for react testing [here](https://github.com/launchdarkly/jest-launchdarkly-mock).
The documentation is simple to follow, the main functions to use are `mockFlags({yourFlag: value})` and `resetLDMocks()`

## Modals

We display modals throughout the app using our [Modal component](./src/components/Modal), which uses [react-modal](https://github.com/reactjs/react-modal). When a modal needs to be triggered across a wider context, there is an app-wide [Modal context](./src/context/ModalProvider), which can be called using the [useModal hook](./src/effects/useModal.tsx). For example, the Edit Interests modal can be triggered using the following `openModal` call. New modals can be added to the Modal context by updating the [ModalProvider](./src/context/ModalProvider/ModalProvider.tsx) and its [types](./src/context/ModalProvider/types.ts).

```javascript
const { openModal } = useModal();

openModal({
  modalType: ModalType.EDIT_INTERESTS,
  contentProps: {
    translationPrefix: 'common',
  },
});
```

## Analytics

We are tracking the opt-in users using HubSpot and Amplitude in integration with Segment. More on the integration can be found [here](https://segment.com/docs/connections/destinations/catalog/hubspot/). The non-production users will be tracked by HubSpot, if they are whitelisted. To whitelist a user add the user's email address to the `HUBSPOT_WHITELIST` array in `src/constants.ts`.

## SortableTable Pagination

By default the [Sorttable Table](./src/components/SortableTable/index.tsx) component will paginated all data passed to it by the perPage prop, this is defaulted to 15.

### Async Pagination

To load async data a "size" prop must be passed to the component, this is the total amount of pages there are. Passing this prop will effectively make the table function in a asynchronous way as it is no longer expecting client side pagination.

There are 2 more important props to get async pagination work, they are "onPageChange" and "loading". The onPageChange callback can be used to trigger the loading of more data, and the loading prop indicates what state the table is in.

An example of a asynchronous paginated table can be seen in the Storyboard or by viewing [the asyncData component](src/components/SortableTable/SortableTable.stories.tsx)
