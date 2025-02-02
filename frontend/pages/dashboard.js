// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";
// import { useRouter } from "next/router";

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.push("/login"); // Redirect to login if no token is found
//     } else {
//       // Make an API call to the protected route
//       axios
//         .get("http://localhost:5000/api/auth/protected", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => setData(response.data))
//         .catch((err) => setError("Failed to load protected data"));
//     }
//   }, [router]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {error && <p>{error}</p>}
//       {data ? (
//         <p>{data.message}</p>
//       ) : (
//         <p>Loading protected content...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import API from "../utils/api";  // Axios instance with the Authorization header

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an API request to fetch protected data from the backend
    API.get("/auth/protected")  // The backend route that requires JWT authorization
      .then((response) => {
        setData(response.data);  // Set data received from the protected route
      })
      .catch((err) => {
        setError("Failed to load protected data");  // Handle error (e.g., expired token)
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {data ? <p>{data.message}</p> : <p>Loading protected content...</p>}
    </div>
  );
};

export default Dashboard;
