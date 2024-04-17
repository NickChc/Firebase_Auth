import { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuthContext } from "@src/Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const [error, setError] = useState<string>("");
  const { logout, currentUser } = useAuthContext();

  const Navigate = useNavigate();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      Navigate("/login");
    } catch (error: any) {
      console.log(error.message);
      setError("Failed to sign out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to={"/update-profile"} className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </>
  );
}
