import { ReactChild, ReactChildren, useCallback, useState } from 'react';

import Modal from 'components/Modal';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';

import * as StyledComponents from './styledComponents';

export interface IProps {
  children?: ReactChild | ReactChildren;
  className?: string;
  link: string;
}

export const ExternalLink = ({ className, children, link }: IProps) => {
  const [isDisclaimerOpen, toggleDisclaimer] = useState(false);

  const closeDisclaimer = useCallback(() => {
    toggleDisclaimer(false);
  }, []);

  const openDisclaimer = useCallback(() => {
    toggleDisclaimer(true);
  }, []);

  return (
    <>
      <StyledComponents.LinkButton
        className={className}
        data-testid="external-link-btn"
        type="button"
        onClick={openDisclaimer}
      >
        {children}
      </StyledComponents.LinkButton>
      {isDisclaimerOpen && (
        <Modal isOpen={isDisclaimerOpen} onClose={closeDisclaimer}>
          <ExternalLinkDisclaimer
            externalLink={link}
            onClose={closeDisclaimer}
          />
        </Modal>
      )}
    </>
  );
};

ExternalLink.defaultProps = {
  className: undefined,
  children: undefined,
};
