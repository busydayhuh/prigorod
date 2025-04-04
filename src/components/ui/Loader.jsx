import React from "react";

function Loader() {
  return (
    <div className="absolute top-10 md:top-20 w-full flex justify-center">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
