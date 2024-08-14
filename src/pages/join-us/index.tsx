import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { JoinUs } from 'containers/JoinUs';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';

const GetInTouchPage = () => (
  <ModalProvider>
    <PageHead />
    <PageWrapper>
      <PublicHeader dark />
      <PublicContentWrapper>
        <JoinUs />
      </PublicContentWrapper>
      <FooterRedesign />
    </PageWrapper>
  </ModalProvider>
);

export default createPage(GetInTouchPage, { publicPage: true });
