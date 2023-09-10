import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoSavePets from "../asset/img-grande.png";
import "../Style/navbarStyle.css";
import RegisterAssociationModal from "./Association/RegisterAssociationModal";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useSession } from "../middlewares/ProtectedRoutes";
import { Dropdown } from "react-bootstrap";
import LogoutModal from "./LogoutModal";

const NavigationBar = () => {
  const navigate = useNavigate();

  const redirectHomeOnClick = () => {
    navigate("/");
  };

  const session = useSession();
  console.log(session);
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

          {session ? (
            <div className="d-flex align-items-center">
              <span className="fw-bold">{session.name}</span>

              <Dropdown>
                <Dropdown.Toggle className="style-dropdown-user">
                  {" "}
                  <img src={session.logo} alt="" className="img-userLogged" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <Link to={"/dashboard"} className="style-linkDashboard">
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <LogoutModal />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <>
              <RegisterAssociationModal />
              <Link to={"/login"}>
                <Button className="ms-2" variant="dark">
                  Login
                </Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
