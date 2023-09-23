import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postByAssociationId } from "../reducer/postSlice";
import { nanoid } from "@reduxjs/toolkit";
import SpinnerLoading from "../components/SpinnerLoading";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
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

const DashBoard = () => {
  const session = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const ArrayPostById = useSelector(
    (state) => state.adoptionPosts.postByIdAssociation
  );
  const reviewsAssociation = useSelector(associationsReviews);
  console.log(reviewsAssociation);

  useEffect(() => {
    dispatch(postByAssociationId(session.id));
    dispatch(fetchReviewsByAssociation(session.id));
  }, [dispatch, session.id]);

  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="mb-3">
            <Card className="w-100 shadow">
              <Card.Img variant="top" className="p-5" src={session.logo} />
              <ChangeImageAssociation />
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
            <div className="text-center fs-3 fst-italic mt-5 mb-2 ">
              Reviews
            </div>
            {reviewsAssociation ? (
              <section className="custom-scroll-reviews">
                {reviewsAssociation &&
                  reviewsAssociation.reviewsAssociation?.map((reviews) => (
                    <SingleReviews reviews={reviews} key={nanoid()} />
                  ))}
              </section>
            ) : (
              <div className="my-5 d-flex justify-content-center align-items-center">
                <SpinnerLoading />
              </div>
            )}
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
