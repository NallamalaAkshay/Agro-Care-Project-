import React, { useState } from "react";
import "../style.css";

export const PasswordForm = () => {
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
        placeholder="Password"
        className="password-input"
      />
    </div>
  );
};

export default PasswordForm;