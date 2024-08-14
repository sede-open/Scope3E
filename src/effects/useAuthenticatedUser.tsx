import { useContext } from 'react';
import { AuthenticatedUserContext } from 'context/AuthenticatedUserProvider/AuthenticatedUserContext';

export const useAuthenticatedUser = () => useContext(AuthenticatedUserContext);
