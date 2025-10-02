import React from "react";
import "../style.css";


export const GetStarted = ({ onClick }) => {
  return (
    <button className="SigninButton" onClick={onClick}>
    
      <div className="SigninText">Get Started</div>
      
    </button>
  );
};

export default GetStarted;