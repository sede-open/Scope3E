import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import RedirectTo from 'components/RedirectTo';
import { SolutionDetails } from 'containers/SolutionsRedesign/SolutionDetails';
import { StoryAuthor } from 'containers/SolutionsRedesign/constants';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import { PublicContentWrapper } from 'layouts/PublicContentWrapper';
import { useRouter } from 'next/router';

const StoryDetailsPage = () => {
  const {
    query: { story },
  } = useRouter();

  const isValidStory =
    typeof story === 'string' &&
    Object.values(StoryAuthor).includes(story as StoryAuthor);

  if (!isValidStory) {
    return <RedirectTo url="/404" />;
  }

  return (
    <ModalProvider>
      <PageHead />
      <PageWrapper>
        <PublicHeader />
        <PublicContentWrapper>
          <SolutionDetails author={story as StoryAuthor} />
        </PublicContentWrapper>
        <FooterRedesign />
      </PageWrapper>
    </ModalProvider>
  );
};

export default createPage(StoryDetailsPage, { publicPage: true });
