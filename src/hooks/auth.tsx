import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  doctor: object;
}

interface SignInCredentials {
  crm: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, doctor] = await AsyncStorage.multiGet([
        '@Clinica:token',
        '@Clinica:doctor',
      ]);

      if (token[1] && doctor[1]) {
        setData({ token: token[1], doctor: JSON.parse(doctor[1]) });
      }

      setLoading(false);
    }
    console.log("hey")
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ crm, password }) => {
    // console.log({ crm, password })
    const response = await api.post('sessions/doctor', { crm, password });
    const { token, doctor } = response.data;
    console.log(doctor);
    await AsyncStorage.multiSet([
      ['@Clinica:token', token],
      ['@Clinica:doctor', JSON.stringify(doctor)],
    ]);

    setData({ token, doctor });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Clinica:token', '@Clinica:doctor']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.doctor, loading, signIn, signOut }}>
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
