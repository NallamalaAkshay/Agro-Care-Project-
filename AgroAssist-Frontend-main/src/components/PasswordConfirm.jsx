import React, { useState } from "react";
import "../style.css";

export const PasswordConfirm = () => {
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="password">
      <input
        type="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Confirm Password"
        className="password-input"
      />
    </div>
  );
};

export default PasswordConfirm;