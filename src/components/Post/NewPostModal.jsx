import React from "react";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { postAdoptionPosts } from "../../reducer/postSlice";

const NewPostModal = () => {
  const dispatch = useDispatch();

  const typeAnimal = useRef(null);
  const name = useRef(null);
  const age = useRef(null);
  const gender = useRef(null);
  const dimension = useRef(null);
  const location = useRef(null);
  const city = useRef(null);
  const image = useRef(null);
  const content = useRef(null);

  const submitForm = async () => {
    const token = localStorage.getItem("userLoggedIn");
    if (token) {
      const decodedToken = jwtDecode(token);
      const associationId = decodedToken.id;

      const postPayload = {
        typeAnimal: typeAnimal.current.value,
        name: name.current.value,
        age: age.current.value,
        gender: gender.current.value,
        dimension: dimension.current.value,
        location: location.current.value,
        city: city.current.value,
        image: image.current.files[0],
        association: associationId,
        content: content.current.value,
      };

      dispatch(postAdoptionPosts(postPayload)).then(() => {
        handleClose();
      });
    }
  };

  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Add New Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post for adoption!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={typeAnimal}
              placeholder="Type Animal"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={name}
              placeholder="Name"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={age}
              placeholder="Age"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={gender}
              placeholder="Gender"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={dimension}
              placeholder="Dimension"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={location}
              placeholder="Location"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={city}
              placeholder="City"
            />
            <Form.Control type="file" className="my-1" ref={image} />
            <Form.Control
              type="input"
              className="my-1"
              ref={content}
              placeholder="Content"
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitForm}>
                Post
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPostModal;
