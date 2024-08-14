import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import {
  Alto,
  Fuego,
  abcdGray,
  Gray,
  MidBlue,
  Scorpion,
  SilverChalice,
  Supernova,
  Tundora,
  White,
} from 'styles/colours';
import { device } from 'styles/variables';

export const QuickConnectContainer = styled(Card)`
  min-height: 64px;
  padding: 48px 48px 0px 48px;
`;

export const LoadingSpinnerContainer = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
`;

export const QuickConnectHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuickConnectTitle = styled(Text).attrs({
  as: 'h2',
  size: '24px',
})`
  color: ${Tundora};
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

export const QuickConnectSubtitle = styled.p`
  margin-bottom: 24px;
  color: ${Tundora};
`;

export const QuickConnectInvitationGroup = styled.div``;

export const QuickConnectCardContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;

  li {
    margin-bottom: 48px;
    margin-right: 24px;
  }

  @media ${device.laptopS} {
    li:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export const QuickConnectCard = styled.li`
  list-style: none;
  flex: 0 0 31%;

  border: 1px solid ${Alto};
  height: 280px;
  padding: 24px;

  display: flex;
  flex-direction: column;
`;

export const QuickConnectCardAlternate = styled(QuickConnectCard)`
  background-color: ${abcdGray};
`;

export const CardFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardDismiss = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  display: flex;
`;

export const CardIconContainer = styled.div`
  height: 56px;
  width: 56px;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${switchProp('color', {
    blue: css`
      background-color: ${MidBlue};
    `,
    green: css`
      background-color: ${Fuego};
    `,
    yellow: css`
      background-color: ${Supernova};
    `,
  })}
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardDescription = styled.div``;

export const CardTitle = styled(Text).attrs({
  as: 'h3',
  size: '16px',
})`
  color: ${Tundora};
  font-weight: bold;
  line-height: 24px;
`;

export const CardLocationText = styled(Text).attrs({
  as: 'p',
  size: '14px',
})`
  color: ${Scorpion};
  margin-bottom: 8px;
  font-weight: bold;
  line-height: 20px;
`;

export const CardSectorText = styled(Text).attrs({
  as: 'p',
  size: '14px',
})`
  color: ${Tundora};
  margin-bottom: 8px;
  line-height: 20px;
`;

export const CardActionsContainer = styled.div`
  margin-top: auto;
`;

export const CardConnectButton = styled.button.attrs({
  type: 'button',
})`
  border: 1px solid ${SilverChalice};
  padding: 8px;
  min-width: 144px;

  font-weight: bold;
  line-height: 20px;
  cursor: pointer;

  background-color: ${White};
`;

export const CardConnectButtonLoading = styled(CardConnectButton)`
  display: flex;
  justify-content: center;
`;

export const CardConnectButtonCompleted = styled.button.attrs({
  type: 'button',
  disabled: true,
})`
  padding: 8px;
  min-width: 144px;
  font-weight: bold;
  line-height: 20px;

  color: ${Gray};
  background-color: ${abcdGray};
`;

export const CardLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;
