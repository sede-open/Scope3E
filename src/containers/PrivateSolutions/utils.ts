/* eslint-disable no-plusplus */
import { SolutionInterestsSystemName } from 'types/globalTypes';
import { UserSolutionInterestsQuery_userSolutionInterests as UserSolutionInterests } from 'types/UserSolutionInterestsQuery';
import {
  DecarbonisationPotential,
  Region,
  Solutions,
  SolutionsMetadata,
} from './types';

export const getSelectedSolutionInterestsNames = (
  solutionInterestNames: UserSolutionInterests[]
) => solutionInterestNames.map((item) => item.solutionInterest?.systemName);

export const getUserSolutionRecommendations = (
  selectedSolutionInterestNames: SolutionInterestsSystemName[],
  region: Region = Region.ALL,
  decarbonisationPotencial: DecarbonisationPotential = DecarbonisationPotential.ALL
) => {
  let result = SolutionsMetadata.filter((metadata) =>
    selectedSolutionInterestNames.some((item) => metadata.tags.includes(item))
  );

  if (region !== Region.ALL) {
    result = result.filter(
      (metadata) =>
        metadata.regions.includes(Region.ALL) ||
        metadata.regions.includes(region)
    );
  }

  if (decarbonisationPotencial !== DecarbonisationPotential.ALL) {
    result = result.filter(
      (metadata) =>
        metadata.decarbonisationPotencial === DecarbonisationPotential.ALL ||
        metadata.decarbonisationPotencial === decarbonisationPotencial
    );
  }
  return result.map((metadata) => metadata.solutionId);
};

export const getUserSolutionAlternatives = (
  userSolutionRecommendations: (Solutions | undefined)[]
) =>
  Object.values(Solutions).filter(
    (solution) => !userSolutionRecommendations.includes(solution)
  );

export const getSolutionDetailRecommendedSolutions = (
  selectedSolutionInterests: UserSolutionInterests[],
  solutionId: Solutions
) => {
  const solutions: Solutions[] = [];
  const maxSolutionCards = 3;

  const selectedSolutionInterestsNames = getSelectedSolutionInterestsNames(
    selectedSolutionInterests
  );
  const userSolutionRecommendations = getUserSolutionRecommendations(
    selectedSolutionInterestsNames
  );
  const userSolutionAlternatives = getUserSolutionAlternatives(
    userSolutionRecommendations
  );

  if (userSolutionRecommendations.length <= 1) {
    userSolutionAlternatives.forEach((item) => {
      if (item && item !== solutionId) {
        solutions.push(item);
      }
    });
  }
  if (userSolutionRecommendations.length >= 1) {
    userSolutionRecommendations.forEach((item) => {
      if (item && item !== solutionId) {
        solutions.push(item);
      }
    });
  }
  return solutions.slice(0, maxSolutionCards).map((i) => i);
};
