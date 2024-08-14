import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { ContactUs } from 'containers/ContactUs';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';

const GetInTouchPage = () => (
  <ModalProvider>
    <PageHead />
    <PageWrapper>
      <PublicHeader dark />
      <PublicContentWrapper>
        <ContactUs />
      </PublicContentWrapper>
      <FooterRedesign />
    </PageWrapper>
  </ModalProvider>
);

export default createPage(GetInTouchPage, { publicPage: true });
