import { SolutionInterestsSystemName } from 'types/globalTypes';

export enum Region {
  ALL = 'all',
  AFRICA = 'africa',
  AMERICAS = 'americas',
  ASIA = 'asia',
  EUROPE = 'europe',
  OCEANIA = 'oceania',
}

export enum DecarbonisationPotential {
  ALL = 'all',
  BELOW_50_PERCENT = '0-50',
  ABOVE_50_PERCENT = '50-100',
}

export enum Solutions {
  CO2_FLEET_EMISSION_COMPENSATION = 'co2-fleet-emission-compensation',
  EMOBILITY = 'e-mobility',
  HYDROGEN = 'hydrogen',
  LNG = 'lng',
  LUBRICANT_SOLUTIONS = 'lubricant-solutions',
  NATURE_BASED = 'nature-based',
  SUSTAINABLE_AVIATION = 'sustainable-aviation',
  TELEMATICS = 'telematics',
  VESSELS_SOFTWARE = 'vessels-software',
  MACHINE_MAX = 'machinemax',
  INSTA_FREIGHT = 'instafreight',
  IMMERSION_COOLING = 'immersion-cooling',
  SUSTAINABLE_BITUMEN = 'sustainable-bitumen',
  REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS = 'reducing-co2-intensity-with-example-chemicals',
  CORROSION_FREE_PIPELINES = 'corrosion-free-pipelines',
  ADIP_ULTRA = 'adip-ultra',
  SOLAR_SOLUTIONS = 'solar-solution',
  BLUE_HYDROGEN = 'blue-hydrogen',
  DECARBONISE_YOUR_FLEET = 'decarbonise-your-fleet',
  ONSITE_SOLAR = 'onsite-solar',
  BATTERY_STORAGE = 'battery-storage',
  ENERGY_MANAGEMENT = 'energy-management',
  CORPORATE_POWER_PURCHASE_AGREEMENTS = 'corporate-power-purchase-agreements',
  CANSOLV = 'cansolv',
  LEVERAGING_DISTRIBUTED_ENERGY = 'leveraging-distributed-energy',
  LO3_ENERGY_CONSUMPTION_TRACKING = 'lo3-energy-consumption-tracking',
  INNOWATTS_CARBON_ENERGY_ANALYTICS = 'innowatts-carbon-energy-analytics',
  RENEWABLE_ENERGY_CERTIFICATES = 'renewable-energy-certificates',
  RENEWABLE_POWER = 'renewable-power',
  SUSTAINABLE_LAND_ASSET_ENHANCEMENT = 'sustainable-land-asset-enhancement',
  I6_FUEL_MANAGEMENT = 'i6-fuel-management',
  RENEWABLE_NATURAL_GAS = 'renewable-natural-gas',
  ONSITE_RENEWABLE_POWER_GENERATION = 'onsite-renewable-power-generation',
  DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY = 'detect-technology-industrial-efficiency',
  LONG_HAUL_BIO_LNG = 'long-haul-bio-lng',
  SIMULATION_TECHNOLOGY = 'simulation-technology',
}

export interface SolutionMetadata {
  solutionId: Solutions;
  regions: Region[];
  decarbonisationPotencial: string;
  tags: string[];
}

export const SolutionsMetadata: Array<SolutionMetadata> = [
  {
    solutionId: Solutions.CO2_FLEET_EMISSION_COMPENSATION,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.NATURE_BASED_SOLUTIONS,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.EMOBILITY,
    regions: [Region.ASIA, Region.EUROPE, Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.FUEL_SWITCH,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.HYDROGEN,
    regions: [Region.ASIA, Region.EUROPE, Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.FUEL_SWITCH,
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
    ],
  },
  {
    solutionId: Solutions.LNG,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [SolutionInterestsSystemName.FUEL_SWITCH],
  },
  {
    solutionId: Solutions.LUBRICANT_SOLUTIONS,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.RECYCLING,
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
    ],
  },
  {
    solutionId: Solutions.NATURE_BASED,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.NATURE_BASED_SOLUTIONS,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.SUSTAINABLE_AVIATION,
    regions: [Region.EUROPE, Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.FUEL_SWITCH],
  },
  {
    solutionId: Solutions.TELEMATICS,
    regions: [Region.AMERICAS, Region.ASIA, Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
    ],
  },
  {
    solutionId: Solutions.VESSELS_SOFTWARE,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.MACHINE_MAX,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY],
  },
  {
    solutionId: Solutions.INSTA_FREIGHT,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.FUEL_SWITCH,
    ],
  },
  {
    solutionId: Solutions.IMMERSION_COOLING,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.RENEWABLE_POWER,
    ],
  },
  {
    solutionId: Solutions.SUSTAINABLE_BITUMEN,
    regions: [Region.ASIA, Region.AFRICA, Region.EUROPE, Region.OCEANIA],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY],
  },
  {
    solutionId: Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS,
    regions: [Region.ASIA, Region.EUROPE, Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.RECYCLING],
  },
  {
    solutionId: Solutions.CORROSION_FREE_PIPELINES,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY],
  },
  {
    solutionId: Solutions.ADIP_ULTRA,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.CARBON_CAPTURE],
  },
  {
    solutionId: Solutions.SOLAR_SOLUTIONS,
    regions: [Region.EUROPE, Region.AFRICA],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.RENEWABLE_POWER],
  },
  {
    solutionId: Solutions.BLUE_HYDROGEN,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.FUEL_SWITCH],
  },
  {
    solutionId: Solutions.DECARBONISE_YOUR_FLEET,
    regions: [Region.AMERICAS, Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.FUEL_SWITCH,
      SolutionInterestsSystemName.NATURE_BASED_SOLUTIONS,
    ],
  },
  {
    solutionId: Solutions.ONSITE_SOLAR,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.RENEWABLE_POWER],
  },
  {
    solutionId: Solutions.BATTERY_STORAGE,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.RENEWABLE_POWER],
  },
  {
    solutionId: Solutions.ENERGY_MANAGEMENT,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
      SolutionInterestsSystemName.RENEWABLE_POWER,
    ],
  },
  {
    solutionId: Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS,
    regions: [Region.ASIA, Region.OCEANIA, Region.AMERICAS, Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.RENEWABLE_POWER,
      SolutionInterestsSystemName.RENEWABLE_HEAT,
    ],
  },
  {
    solutionId: Solutions.CANSOLV,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.CARBON_CAPTURE],
  },
  {
    solutionId: Solutions.LEVERAGING_DISTRIBUTED_ENERGY,
    regions: [Region.EUROPE, Region.AMERICAS, Region.ASIA, Region.OCEANIA],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.RENEWABLE_POWER,
      SolutionInterestsSystemName.RENEWABLE_HEAT,
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
    ],
  },
  {
    solutionId: Solutions.LO3_ENERGY_CONSUMPTION_TRACKING,
    regions: [Region.AMERICAS, Region.EUROPE, Region.ASIA, Region.OCEANIA],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
    ],
  },
  {
    solutionId: Solutions.RENEWABLE_ENERGY_CERTIFICATES,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.FUEL_SWITCH,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
      SolutionInterestsSystemName.RENEWABLE_POWER,
    ],
  },
  {
    solutionId: Solutions.RENEWABLE_POWER,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.RENEWABLE_POWER,
      SolutionInterestsSystemName.RENEWABLE_HEAT,
    ],
  },
  {
    solutionId: Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
      SolutionInterestsSystemName.CARBON_CAPTURE,
    ],
  },
  {
    solutionId: Solutions.I6_FUEL_MANAGEMENT,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY],
  },
  {
    solutionId: Solutions.RENEWABLE_NATURAL_GAS,
    regions: [Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [
      SolutionInterestsSystemName.FUEL_SWITCH,
      SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
    ],
  },
  {
    solutionId: Solutions.ONSITE_RENEWABLE_POWER_GENERATION,
    regions: [Region.EUROPE, Region.AMERICAS],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.RENEWABLE_POWER],
  },
  {
    solutionId: Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY,
    regions: [Region.ALL],
    decarbonisationPotencial: DecarbonisationPotential.BELOW_50_PERCENT,
    tags: [SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY],
  },
  {
    solutionId: Solutions.LONG_HAUL_BIO_LNG,
    regions: [Region.EUROPE],
    decarbonisationPotencial: DecarbonisationPotential.ABOVE_50_PERCENT,
    tags: [SolutionInterestsSystemName.FUEL_SWITCH],
  },
];
