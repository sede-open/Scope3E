import { PageHead } from 'components/PageHead';
import { PageNotFoundError } from 'containers/PageNotFoundError';
import { PageWrapper } from 'layouts/PageWrapper';

export default function ErrorPage() {
  return (
    <>
      <PageHead />
      <PageWrapper>
        <PageNotFoundError />
      </PageWrapper>
    </>
  );
}
