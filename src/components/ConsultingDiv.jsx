import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import manWithDog from "../asset/man-with-dog.png";
import "../Style/ConsultingStyle.css";

const ConsultingDiv = () => {
  return (
    <Container fluid className="p-3 ">
      <Row className="p-0">
        <Col
          lg={8}
          md={8}
          sm={12}
          xs={12}
          className="d-flex flex-column align-items-start justify-content-center fs-2 rounded style-consulting"
        >
          <p>
            Affidati agli esperti di Save Pets per scegliere il pet più adatto
            alle tue esigenze!
          </p>
          <Button className="style-consultingButton rounded-pill mt-2">
            Prenota Una Consulenza
          </Button>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
          <img className="w-100 rounded p-0" src={manWithDog} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultingDiv;
