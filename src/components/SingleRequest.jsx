import React from "react";
import { Card, Col } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BiCodeBlock } from "react-icons/bi";
import "../Style/requestAdoptionStyle.css";

const SingleRequest = (requests) => {
  const request = requests.request;
  return (
    <Col lg={6} md={6} sm={12} xs={12}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-center align-items center fst-italic fw-bold my-3">
            {" "}
            {request.name} {request.surname}{" "}
          </Card.Title>
          <div className="d-flex justify-content-center align-items center mb-2">
            <Card.Img className="imgUser-request " src={request.avatar} />
          </div>
          <Card.Text className="text-center">{request.motivation}</Card.Text>
          <Card.Text>
            <h6 className="text-center fs-4 bw-bold my-4">Info & contatti:</h6>
            <div className="d-flex justify-content-center align-items center mb-2">
              <AiOutlineMail className="fs-5 me-2" />{" "}
              <span>{request.email}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <BsFillTelephoneFill className="fs-5 me-2 " />{" "}
              <span>{request.phoneNumber}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <GiPositionMarker className="fs-5 me-2" />{" "}
              <span>{request.address}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <LiaBirthdayCakeSolid className="fs-2 me-2" />{" "}
              <span>{request.birthdayDate}</span>
            </div>
            <div className="d-flex justify-content-center align-items center mb-2">
              <BiCodeBlock className="fs-5 me-2" />{" "}
              <span>{request.fiscalCode}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleRequest;
