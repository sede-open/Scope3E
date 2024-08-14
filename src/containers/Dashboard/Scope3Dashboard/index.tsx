import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import {
  EmissionAllocationDirection,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { TabsAlignment, Tab, TabList, TabSize } from 'components/Tabs';
import { useScope3DashboardAllocationsQuery } from './queries';
import {
  getYearOptions,
  getTotalAllocatedEmissions,
  getTotalUnallocatedEmissions,
  getScope3TotalForYear,
} from './utils';
import { Scope3PieChart } from './Scope3PieChart';
import { Categories } from './Categories';
import { Sectors } from './Sectors';
import { scope3DashboardTabs, TabOptions } from './constants';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  emissions: Emission[];
  companyId: string;
}

export const Scope3Dashboard = ({ emissions, companyId }: IProps) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(TabOptions.CATEGORIES);

  const yearOptions = getYearOptions(emissions).map((e) => ({
    value: e,
    label: `${e}`,
  }));

  const [selectedYear, setSelectedYear] = useState<OptionType>({
    value: yearOptions[0]?.value,
    label: `${yearOptions[0]?.label}`,
  });

  const {
    data: emissionAllocationData,
    loading: isEmissionAllocationDataLoading,
  } = useScope3DashboardAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
    statuses: [EmissionAllocationStatus.APPROVED],
    year: selectedYear.value as number,
  });

  const emissionAllocations = emissionAllocationData?.emissionAllocations || [];
  const allocatedEmissionsTotal = getTotalAllocatedEmissions(
    emissionAllocations
  );
  const scope3Total = getScope3TotalForYear(
    emissions,
    Number(selectedYear.value)
  );
  const unallocatedEmissionsTotal = getTotalUnallocatedEmissions(
    allocatedEmissionsTotal,
    scope3Total
  );

  return (
    <StyledComponents.DashboardContainer
      data-testid={selectors.scope3DashboardContainer}
    >
      <StyledComponents.HeaderRow>
        <StyledComponents.Title>
          {t('scope3Dashboard:dashboard-heading')}
        </StyledComponents.Title>
        <StyledComponents.YearSelectContainer
          data-testid={selectors.dashboardYearSelect}
        >
          <StyledComponents.YearSelectLabel htmlFor="scope3DashboardYear">
            {t('scope3Dashboard:label')}
          </StyledComponents.YearSelectLabel>
          <SingleSelect
            inputId="scope3DashboardYear"
            name={selectors.scope3DashboardYear}
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            dataTestId={selectors.scope3DashboardYear}
          />
        </StyledComponents.YearSelectContainer>
      </StyledComponents.HeaderRow>
      <StyledComponents.DataContainer>
        <Scope3PieChart
          emissionsTotal={scope3Total}
          allocatedEmissionsTotal={allocatedEmissionsTotal}
          unallocatedEmissionsTotal={unallocatedEmissionsTotal}
          isLoading={isEmissionAllocationDataLoading}
        />
        <StyledComponents.TabContainer>
          <TabList align={TabsAlignment.FLEX_GROW}>
            {scope3DashboardTabs.map(({ value, label }) => (
              <Tab
                key={value}
                data-testid={`tab-${value}`}
                align={TabsAlignment.FLEX_GROW}
                size={TabSize.SMALL}
                isSelected={selectedTab === value}
                disabled={selectedTab === value}
                onClick={() => setSelectedTab(value)}
              >
                {t(label)}
              </Tab>
            ))}
          </TabList>
          <StyledComponents.TabContent
            data-testid={selectors.tabContentContainer}
          >
            {selectedTab === TabOptions.CATEGORIES && (
              <Categories
                allocations={emissionAllocations}
                selectedYear={Number(selectedYear.value)}
                emissionsTotal={scope3Total}
              />
            )}
            {selectedTab === TabOptions.SECTORS && (
              <Sectors
                allocations={emissionAllocations}
                selectedYear={Number(selectedYear.value)}
                emissionsTotal={scope3Total}
              />
            )}
          </StyledComponents.TabContent>
        </StyledComponents.TabContainer>
      </StyledComponents.DataContainer>
    </StyledComponents.DashboardContainer>
  );
};
