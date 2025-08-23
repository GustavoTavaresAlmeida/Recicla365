// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockLogin, mockRegister, type User, type LoginCredentials, type RegisterData } from '../data';

export interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Carrega dados do usuário do localStorage na inicialização
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedToken = localStorage.getItem('recicla365-token');
        const storedUser = localStorage.getItem('recicla365-user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        // Limpa dados corrompidos
        localStorage.removeItem('recicla365-token');
        localStorage.removeItem('recicla365-user');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);

      const response = await mockLogin(credentials);
      
      const { user: userData, token: userToken } = response;

      // Salva no estado
      setUser(userData);
      setToken(userToken);

      // Persiste no localStorage
      localStorage.setItem('recicla365-token', userToken);
      localStorage.setItem('recicla365-user', JSON.stringify(userData));

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      if (data.senha !== data.confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      const response = await mockRegister(data);
      
      const { user: userData, token: userToken } = response;

      setUser(userData);
      setToken(userToken);

      localStorage.setItem('recicla365-token', userToken);
      localStorage.setItem('recicla365-user', JSON.stringify(userData));

    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('recicla365-token');
    localStorage.removeItem('recicla365-user');
  };

  const contextValue: AuthContextData = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

export { AuthContext };

export type { User, LoginCredentials, RegisterData };