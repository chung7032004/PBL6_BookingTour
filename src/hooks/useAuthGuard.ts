import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { checkLoginAndRole } from '../api/auth/login';
export const useAuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const { isLoggedIn, isUserRole } = await checkLoginAndRole();
      if (!isLoggedIn || !isUserRole) {
        setError('You need to log in to use this feature.');
        return;
      }
      setError(null);
    } catch (e) {
      setError('Unknown error: ' + e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      check();
    }, [check]),
  );

  return { loading, error };
};
