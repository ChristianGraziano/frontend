import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { associationChangeLogo } from "../../reducer/associationSlice";
import { useSession } from "../../middlewares/ProtectedRoutes";
import { toast } from "react-toastify";
import "../../Style/changeLogo.css";
import { MdChangeCircle } from "react-icons/md";

const ChangeImageAssociation = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const session = useSession();

  const handleLogoSelect = (event) => {
    const file = event.target.files[0];
    setSelectedLogo(file);
  };

  const handleLogoUpload = () => {
    // Chiamata per cambiare il logo
    try {
      dispatch(associationChangeLogo({ id: session.id, logo: selectedLogo }));
      setShowModal(false);
      toast.success(
        "Logo cambiato con successo, esci ed effettua di nuovo il login per confermare la modifica ",
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
    } catch (error) {}
  };

  return (
    <div>
      <MdChangeCircle
        className="fs-2 icon-change"
        onClick={() => setShowModal(true)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Association Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Logo Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleLogoSelect}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogoUpload}>
            Upload Logo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeImageAssociation;
