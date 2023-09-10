import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

function LogoutModal() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.clear(); // Svuota il Local Storage
    navigate("/login"); // Reindirizza alla pagina di login o ad altra destinazione
  };

  return (
    <>
      <Button variant="trasparent" onClick={handleShow}>
        Logout
        <AiOutlineLogout className="ms-2" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out of your account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal;
