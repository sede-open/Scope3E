import { I18nDictionary } from 'next-translate';
import I18nProvider from 'next-translate/I18nProvider';
import { ReactNode } from 'react';

export default ({
  children,
  namespaces,
}: {
  children: ReactNode;
  namespaces: Record<string, I18nDictionary>;
}) => (
  <I18nProvider config={{ logger: () => {} }} lang="en" namespaces={namespaces}>
    {children}
  </I18nProvider>
);
