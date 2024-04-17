import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PrivateRoute } from "./feature/PrivateRoute";

const Dashboard = lazy(() => import("@src/views/Dashboard"));
const Signup = lazy(() => import("@src/views/Signup"));
const Login = lazy(() => import("@src/views/Login"));
const ForgotPassword = lazy(() => import("@src/views/ForgotPassword"));
const UpdateProfile = lazy(() => import("@src/views/UpdateProfile"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100dvh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
    </Suspense>
  );
}

export default App;
