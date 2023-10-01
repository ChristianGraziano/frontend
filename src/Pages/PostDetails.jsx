import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adoptionPostById } from "../reducer/postSlice";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import SpinnerLoading from "../components/SpinnerLoading";
import { AiOutlineHeart } from "react-icons/ai";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import "../Style/postDetails.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import RequestAdoptionModal from "../components/RequestAdoptionModal";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const singlePost = useSelector((state) => state.adoptionPosts.singlePost);

  useEffect(() => {
    dispatch(adoptionPostById(id));
  }, []);

  console.log(singlePost);
  return (
    <>
      <NavigationBar />
      {singlePost.PostsById ? (
        <Container className="mt-5">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Card className="w-100 mb-5 shadow">
                <Card.Img variant="top" src={singlePost.PostsById.image} />
                <Card.Body>
                  <div className=" d-flex justify-content-end gap-3">
                    {new Date(
                      singlePost.PostsById.createdAt
                    ).toLocaleDateString()}
                    <span>
                      {" "}
                      <AiOutlineHeart className="fs-4" /> Salva
                    </span>
                  </div>
                  <Card.Text className="text-center fs-2 fw-bold fst-italic">
                    {singlePost.PostsById.name}
                  </Card.Text>
                  <Card.Title className="d-flex justify-content-center gap-3 align-items-center">
                    <img
                      className="first-logoAssociation"
                      src={singlePost.PostsById.association.logo}
                      alt=""
                    />
                    <div className="text-center">
                      {singlePost.PostsById.association.name}
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>

              <Card className="p-3 mb-5 shadow">
                <h4>La mia storia</h4>
                <hr className="w-50 black" />
                <p>{singlePost.PostsById.content}</p>
              </Card>

              <Card className="p-3 mb-5 shadow ">
                <h4>Le mie caratteristiche</h4>
                <hr className="w-50 black" />
                <Card.Text>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    {singlePost.PostsById.gender.toLowerCase() === "maschio" ? (
                      <BsGenderMale className="fs-4" />
                    ) : (
                      <BsGenderFemale className="fs-4" />
                    )}
                    {singlePost.PostsById.gender}
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    {" "}
                    <LiaRulerHorizontalSolid className="fs-4" />{" "}
                    <span className="me-1">Dimensione:</span> {""}
                    {singlePost.PostsById.dimension}
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LiaBirthdayCakeSolid className="fs-4" />{" "}
                    <span className="me-1">Age:</span> {""}{" "}
                    {singlePost.PostsById.age}
                  </div>
                  <div className="d-flex  align-items-center gap-2 mb-2">
                    <GiPositionMarker className="fs-4" />{" "}
                    <span className="me-1">Position:</span>
                    {""} {singlePost.PostsById.location}
                  </div>
                  <div className="d-flex  align-items-center gap-2 mb-2">
                    <FaCity className="fs-4" />{" "}
                    <span className="me-1">City:</span>{" "}
                    {singlePost.PostsById.city}
                  </div>
                </Card.Text>
              </Card>

              <Card className="p-3 mb-5 shadow">
                <h4>L'associazione che mi ospita</h4>
                <hr className="w-50 black" />
                <Card.Text>
                  <div className="d-flex ps-2 align-items-center gap-3 mb-4 ">
                    <img
                      className="style-logo-association rounded"
                      src={singlePost.PostsById.association.logo}
                      alt=""
                    />
                    {singlePost.PostsById.association.name}
                  </div>
                  <div className="mb-3">
                    {singlePost.PostsById.association.description}
                  </div>
                  <div className="mb-3">
                    <AiOutlineCalendar className="fs-4" />{" "}
                    <span className="me-2">Registrato dal:</span>
                    {new Date(
                      singlePost.PostsById.association.createdAt
                    ).toLocaleDateString()}
                  </div>
                  <div className="d-flex  align-items-center gap-2 mb-2">
                    <GiPositionMarker className="fs-4" />{" "}
                    <span className="me-1">Position:</span>
                    {""} {singlePost.PostsById.association.region}
                  </div>
                  <div className="d-flex justify-content-center align-items-center my-4">
                    <Link
                      to={`/profileAssociation/${singlePost.PostsById.association._id}`}
                    >
                      <Button variant="outline-success">
                        Profilo Associazione
                      </Button>{" "}
                    </Link>
                  </div>
                </Card.Text>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Card className="text-center fixed-position">
                <Card.Title className="fs-2 fw-bold fst-italic my-2">
                  Stai pensando di adottare {singlePost.PostsById.name}?
                </Card.Title>
                <Card.Text className="fs-5">
                  L’invio della richiesta non ti vincola all’adozione di questo
                  animale ma ti permette semplicemente di essere ricontattato/a
                  da volontario referente
                </Card.Text>
                <div className="m-3">
                  <RequestAdoptionModal />
                </div>{" "}
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="my-5 d-flex justify-content-center align-items-center">
          <SpinnerLoading />
        </div>
      )}
      <Footer />
    </>
  );
};

export default PostDetails;
