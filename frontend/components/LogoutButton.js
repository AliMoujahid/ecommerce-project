import { useRouter } from "next/router";
import { removeToken } from "../utils/auth";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken(); // Remove JWT token from cookies
    router.push("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
