import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { EmissionAllocationStatus } from 'types/globalTypes';
import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { Text } from 'components/Text';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { AllocationStatus } from './constants';
import { NoEmissionsMessage } from './NoEmissionsMessage';

interface IProps {
  allocation: EmissionAllocationsQuery_emissionAllocations;
  allocationStatus: AllocationStatus;
  shouldDisplayControls: boolean;
  shouldDisableControls: boolean;
  isMissingEmissions: boolean;
  onAccept: (allocation: EmissionAllocationsQuery_emissionAllocations) => void;
  onAddEmissions: (year: number) => void;
  onReject: ({
    allocation,
    status,
  }: {
    allocation: EmissionAllocationsQuery_emissionAllocations;
    status:
      | EmissionAllocationStatus.REJECTED
      | EmissionAllocationStatus.REQUEST_DISMISSED;
  }) => void;
  dataTestId?: string;
}

export const RequestedAllocation = ({
  allocation,
  dataTestId,
  isMissingEmissions,
  onAccept,
  onAddEmissions,
  onReject,
  allocationStatus,
  shouldDisplayControls,
  shouldDisableControls,
}: IProps) => {
  const { t } = useTranslation();
  const { createdAt, customer, year } = allocation;

  return (
    <StyledComponents.AllocationContainer
      data-testid={dataTestId}
      status={allocationStatus}
    >
      <StyledComponents.BaseInfoColumns>
        <StyledComponents.InfoColumn>
          <StyledComponents.AllocationTitle>
            {t('valueChain:pending-allocation-title-customer')}
          </StyledComponents.AllocationTitle>
          <StyledComponents.NameContainer>
            {customer?.name}
          </StyledComponents.NameContainer>
        </StyledComponents.InfoColumn>

        <StyledComponents.InfoColumn>
          <StyledComponents.AllocationTitle>
            {t('valueChain:pending-allocation-title-received-on')}
          </StyledComponents.AllocationTitle>
          <Text>{moment(createdAt).format('DD MMM YYYY')}</Text>
        </StyledComponents.InfoColumn>
      </StyledComponents.BaseInfoColumns>

      {isMissingEmissions ? (
        <NoEmissionsMessage year={year} onAddEmissions={onAddEmissions} />
      ) : (
        <>
          <StyledComponents.InfoColumn>
            <StyledComponents.AllocationTitle>
              {t('valueChain:pending-allocation-title-allocation-message')}
            </StyledComponents.AllocationTitle>
            <Text>{allocation.note}</Text>
          </StyledComponents.InfoColumn>
        </>
      )}

      {shouldDisplayControls && (
        <CTAContainer>
          <Button
            color="secondary"
            disabled={shouldDisableControls}
            data-testid={selectors.getRejectButtonSelector(dataTestId || '')}
            onClick={() =>
              onReject({
                allocation,
                status: EmissionAllocationStatus.REQUEST_DISMISSED,
              })
            }
          >
            {t('valueChain:pending-allocation-button-reject')}
          </Button>
          <Button
            color="primary"
            disabled={shouldDisableControls}
            data-testid={selectors.getAcceptButtonSelector(dataTestId || '')}
            onClick={() => onAccept(allocation)}
          >
            {t('valueChain:pending-allocation-button-allocate')}
          </Button>
        </CTAContainer>
      )}
    </StyledComponents.AllocationContainer>
  );
};

RequestedAllocation.defaultProps = {
  dataTestId: undefined,
};
