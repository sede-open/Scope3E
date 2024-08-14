import { SectorsQuery_sectors } from 'types/SectorsQuery';
import { CompanySectorType } from 'types/globalTypes';
import { SolutionInterestsQuery_solutionInterests } from 'types/SolutionInterestsQuery';
import { TagListState } from 'components/TagList';
import { UserSolutionInterestsQuery_userSolutionInterests } from 'types/UserSolutionInterestsQuery';
import { CompanySectorsQuery_companySectors } from 'types/CompanySectorsQuery';
import { SearchSelectOption } from 'components/SearchSelect/types';
import { DropdownListItem } from 'components/Dropdown/DropdownList';

export const getInitialSolutionInterestsState = (
  solutionInterests: SolutionInterestsQuery_solutionInterests[],
  userSolutionInterests: UserSolutionInterestsQuery_userSolutionInterests[] = []
) =>
  solutionInterests.reduce(
    (acc, { id, systemName }) => ({
      ...acc,
      [systemName]: !!userSolutionInterests.find(
        ({ solutionInterest: { id: selectedId } }) => selectedId === id
      ),
    }),
    {}
  );

export const getSelectedSolutionInterests = ({
  solutionInterests,
  solutionInterestsState,
}: {
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
  solutionInterestsState: TagListState;
}) =>
  solutionInterests.filter(
    ({ systemName }) => solutionInterestsState[systemName]
  );

export const getSolutionInterestIds = (
  solutionInterests: SolutionInterestsQuery_solutionInterests[]
) => solutionInterests.map(({ id }) => id);

export type SectorInput = { id: string; name: string };

export type CompanySectorsState = {
  [key in CompanySectorType]: SectorInput;
};

const getCompanySectorByType = (
  companySectors: CompanySectorsQuery_companySectors[],
  targetCompanySectorType: CompanySectorType
) => {
  const emptySector = { id: '', name: '' };
  return (
    companySectors.find(
      ({ sectorType }) => sectorType === targetCompanySectorType
    )?.sector || emptySector
  );
};

export const getInitialCompanySectorsState = (
  companySectors: CompanySectorsQuery_companySectors[] = []
): CompanySectorsState => {
  const primaryValue = getCompanySectorByType(
    companySectors,
    CompanySectorType.PRIMARY
  );
  const secondaryValue = getCompanySectorByType(
    companySectors,
    CompanySectorType.SECONDARY
  );

  return {
    [CompanySectorType.PRIMARY]: primaryValue,
    [CompanySectorType.SECONDARY]: secondaryValue,
  };
};

export const getPlaceholderOption = (t: any): DropdownListItem => ({
  label: t('common:form-placeholder'),
  id: '',
});

export const getSectorOption = (t: any) => ({
  id,
  name,
}: SectorsQuery_sectors): DropdownListItem => ({
  label: t(`sectors:${name}`),
  id,
});

export const getSelectedOption = (t: any, sectors: SectorsQuery_sectors[]) => (
  sectorInput: SearchSelectOption
): DropdownListItem => {
  const selectedSector = sectors.find(
    ({ id: sectorId }) => sectorInput.value === sectorId
  );

  const selected = selectedSector
    ? getSectorOption(t)(selectedSector)
    : getPlaceholderOption(t);

  return selected;
};

export interface ChangeCompanySector {
  sectorType: CompanySectorType;
  value: DropdownListItem;
}

export const getSectorName = ({
  t,
  companySectors,
  sectorType,
}: {
  t: any;
  companySectors: CompanySectorsQuery_companySectors[];
  sectorType: CompanySectorType;
}) => {
  const companySector = companySectors.find(
    ({ sectorType: companySectorType }) => companySectorType === sectorType
  );

  return companySector ? t(`sectors:${companySector.sector.name}`) : null;
};

export const getSectorNameTranslation = ({
  t,
  sectorName,
}: {
  t: any;
  sectorName: string | null;
}) => (sectorName ? t(`sectors:${sectorName}`) : null);

export const getSolutionInterestNames = ({
  t,
  solutionInterests,
}: {
  t: any;
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
}) =>
  solutionInterests.map(({ systemName }) =>
    t(`solutionInterests:${systemName}`)
  );

export const getListString = (list: string[]) =>
  list.length > 1 ? list.join(', ') : list[0];

export const placeholderOption = (t: any) => ({
  label: t('common:form-placeholder'),
  id: '',
});

export const sectorsToListItems = (sectors: SectorsQuery_sectors[]) =>
  sectors.map((sector) => ({
    label: sector.name,
    id: sector.id,
  }));
