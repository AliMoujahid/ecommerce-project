import { useState, useEffect } from "react";
import API from "../utils/api"; // Axios instance with Authorization header
import { getToken } from "../utils/auth"; // Get token from cookies

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken(); // Get the JWT token from cookies

      if (!token) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },  // Include the token in header
        });
        setUser(response.data);  // Set the user data in state
      } catch (err) {
        setError("Error loading user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken(); // Get JWT token from cookies
  
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }
  
    try {
      const response = await API.put("/user/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setUser(response.data); // Set the updated user data
      alert("Profile updated successfully!"); // Notify the user
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error);
      setError("Failed to update profile.");
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
