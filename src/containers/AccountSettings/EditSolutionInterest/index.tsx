import useTranslation from 'next-translate/useTranslation';
import { useDebounce } from 'hooks/useDebounce';
import { useUpdateUserSolutionInterestsMutation } from 'mutations/userOnboarding';
import { TagList, TagListState } from 'components/TagList';
import { SolutionInterestsQuery_solutionInterests } from 'types/SolutionInterestsQuery';
import {
  getSolutionInterestIds,
  getSelectedSolutionInterests,
} from 'utils/userOnboarding';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';

import * as StyledComponents from './styledComponents';

interface IProps {
  updateState: (state: TagListState) => void;
  state: TagListState;
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
  initialSolutionInterestsState: TagListState;
}

export const EditSolutionInterests = ({
  updateState,
  solutionInterests,
  state,
  initialSolutionInterestsState,
}: IProps) => {
  const { t } = useTranslation();

  const debounce = useDebounce();

  const mutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t(
          'accountSettings:areas-of-interest-not-able-to-sucessfully-update-message'
        ),
        options: { toastId: 'userSolutionInterestMutation' },
      });
      updateState(initialSolutionInterestsState);
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t(
          `accountSettings:areas-of-interest-sucessfully-updated-message`
        ),
        options: { toastId: 'userSolutionInterestMutation' },
      });
    },
  };

  const [updateUserSolutionInterests] = useUpdateUserSolutionInterestsMutation(
    mutationOptions
  );

  const onChangeSolutionTag = (tagKey: string, value: boolean) => {
    const updatedState = {
      ...state,
      [tagKey]: value,
    };

    const filtered = getSelectedSolutionInterests({
      solutionInterests,
      solutionInterestsState: updatedState,
    });

    const solutions = getSolutionInterestIds(filtered);

    debounce(() => {
      updateUserSolutionInterests({
        variables: {
          input: {
            solutionInterestIds: solutions,
          },
        },
      });
    }, 1000);

    updateState(updatedState);
  };

  return (
    <StyledComponents.FieldColumn>
      <TagList
        tagListState={state}
        onChange={onChangeSolutionTag}
        translationPrefix="solutionInterests:"
      />
    </StyledComponents.FieldColumn>
  );
};
