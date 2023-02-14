import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function useAuth() {
  const context = useContext(AuthContext);

  return {
    ...context,
  };
}

export default useAuth;
