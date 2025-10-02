import React from "react";
import "../style.css";


export const SigninButton = ({ onClick }) => {
  return (
    <button className="SigninButton" onClick={onClick}>
    
      <div className="SigninText">Sign in</div>
      
    </button>
  );
};

export default SigninButton;