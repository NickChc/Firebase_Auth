import { createContext } from "react";
import firebase from "firebase/compat/app";

interface AuthContextProps {
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
  currentUser: firebase.User | null;
}

export const AuthContext = createContext<AuthContextProps>({
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateEmail: async () => {},
  updatePassword: async () => {},
  currentUser: null,
});
