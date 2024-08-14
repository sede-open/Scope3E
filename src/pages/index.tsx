import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { HomeRedesign } from 'containers/HomeRedesign';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';

const HomePage = () => (
  <ModalProvider>
    <PageHead />
    <PageWrapper>
      <PublicHeader />
      <PublicContentWrapper>
        <HomeRedesign />
      </PublicContentWrapper>
      <FooterRedesign />
    </PageWrapper>
  </ModalProvider>
);

export default createPage(HomePage, { publicPage: true });
