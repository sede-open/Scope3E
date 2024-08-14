import { useQuery, gql } from '@apollo/client';
import {
  DataPrivacyWizardQuery,
  DataPrivacyWizardQueryVariables,
} from 'types/DataPrivacyWizardQuery';

export const DATA_PRIVACY_WIZARD_QUERY = gql`
  query DataPrivacyWizardQuery($companyId: UUID!) {
    companyDataPrivacyCompleteness(companyId: $companyId) {
      isComplete
      numCorporateEmissionAccessMissing
      numIntensityTargetPrivacyTypeMissing
      numAbsoluteTargetPrivacyTypeMissing
    }
    corporateEmissions(companyId: $companyId) {
      id
      type
      year
      scope1
      scope2
      scope3
      scope2Type
      offset
      examplePercentage
      headCount
      verificationFile {
        id
        originalFilename
      }
      carbonIntensities {
        intensityMetric
        intensityValue
      }
      corporateEmissionAccess {
        scope1And2
        scope3
        carbonOffsets
        carbonIntensity
        publicLink
      }
    }
    targets(companyId: $companyId) {
      absolute {
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
        scope1And2PrivacyType
        scope3PrivacyType
      }
      intensity {
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
        intensityMetric
        scope1And2PrivacyType
        scope3PrivacyType
      }
    }
  }
`;

export const useDataPrivacyWizardData = ({
  companyId,
}: DataPrivacyWizardQueryVariables) =>
  useQuery<DataPrivacyWizardQuery>(DATA_PRIVACY_WIZARD_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-first',
  });
