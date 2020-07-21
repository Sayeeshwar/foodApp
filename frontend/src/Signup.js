import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Signup() {
  return (
    <div>
      <br />
      <br />
      <Form autoComplete="off" action="/signup" method="POST">
        <Form.Group>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="uname"
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="pwd"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="age"
            type="number"
            placeholder="Enter your age"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            name="phno"
            type="text"
            placeholder="Enter your phone number"
          />
        </Form.Group>

        <Form.Text className="text-muted">
          We'll never share your data with anyone else.
        </Form.Text>
        <br />

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}
export default Signup;
