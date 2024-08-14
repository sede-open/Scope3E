import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PageHead } from 'components/PageHead';
import { SubheaderNavigation } from 'components/SubheaderNavigation';
import { PageContent } from 'layouts/PageContent';
import { PageWrapper } from 'layouts/PageWrapper';
import { ReactNode } from 'react';
import { abcdGray, White } from 'styles/colours';
import { adminDashboardNavLinks, primaryNavLinks } from '../../constants';
import { Providers } from './Providers';

interface IProps {
  children: ReactNode;
  hasSubheaderNavigation?: boolean;
  isArticlePage?: boolean;
  isAdminPage?: boolean;
  selectedLink?: string;
}

export const Page = ({
  children,
  hasSubheaderNavigation = true,
  isArticlePage = false,
  isAdminPage = false,
  selectedLink = '',
}: IProps) => {
  const pageNavLinks = isAdminPage ? adminDashboardNavLinks : primaryNavLinks;
  return (
    <Providers>
      <PageHead />
      <PageWrapper background={isArticlePage ? White : abcdGray}>
        <Header isAdminPage={isAdminPage} />
        {hasSubheaderNavigation && (
          <SubheaderNavigation
            selectedLink={selectedLink}
            navLinks={pageNavLinks}
          />
        )}
        <PageContent withSubheader={hasSubheaderNavigation}>
          {children}
        </PageContent>
      </PageWrapper>
      <PageWrapper>
        <Footer />
      </PageWrapper>
    </Providers>
  );
};
