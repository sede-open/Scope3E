export const getNavData = ({ footer }: { footer: boolean }) => {
  const navLinks = [
    {
      id: 'home',
      path: '/',
    },
    {
      id: 'features',
      path: '/features',
    },
    {
      id: 'stories',
      path: '/stories',
    },
  ];

  if (footer) {
    navLinks.push({ id: 'contact-us', path: '/contact-us' });
  }
  return navLinks;
};
