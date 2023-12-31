import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdoptionPost,
  getAdoptionPostByRegion,
} from "../../reducer/postSlice";
import { LiaSearchLocationSolid } from "react-icons/lia";
import SinglePost from "./SinglePost";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "../../Style/postBoard.css";
import SpinnerLoading from "../SpinnerLoading";

const PostBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { postsArray } = useSelector((state) => state.adoptionPosts);
  console.log("PAGINATION", postsArray);
  const [actualPage, setActualPage] = useState(1);

  const changePage = (value) => {
    setActualPage(value);
    console.log(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      dispatch(getAdoptionPost());
    }
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getAdoptionPostByRegion(searchTerm));
  };

  useEffect(() => {
    dispatch(getAdoptionPost({ page: actualPage, pageSize: 8 }));
  }, [actualPage, dispatch]);

  return (
    <>
      <Container>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search region.."
            className="me-2 styleSearchBar-home shadow fs-4 p-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button
            type="submit"
            variant="outline-dark"
            className="rounded-pill p-3"
          >
            <LiaSearchLocationSolid className="fs-1" />
          </Button>
        </Form>
      </Container>
      <Container className="my-5 pt-5">
        <Row>
          {postsArray.post ? (
            postsArray.post.map((post) => {
              return (
                <SinglePost
                  key={nanoid()}
                  post={post}
                  lg={3}
                  md={4}
                  sm={12}
                  xs={12}
                />
              );
            })
          ) : (
            <div className="my-5 d-flex justify-content-center align-items-center">
              <SpinnerLoading />
            </div>
          )}
        </Row>
        <ResponsivePagination
          current={actualPage}
          total={postsArray && postsArray.totalPages}
          onPageChange={changePage}
        />
      </Container>
    </>
  );
};

export default PostBoard;
