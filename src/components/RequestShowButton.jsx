import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestByAssociation } from "../reducer/requestAdoptionSlice";
import { useSession } from "../middlewares/ProtectedRoutes";
import { VscBellDot } from "react-icons/vsc";
import { VscBellSlash } from "react-icons/vsc";
import "../Style/requestAdoptionStyle.css";
import { Link } from "react-router-dom";

const RequestShowButton = () => {
  const session = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const requestById = useSelector(
    (state) =>
      state.requestAdoption.requestArrayByAssociation.requestAssociation
  );

  useEffect(() => {
    dispatch(fetchRequestByAssociation(session.id));
  }, [dispatch, session.id]);
  console.log("REQUEST BY ID", requestById);
  return (
    <>
      <Link to={"/requestAdoptionPage"}>
        <div className="mx-3">
          {requestById ? (
            <VscBellDot className="fs-3 pulse-infinite icon-black" />
          ) : (
            <VscBellSlash className="fs-3 icon-black" />
          )}
        </div>
      </Link>
    </>
  );
};

export default RequestShowButton;
