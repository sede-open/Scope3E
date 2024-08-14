export const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${process.env.SITE_URL}/</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/stories</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/contact-us</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/demo</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/join-us</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/changelog</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/terms-of-use</loc>
    </url>
    <url>
      <loc>${process.env.SITE_URL}/legal-disclaimer</loc>
    </url>
    <url>
    <loc>${process.env.SITE_URL}/features</loc>
  </url>
  </urlset>
`;

export const createRobots = () => `
  User-agent: *\n
  Sitemap: ${process.env.SITE_URL}/sitemap.xml
`;
