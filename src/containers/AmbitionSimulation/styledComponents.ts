import styled from 'styled-components';
import { Tundora, Scorpion, Alto } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';

export const Wrapper = styled.div`
  background-image: url('/images/world.svg');
  background-repeat: no-repeat;
  background-position: right 100px;
`;

export const Title = styled(Text)`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`;

export const AmbitionYear = styled(Text).attrs({ as: 'h2' })`
  margin-top: 0.25rem;
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
  color: ${Tundora};
  font-family: ${exampleBold};
`;

export const ReductionContainer = styled.div`
  width: 274px;
  max-width: 100%;
`;

export const ReductionInfoList = styled.dl`
  padding-top: 1rem;
`;

export const ReductionInfoItem = styled.div<{ isThin?: boolean }>`
  border-bottom: 1px solid ${Alto};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ isThin }) => (isThin ? '0' : '0.5rem')} 0;
`;

export const ReductionInfoDt = styled.dt`
  font-size: 12px;
  color: ${Scorpion};
`;

export const ReductionInfoDd = styled.dd`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: ${Tundora};
`;

export const LeversWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 48px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 96px;
`;

export const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightContentWrapper = styled.div`
  display: flex-start;
  flex-direction: column;
  justify-content: flex-end;
`;

export const TabContent = styled.div`
  padding-top: 24px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const OuterWrapper = styled.div`
  position: sticky;
  top: 335px;
  margin-right: -5px;
`;

export const FixedWrapper = styled.div`
  position: sticky;
  margin-right: -5px;
  top: 335px;
`;

export const ReductionInfoLabel = styled.label`
  color: inherit;
  cursor: pointer;
`;

export const SimulationCountryContainer = styled.div`
  margin: -1px 0;
  min-width: 140px;
`;
