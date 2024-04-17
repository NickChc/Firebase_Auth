import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "@src/Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const { signup } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const Navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      emailRef.current == null ||
      passwordRef.current == null ||
      passwordConfirmRef.current == null
    )
      return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      Navigate("/");
    } catch (error: any) {
      console.log(error.message);
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </>
  );
}
