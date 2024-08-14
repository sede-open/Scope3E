import CogSpinner from 'components/CogSpinner';
import { createPage } from 'components/CreatePage';
import { Providers } from 'components/Page/Providers';
import { PageHead } from 'components/PageHead';
import RedirectTo from 'components/RedirectTo';
import { PrivacyUpdateWizard } from 'containers/PrivacyUpdateWizard';
import { useDataPrivacyWizardData } from 'containers/PrivacyUpdateWizard/queries';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { JustifiedPageWrapper } from 'layouts/PageWrapper';
import { abcdGray } from 'styles/colours';

const PageWrapper = () => {
  const user = useAuthenticatedUser();
  const companyId: string = user?.company?.id;
  const { loading } = useDataPrivacyWizardData({ companyId });

  return (
    <JustifiedPageWrapper
      background={abcdGray}
      fillHeight
      $justifyContent={loading ? 'center' : 'unset'}
    >
      {loading ? <CogSpinner /> : <PrivacyUpdateWizard />}
    </JustifiedPageWrapper>
  );
};

const PrivacyUpdateWizardPage = () => {
  const { isDataPrivacyInfoWizardEnabled } = useFlags();
  if (isDataPrivacyInfoWizardEnabled === false) {
    return <RedirectTo url="/404" />;
  }

  return (
    <Providers>
      <PageHead />
      <PageWrapper />
    </Providers>
  );
};

export default createPage(PrivacyUpdateWizardPage, {
  publicPage: false,
});
