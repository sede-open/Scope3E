import { createContext } from 'react';
import { ITribeJWTContext } from 'interfaces/Tribe';

export const TribeJWTContext = createContext<ITribeJWTContext>({
  token: undefined,
  error: undefined,
  wrapTribeLinkWithSSO: () => '',
});
