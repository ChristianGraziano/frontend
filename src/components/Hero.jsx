import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogoSavePetsCompleto from "../asset/logo-savePets-grande.png";
import "../Style/heroStyle.css";
import Collage1 from "../asset/Risorsa-1.png";

const Hero = () => {
  return (
    <section>
      <Container>
        <Row className="d-flex align-items-end">
          <Col lg={4} md={12} sm={12} xs={12}>
            <div className="mt-5 d-flex justify-content-center py-2 align-items-center ">
              <img
                className="style-logo-hero mt-5 fade-in-element"
                src={LogoSavePetsCompleto}
                alt="Logo"
              />
            </div>
          </Col>
          <Col lg={8} md={12} sm={12} xs={12}>
            <div className="mt-5 d-flex justify-content-center py-2 align-items-center">
              <img
                className="collage-style fade-in-element"
                src={Collage1}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
