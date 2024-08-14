import useTranslation from 'next-translate/useTranslation';

export const TooltipTitleBaselineLabel = () => {
  const { t } = useTranslation();
  return <span>{` - ${t('common:tooltip-baseline-year')}`}</span>;
};
