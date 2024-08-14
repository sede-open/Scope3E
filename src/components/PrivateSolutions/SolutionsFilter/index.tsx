import { OptionType, SingleSelect } from 'components/SingleSelect';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import * as StyledComponents from './styledComponents';

interface IProps {
  onFilter: (region: OptionType, decarbonisationPotential: OptionType) => void;
}

const regions: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
];

const decarbonisationPotential: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: '0-50', label: 'Below 50% reduction' },
  { value: '50-100', label: 'Above 50% reduction' },
];

export const SolutionsFilter = ({ onFilter }: IProps) => {
  const { t } = useTranslation('privateSolutions');
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [
    selectedDecarbonisationPotencial,
    setSelectedDecarbonisationPotencial,
  ] = useState(decarbonisationPotential[0]);

  const onRegionChange = (region: OptionType) => {
    setSelectedRegion(region);
    onFilter(region, selectedDecarbonisationPotencial);
  };

  const onPotencialChange = (potencial: OptionType) => {
    setSelectedDecarbonisationPotencial(potencial);
    onFilter(selectedRegion, potencial);
  };

  return (
    <StyledComponents.Container>
      <StyledComponents.RegionContainer>
        <SingleSelect
          selectedPrefix={t('region-filter-label')}
          options={regions}
          value={selectedRegion}
          name="SolutionFilterRegion"
          onChange={onRegionChange}
        />
      </StyledComponents.RegionContainer>
      <StyledComponents.PotencialContainer>
        <SingleSelect
          selectedPrefix={t('decarb-potential-filter-label')}
          options={decarbonisationPotential}
          value={selectedDecarbonisationPotencial}
          name="SolutionFilterDecarbonisationPotencial"
          onChange={onPotencialChange}
        />
      </StyledComponents.PotencialContainer>
    </StyledComponents.Container>
  );
};
