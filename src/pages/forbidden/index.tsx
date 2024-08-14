import { Footer } from 'components/Footer';
import { PageHead } from 'components/PageHead';
import { PlainHeader } from 'components/PlainHeader';
import { Forbidden } from 'containers/Forbidden';
import { PageWrapper } from 'layouts/PageWrapper';

export const ForbiddenPage = () => (
  <>
    <PageHead />
    <PageWrapper fillHeight>
      <PlainHeader />
      <Forbidden />
      <Footer />
    </PageWrapper>
  </>
);

export default ForbiddenPage;
