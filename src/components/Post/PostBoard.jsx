import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getAdoptionPost, filterPosts } from "../../reducer/postSlice";
import { LiaSearchLocationSolid } from "react-icons/lia";
import SinglePost from "./SinglePost";
import PaginationElement from "../PaginationElement";

const PostBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { postsArray } = useSelector((state) => state.adoptionPosts);
  console.log(postsArray);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      dispatch(getAdoptionPost());
    }
    setSearchTerm(value);
  };

  const filteredResult = (e) => {
    e.preventDefault();
    dispatch(filterPosts(searchTerm));
  };

  useEffect(() => {
    dispatch(getAdoptionPost());
  }, []);

  return (
    <>
      <Container>
        <Form className="d-flex" onSubmit={filteredResult}>
          <Form.Control
            type="search"
            placeholder="Search region.."
            className="me-2 rounded-pill shadow fs-4 p-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button
            onClick={filteredResult}
            variant="outline-dark"
            className="rounded-pill p-3"
          >
            <LiaSearchLocationSolid className="fs-1" />
          </Button>
        </Form>
      </Container>
      <Container className="my-5">
        <Row>
          {postsArray &&
            postsArray.map((post) => {
              return <SinglePost key={nanoid()} post={post} />;
            })}
        </Row>
        <PaginationElement />
      </Container>
    </>
  );
};

export default PostBoard;
