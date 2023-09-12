import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import "../../Style/singlePostStyle.css";

const SinglePost = ({ post }) => {
  return (
    <Col lg={6} md={12} sm={12} xs={12}>
      <Card className="w-100 mb-4 shadow hover-specialShadow">
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title className="text-center fw-bold">{post.name}</Card.Title>
          <Card.Text className="d-flex justify-content-around align-items-center gap-4">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <GiPositionMarker /> {post.city}
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <LiaBirthdayCakeSolid /> {post.age}
            </div>
          </Card.Text>
          <Card.Text className="d-flex justify-content-around align-items-center gap-4">
            <div className="d-flex justify-content-center align-items-center gap-2">
              {post.gender.toLowerCase() == "maschio" ? (
                <BsGenderMale />
              ) : (
                <BsGenderFemale />
              )}
              {post.gender}
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <LiaRulerHorizontalSolid /> {post.dimension}
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center align-items-center gap-2 ">
          <img
            src={post.association.logo}
            className="style-logo-card"
            alt="logoAssociation"
          />
          <div>{post.association.name}</div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SinglePost;
