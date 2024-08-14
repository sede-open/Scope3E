import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { PrivateSolutions } from 'containers/PrivateSolutions';
import { getSelectedSolutionInterestsNames } from 'containers/PrivateSolutions/utils';
import { useUserSolutionInterestsQuery } from 'queries/userOnboarding';
import { useEffect, useState } from 'react';
import { SolutionInterestsSystemName } from 'types/globalTypes';
import { PrimaryRoutes } from '../../constants';

export const PrivateSolutionsPage = () => {
  const [userIterests, setUserInterests] = useState(
    [] as SolutionInterestsSystemName[]
  );

  const { data: userSolutionInterestsData } = useUserSolutionInterestsQuery();

  useEffect(() => {
    setUserInterests(
      getSelectedSolutionInterestsNames(
        userSolutionInterestsData?.userSolutionInterests || []
      )
    );
  }, [userSolutionInterestsData]);

  return (
    <Page selectedLink={PrimaryRoutes.Solutions}>
      <PrivateSolutions interests={userIterests} />
    </Page>
  );
};

export default createPage(PrivateSolutionsPage, {
  publicPage: false,
});
