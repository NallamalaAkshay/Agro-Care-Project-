const dev = "http://localhost:5000";
const prod = "https://agrocare-backend.onrender.com";

export const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;