import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { associationPost } from "../../reducer/associationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../Style/navbarStyle.css";
import { toast } from "react-toastify";

const RegisterAssociationModal = () => {
  //costanti della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const name = useRef(null);
  const region = useRef(null);
  const address = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const logo = useRef(null);
  const description = useRef(null);
  const pIva = useRef(null);

  const handleSubmit = () => {
    const data = {
      name: name.current.value,
      region: region.current.value,
      address: address.current.value,
      password: password.current.value,
      email: email.current.value,
      logo: logo.current.files[0],
      description: description.current.value,
      pIva: pIva.current.value,
    };

    dispatch(associationPost(data));

    toast.success(
      "Registrazione Effettuata con Successo! 👌 Ritorna alla Homepage ed Effettua il Login.",
      {
        position: "top-right", // Posizione del toast
        autoClose: 3000, // Durata in millisecondi
        hideProgressBar: false, // Mostra la barra di avanzamento
        closeOnClick: true, // Chiudi il toast al click
        pauseOnHover: true, // Metti in pausa al passaggio del mouse
        draggable: true, // Spostabile
        theme: "dark",
      }
    );
  };

  return (
    <>
      <Button
        variant="warning"
        className=" style-button-association shadow "
        onClick={handleShow}
      >
        Sei un Azienda?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form New Association</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>NAME</Form.Label>
              <Form.Control type="input" ref={name} placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupRegion">
              <Form.Label>REGION</Form.Label>
              <Form.Control type="input" ref={region} placeholder="Region" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAddress">
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control
                type="input"
                ref={address}
                placeholder="Enter Address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                ref={password}
                placeholder="Enter your password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                ref={email}
                placeholder="Enter email address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLogo">
              <Form.Label>LOGO</Form.Label>
              <Form.Control type="file" ref={logo} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>DESCRIPTION ASSOCIATION</Form.Label>
              <Form.Control
                type="text"
                ref={description}
                placeholder="description association"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPiva">
              <Form.Label>pIva</Form.Label>
              <Form.Control type="input" ref={pIva} placeholder="pIva" />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="success"
                className="text-light fw-bold"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterAssociationModal;
