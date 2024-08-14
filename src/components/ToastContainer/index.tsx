import styled from 'styled-components';
import {
  ToastContainer as ToastifyContainer,
  ToastContainerProps,
} from 'react-toastify';
import {
  AlizarinCrimson,
  CongressBlue,
  FunGreen,
  Tundora,
  White,
} from 'styles/colours';

export const WrappedToastContainer = ({
  className,
  ...rest
}: ToastContainerProps & { className?: string }) => (
  <div data-testid="toast-container" className={className}>
    <ToastifyContainer {...rest} />
  </div>
);

export const ToastContainer = styled(WrappedToastContainer)`
  .Toastify__toast-container {
    width: auto;
  }

  .Toastify__toast {
    background: ${White};
    width: 100%;
    align-items: center;
    color: ${Tundora};
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1),
      0px 20px 48px rgba(0, 0, 0, 0.1);
  }

  .Toastify__close-button {
    color: ${Tundora};
    padding: 0.5rem 1rem 0rem 1rem;
    transition: none;
    align-self: center;
    opacity: 1;
    :hover {
      opacity: 0.7;
    }
  }

  .Toastify__toast--success {
    border-top: 5px solid ${FunGreen};
    background-image: url('/success-icon.svg');
    background-repeat: no-repeat;
    background-position: 1.125rem 50%;
  }

  .Toastify__toast--error {
    border-top: 5px solid ${AlizarinCrimson};
    background-image: url('/error-icon.svg');
    background-repeat: no-repeat;
    background-position: 1.125rem 50%;
  }

  .Toastify__toast--info {
    border-top: 5px solid ${CongressBlue};
    background-image: url('/info-icon.svg');
    background-repeat: no-repeat;
    background-position: 1.125rem 50%;
  }

  .Toastify__toast-body {
    max-width: 100%;
    display: flex;
    margin: 0.2rem 0 0 3rem;
  }
`;

WrappedToastContainer.defaultProps = {
  className: undefined,
};
