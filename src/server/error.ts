/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import app from './next';
/* eslint-disable-next-line */
export default (err: any, req: Request, res: Response, ___: NextFunction) => {
  const code = err.statusCode || 500;
  res.status(code);
  // Return JSON for GraphQL or other JSON requests. These can be acted upon via Apollo error link
  if (req.xhr || req.headers['content-type'] === 'application/json') {
    res.send({ code });
    return;
  }

  // Render the Next.js error page for all other errors
  app.renderError(err, req, res, '/error');
};
