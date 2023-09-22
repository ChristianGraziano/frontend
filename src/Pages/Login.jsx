import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import "../Style/loginStyle.css";
import { toast } from "react-toastify";
import OrmeImg from "../asset/orme.png";
import { AiOutlineHome } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({});
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5050/login",
        loginFormData
      );

      toast.success(" Login Effettuato Con Successo!!👍 ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      if (res.data.token) {
        localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Email o password non valide!", {
        position: "top-right",
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

  const redirectHomeOnClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="div_login">
        <AiOutlineHome
          onClick={redirectHomeOnClick}
          className=" m-5 fs-2 home-button"
        />
        <Container className="MainContainer">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12} className="slide-in">
              <section className="fade-in-element">
                <p className=" text-center fs-4 p-login ">
                  Buongiorno ti presentiamo Save Pets e speriamo di riuscire nel
                  vostro obbiettivo di aumentare l'adozione e la visibilità
                  della vostra associazione, effettua il login ed accedi ai
                  servizi.
                </p>
                <div className="d-flex justify-content-center">
                  <img src={OrmeImg} alt="img orme cane" className="img-orme" />
                </div>
              </section>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12} className="fade-in-element">
              <div className="d-flex  flex-column justify-content-center align-items-center gap-3 div mb-2">
                <div className="div_white p-3">
                  <h3 className="d-flex flex-column align-items-center fw-bold fs-1 text-black fst-italic  ">
                    Login
                  </h3>
                  <form
                    onSubmit={loginSubmit}
                    className="d-flex flex-column gap-3"
                  >
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className=" p-2 rounded me-3 input_style"
                      onChange={(e) =>
                        setLoginFormData({
                          ...loginFormData,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className=" p-2 rounded me-3 input_style"
                      onChange={(e) =>
                        setLoginFormData({
                          ...loginFormData,
                          password: e.target.value,
                        })
                      }
                    />
                    <button
                      type="submit"
                      className="bg bg-success button_login rounded p-1 fw-bold"
                    >
                      Login
                    </button>
                    <hr />
                    <div className="d-flex align-items-center justify-content-center"></div>
                    <div className="d-flex align-items-center justify-content-center gap-4">
                      <AiFillGithub className="fs-2 hoverZoom" />
                      <BsFacebook className="fs-3 hoverZoom" />
                      <AiOutlineGoogle className="fs-2 hoverZoom" />
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
