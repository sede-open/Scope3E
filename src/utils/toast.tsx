import { Toast } from 'components/Toast';
import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

export type ToastType = {
  cta?: ReactNode;
  title: string;
  subtitle?: string;
  options?: ToastOptions;
};

export const displaySuccessMessage = ({
  title,
  subtitle,
  options,
}: ToastType) =>
  toast(<Toast title={title} subtitle={subtitle} />, {
    ...options,
    type: 'success',
  });

export const displayErrorMessage = ({ title, subtitle, options }: ToastType) =>
  toast(<Toast title={title} subtitle={subtitle} />, {
    ...options,
    type: 'error',
  });

export const displayInfoMessage = ({ title, subtitle, options }: ToastType) =>
  toast(<Toast title={title} subtitle={subtitle} />, {
    ...options,
    type: 'info',
  });

export const displayCtaMessage = ({
  cta,
  title,
  subtitle,
  options,
}: ToastType) =>
  toast(<Toast cta={cta} title={title} subtitle={subtitle} />, {
    ...options,
    type: 'info',
    autoClose: false,
  });
