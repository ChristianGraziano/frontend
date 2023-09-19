import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  postByAssociationId,
  patchAdoptionPost,
} from "../../reducer/postSlice";
import { useSession } from "../../middlewares/ProtectedRoutes";
import { LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";

const PatchPostModal = ({ post }) => {
  const session = useSession();
  const dispatch = useDispatch();

  const typeAnimal = useRef("");
  const name = useRef("");
  const age = useRef("");
  const gender = useRef("");
  const dimension = useRef("");
  const location = useRef("");
  const city = useRef("");
  const image = useRef("");
  const content = useRef("");

  const handleUpdate = async () => {
    const { _id } = post;
    const dataToUpdate = {
      typeAnimal: typeAnimal.current.value,
      name: name.current.value,
      age: age.current.value,
      gender: gender.current.value,
      dimension: dimension.current.value,
      location: location.current.value,
      city: city.current.value,
      image: image.current.files[0],
      association: session.id,
      content: content.current.value,
    };

    try {
      dispatch(patchAdoptionPost({ postId: _id, dataToUpdate })).then(() =>
        dispatch(postByAssociationId(session.id))
      );
      handleClose();

      toast.success("Post Modificato correttamente 👌", {
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

      toast.error("❌ Qualcosa e andato storto!", {
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

  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="my-3">
        <LuPencil />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={typeAnimal}
              defaultValue={post.typeAnimal}
              placeholder="Type Animal"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={name}
              defaultValue={post.name}
              placeholder="Name"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={age}
              defaultValue={post.age}
              placeholder="Age"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={gender}
              defaultValue={post.gender}
              placeholder="Gender"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={dimension}
              defaultValue={post.dimension}
              placeholder="Dimension"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={location}
              defaultValue={post.location}
              placeholder="Location"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={city}
              defaultValue={post.city}
              placeholder="City"
            />
            <Form.Control type="file" className="my-1" ref={image} />
            <Form.Control
              type="input"
              className="my-1"
              ref={content}
              defaultValue={post.content}
              placeholder="Content"
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleUpdate}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PatchPostModal;
