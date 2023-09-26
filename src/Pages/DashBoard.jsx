import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postByAssociationId } from "../reducer/postSlice";
import { nanoid } from "@reduxjs/toolkit";
import SpinnerLoading from "../components/SpinnerLoading";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useSession } from "../middlewares/ProtectedRoutes";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import NewPostModal from "../components/Post/NewPostModal";
import SinglePostDashboard from "../components/Association/SInglePostDashboard";
import {
  fetchReviewsByAssociation,
  associationsReviews,
} from "../reducer/reviewsSlice";
import SingleReviews from "../components/Reviews/SingleReviews";
import "../Style/dashboard.css";
import ChangeImageAssociation from "../components/Association/ChangeImageAssociation";
import Footer from "../components/Footer";
import ModifyAssociationModal from "../components/Association/ModifyAssociationModal";
import { associationById } from "../reducer/associationSlice";

const DashBoard = () => {
  const session = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const ArrayPostById = useSelector(
    (state) => state.adoptionPosts.postByIdAssociation
  );
  const { singleAssociation } = useSelector((state) => state.associations);

  const reviewsAssociation = useSelector(associationsReviews);
  console.log(reviewsAssociation);

  useEffect(() => {
    dispatch(associationById(session.id));
    dispatch(postByAssociationId(session.id));
    dispatch(fetchReviewsByAssociation(session.id));
  }, [dispatch, session.id]);

  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="mb-3">
            {singleAssociation.associationById ? (
              <Card className="w-100 shadow">
                <div className="div-logo-dashboard">
                  <Card.Img
                    variant="top"
                    className="p-5 "
                    src={singleAssociation.associationById.logo}
                  />
                  <div className="change-icon-absolute">
                    <ChangeImageAssociation />
                  </div>
                </div>

                <Card.Body className="text-center">
                  <Card.Title className="fs-2 fw-bold">
                    {session.name}
                  </Card.Title>
                  <Card.Text className="my-3">
                    {singleAssociation.associationById.description}
                  </Card.Text>
                  <hr />
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2">
                    <AiOutlineHome className="fs-3" />
                    {singleAssociation.associationById.region}
                  </Card.Text>
                  <Card.Text className="text-center">
                    {singleAssociation.associationById.address}
                  </Card.Text>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2">
                    <AiOutlineMail className="fs-3" />
                    {singleAssociation.associationById.email}
                  </Card.Text>
                  <ModifyAssociationModal />
                </Card.Body>
              </Card>
            ) : (
              <SpinnerLoading />
            )}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Visualizza le recensioni</Accordion.Header>
                <Accordion.Body>
                  {reviewsAssociation ? (
                    <section className="custom-scroll-reviews">
                      {reviewsAssociation &&
                        reviewsAssociation.reviewsAssociation?.map(
                          (reviews) => (
                            <SingleReviews reviews={reviews} key={nanoid()} />
                          )
                        )}
                    </section>
                  ) : (
                    <div className="my-5 d-flex justify-content-center align-items-center">
                      <SpinnerLoading />
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <h2 className="fst-italic">Pet {session.name}</h2>
            <NewPostModal />
            <Row className="custom-scroll">
              {ArrayPostById &&
                ArrayPostById?.map((post) => {
                  return <SinglePostDashboard key={nanoid()} post={post} />;
                })}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default DashBoard;
