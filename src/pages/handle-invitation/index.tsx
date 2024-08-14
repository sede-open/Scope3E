import { Footer } from 'components/Footer';
import { PageHead } from 'components/PageHead';
import { PlainHeader } from 'components/PlainHeader';
import { HandleInvitation } from 'containers/HandleInvitation';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { PageWrapper } from 'layouts/PageWrapper';

export const HandleInvitationPage = () => (
  <AuthenticatedUserProvider>
    <PageHead />
    <PageWrapper>
      <PlainHeader />
      <HandleInvitation />
      <Footer />
    </PageWrapper>
  </AuthenticatedUserProvider>
);

export default HandleInvitationPage;
