import Icon from 'components/Icon';
import { CSSProperties, ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';
import { AthensGray } from 'styles/colours';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IModalProps {
  children: ReactNode;
  displayCrossIcon?: boolean;
  hasProgressBar?: boolean;
  isOpen: boolean;
  isWizard?: boolean;
  isFullDisplay?: boolean;
  isContentLoading?: boolean;
  onClose: () => void;
  customStyleExtras?: CSSProperties;
  closeIconTop?: string;
  closeIconRight?: string;
}

const Modal = ({
  hasProgressBar,
  isOpen,
  displayCrossIcon,
  onClose,
  children,
  isWizard,
  isFullDisplay,
  isContentLoading,
  customStyleExtras = {},
  closeIconTop,
  closeIconRight,
}: IModalProps) => {
  const customStyles = {
    overlay: {
      zIndex: 7,
      backgroundColor: AthensGray,
    },
    content: {
      border: 'none',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: 0,
      padding: 0,
      maxHeight: '100vh',
      marginRight: '-50%',

      ...customStyleExtras,
    },
  };
  let appElement;
  useEffect(() => {
    appElement = document.getElementById('__next');
    if (appElement) {
      // the app will be ignored by screenreaders
      ReactModal.setAppElement('#__next');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={!!appElement}
      shouldCloseOnOverlayClick={false}
    >
      <StyledComponents.Container
        data-testid={selectors.container}
        isWizard={isWizard}
        isFullDisplay={isFullDisplay}
        isLoading={isContentLoading}
      >
        {displayCrossIcon && (
          <StyledComponents.CloseIconContainer
            data-testid={selectors.closeButton}
            hasProgressBar={hasProgressBar}
            isFullDisplay={isFullDisplay}
            onClick={onClose}
            top={closeIconTop}
            right={closeIconRight}
            tabIndex={0}
          >
            <Icon src="/cross.svg" alt="Close window" size={48} />
          </StyledComponents.CloseIconContainer>
        )}
        {children}
      </StyledComponents.Container>
    </ReactModal>
  );
};

Modal.defaultProps = {
  displayCrossIcon: true,
  hasProgressBar: false,
  isWizard: false,
  isFullDisplay: false,
  isContentLoading: false,
};

export default Modal;
