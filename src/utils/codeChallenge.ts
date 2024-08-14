import crypto from 'crypto';
import base64url from 'base64url';

export const codeVerifier = crypto.randomBytes(32).toString('hex');

export const codeChallenge = base64url.encode(
  crypto.createHash('sha256').update(codeVerifier).digest()
);
