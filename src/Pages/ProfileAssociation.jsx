import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { associationById } from "../reducer/associationSlice";
import { Container, Card, Col, Row, Button, Form } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import SpinnerLoading from "../components/SpinnerLoading";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import SinglePostProfileAssociation from "../components/Post/SinglePostProfileAssociation";
import {
  fetchReviewsByAssociation,
  associationsReviews,
} from "../reducer/reviewsSlice";
import { postByAssociationId } from "../reducer/postSlice";
import { nanoid } from "@reduxjs/toolkit";
import SingleReviews from "../components/Reviews/SingleReviews";
import "../Style/profileAssociation.css";
import Footer from "../components/Footer";
import NewReviewsModal from "../components/Reviews/NewReviewsModal";

const ProfileAssociation = () => {
  const dispatch = useDispatch();
  const { associationId } = useParams();

  const { singleAssociation } = useSelector((state) => state.associations);

  const ArrayPostById = useSelector(
    (state) => state.adoptionPosts.postByIdAssociation
  );
  const reviewsAssociation = useSelector(associationsReviews);
  console.log(reviewsAssociation);
  console.log(ArrayPostById);
  useEffect(() => {
    dispatch(associationById(associationId));
    dispatch(postByAssociationId(associationId));
  }, [dispatch, associationId, reviewsAssociation]);

  console.log(singleAssociation);
  return (
    <>
      <NavigationBar />
      {singleAssociation.associationById ? (
        <Container className="mt-5">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Card className="w-100 shadow">
                <Card.Img
                  variant="top"
                  className="p-5"
                  src={singleAssociation.associationById.logo}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fs-2 fw-bold">
                    {singleAssociation.associationById.name}
                  </Card.Title>
                  <Card.Text className="d-flex justify-content-center align-items-center gap-2 my-4">
                    <BsCalendar3 className="fs-4" /> <span>Iscritto dal</span>
                    {new Date(
                      singleAssociation.associationById &&
                        singleAssociation.associationById.createdAt
                    ).toLocaleDateString()}
                  </Card.Text>
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
                </Card.Body>
              </Card>
              <div className="text-center fs-3 fst-italic mt-5 mb-2 ">
                Reviews
              </div>
              <div>
                {" "}
                <NewReviewsModal id />
              </div>
              {reviewsAssociation ? (
                <section className="custom-scroll-reviews">
                  {singleAssociation.associationById.reviews &&
                    singleAssociation.associationById.reviews?.map(
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
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="mb-3">
                <span className=" fst-italic fs-4">
                  Tutti i Pet di {singleAssociation.associationById.name}
                  <Form className="d-flex my-2">
                    <Form.Control
                      type="search"
                      placeholder="Cerca per nome"
                      className="me-2 w-50 "
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </span>
              </div>
              <Row className="custom-scroll-profileAssociation">
                {ArrayPostById &&
                  ArrayPostById?.map((post) => {
                    return (
                      <SinglePostProfileAssociation
                        key={nanoid()}
                        post={post}
                      />
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <SpinnerLoading />
      )}
      <Footer />
    </>
  );
};

export default ProfileAssociation;
