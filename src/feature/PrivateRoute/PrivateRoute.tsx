import { useAuthContext } from "@src/Providers/AuthContext";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: PropsWithChildren) {
  const { currentUser } = useAuthContext();

  return <>{currentUser ? children : <Navigate to={"/login"} />}</>;
}
