import React from "react";

const Jumbotron = ({ children }) => {
  return (
    <div
      style={{ height: "20vmin", clear: "both", paddingTop: "3%", textAlign: "center" }}
      className="jumbotron border"
    >
      {children}
    </div>
  );
};

export default Jumbotron;
