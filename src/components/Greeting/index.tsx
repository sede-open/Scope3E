import useTranslation from 'next-translate/useTranslation';

export const Greeting = () => {
  const { t } = useTranslation();
  return <div data-testid="greeting-message">{t('home:greeting')}</div>;
};
