import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/validateInvitation/${id}`
      );
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]); // Call getUser when the component mounts
  return (
    <div style={{ display: "flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <div>
        <h1>Bonsoir {user.firstName}</h1>
        <p>User ID: {id}</p> {/* Display the user ID */}
      </div>
    </div>
  );
};

export default User;
