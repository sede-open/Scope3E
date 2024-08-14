import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { SolutionsRedesign } from 'containers/SolutionsRedesign';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';

const SolutionsPage = () => (
  <ModalProvider>
    <PageHead />
    <PageWrapper>
      <PublicHeader />
      <PublicContentWrapper>
        <SolutionsRedesign />
      </PublicContentWrapper>
      <FooterRedesign />
    </PageWrapper>
  </ModalProvider>
);

export default createPage(SolutionsPage, { publicPage: true });
