import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "@src/Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const { currentUser, updatePassword, updateEmail } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const Navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    const promises = [];
    setError("");

    if (emailRef.current.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        Navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    try {
      setError("");
      setLoading(true);
      Navigate("/");
    } catch (error: any) {
      console.log(error.message);
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  if (currentUser == null) return;

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email!}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep old password"
              />
            </Form.Group>
            <Form.Group id="password-confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep old password"
              />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        <Link to={"/"}>Cancel</Link>
      </div>
    </>
  );
}
