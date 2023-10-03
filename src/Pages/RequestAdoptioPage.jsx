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
      <div className="d-flex justify-content-center mt-5">
        <h2 className="fs-2 fw-bold fst-italic">Richieste di Adozione </h2>
      </div>
      <Container className="my-5">
        <Row>
          {requestById && requestById.length !== 0 ? (
            requestById.map((request) => {
              return <SingleRequest key={nanoid()} request={request} />;
            })
          ) : (
            <div className="my-5 d-flex justify-content-center align-items-center">
              <SpinnerLoading />
            </div>
          )}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default RequestAdoptioPage;
