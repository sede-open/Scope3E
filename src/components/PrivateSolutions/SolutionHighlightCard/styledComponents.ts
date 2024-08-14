import styled from 'styled-components';
import { Text } from 'components/Text';
import { Alto, Tundora } from 'styles/colours';
import { exampleBold, exampleMedium } from 'styles/fonts';
import { InfoTooltipContentWrapper } from 'components/InfoToolTip/styledComponents';

export const HighlightContainer = styled.div`
  border: 1px solid ${Alto};
  width: 100%;
  max-width: 360px;
  padding: 24px;
  height: fit-content;
  position: sticky;
  top: 132px;
`;

export const HighlightTitle = styled(Text).attrs({
  as: 'h3',
  size: '20px',
  family: exampleMedium,
  color: Tundora,
})`
  line-height: 26px;
  margin-bottom: 24px;
`;

export const HighlightSubtitle = styled(Text).attrs({
  as: 'h4',
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
  font-weight: 700;
`;

export const HighlightSubtext = styled(Text).attrs({
  color: Tundora,
  size: '16px',
})`
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

export const HighlightContactUsContainer = styled.div`
  margin-top: 24px;
`;

export const HighlightExplore = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
`;

export const CtaContainer = styled.div`
  margin-top: 24px;
`;

export const TooltipContainer = styled.div`
  white-space: pre-wrap;
`;

export const ContentWrapper = styled(InfoTooltipContentWrapper)`
  margin-top: -30px;
`;

export const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const SalesImage = styled.img`
  width: 100%;
  margin-bottom: 24px;
`;
