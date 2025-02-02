import Cookies from "js-cookie";

// Save JWT token in cookie
export const saveToken = (token) => {
  Cookies.set("token", token, { expires: 1 }); // expires in 1 day
};

// Get the JWT token from cookie
export const getToken = () => {
  return Cookies.get("token");
};

// Remove JWT token from cookie (logout)
export const removeToken = () => {
  Cookies.remove("token");
};
