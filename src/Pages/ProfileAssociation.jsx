import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { associationById } from "../reducer/associationSlice";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import SpinnerLoading from "../components/SpinnerLoading";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";

const ProfileAssociation = () => {
  const dispatch = useDispatch();
  const { associationId } = useParams();

  const { singleAssociation } = useSelector((state) => state.associations);

  useEffect(() => {
    dispatch(associationById(associationId));
  }, [dispatch, associationId]);

  console.log(singleAssociation);
  return (
    <>
      <NavigationBar />
      {singleAssociation.associationById ? (
        <Container className="mt-5">
          <Row>
            <Col>
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
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              div 2
            </Col>
          </Row>
        </Container>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
};

export default ProfileAssociation;
