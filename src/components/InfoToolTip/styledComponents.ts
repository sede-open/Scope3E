import styled from 'styled-components';
import { Alto, Tundora, White, Scorpion, abcdGray } from 'styles/colours';
import { Text } from 'components/Text';

export const StyledToolTip = styled.div<{
  shouldAlignPointerRight?: boolean;
  autoWidth?: boolean;
}>`
  .__react_component_tooltip {
    width: ${({ autoWidth }) => (autoWidth ? 'auto' : '235px')};
    background-color: ${White};
    color: ${Tundora};
    font-size: 12px;
    border: 1px solid ${Alto};
    border-radius: 0;
    box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.1);
    text-align: left;
    padding: 16px;
    pointer-events: auto !important;
  }
  .__react_component_tooltip.place-top::after {
    border-top-color: ${White};
    left: ${({ shouldAlignPointerRight }) =>
      shouldAlignPointerRight ? '85%' : '12%'};
  }

  .__react_component_tooltip.place-bottom::after {
    border-bottom-color: ${White};
    left: 88%;
  }

  .__react_component_tooltip.show {
    opacity: 1;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 100%;
  padding: 0px;
`;

export const StyledText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
  color: ${({ color }) => color ?? Scorpion};
  :hover {
    color: ${Tundora};
  }
`;

export const InfoTooltipContentWrapper = styled.div`
  display: inline-block;
`;

export const InfoTooltipHeader = styled(Text).attrs({
  color: Tundora,
  size: '12px',
})`
  line-height: 14px;
  font-weight: bold;
`;

export const InfoTooltipBody = styled(Text).attrs({
  color: Tundora,
  size: '12px',
})`
  line-height: 14px;
`;

export const InfoTooltipLink = styled(Text).attrs({
  color: Tundora,
  size: '12px',
  as: 'span',
})`
  display: inline-block;
  text-decoration: underline;
  text-align: left;
`;

export const CloseButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  :hover {
    background: ${abcdGray};
    height: 20px;
  }
`;
