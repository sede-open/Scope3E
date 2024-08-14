import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Tab, TabSize, TabsAlignment, TabList } from 'components/Tabs';
import { GhostTabs } from 'components/GhostTabs';

import * as StyledComponents from './styledComponents';

export type NavLink = { link: string; label: string };

export interface IProps {
  isGhosted?: boolean;
  navLinks: NavLink[];
  selectedLink: string;
}

export const SubheaderNavigation = ({
  isGhosted,
  navLinks,
  selectedLink,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.SubheaderNavigationWrapper>
      <StyledComponents.SubheaderNavigationInner>
        {isGhosted ? (
          <GhostTabs tabCount={navLinks.length} />
        ) : (
          <TabList align={TabsAlignment.FLEX_GROW}>
            {navLinks.map((link) => (
              <Link key={link.link} href={link.link} passHref>
                <Tab
                  key={link.link}
                  as="a"
                  align={TabsAlignment.FLEX_GROW}
                  size={TabSize.LARGE}
                  isSelected={link.link === selectedLink}
                >
                  {t(link.label)}
                </Tab>
              </Link>
            ))}
          </TabList>
        )}
      </StyledComponents.SubheaderNavigationInner>
    </StyledComponents.SubheaderNavigationWrapper>
  );
};

SubheaderNavigation.defaultProps = {
  isGhosted: false,
};
