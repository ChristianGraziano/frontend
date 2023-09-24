import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { patchAssociation } from "../../reducer/associationSlice";
import { useSession } from "../../middlewares/ProtectedRoutes";
import { toast } from "react-toastify";
import { LuPencil } from "react-icons/lu";

const ModifyAssociationModal = () => {
  const session = useSession();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const name = useRef(null);
  const region = useRef(null);
  const address = useRef(null);
  const email = useRef(null);
  const description = useRef(null);

  const handleUpdate = () => {
    const associationId = session.id;
    console.log(associationId);
    const dataToUpdate = {
      name: name.current.value,
      region: region.current.value,
      address: address.current.value,
      email: email.current.value,
      description: description.current.value,
    };
    try {
      dispatch(
        patchAssociation({ associationId: associationId, dataToUpdate })
      ).then(handleClose());
      toast.success(
        "Modifica avvenuta con successo, rieffettuare il login per confermare le modifiche👌",
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
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="my-3">
        <LuPencil />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={name}
              defaultValue={session.name}
              placeholder="name"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={region}
              defaultValue={session.region}
              placeholder="region"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={address}
              defaultValue={session.address}
              placeholder="address"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={email}
              defaultValue={session.email}
              placeholder="email"
            />

            <Form.Control
              type="input"
              className="my-1"
              ref={description}
              defaultValue={session.description}
              placeholder="description"
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
export default ModifyAssociationModal;
