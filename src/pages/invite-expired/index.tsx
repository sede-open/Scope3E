import { Footer } from 'components/Footer';
import { PageHead } from 'components/PageHead';
import { PlainHeader } from 'components/PlainHeader';
import { InviteExpired } from 'containers/InviteExpired';
import { PageWrapper } from 'layouts/PageWrapper';

export const InviteExpiredPage = () => (
  <>
    <PageHead />
    <PageWrapper fillHeight>
      <PlainHeader />
      <InviteExpired />
      <Footer />
    </PageWrapper>
  </>
);

export default InviteExpiredPage;
