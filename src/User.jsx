import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/validateInvitation/${id}`
      );
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  const confirmPresence = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/acceptInvitation/${id}`
      );
      console.log(response.data);
      setUser(response.data.user);
      getUser()
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]); // Call getUser when the component mounts or when `id` changes

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {user ? (
        <div>
          {user.accepted ? ( // Check if the user has already accepted
            <h1>Utilisateur déjà entré</h1>
          ) : (
            <>
              <h1>Bonsoir {user?.firstName + " " + user?.lastName}</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    background: "#D47E00",
                    color: "white",
                    padding: "10px",
                    border: "none",
                  }}
                  onClick={()=>{confirmPresence()}}
                >
                  Confirmer la Présence
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <h1>Invitation non valide</h1>
        </div>
      )}
    </div>
  );
};

export default User;
