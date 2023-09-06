import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import "../Style/loginStyle.css";

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
      if (res.data.token) {
        localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <div className="div_login">
        <section className="d-flex justify-content-center pt-5 ">
          <p>
            Buongiorno ti presentiamo Save Pets e speriamo di riuscire nel
            vostro obbiettivo di aumentare l'adozione e la visibilità della
            vostra associazione, effettua il login ed accedi ai servizi.
          </p>
        </section>

        <Container>
          <Row>
            <Col xs={12}>
              <div className="d-flex  flex-column justify-content-center align-items-center gap-3 div_form mb-2">
                <div className="div_white p-3">
                  <h3 className="d-flex flex-column align-items-center fw-bold fs-1 text-black ">
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
                      className="bg bg-success button_login rounded"
                    >
                      Login
                    </button>
                    <button className=" p-2 bg bg-dark text-light rounded shadow mt-4 d-flex align-items-center justify-content-center gap-2">
                      <AiFillGithub className="icon-github" />
                      Login con Github
                    </button>
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
