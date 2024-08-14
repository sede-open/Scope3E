import { Component } from 'react';
import { NextApiResponse } from 'next';
import { createRobots } from 'utils/seo';

class Robots extends Component {
  static async getInitialProps({ res }: { res: NextApiResponse }) {
    if (process.env.ENVIRONMENT === 'prod') {
      res.setHeader('Content-Type', 'text');
      res.write(createRobots());
    }

    res.end();
  }
}

export default Robots;
