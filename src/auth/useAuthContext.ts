import { useContext } from 'react';
//
import { AuthContext } from '@yourapp/src/auth/FirebaseContext';
// import { AuthContext } from './JwtContext';
// import { AuthContext } from './Auth0Context';
// import { AuthContext } from './AwsCognitoContext';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // console.log('useAuthContext context', context);
  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
