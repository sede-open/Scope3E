import Button from 'components/Button';
import { PieChart } from 'components/Glyphs';
import { ChartIcon } from 'components/Glyphs/ChartIcon';
import { MagnifyingGlass } from 'components/Glyphs/MagnifyingGlass';
import { NavigationGlobe } from 'components/Glyphs/NavigationGlobe';
import { Link } from 'components/Link';
import { MultiSelect, OptionType } from 'components/MultiSelect';
import { Text } from 'components/Text';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import {
  components,
  IndicatorProps,
  OptionsType,
  ValueType,
} from 'react-select';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';
import { DarkGreen20, LightGreen40, MidBlue40, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as selectors from '../../selectors';
import { Title } from '../CreateNetworkCardHeader/styledComponents';
import {
  CardBody,
  CardHeader,
  IconContainer,
  NetworkCardContainer,
  RelationContainer,
  RelationTextContainer,
  SelectContainer,
  TitleWrapper,
} from './styledComponents';

interface NetworkTableHeaderProps {
  relationshipType: CompanyRelationshipType;
  canEditCompanyRelationships: boolean;
  openInviteCompanyModal: () => void;
  totalRelations: number;
  totalRelationsWithAmbitions: number;
  totalRelationsWithSBTI: number;
  dropdownOptions: OptionsType<OptionType>;
  onDropdownValueChange: (values: ValueType<OptionType>) => void;
  dropdownValues: ValueType<OptionType>;
}

export const NetworkTableHeader = ({
  relationshipType,
  canEditCompanyRelationships,
  openInviteCompanyModal,
  totalRelations,
  totalRelationsWithAmbitions,
  totalRelationsWithSBTI,
  dropdownOptions,
  onDropdownValueChange,
  dropdownValues,
}: NetworkTableHeaderProps) => {
  const relationshipTypeKey = relationshipType.toLowerCase();
  const { t } = useTranslation();
  // this formats the label displayed in the dropdown menu when it is open
  const formatOptionLabel = ({ label, metadata }: OptionType) => (
    // Can't use styled components for this in react-select
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{label}</div>
      <div>{metadata.columnDisplayName}</div>
    </div>
  );
  // this overrides the selected display in the multi option labels
  const MultiValueLabel = (props: MultiValueGenericProps<OptionType>) => {
    const { data } = props;
    return (
      <components.MultiValueLabel {...props}>
        {data.label}
      </components.MultiValueLabel>
    );
  };

  const DropdownIndicator = (props: IndicatorProps<OptionType>) => {
    return (
      <components.DropdownIndicator {...props}>
        <span
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            marginTop: '4px',
          }}
        >
          <MagnifyingGlass />
        </span>
      </components.DropdownIndicator>
    );
  };
  return (
    <NetworkCardContainer>
      <CardHeader>
        <div>
          <TitleWrapper>
            <Title family={exampleBold}>
              {t(`companyRelationships:${relationshipTypeKey}-title-new`)}
            </Title>
          </TitleWrapper>
          <Text color={Tundora}>
            {t(`companyRelationships:manage-${relationshipTypeKey}-subtitle`)}
          </Text>
          <Text color={Tundora}>
            <Trans
              components={[
                <Link
                  href="/network/getting-started"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t(
                    'common:getting-started-network-link-aria-label'
                  )}
                />,
              ]}
              i18nKey={`companyRelationships:create-${relationshipTypeKey}-subtitle-2`}
            />
          </Text>
        </div>
        {canEditCompanyRelationships && (
          <Button
            maxHeight="48px"
            onClick={openInviteCompanyModal}
            data-testid={selectors.newInviteFormButton}
          >
            {t(`companyRelationships:invite-${relationshipTypeKey}`)}
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <div>
          <RelationContainer $marginRight="48px">
            <IconContainer
              color={
                relationshipType === CompanyRelationshipType.CUSTOMER
                  ? LightGreen40
                  : MidBlue40
              }
            >
              <NavigationGlobe />
            </IconContainer>
            <RelationTextContainer>
              <Text weight="bold" color={Tundora}>
                {t(`companyRelationships:manage-total-relations-title`)}
              </Text>
              <Text color={Tundora}>
                {t(
                  `companyRelationships:manage-${relationshipTypeKey}-total${
                    totalRelations === 1 ? '' : '-plural'
                  }`,
                  {
                    totalRelations,
                  }
                )}
              </Text>
            </RelationTextContainer>
          </RelationContainer>

          <RelationContainer>
            <IconContainer color={DarkGreen20}>
              {relationshipType === CompanyRelationshipType.CUSTOMER ? (
                <PieChart />
              ) : (
                <ChartIcon
                  title={t(
                    `companyRelationships:manage-${relationshipTypeKey}-ambition-title`
                  )}
                />
              )}
            </IconContainer>
            <RelationTextContainer>
              <Text weight="bold" color={Tundora}>
                {t(
                  `companyRelationships:manage-${relationshipTypeKey}-ambition-title`
                )}
              </Text>
              <Text color={Tundora}>
                {t(
                  `companyRelationships:manage-${relationshipTypeKey}-ambition-total${
                    totalRelationsWithAmbitions === 1 ? '' : '-plural'
                  }`,
                  {
                    totalRelationsWithAmbitions,
                    totalRelationsWithSBTI,
                  }
                )}
              </Text>
            </RelationTextContainer>
          </RelationContainer>
        </div>
        <SelectContainer>
          <MultiSelect
            noOptionsMessage={() => 'No results found'}
            multiSelectLimit={3}
            options={dropdownOptions}
            name="search"
            value={dropdownValues}
            onChange={(v) => {
              onDropdownValueChange(v);
            }}
            formatOptionLabel={formatOptionLabel}
            components={{
              MultiValueLabel,
              DropdownIndicator,
            }}
            placeholder={t(`companyRelationships:dropdown-placeholder`)}
          />
        </SelectContainer>
      </CardBody>
    </NetworkCardContainer>
  );
};
