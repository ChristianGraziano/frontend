import React, { useState } from "react";
import { Card, Col, Modal, Button } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BiCodeBlock } from "react-icons/bi";
import "../Style/requestAdoptionStyle.css";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  deleteRequestAdoption,
  fetchRequestByAssociation,
} from "../reducer/requestAdoptionSlice";
import { useSession } from "../middlewares/ProtectedRoutes";
import { toast } from "react-toastify";

const SingleRequest = (requests) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const session = useSession();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(deleteRequestAdoption(request._id)).then(() =>
        dispatch(fetchRequestByAssociation(session.id))
      );

      toast.success("Richiesta di adozione eliminata correttamente!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error("Qualcosa e andato storto!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const request = requests.request;
  return (
    <Col lg={6} md={6} sm={12} xs={12}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-center align-items center fst-italic fw-bold my-3">
            {" "}
            {request.name} {request.surname}{" "}
          </Card.Title>
          <div className="d-flex justify-content-center align-items center mb-2">
            <Card.Img className="imgUser-request " src={request.avatar} />
          </div>
          <Card.Text className="text-center">{request.motivation}</Card.Text>
          <Card.Text>
            <h6 className="text-center fs-4 bw-bold my-4">Info & contatti:</h6>
            <div className="d-flex justify-content-center align-items center mb-2">
              <AiOutlineMail className="fs-5 me-2" />{" "}
              <span>{request.email}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <BsFillTelephoneFill className="fs-5 me-2 " />{" "}
              <span>{request.phoneNumber}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <GiPositionMarker className="fs-5 me-2" />{" "}
              <span>{request.address}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <LiaBirthdayCakeSolid className="fs-2 me-2" />{" "}
              <span>{request.birthdayDate}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <BiCodeBlock className="fs-5 me-2" />{" "}
              <span>{request.fiscalCode}</span>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-dark" onClick={handleShow}>
            <BsFillTrash3Fill />
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">
                Sei Sicuro di voler Eliminare la richiesta di adozione?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Una volta eliminata non potrai più recuperarla!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SingleRequest;
