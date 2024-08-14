import Button from 'components/Button';
import { Text } from 'components/Text';
import styled from 'styled-components';

import { CTAContainer } from 'components/CTAContainer';
import { Alto, MidBlue, White, Fuego } from 'styles/colours';
import { AllocationStatus } from './constants';

const statusToColor = {
  [AllocationStatus.IncomingAllocation]: MidBlue,
  [AllocationStatus.IncomingRequest]: Fuego,
  [AllocationStatus.MissingEmissions]: Alto,
};

export const AllocationContainer = styled.article<{ status: AllocationStatus }>`
  align-items: flex-start;
  background: ${White};
  border: 1px solid ${Alto};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0.875rem;
  margin: 0 0 2rem;
  padding: 1.5rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }

  &::before {
    background: ${({ status }) => statusToColor[status]};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 8px;
  }

  ${CTAContainer} {
    margin-left: auto;
    margin-right: 0;
  }
`;

export const AllocationTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
`;

export const InfoColumn = styled.div`
  display: block;
  margin-right: 2rem;
  min-width: 0;
`;

export const BaseInfoColumns = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-right: 2rem;
  width: 33%;

  ${InfoColumn} {
    width: 50%;
  }
`;

export const NameContainer = styled(Text)`
  max-width: 150px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MissingEmissionsMessageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  > * {
    margin-right: 10px;
  }
`;

export const MissingEmissionsMessageTitle = styled(Text).attrs({
  as: 'h4',
})`
  font-weight: bold;
  margin-right: 4px;
`;

export const MissingEmissionsMessageButton = styled(Button).attrs({
  color: 'text-button',
  type: 'button',
})`
  display: inline;
`;
