import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "@src/Providers/AuthContext";
import { auth } from "@src/firebase";
import firebase from "firebase/compat/app";

export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function logout() {
    return auth.signOut();
  }

  async function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }


  async function updateEmail(email: string) {
    return currentUser?.updateEmail(email);
  }


  async function updatePassword(password: string) {
    return currentUser?.updatePassword(password);

  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        currentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
