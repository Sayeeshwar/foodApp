import React from "react";

//React-bootstrap components
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

//Components
import Signup from "./Signup";
import Login from "./Login";

function Home() {
  // style of container
  const mystyle = {
    borderColor: "black",
    border: "4px",
    borderStyle: "solid",
    borderRadius: "5px",
    paddingLeft: "15px",
    marginTop: "75px",
  };

  return (
    <div>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <div style={mystyle}>
          <Row>
            {/* contains the doodle image */}
            <Col
              xs={0}
              md={8}
              style={{
                paddingRight: 0,
                paddingLeft: 0,
                borderRight: 2,
                borderRightStyle: "solid",
              }}
            >
              <Figure>
                <Figure.Image
                  width={500}
                  alt="171x180"
                  src="https://image.freepik.com/free-vector/fast-food-cartoon-color-illustration_7243-196.jpg"
                />
              </Figure>
            </Col>

            {/*Contains the Login and Signup components  */}
            <Col xs={12} md={4} style={{ paddingLeft: 0 }}>
              <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                <Tabs
                  justify
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                >
                  {/* Login Tab */}
                  <Tab eventKey="login" title="Login">
                    <Login />
                  </Tab>
                  {/* Signup Tab */}
                  <Tab eventKey="signup" title="Signup">
                    <Signup />
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Home;
