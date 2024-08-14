export interface DecodedTribeJWT {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  iss: string;
}

export interface TribeJWTResponse {
  token: string;
}

export interface ITribeJWTContext {
  token?: string;
  wrapTribeLinkWithSSO: (path: string) => string;
  error?: string;
}
