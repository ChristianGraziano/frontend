import React from "react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import PostBoard from "../components/Post/PostBoard";
import ConsultingDiv from "../components/ConsultingDiv";

const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <Hero />
      <PostBoard />
      <ConsultingDiv />
    </>
  );
};

export default Homepage;
