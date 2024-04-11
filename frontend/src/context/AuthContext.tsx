import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from 'react';
import { AuthUser } from '../types/types';

type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: {
    username: '',
    displayName: '',
    email: '',
    location: '',
    profilePic: '',
    bio: '',
    _id: '',
    message: '',
  },
  setAuthUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem('authUser')!) || null,
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
