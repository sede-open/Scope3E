import { Solutions } from 'containers/PrivateSolutions/types';

export interface ISolution {
  id: number;
  title: string;
  imgAlt: string;
  date: string;
  url: string;
}

export type SolutionStoryMapping = {
  [key in Solutions]: number[];
};
