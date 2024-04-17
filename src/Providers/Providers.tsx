import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@src/Providers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";


export function Providers({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
