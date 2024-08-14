import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TagList, TagListState } from 'components/TagList';
import { SolutionInterestsQuery_solutionInterests } from 'types/SolutionInterestsQuery';
import { UserSolutionInterestsQuery_userSolutionInterests } from 'types/UserSolutionInterestsQuery';
import { getInitialSolutionInterestsState } from 'utils/userOnboarding';

import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  updateState: (state: TagListState) => void;
  state: TagListState;
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
  userSolutionInterests: UserSolutionInterestsQuery_userSolutionInterests[];
}

export const SolutionInterests = ({
  updateState,
  solutionInterests,
  state,
  userSolutionInterests,
}: IProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const initialSolutionInterestsState = getInitialSolutionInterestsState(
      solutionInterests,
      userSolutionInterests
    );

    updateState(initialSolutionInterestsState);
  }, [userSolutionInterests]);

  const onChangeSolutionTag = (tagKey: string, value: boolean) => {
    updateState({
      ...state,
      [tagKey]: value,
    });
  };

  return (
    <StyledComponents.FieldColumn>
      <StyledComponents.SectionTitle
        data-testid={selectors.solutionInterestsTitle}
      >
        {t('modals:edit-interests-section-solution-interests')}
      </StyledComponents.SectionTitle>
      <TagList
        tagListState={state}
        onChange={onChangeSolutionTag}
        translationPrefix="solutionInterests:"
      />
    </StyledComponents.FieldColumn>
  );
};
