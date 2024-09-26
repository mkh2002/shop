import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loading = () => {
  return (
    <div
      className={
        "flex w-full items-center justify-center space-x-2 text-muted-foreground"
      }
    >
      <ImSpinner8 className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
