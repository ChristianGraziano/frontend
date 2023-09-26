import React from "react";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../reducer/requestAdoptionSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RequestAdoptionModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const singlePost = useSelector((state) => state.adoptionPosts.singlePost);

  console.log(singlePost.PostsById.association._id);
  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const name = useRef(null);
  const surname = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
  const address = useRef(null);
  const birthdayDate = useRef(null);
  const fiscalCode = useRef(null);
  const avatar = useRef(null);
  const motivation = useRef(null);

  const submitRequest = async () => {
    const requestPayload = {
      name: name.current.value,
      surname: surname.current.value,
      email: email.current.value,
      phoneNumber: phoneNumber.current.value,
      address: address.current.value,
      birthdayDate: birthdayDate.current.value,
      fiscalCode: fiscalCode.current.value,
      avatar: avatar.current.files[0],
      motivation: motivation.current.value,
      associationId: singlePost.PostsById.association._id,
      postId: id,
    };
    try {
      await dispatch(createRequest(requestPayload)).then(handleClose());
      toast.success(
        "Recensione creata con successo!👍 sarai ricontattato a breve da un nostro volontario ",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Attenzione qualcosa e andato storto, Invio della richiesta fallito! ❌",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };
  return (
    <>
      <Button
        variant="outline-warning"
        onClick={handleShow}
        className="my-3 fw-bold fs-5 w-100 "
      >
        Invia Richiesta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new request for adoption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={name}
              placeholder="name"
            />

            <Form.Control
              type="input"
              className="my-1"
              ref={surname}
              placeholder="surname"
            />
            <Form.Control
              type="email"
              className="my-1"
              ref={email}
              placeholder="email"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={phoneNumber}
              placeholder="phoneNumber"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={address}
              placeholder="address"
            />
            <Form.Control
              type="date"
              className="my-1"
              ref={birthdayDate}
              placeholder="birthdayDate"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={fiscalCode}
              placeholder="fiscalCode"
            />
            <Form.Control type="file" className="my-1" ref={avatar} />
            <Form.Control
              type="text"
              className="my-1"
              ref={motivation}
              placeholder="motivation"
            />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitRequest}>
                Post
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestAdoptionModal;
