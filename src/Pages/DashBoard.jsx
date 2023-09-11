import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { associationById } from "../reducer/associationSlice";
import { nanoid } from "@reduxjs/toolkit";
import SpinnerLoading from "../components/SpinnerLoading";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useSession } from "../middlewares/ProtectedRoutes";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import NewPostModal from "../components/Post/NewPostModal";

const DashBoard = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="mb-3">
            <Card className="w-100 shadow">
              <Card.Img variant="top" className="p-5" src={session.logo} />
              <Card.Body className="text-center">
                <Card.Title className="fs-2 fw-bold">{session.name}</Card.Title>
                <Card.Text className="my-3">{session.description}</Card.Text>
                <hr />
                <Card.Text className="d-flex align-items-center justify-content-center gap-2">
                  <AiOutlineHome className="fs-3" />
                  {session.region}
                </Card.Text>
                <Card.Text className="text-center">{session.address}</Card.Text>
                <Card.Text className="d-flex align-items-center justify-content-center gap-2">
                  <AiOutlineMail className="fs-3" />
                  {session.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <h2>Pet di {session.name}</h2>
            <NewPostModal />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashBoard;
