import next from 'next';
import { loadEnvConfig } from '@next/env';

loadEnvConfig('./', process.env.NODE_ENV !== 'production');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './src',
});

export default app;
