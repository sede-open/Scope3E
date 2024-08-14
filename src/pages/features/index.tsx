import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { FeaturesRedesign } from 'containers/FeaturesRedesign';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';

const FeaturesPage = () => (
  <ModalProvider>
    <PageHead />
    <PageWrapper>
      <PublicHeader />
      <PublicContentWrapper>
        <FeaturesRedesign />
      </PublicContentWrapper>
      <FooterRedesign />
    </PageWrapper>
  </ModalProvider>
);

export default createPage(FeaturesPage, { publicPage: true });
