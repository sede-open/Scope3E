import useTranslation from 'next-translate/useTranslation';

export const RequestedAllocationActions = () => {
  const { t } = useTranslation();

  return t('valueChain:null-cell');
};
