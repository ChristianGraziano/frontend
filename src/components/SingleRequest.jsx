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
      <Card>
        <Card.Body>
          <Card.Title>
            {" "}
            {request.name} {request.surname}{" "}
          </Card.Title>
          <Card.Img className="imgUser-request" src={request.avatar} />
          <Card.Text>{request.motivation}</Card.Text>
          <Card.Text>
            <h6>Info</h6>
            <div>
              <AiOutlineMail /> <span>{request.email}</span>
            </div>
            <div>
              <BsFillTelephoneFill /> <span>{request.phoneNumber}</span>
            </div>
            <div>
              <GiPositionMarker /> <span>{request.address}</span>
            </div>
            <div>
              <LiaBirthdayCakeSolid /> <span>{request.birthdayDate}</span>
            </div>
            <div>
              <BiCodeBlock /> <span>{request.fiscalCode}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleRequest;
