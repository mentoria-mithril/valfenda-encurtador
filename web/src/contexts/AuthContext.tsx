import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EnviaLogin,
  getUsuarioSessao,
  Login,
  logout,
  RetornoLogin,
} from "../services/auth";

interface AuthContextType {
  usuario: RetornoLogin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  realizaLogin: (login: Login) => Promise<void>;
  realizaLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<RetornoLogin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verificarSessao();
  }, []);

  const verificarSessao = async () => {
    try {
      const res = await getUsuarioSessao();
      setUsuario(res);
      setIsLoading(false);
    } catch {
      setUsuario(null);
      setIsLoading(false);
    }
  };

  const realizaLogin = async (login: Login) => {
    const res = await EnviaLogin(login);
    setUsuario(res);
  };

  const realizaLogout = async () => {
    await logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoading,
        isAuthenticated: !!usuario,
        realizaLogin,
        realizaLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
