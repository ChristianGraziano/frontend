import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adoptionPostById } from "../reducer/postSlice";
import { Container, Card, Col, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import SpinnerLoading from "../components/SpinnerLoading";
import { AiOutlineHeart } from "react-icons/ai";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { LiaRulerHorizontalSolid } from "react-icons/lia";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(adoptionPostById(id));
  }, [dispatch, id]);

  const singlePost = useSelector((state) => state.adoptionPosts.singlePost);

  console.log(singlePost);
  return (
    <>
      <NavigationBar />
      {singlePost ? (
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
                    <img src={singlePost.PostsById.association.logo} alt="" />
                    {singlePost.PostsById.association.name}
                  </Card.Title>
                </Card.Body>
              </Card>

              <Card className="p-3 mb-5 shadow">
                <h4>La mia storia</h4>
                <hr className="w-50 black" />
                <p>{singlePost.PostsById.content}</p>
              </Card>

              <Card className="p-3 mb-5 shadow">
                <h4>Le mie caratteristiche</h4>
                <hr className="w-50 black" />
                <Card.Text>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    {singlePost.PostsById.gender.toLowerCase() === "maschio" ? (
                      <BsGenderMale />
                    ) : (
                      <BsGenderFemale />
                    )}
                    {singlePost.PostsById.gender}
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    {" "}
                    <LiaRulerHorizontalSolid className="fs-4" /> Dimensione:{" "}
                    {""}
                    {singlePost.PostsById.dimension}
                  </div>
                </Card.Text>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              donazioni
            </Col>
          </Row>
        </Container>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
};

export default PostDetails;
