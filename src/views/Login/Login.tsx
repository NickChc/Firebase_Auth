import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "@src/Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const Navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current == null || passwordRef.current == null) return;

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      Navigate("/");
    } catch (error: any) {
      console.log(error.message);
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Form>
      <div className="w-100 text-center mt-3">
        <Link to={"/forgot-password"}>Forgot Password?</Link>
      </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
}
