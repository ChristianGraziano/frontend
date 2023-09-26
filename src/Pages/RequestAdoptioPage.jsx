import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestByAssociation } from "../reducer/requestAdoptionSlice";
import { useSession } from "../middlewares/ProtectedRoutes";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import SpinnerLoading from "../components/SpinnerLoading";
import SingleRequest from "../components/SingleRequest";
import { nanoid } from "nanoid";

const RequestAdoptioPage = () => {
  const session = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const requestById = useSelector(
    (state) =>
      state.requestAdoption.requestArrayByAssociation.requestAssociation
  );

  useEffect(() => {
    dispatch(fetchRequestByAssociation(session.id));
  }, [session.id]);
  console.log("REQUEST ADOPTION PAGE", requestById);
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          {requestById && requestById.length !== 0 ? (
            requestById.map((request) => {
              return <SingleRequest key={nanoid()} request={request} />;
            })
          ) : (
            <SpinnerLoading />
          )}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default RequestAdoptioPage;
