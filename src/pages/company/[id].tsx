import { useFlags } from 'launchdarkly-react-client-sdk';
import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import RedirectTo from 'components/RedirectTo';
import { useRouter } from 'next/router';
import { withIsLaunchDarklyReady } from 'effects/useIsLaunchDarklyReady';
import { CompanyOverview } from 'containers/CompanyOverview';

export const CompanyOverviewPage = () => {
  const { isCompanyOverviewEnabled } = useFlags();

  const {
    query: { id: companyId },
  } = useRouter();

  if (!companyId || !isCompanyOverviewEnabled) {
    return <RedirectTo url="/404" />;
  }

  return (
    <Page hasSubheaderNavigation={false}>
      <CompanyOverview
        companyId={Array.isArray(companyId) ? companyId[0] : companyId}
      />
    </Page>
  );
};

/* Is this the correct way to wrap a HOC? Would be nice if this was in createPage */
export default withIsLaunchDarklyReady(
  createPage(CompanyOverviewPage, {
    publicPage: false,
  })
);
