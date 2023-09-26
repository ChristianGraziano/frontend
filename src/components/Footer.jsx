import React from "react";
import "../Style/footerStyle.css";
import { Col, Container, Row } from "react-bootstrap";
import LogoGrande from "../asset/img-grande.png";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsTiktok } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Container fluid className="background-footer py-5 mt-5">
        <Row>
          <Col
            lg={6}
            md={4}
            sm={6}
            xs={6}
            className="d-flex justify-content-center"
          >
            <img src={LogoGrande} className="logo-footer" alt="" />
          </Col>
          <Col lg={3} md={4} sm={6} xs={6}>
            <ul className="ul-style text-center fw-bold">
              <li>Chi Siamo</li>
              <li>Cerca Pet</li>
              <li>Contatti</li>
              <li>Assistenza</li>
            </ul>
          </Col>
          <Col
            lg={3}
            md={4}
            sm={12}
            xs={12}
            className="d-flex align-items-center justify-content-center gap-4"
          >
            <AiFillInstagram className="fs-2 hoverZoom" />
            <FaFacebookF className="fs-3 hoverZoom" />
            <BsTiktok className="fs-3 hoverZoom" />
          </Col>
        </Row>
      </Container>
      <div className="d-flex justify-content-center align-items-center style-final-footer text-center">
        <h6>
          Sito Sviluppato da{" "}
          <Link
            to={"https://www.linkedin.com/in/christian-graziano-678aa8b0"}
            target="blank"
          >
            Christian Graziano
          </Link>{" "}
          @ Studente EPICODE 2023
        </h6>
      </div>
    </>
  );
};

export default Footer;
