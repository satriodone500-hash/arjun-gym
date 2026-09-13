import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem('arjun-gym-auth');
    if (stored) {
      return JSON.parse(stored);
    }
    return { isAuthenticated: false, user: null };
  });

  const login = useCallback((email: string, _password: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const state: AuthState = {
          isAuthenticated: true,
          user: {
            name: 'Raka Pratama',
            email: email,
          },
        };
        setAuth(state);
        localStorage.setItem('arjun-gym-auth', JSON.stringify(state));
        resolve(true);
      }, 1500);
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('arjun-gym-auth');
  }, []);

  return { ...auth, login, logout };
}
