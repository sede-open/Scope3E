import styled from 'styled-components';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import {
  Alto,
  SilverChalice,
  Scorpion,
  Tundora,
  CongressBlue,
} from 'styles/colours';

export const Container = styled.div`
  border: 1px solid ${Alto};
`;

export const TotalContainer = styled(Card)`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 22px;
  border: none;
  border-bottom: 1px solid ${Alto};
`;

export const TotalTitle = styled(Text).attrs({
  color: Scorpion,
})`
  line-height: 20px;
`;

export const FieldContainer = styled(Card)<{ isFieldPopulated?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  position: relative;
  border: none;
  border-left: 2px solid
    ${({ isFieldPopulated }) =>
      !isFieldPopulated ? `${Alto}` : `${CongressBlue}`};

  &:last-of-type {
    border-bottom: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0px;
    left: 0;
    right: 0;
    border-bottom: 1px solid ${Alto};
  }
`;

export const Title = styled(Text)<{ isFieldPopulated?: boolean }>`
  line-height: 20px;
  font-weight: bold;
  color: ${({ isFieldPopulated }) =>
    !isFieldPopulated ? SilverChalice : Tundora};
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 8px 0 0 13px;
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px 0;
`;

export const FieldTotal = styled.div<{ isFieldPopulated?: boolean }>`
  line-height: 20px;
  color: ${({ isFieldPopulated }) =>
    !isFieldPopulated ? SilverChalice : Tundora};
`;

export const UnitContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const Units = styled(Text)<{ isFieldPopulated?: boolean }>`
  line-height: 20px;
  margin-left: 5px;
  color: ${({ isFieldPopulated }) =>
    !isFieldPopulated ? SilverChalice : Tundora};
`;

export const EmissionValue = styled(Text).attrs({
  family: 'exampleBold',
  size: '24px',
  color: Tundora,
})`
  line-height: 28px;
`;
