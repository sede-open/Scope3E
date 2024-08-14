import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import RedirectTo from 'components/RedirectTo';
import { SolutionDetail } from 'containers/PrivateSolutions/SolutionDetail';
import { Solutions } from 'containers/PrivateSolutions/types';
import { useRouter } from 'next/router';
import { PrimaryRoutes } from '../../constants';

export const Solution = () => {
  const {
    query: { solution },
  } = useRouter();

  const noSolution = !(
    typeof solution === 'string' &&
    Object.values(Solutions).includes(solution as Solutions)
  );

  if (noSolution) {
    return <RedirectTo url="/404" />;
  }

  return (
    <Page isArticlePage selectedLink={PrimaryRoutes.Solutions}>
      <SolutionDetail solutionId={solution as Solutions} />
    </Page>
  );
};
export default createPage(Solution, {
  publicPage: false,
});
