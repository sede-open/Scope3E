import { Component } from 'react';
import { NextApiResponse } from 'next';
import { createSitemap } from 'utils/seo';

class Sitemap extends Component {
  static async getInitialProps({ res }: { res: NextApiResponse }) {
    if (process.env.ENVIRONMENT === 'prod') {
      res.setHeader('Content-Type', 'text/xml');
      res.write(createSitemap());
    }

    res.end();
  }
}

export default Sitemap;
