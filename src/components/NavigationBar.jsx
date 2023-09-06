import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoSavePets from "../asset/img-grande.png";
import "../Style/navbarStyle.css";
import RegisterAssociationModal from "./Association/RegisterAssociationModal";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const redirectHomeOnClick = () => {
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-navbar">
      <Container>
        <Navbar.Brand href="#">
          <img className="logo-style" src={LogoSavePets} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={redirectHomeOnClick}>Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>

          <RegisterAssociationModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
