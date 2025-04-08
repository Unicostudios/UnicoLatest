import React from "react";
import Lottie from "lottie-react";
import construction from "./construction.json";

const Construction = () => {
  return (
    <Lottie
      animationData={construction}
      className="h-36 sm:h-48 w-36 sm:w-48 mx-auto my-5"
    />
  );
};

export default Construction;
