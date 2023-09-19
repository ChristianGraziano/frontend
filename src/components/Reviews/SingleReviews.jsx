import React from "react";
import { Card } from "react-bootstrap";

const SingleReviews = (reviews) => {
  const review = reviews.reviews;
  return (
    <Card className="w-100 mb-5">
      <Card.Body>
        <Card.Title>{review && review.userName}</Card.Title>
        <Card.Text>{review && review.content}</Card.Text>
      </Card.Body>
      <Card.Footer>{review && review.rating}</Card.Footer>
    </Card>
  );
};

export default SingleReviews;
