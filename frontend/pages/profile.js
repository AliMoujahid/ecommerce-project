import { useState, useEffect } from "react";
import API from "../utils/api";
import { getToken } from "../utils/auth"; // Get token for auth

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
      if (!token) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/user/profile");
        setUser(response.data);
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
    const token = getToken();
    if (!token) return;

    try {
      const response = await API.put("/user/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Update state with the new user data
      alert("Profile updated successfully");
    } catch (err) {
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
