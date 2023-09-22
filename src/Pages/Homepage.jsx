import React from "react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import PostBoard from "../components/Post/PostBoard";
import ConsultingDiv from "../components/ConsultingDiv";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <Hero />
      <PostBoard />
      <ConsultingDiv />
      <Footer />
    </>
  );
};

export default Homepage;
