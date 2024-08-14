import { Footer } from 'components/Footer';
import { PageHead } from 'components/PageHead';
import { PlainHeader } from 'components/PlainHeader';
import { UsedInviteToken } from 'containers/UsedInviteToken';
import { PageWrapper } from 'layouts/PageWrapper';

export const UsedInviteTokenPage = () => (
  <>
    <PageHead />
    <PageWrapper fillHeight>
      <PlainHeader />
      <UsedInviteToken />
      <Footer />
    </PageWrapper>
  </>
);

export default UsedInviteTokenPage;
