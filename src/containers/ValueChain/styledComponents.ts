import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { Text } from 'components/Text';
import {
  Alto,
  Scorpion,
  Tundora,
  AlizarinCrimson,
  CongressBlue,
  abcdGray,
  White,
} from 'styles/colours';
import { Card } from 'components/Card';
import { ExternalLink } from 'components/ExternalLink';
import { linkStyles } from 'components/Link';

export const Wrapper = styled.div`
  padding-top: 3rem;
`;

export const TabContentContainer = styled.div`
  padding-top: 1.5rem;
  margin-bottom: 4rem;
`;

export const CommunityBannerWrapper = styled.div`
  margin-bottom: 4rem;
  border: 1px solid ${Alto};
  display: flex;
`;

export const EmptyViewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
`;

export const EmptyViewHeading = styled.h4`
  color: ${Tundora};
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 1rem;
  max-width: 360px;
  text-align: center;
`;

export const EmptyViewText = styled.p`
  color: ${Scorpion};
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  max-width: 360px;
  text-align: center;
`;

export const ControlsContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  margin: 0 0 2rem auto;
  width: 100%;
`;

export const ValueChainEmptyView = styled(Card)`
  margin-bottom: 5rem;
`;

export const EmptyViewCtaContainer = styled.div`
  padding-top: 1.5rem;
`;

export const RowActionsContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

export const RowActionsSeparator = styled.span`
  line-height: 1;
  padding: 0 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const YearInputWrapper = styled.div`
  width: 45%;
`;

export const ToolTipContent = styled.div`
  max-width: 346px;
  margin-top: 8px;
  margin-left: 8px;
`;

export const FormulaContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${Alto};
  background: ${abcdGray};
  padding: 14px;
  margin: 0 8px 12px 0;
`;

export const TextWrapper = styled.div<{ borderBottom?: boolean }>`
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? `1px solid ${CongressBlue}` : 'none'};
  padding: 0 10px;
  text-align: center;
`;

export const FormulaText = styled(Text).attrs({
  size: '12px',
  color: CongressBlue,
})`
  line-height: 16px;
  margin: 4px 0;
  text-align: center;
`;

export const LinkText = styled(Text).attrs({
  size: '12px',
  color: Scorpion,
})`
  line-height: 16px;
  padding: 0 8px;
  margin-bottom: 0.75rem;
`;

export const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OperatorContainer = styled.div`
  margin: 0 8px;
`;

export const AlignmentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 1.5rem;
`;

export const NoCompanyResultsContainer = styled.div`
  padding: 0.625rem 1rem;
`;

export const NoCompanyResultsParagraph = styled.p`
  color: ${abcdGray};
  font-size: 0.875rem;
`;

export const NoCompanyResultsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
`;

export const TooltipContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const AvailableEmissionsContainer = styled.span<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? CongressBlue : AlizarinCrimson)};
  display: block;
  font-size: 14px;
  line-height: 1.16;
  padding: 0.25rem 0;
`;

export const StyledExternalLink = styled(ExternalLink)<{ textAlign?: string }>`
  ${linkStyles};
  text-align: ${({ textAlign }) => textAlign};
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 4px;
`;

export const OptionTitle = styled(Text).attrs({
  color: Tundora,
})`
  margin-bottom: 4px;
  font-weight: bold;
  line-height: 20px;
`;

export const OptionSubtext = styled(Text).attrs({
  color: Scorpion,
  size: '12px',
})`
  line-height: 12px;
`;

export const IconContainer = styled.div<{ lrg?: boolean }>`
  display: inline-block;
  vertical-align: text-top;
  margin-right: ${({ lrg }) => (lrg ? '4px' : '2px')};
`;

export const ValueChainIntroSection = styled.section`
  display: flex;
  margin-bottom: 3.75rem;
`;

export const ValueChainBannerGlobe = styled.div<{
  $fullWidth: boolean;
}>`
  background: ${White} url('/value-chain-world.svg') no-repeat 100% 100%;
  padding: 3.75rem 2.5rem;
  width: ${ifProp({ $fullWidth: true }, '100%', '77%')};
  margin-right: ${ifProp({ $fullWidth: true }, '0rem', '1.5rem')};
  border: 1px solid ${Alto};
`;

export const ValueChainBannerWoman = styled(ValueChainBannerGlobe)`
  background: ${White} url('/woman-on-laptop.svg') no-repeat 97% 100%;
`;

export const NetworkSummaryContainer = styled.div`
  display: flex;
  border: 1px solid ${Alto};
  background: white;
  width: 23%;
  padding: 24px;
  flex-direction: column;
`;
