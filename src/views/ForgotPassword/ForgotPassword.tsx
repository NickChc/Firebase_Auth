import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "@src/Providers/AuthContext";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);

  const { resetPassword } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current == null) return;

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for password recovery");
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Reset Password"}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to={"/login"}>Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
}
