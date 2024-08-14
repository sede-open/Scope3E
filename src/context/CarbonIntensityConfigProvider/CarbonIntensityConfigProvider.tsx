import { ReactNode } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { CarbonIntensityConfigQuery } from 'types/CarbonIntensityConfigQuery';
import CogSpinner from 'components/CogSpinner';

import { CarbonIntensityConfigContext } from './CarbonIntensityConfigContext';

export const CARBON_INTENSITY_CONFIG_QUERY = gql`
  query CarbonIntensityConfigQuery {
    carbonIntensityConfig {
      type
      minValue
      maxValue
      numberOfDecimals
      group
    }
  }
`;

export const useCarbonIntensityConfigQuery = () =>
  useQuery<CarbonIntensityConfigQuery>(CARBON_INTENSITY_CONFIG_QUERY, {
    fetchPolicy: 'cache-first',
  });

interface IProps {
  children: ReactNode;
}

export const CarbonIntensityConfigProvider = ({ children }: IProps) => {
  const { data, loading, error } = useCarbonIntensityConfigQuery();

  if (loading) {
    return <CogSpinner />;
  }
  if (error) {
    return null;
  }

  return (
    <CarbonIntensityConfigContext.Provider
      value={data?.carbonIntensityConfig ?? []}
    >
      {children}
    </CarbonIntensityConfigContext.Provider>
  );
};
