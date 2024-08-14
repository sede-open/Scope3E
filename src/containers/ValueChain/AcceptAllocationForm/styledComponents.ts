import styled from 'styled-components';

import {
  AlizarinCrimson,
  Alto,
  CongressBlue,
  Gray,
  MidBlue,
} from 'styles/colours';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 1.5rem;
`;

export const AvailableEmissionsContainer = styled.span<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? CongressBlue : AlizarinCrimson)};
  display: block;
  font-size: 14px;
  line-height: 1.16;
  padding: 0.25rem 0;
`;

export const AllocationDetails = styled.div`
  border: 1px solid ${Alto};
  padding: 0.75rem 1rem 0.75rem 2rem;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    background: ${MidBlue};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 8px;
  }
`;

export const AddToTotalSublabel = styled.span`
  color: ${CongressBlue};
  display: block;
  font-weight: 400;
  padding-top: 2px;
`;

export const DisabledAddToTotalMessage = styled.span`
  color: ${Gray};
  display: block;
  font-weight: 400;
  padding-top: 2px;
`;

export const DisabledAddToTotalLabelWrapper = styled.span`
  color: ${Gray};
`;

export const TooltipContainer = styled.div`
  margin-bottom: 0.5rem;
`;
