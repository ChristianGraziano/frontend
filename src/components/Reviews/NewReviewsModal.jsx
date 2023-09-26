import React from "react";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createReviews,
  fetchReviewsByAssociation,
} from "../../reducer/reviewsSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { associationById } from "../../reducer/associationSlice";

const NewReviewsModal = () => {
  const dispatch = useDispatch();
  const { associationId } = useParams();
  console.log(associationId);

  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userName = useRef(null);
  const content = useRef(null);
  const rating = useRef(null);

  const submitReviews = async () => {
    const reviewsPayload = {
      userName: userName.current.value,
      associationId: associationId,
      content: content.current.value,
      rating: rating.current.value,
    };

    try {
      await dispatch(createReviews(reviewsPayload))
        .then(() => dispatch(fetchReviewsByAssociation(associationId)))
        .then(() => handleClose());

      toast.success("Recensione creata con successo!👍", {
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
      toast.error("Errore di caricamento!", {
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

  return (
    <>
      <Button
        variant="outline-info"
        onClick={handleShow}
        className="my-3 fw-bold"
      >
        Lasciaci una recensione 😄
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={userName}
              placeholder="User Name"
            />

            <Form.Control
              type="input"
              className="my-1"
              ref={content}
              placeholder="Content"
            />

            <Form.Select ref={rating} className="my-1">
              <option>Voto da 1 a 10</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitReviews}>
                Post
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewReviewsModal;
