import React from "react";
// React-bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  return (
    <div>
      <br />
      <br />
      <Form autoComplete="off" action="/login" method="POST">
        {/* Email field */}
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        {/* Password field */}
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
export default Login;
