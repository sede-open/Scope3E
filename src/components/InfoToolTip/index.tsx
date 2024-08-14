import {
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactElement,
  ReactNode,
} from 'react';
import ReactTooltip from 'react-tooltip';

import Icon from 'components/Icon';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

type Offset = { left: number; right: number; top: number; bottom: number };
type Place = 'top' | 'bottom';

export interface IProps {
  ariaLabel: string;
  id: string;
  title: ReactElement | string;
  children?: ReactNode;
  content?: ReactElement | string;
  offset?: Offset;
  place?: Place;
  color?: string;
  shouldAlignPointerRight?: boolean;
  autoWidth?: boolean;
  cross?: boolean;
}

export const { InfoTooltipHeader, InfoTooltipBody } = StyledComponents;

type TooltipRefType = { tooltipRef: null } | null;

export const InfoToolTip = ({
  ariaLabel,
  id,
  content,
  offset,
  title,
  place,
  children,
  color,
  shouldAlignPointerRight,
  autoWidth,
  cross = true,
}: IProps) => {
  // To ensure that any open tooltips are closed,
  // need custom open and close handlers
  // https://github.com/wwayne/react-tooltip/issues/377#issuecomment-502973468
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipWrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const hideTooltip = useCallback(() => {
    const tooltipWrapper = tooltipWrapperRef.current;
    if (tooltipWrapper != null) {
      if (tooltipRef) {
        // react-tooltip checks if the mouse is over the tooltip
        // and only closes it after mouse leaves
        // https://github.com/wwayne/react-tooltip/issues/449
        const tooltip = tooltipRef.current as TooltipRefType;
        if (tooltip != null) {
          tooltip.tooltipRef = null;
        }
      }

      ReactTooltip.hide();
      setTooltipOpen(false);
    }
  }, []);

  const hideTooltipHandler = useCallback((e: MouseEvent) => {
    if (e.target !== tooltipWrapperRef.current) {
      hideTooltip();
      document.removeEventListener('click', hideTooltipHandler);
    }
  }, []);

  const onClickClose = useCallback(() => {
    hideTooltip();
    document.removeEventListener('click', hideTooltipHandler);
  }, []);

  const onTooltipTriggerClick = useCallback(() => {
    const tooltipWrapper = tooltipWrapperRef.current;
    if (tooltipWrapper) {
      if (isTooltipOpen) {
        ReactTooltip.hide();
        setTooltipOpen(false);
      } else {
        ReactTooltip.show(tooltipWrapper);
        setTooltipOpen(true);

        document.addEventListener('click', hideTooltipHandler, {
          capture: true,
        });
      }
    }
  }, [isTooltipOpen]);

  useEffect(
    () => () => {
      document.removeEventListener('click', hideTooltipHandler);
    },
    []
  );

  return (
    <div>
      <StyledComponents.StyledText
        aria-label={ariaLabel}
        ref={tooltipWrapperRef}
        data-testid={selectors.title(id)}
        as="span"
        color={color}
        size="12px"
        data-tip
        data-for={id}
        data-event="click"
        data-event-off=""
        onClick={onTooltipTriggerClick}
      >
        {title}
      </StyledComponents.StyledText>
      <StyledComponents.StyledToolTip
        shouldAlignPointerRight={shouldAlignPointerRight}
        autoWidth={autoWidth}
        data-testid={selectors.content(id)}
      >
        <ReactTooltip
          ref={tooltipRef}
          id={id}
          place={place}
          effect="solid"
          offset={offset}
          isCapture
        >
          <StyledComponents.StyledWrapper>
            <StyledComponents.InfoTooltipContentWrapper>
              {content} {children}
            </StyledComponents.InfoTooltipContentWrapper>

            {cross && (
              <StyledComponents.CloseButton
                type="button"
                onClick={onClickClose}
                data-testid={selectors.closeButton(id)}
              >
                <Icon src="/cross.svg" alt="Close tooltip" size={20} />
              </StyledComponents.CloseButton>
            )}
          </StyledComponents.StyledWrapper>
        </ReactTooltip>
      </StyledComponents.StyledToolTip>
    </div>
  );
};

InfoToolTip.defaultProps = {
  ariaLabel: undefined,
  offset: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  place: undefined,
  children: undefined,
  content: undefined,
  color: undefined,
  shouldAlignPointerRight: false,
};

export const { InfoTooltipLink } = StyledComponents;
