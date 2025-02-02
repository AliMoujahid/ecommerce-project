import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken, isAuthenticated } from "../utils/auth"; // Authentication utility functions
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch protected data only if user is logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/protected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setData(response.data))
        .catch((err) => setError("Failed to load protected data"));
    } else {
      setData({ message: "Please log in to access the protected content" });
    }
  }, []);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      console.log("Item added to cart!");
      // Add your cart logic here (e.g., API call or update cart state)
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Left: Search bar */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Que recherchez-vous?"
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7 7 3.134 7 7z"
              />
            </svg>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center flex-1">
          <span className="text-2xl font-semibold text-blue-500">MY AMERICAN SHOP</span>
        </div>

        {/* Right: User & Cart Icons */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button onClick={() => router.push("/profile")} className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c3.866 0 7-3.134 7-7S15.866 0 12 0 5 3.134 5 7s3.134 7 7 7zM12 14c4.418 0 8 2.239 8 5v2H4v-2c0-2.761 3.582-5 8-5z"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <button onClick={() => router.push("/cart")} className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18l-2 14H5L3 3zM1 2h4l2 14h12l2-14h4M5 16h14"
                />
              </svg>
            </button>
            <div className="absolute top-0 right-0 flex justify-center items-center bg-red-500 text-white rounded-full w-5 h-5 text-xs">
              5
            </div>
          </div>

          {/* Conditionally Render Logout Button */}
          {isAuthenticated() && <LogoutButton />}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-blue-900 text-white p-4">
          <h2 className="text-2xl font-bold mb-8">E-Commerce</h2>
          <ul>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="/profile">Profile</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="/products">Products</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="/orders">Orders</a>
            </li>
          </ul>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          </header>

          {/* Protected Content */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
          )}

          {data ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {data.message}</h2>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <p>Loading protected content...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
