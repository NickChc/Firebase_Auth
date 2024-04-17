import { useContext } from "react";
import { AuthContext } from "@src/Providers/AuthContext";

export function useAuthContext() {
  const { ...data } = useContext(AuthContext);

  return { ...data };
}
