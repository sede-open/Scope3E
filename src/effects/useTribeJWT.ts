import { useContext } from 'react';
import { TribeJWTContext } from 'context/TribeJWTProvider/TribeJWTContext';

export const useTribeJWT = () => useContext(TribeJWTContext);
