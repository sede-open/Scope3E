import { createPage } from 'components/CreatePage';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Providers } from 'components/Page/Providers';
import { PageHead } from 'components/PageHead';
import { NetworkGettingStartedContainer } from 'containers/NetworkGettingStarted';
import { PageWrapper } from 'layouts/PageWrapper';
import { White } from 'styles/colours';

export const CreateNetworkPage = () => {
  return (
    <Providers>
      <PageHead />
      <PageWrapper background={White}>
        <Header isAdminPage={false} />
        <NetworkGettingStartedContainer />
      </PageWrapper>
      <PageWrapper>
        <Footer />
      </PageWrapper>
    </Providers>
  );
};

export default createPage(CreateNetworkPage, { publicPage: false });
