import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  storage: number;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface AuthContextData {
  user: User;
  logged: boolean;
  logIn(): void;
  exitApp(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(user: User): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Dirbbox:token',
        '@Dirbbox:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }     
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const reseponse = await api.post('sessions', { email, password });

    const { token, user } = reseponse.data;

    await AsyncStorage.multiSet([
      ['@Dirbbox:token', token],
      ['@Dirbbox:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    setLogged(true);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@Dirbbox:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Dirbbox:user', '@Dirbbox:token']);

    setLogged(false);
    setData({} as AuthState);
  }, []);

  const exitApp = useCallback(() => {
    setLogged(false);
  }, []);

  const logIn = useCallback(() => {
    setLogged(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, logged, signIn, updateUser, signOut, exitApp, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };