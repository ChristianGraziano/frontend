import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import "../../Style/singlePostStyle.css";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  deleteAdoptionPost,
  postByAssociationId,
} from "../../reducer/postSlice";
import { useSession } from "../../middlewares/ProtectedRoutes";
import { toast } from "react-toastify";
import PatchPostModal from "../Post/PatchPostModal";

const SinglePostDashboard = ({ post }) => {
  const session = useSession();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdoptionPost(post._id));
      dispatch(postByAssociationId(session.id));

      toast.success("Post Eliminato Correttamente!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error("Qualcosa e andato storto!", {
        position: "top-center",
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
  return (
    <Col lg={6} md={12} sm={12} xs={12} className="fade-in-element">
      <Card className="w-100 mb-4 shadow hover-specialShadow ">
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
              {post.gender.toLowerCase() === "maschio" ? (
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
        <Card.Footer className="d-flex justify-content-end align-items-center gap-2 ">
          <Button variant="dark" onClick={handleDelete}>
            <BsFillTrash3Fill />
          </Button>
          <PatchPostModal post={post} />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SinglePostDashboard;
