import React from "react";
import { Card } from "react-bootstrap";
import { AiTwotoneStar } from "react-icons/ai";
import "../../Style/singleReviews.css";

const SingleReviews = (reviews) => {
  const review = reviews.reviews;
  return (
    <Card className="w-100 mb-5">
      <Card.Body>
        <Card.Title>{review && review.userName}</Card.Title>
        <Card.Text>{review && review.content}</Card.Text>
      </Card.Body>
      <Card.Footer className=" d-flex align-items-center gap-1">
        <AiTwotoneStar className="fs-5 color-starIcon" /> (
        {review && review.rating})
      </Card.Footer>
    </Card>
  );
};

export default SingleReviews;
