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

// Function to check if the user is logged in
export const isAuthenticated = () => {
  return !!getToken();  // Returns true if the token exists, otherwise false
};